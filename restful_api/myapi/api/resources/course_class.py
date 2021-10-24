from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from myapi.api.schemas import CourseClassSchema
from myapi.extensions import db
from myapi.models import CourseClass, Employee, Course, Enroll


class CourseClassResource(Resource):
    """CRUD Operations on course class

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
                      example: course class retrieved
                    course_class: CourseClassSchema
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
                CourseClassSchema
        responses:
          201:
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    msg:
                      type: string
                      example: course class created
                    course_class: CourseClassSchema

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
        self.schema = CourseClassSchema()

    def get(self, course_id, trainer_id):
        try:
            query = (
                CourseClass.query
                .join(Course, isouter=True)
                .filter(Course.course_id == course_id)
                .join(Employee, isouter=True)
                .filter(Employee.id == trainer_id)
                .one()
            )
        except Exception as error:
            if "No row was found" in str(error):
                return {"msg": "not found"}, 404
            else:
                raise error
        course_class = self.schema.dump(query)
        class_size = course_class['class_size']

        num_enrolled_dict = self.get_num_enrolled(course_id, trainer_id)
        num_enrolled = num_enrolled_dict["num_enrolled"]
        num_slots_remaining = class_size - num_enrolled

        return {"msg": "course class retrieved",
                "course_class": course_class,
                "num_enrolled": num_enrolled,
                "num_slots_remaining": num_slots_remaining}, 200

    def post(self, course_id, trainer_id):
        course_class = self.schema.load(request.json)

        try:
            db.session.add(course_class)
            db.session.commit()
        except IntegrityError:
            return {"msg": "integrity error"}, 400

        return {"msg": "course class created", "course_class": self.schema.dump(course_class)}, 201

    def delete(self, course_id, trainer_id):
        course_class = CourseClass.query.get_or_404((course_id, trainer_id))
        db.session.delete(course_class)
        db.session.commit()

        return {"msg": "course class deleted"}, 204

    @staticmethod
    def get_num_enrolled(course_id, trainer_id):
        """Helper function to get number of enrolled learners in a course_class using course_id and trainer_id"""
        try:
            query_count = (
                Enroll.query
                .filter(Enroll.course_id == course_id)
                .filter(Enroll.trainer_id == trainer_id)
                .count()
            )
        except Exception as error:
            if "No row was found" in str(error):
                return {"msg": "not found"}, 404
            else:
                raise error

        return {"num_enrolled": query_count}


class CourseClassResourceList(Resource):
    """Get course classes by course

    ---
    get:
      tags:
        - api
      parameters:
        - name: course_id
          in: query
          type: integer
          required: true
      responses:
        200:
          content:
            application/json:
              schema:
                type: object
                properties:
                  msg:
                    type: string
                    example: course classes retrieved
                  result:
                    type: array
                    items: CourseClassSchema

    """

    # method_decorators = [jwt_required()]

    def get(self, course_id):

        course_class_schema = CourseClassSchema(many=True)
        query = (
            CourseClass.query
            .filter(CourseClass.course_id == course_id)
            .join(Course, isouter=True)
            .all()
        )

        return {"msg": "course classes retrieved", "course_classes": course_class_schema.dump(query)}, 200
