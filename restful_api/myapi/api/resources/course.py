from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from myapi.api.schemas import CourseSchema
from myapi.commons.pagination import paginate
from myapi.extensions import db
from myapi.models import Course, Prereq

class CourseResource(Resource):
    """Get one course

    ---
    get:
      tags:
        - api
      responses:
        200:
          content:
            application/json:
              schema: CourseSchema
    """
    # method_decorators = [jwt_required()]

    def get(self, course_id):
        query = (
          Course.query
          .join(Prereq)
          .filter(Course.course_id == course_id)
          .one()
        )
        schema = CourseSchema()
        courses = schema.dump(query)
        return courses


# -------
# TODO: This is a work in progress, blocked till further notice
# -------
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
      
      # Step 1: Get all the courses
      query = Course.query.all()
      schema = CourseSchema(many=True)
      courses = schema.dumps(query).data
      
      # Step 2: Get engineer completed courses
      
      # Step 3: Get enrolled courses
      
      # Step 4: Validate the courses pre-req
      
      # Step 5: Convert back to MA format and paginate
      
      result = validate_prereqs(courses, completed_courses)
      query = schema.load(result)
      return paginate(query, schema)
