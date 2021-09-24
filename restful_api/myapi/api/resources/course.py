
from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource, reqparse
from myapi.api.schemas import CourseSchema,PrereqSchema
from myapi.commons.pagination import paginate
from myapi.extensions import db
from myapi.models import Course, Prereq, CourseTrainer, OfficialEnroll
from myapi.api.resources.prereq import validate_prereqs
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
              schema:
                type: object
                properties:
                  msg:
                    type: string
                    example: course retrieved
                  course: CourseSchema

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
    method_decorators = [jwt_required()]

    def get(self, course_id):
        try:
          query = (
            Course.query
            .join(Prereq, isouter=True)
            .filter(Course.course_id == course_id)
            .join(CourseTrainer, isouter=True)
            .one()
          )
        except Exception as error:
          if "No row was found" in str(error):
            return {"msg": "not found"}, 404
          else:
            raise error

        schema = CourseSchema()
        course = schema.dump(query)
        return {"msg": "course retrieved", "course": schema.dump(course)}, 200

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


class CourseList(Resource):
    """Get all courses, with boolean indicating if engineer is eligible / enrolled

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

    def get(self, eng_id):
      
      all_courses = (Course.query
               .join(
                 OfficialEnroll.query.filter(
                   OfficialEnroll.eng_id==eng_id
                   ), isouter=True)
               .join(Prereq, isouter=True)
               )
      
      completed_courses = (Course.query
               .join(
                 OfficialEnroll.query.filter(
                   OfficialEnroll.eng_id==eng_id,
                   OfficialEnroll.has_passed == True
                   ), isouter=True)
               .join(Prereq, isouter=True)
               )
      
      schema = CourseSchema(many=True)
      courses = validate_prereqs(schema.dump(all_courses),
                                  schema.dump(completed_courses))
      # print(schema.dump(completed_courses)
      # from pprint import pprint
      # pprint(courses))
      return paginate(schema.load(courses), schema)
