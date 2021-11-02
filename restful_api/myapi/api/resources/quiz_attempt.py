from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from myapi.api.schemas import QuizAttemptSchema, SectionCompletedSchema, QuizSchema, EnrollSchema
from myapi.extensions import db
from myapi.models import Quiz, QuizAttempt, Employee, Enroll


class QuizAttemptResource(Resource):
    """Get, Create one quiz attempt
    ---
    get:
        tags:
            - api
        responses:
            200:
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                msg:
                                    type: string
                                    example: quiz attempt retrieved
                                quiz: QuizAttemptSchema
    post:
        tags:
            - api
        requestBody:
            content:
                application/json:
                    schema:
                        QuizAttemptSchema
        responses:
            201:
                content:
                    application/json:
                        schema:
                            type: object
                            properties:
                                msg:
                                    type: string
                                    example: quiz attempt created
                                quiz: QuizAttemptSchema
    """
    method_decorators = [jwt_required()]

    def __init__(self):
        self.schema = QuizAttemptSchema()
        self.section_completed_schema = SectionCompletedSchema()
        self.enroll_schema = EnrollSchema()
        self.quiz_schema = QuizSchema()

    def get(self, course_id, section_id, trainer_id, eng_id):
        try:
            query = (
                QuizAttempt.query
                .join(Employee, isouter=True)
                .filter(Employee.id == eng_id)
                .filter(QuizAttempt.course_id == course_id)
                .filter(QuizAttempt.section_id == section_id)
                .filter(QuizAttempt.trainer_id == trainer_id)
                .one()
            )
        except Exception as error:
            if "No row was found" in str(error):
                return {"msg": "not found"}, 404
            else:
                raise error

        return {"msg": "quiz attempt retrieved", "quiz_attempt": self.schema.dump(query)}, 200

    def post(self, course_id, section_id, trainer_id, eng_id):

        fmted_quiz = self.query_record(self, course_id, section_id, trainer_id, eng_id, "quiz")
        is_graded = fmted_quiz['is_graded']

        quiz_attempt = self.schema.load(request.json)

        # slice request.json because section_completed doesn't take in quiz_id
        request_json = {k: v for (k, v) in request.json.items() if k in ['course_id', 'section_id', 'trainer_id', 'eng_id']}
        section_completed = self.section_completed_schema.load(request_json)

        answers = request.json['answers']
        results = self.grade_quiz(fmted_quiz, answers)
        num_correct, wrong = results[0], results[1]
        score = str(num_correct) + "/" + str(len(fmted_quiz['questions']))
        base_output = [score, wrong, quiz_attempt]

        passing_mark = fmted_quiz['passing_mark'] if fmted_quiz['passing_mark'] is not None else 0

        if not is_graded:
            self.add_record([quiz_attempt, section_completed])
            return self.return_output_completed(self, base_output, section_completed)

        else:
            # Check if quiz_attempt passes
            if num_correct >= passing_mark:
                # Update Enrol table has_passed if passed
                enrollment = self.query_record(self, course_id, section_id, trainer_id, eng_id, 'enrollment')
                enrollment.has_passed = True
                db.session.commit()
                # Add section completed record
                self.add_record([quiz_attempt, section_completed])
                return self.return_output_passed(self, base_output, section_completed, enrollment)
            else:
                return self.return_output_failed(self, base_output)

    @staticmethod
    def query_record(self, course_id, section_id, trainer_id, eng_id, flag):
        if flag == 'quiz':
            try:
                quiz = (
                    Quiz.query
                    .filter((Quiz.course_id == course_id)
                    .filter(Quiz.section_id == section_id)
                    .filter(Quiz.trainer_id == trainer_id))
                    .one()
                )
            except Exception as error:
                if "No row was found" in str(error):
                    return {"msg": "not found"}, 404
                else:
                    raise error
            return self.quiz_schema.dump(quiz)

        elif flag == 'enrollment':
            try:
                enrollment = (
                    Enroll.query
                    .filter((Enroll.eng_id == eng_id)
                    .filter(Enroll.course_id == course_id)
                    .filter(Enroll.trainer_id == trainer_id))
                    .one()
                )
            except Exception as error:
                if "No row was found" in str(error):
                    return {"msg": "not found"}, 404
                else:
                    raise error
            return enrollment

    @staticmethod
    def add_record(records):
        for record in records:
            try:
                db.session.add(record)
                db.session.commit()
            except IntegrityError as e:
                return {"msg": str(e)}, 400

    @staticmethod
    def return_output_completed(self, base_output, section_completed):
        return {
            "msg": "quiz attempt created",
            "grade": "completed",
            "score": base_output[0],
            "quiz_attempt": self.schema.dump(base_output[2]),
            "wrong_answers": base_output[1],
            "section_completed": self.section_completed_schema.dump(section_completed),
        }, 201

    @staticmethod
    def return_output_passed(self, base_output, section_completed, enrollment):
        return {
            "msg": "quiz attempt created",
            "grade": "passed",
            "score": base_output[0],
            "quiz_attempt": self.schema.dump(base_output[2]),
            "wrong_answers": base_output[1],
            "section_completed": self.section_completed_schema.dump(section_completed),
            "updated_enrollment": self.enroll_schema.dump(enrollment)
        }, 201

    @staticmethod
    def return_output_failed(self, base_output):
        return {
            "msg": "quiz attempt created",
            "grade": "failed",
            "score": base_output[0],
            "quiz_attempt": self.schema.dump(base_output[2]),
            "wrong_answers": base_output[1]
        }, 201

    @staticmethod
    def grade_quiz(quiz, answers):
        questions = quiz['questions']
        # Format to dict {question_id : correct_option_label}
        fmted_questions = {}
        for question in questions:
            question_id = question['question_id']
            question_options = question['question_options']
            for question_option in question_options:
                if question_option['is_correct'] == True:
                    correct_option_label = question_option['option_label']
                    fmted_questions[question_id] = correct_option_label

        # Sort fmted_questions and answers by question_id
        fmted_questions = sorted(fmted_questions.items(), key=lambda d: d[0])
        answers = sorted(answers, key=lambda d: d['question_id'])

        # If quiz_attempt incomplete, set answer_labels for unattempted questions to be None
        if len(answers) < len(fmted_questions):
            for i in range(len(fmted_questions) - len(answers)):
                answers.append({"answer_label": None})

        wrong = []
        num_correct = 0
        for i in range(len(fmted_questions)):
            assert fmted_questions[i][0] == answers[i]['question_id'], "Wrong question and answer matching"
            if fmted_questions[i][1] == answers[i]['answer_label']:
                num_correct += 1
            else:
                wrong.append({
                    "question_id": i + 1,
                    "option_selected": answers[i]['answer_label'],
                    "correct_answer": fmted_questions[i][1]
                })
                answers[i]['is_correct'] = False

        return num_correct, wrong
