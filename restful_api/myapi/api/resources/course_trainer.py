from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from myapi.api.schemas import CourseTrainerSchema
from myapi.extensions import db

class CourseTrainerResource(Resource):
    """Create course trainer relationship

    ---
    post:
      tags:
        - api
      requestBody:
        content:
          application/json:
            schema:
              CourseTrainerSchema
      responses:
        201:
          content:
            application/json:
              schema:
                type: object
                properties:
                  msg:
                    type: string
                    example: course trainer created
                  course_trainer: CourseTrainerSchema
    """
    # method_decorators = [jwt_required()]

    def post(self):
        schema = CourseTrainerSchema()
        course_trainer = schema.load(request.json)
        try:
          db.session.add(course_trainer)
          db.session.commit()
        except IntegrityError:
          return {'msg': 'invalid course trainer or course'}, 400

        return {"msg": "course created", "course_trainer": schema.dump(course_trainer)}, 201