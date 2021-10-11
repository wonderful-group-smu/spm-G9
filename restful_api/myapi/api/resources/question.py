from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from myapi.api.schemas import QuestionSchema
from myapi.extensions import db
from myapi.models import ClassSection, Question


class QuestionResource(Resource):
    """CRUD Operations on question

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
                        example: question retrieved
                    question: QuestionSchema
            404:
            content:
                application/json:
                schema:
                    type: object
                    properties:
                    msg: not found

        post:
        tags:
            - api
        requestBody:
            content:
            application/json:
                schema:
                ClassSectionSchema
        responses:
            201:
            content:
                application/json:
                schema:
                    type: object
                    properties:
                    msg:
                        type: string
                        example: question created
                    question: QuestionSchema

        delete:
        tags:
            - api
        responses:
            204:
            description: The resource was deleted successfully.
            404:
            content:
                application/json:
                schema:
                    type: object
                    properties:
                    message: The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.
        """

    # method_decorators = [jwt_required()]

    def __init__(self):
        self.schema = QuestionSchema()

    def get(self, question_id):
        try:
            query = (
                Question.query
                .filter(Question.question_id == question_id)
                .join(ClassSection, (ClassSection.course_id == Question.course_id) & (ClassSection.trainer_id == Question.trainer_id), isouter=True)
                .one()
            )
        except Exception as error:
            if "No row was found" in str(error):
                return {"msg": "not found"}, 404
            else:
                raise error

        return {"msg": "question retrieved", "question": self.schema.dump(query)}, 200

    def post(self, question_id):
        question = self.schema.load(request.json)

        try:
            db.session.add(question)
            db.session.commit()
        except IntegrityError as e:
            return {"msg": str(e)}, 400

        return {"msg": "question created", "question": self.schema.dump(question)}, 201

    def delete(self, question_id):
        question = Question.query.get_or_404(question_id)
        db.session.delete(question)
        db.session.commit()

        return {"msg": "question deleted"}, 204



class QuestionResourceList(Resource):
    """Get all questions

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
                    example: questions retrieved
                    courses:
                    type: array
                    items:
                        QuestionSchema

    """

    method_decorators = [jwt_required()]

    def __init__(self):
        self.schema = QuestionSchema(many=True)

    def get(self, section_id):
        query = (
            Question.query
            .filter(Question.section_id == section_id)
            .join(ClassSection, (ClassSection.section_id == Question.section_id) & (ClassSection.trainer_id == Question.trainer_id), isouter=True)
            .all()
        )

        return {"msg": "questions retrieved", "questions": self.schema.dump(query)}, 200
