from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from myapi.course.schemas import CourseSchema
from myapi.commons.pagination import paginate
from myapi.extensions import db
from myapi.models import Course

class CourseList(Resource):
    """Get all courses

    ---
    get:
      tags:
        - api
      responses:
        200:
          content:
            application/json:
              schema:
                allOf:
                  - $ref: '#/components/schemas/PaginatedResult'
                  - type: object
                    properties:
                      results:
                        type: array
                        items:
                          $ref: '#/components/schemas/UserSchema'
    """

    method_decorators = [jwt_required()]

    def get(self):
        schema = CourseSchema(many=True)
        query = Course.query
        return paginate(query, schema)
