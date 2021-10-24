from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from myapi.api.schemas import QuizSchema
from myapi.extensions import db
from myapi.models import ClassSection, Quiz


class QuizResource(Resource):
    """Get, Create one quiz
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
                    example: quiz retrieved
                    quiz: QuizSchema

    post:
        tags:
        - api
        requestBody:
        content:
            application/json:
            schema:
                QuizSchema
        responses:
        201:
            content:
            application/json:
                schema:
                type: object
                properties:
                    msg:
                    type: string
                    example: quiz created
                    quiz: QuizSchema

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
    method_decorators = [jwt_required()]

    def __init__(self):
        self.schema = QuizSchema()

    def get(self, course_id, section_id, quiz_id):
        try:
            query = (
                Quiz.query
                .filter(Quiz.quiz_id == quiz_id)
                .join(ClassSection, (ClassSection.course_id == course_id) & (ClassSection.section_id == section_id), isouter=True)
                .one()
            )
        except Exception as error:
            if "No row was found" in str(error):
                return {"msg": "not found"}, 404
            else:
                raise error

        return {"msg": "quiz retrieved", "quiz": self.schema.dump(query)}, 200

    def post(self, course_id, section_id, quiz_id):
        quiz = self.schema.load(request.json)

        try:
            db.session.add(quiz)
            db.session.commit()
        except IntegrityError as e:
            return {"msg": str(e)}, 400

        return {"msg": "quiz created", "quiz": self.schema.dump(quiz)}, 201

    def delete(self, course_id, section_id, quiz_id):
        quiz = Quiz.query.get_or_404(quiz_id)
        db.session.delete(quiz)
        db.session.commit()

        return {"msg": "quiz deleted"}, 204


class QuizResourceList(Resource):
    """Get quizzes of a section
    get:
        tags:
        - api
        parameters:
        - name: section_id
            in: query
            type: integer
            required: true
            description: section id
        responses:
        400:
            description: no section id provided
        200:
            content:
            application/json:
                schema:
                type: object
                properties:
                    msg:
                    type: string
                    example: all quizzes retrieved
                    result: QuizSchema
    """
    method_decorators = [jwt_required()]

    def __init__(self):
        self.schema = QuizSchema(many=True)

    def get(self, section_id):
        query = (
            Quiz.query
            .filter(Quiz.section_id == section_id)
            .join(ClassSection, (ClassSection.section_id == Quiz.section_id) & (ClassSection.trainer_id == Quiz.trainer_id), isouter=True)
            .all()
        )

        return {"msg": "all quizzes retrieved", "quizzes": self.schema.dump(query)}, 200
