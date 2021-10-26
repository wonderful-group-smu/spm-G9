from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from myapi.api.schemas import QuizAttemptSchema, SectionCompletedSchema
from myapi.extensions import db
from myapi.models import Quiz, QuizAttempt, Employee


class QuizAttemptResource(Resource):
    """Get, Create one quiz attempt
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

    def get(self, course_id, section_id, trainer_id, quiz_id, eng_id):
        try:
            query = (
                QuizAttempt.query
                .join(Quiz, (QuizAttempt.quiz_id == Quiz.quiz_id) & (QuizAttempt.section_id == Quiz.section_id) & (QuizAttempt.course_id == Quiz.course_id), isouter=True)
                .filter(Quiz.quiz_id == quiz_id)
                .join(Employee, isouter=True)
                .filter(Employee.id == eng_id)
                .one()
            )
        except Exception as error:
            if "No row was found" in str(error):
                return {"msg": "not found"}, 404
            else:
                raise error

        return {"msg": "quiz attempt retrieved", "quiz_attempt": self.schema.dump(query)}, 200

    def post(self, course_id, section_id, trainer_id, quiz_id, eng_id):
        quiz_attempt = self.schema.load(request.json)

        try:
            db.session.add(quiz_attempt)
            db.session.commit()
        except IntegrityError as e:
            return {"msg": str(e)}, 400

        # slice request.json because section_completed doesn't take in quiz_id
        request_json = {k: v for (k, v) in request.json.items() if k in ['course_id', 'section_id', 'trainer_id', 'eng_id']}

        # add record to section_completed once engineer attempts ungraded quiz
        section_completed_schema = SectionCompletedSchema()
        section_completed = section_completed_schema.load(request_json)
        try:
            db.session.add(section_completed)
            db.session.commit()
        except IntegrityError as e:
            return {"msg": str(e)}, 400

        return {"msg": "quiz attempt created", "quiz_attempt": self.schema.dump(quiz_attempt), "section_completed": section_completed_schema.dump(section_completed)}, 201
