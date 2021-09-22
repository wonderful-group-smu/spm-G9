from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource, reqparse
from myapi.api.schemas import CourseSchema
from myapi.commons.pagination import paginate
from myapi.extensions import db
from myapi.models import Course, Prereq

class CourseResource(Resource):
    """Get, Create one course

    ---
    get:
      tags:
        - api
      responses:
        200:
          content:
            application/json:
              schema: CourseSchema

    post:
      tags:
        - api
      requestBody:
        content:
          application/json:
            schema:
              CourseSchema
      responses:
        201:
          content:
            application/json:
              schema:
                type: object
                properties:
                  msg:
                    type: string
                    example: course created
                  course: CourseSchema
    """
    # method_decorators = [jwt_required()]

    def get(self, course_id):
        try:
          query = (
            Course.query
            .join(Prereq, isouter=True)
            .filter(Course.course_id == course_id)
            .one()
          )
        except Exception as error:
          if "No row was found" in str(error):
            return {"msg": "not found"}, 404
          else:
            raise error

        schema = CourseSchema()
        course = schema.dump(query)
        return course

    # Removing 'course_id' will raise error when parsing
    def post(self, course_id):
        schema = CourseSchema()
        course = schema.load(request.json)
        try:
          db.session.add(course)
          db.session.commit()
        except AssertionError as error:
          if "blank-out primary key" in str(error):
            return {"msg": "duplicate object"}, 400
          else:
            raise error

        return {"msg": "course created", "course": schema.dump(course)}, 201


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
