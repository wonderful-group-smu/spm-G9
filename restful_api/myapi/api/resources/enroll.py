from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from myapi.api.schemas import EnrollSchema, CourseSchema
from myapi.commons.pagination import paginate
from myapi.extensions import db
from myapi.models import Enroll, Prereq, Course


class EnrollResource(Resource):
    """CRUD Operations on enrollments

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
                      example: Enrollment record retrieved
                    enrollment: EnrollSchema
      post:
        tags:
          - api
        requestBody:
          content:
            application/json:
              schema:
                EnrollSchema
        responses:
          201:
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    msg:
                      type: string
                      example: Enrollment record created
                    enrollment: EnrollSchema
      put:
        tags:
          - api
        requestBody:
          content:
            application/json:
              schema:
                EnrollSchema
        responses:
          201:
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    msg:
                      type: string
                      example: Enrollment passed record updated
                    enrollment: EnrollSchema
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
        self.enroll_schema = EnrollSchema()

    def get(self, eng_id, course_id, trainer_id):
        try:
            query = (
                Enroll.query
                .filter(Enroll.eng_id == eng_id)
                .filter(Enroll.course_id == course_id)
                .filter(Enroll.trainer_id == trainer_id)
                .one()
            )
        except Exception as error:
            if "No row was found" in str(error):
                return {"msg": "not found"}, 404
            else:
                raise error

        return {"msg": "enrollment record retrieved", "enrollment": self.enroll_schema.dump(query)}, 200

    def post(self, eng_id, course_id, trainer_id):
        new_enrollment = self.enroll_schema.load(request.json)

        is_eligible = self.check_eligibility(new_enrollment.course_id, new_enrollment.eng_id)

        if not is_eligible:
            return {"msg": "learner is not eligible for this course"}, 400

        try:
            db.session.add(new_enrollment)
            db.session.commit()
        except IntegrityError as e:
            return {"msg": str(e)}, 400

        return {"msg": "enrollment created", "enrollment": self.enroll_schema.dump(new_enrollment)}, 201

    def put(self, eng_id, course_id, trainer_id):
        updated_record = self.enroll_schema.load(request.json)

        try:
            enrollment_record = (
                Enroll.query
                .filter(Enroll.eng_id == eng_id)
                .filter(Enroll.course_id == course_id)
                .filter(Enroll.trainer_id == trainer_id)
                .one()
            )
        except Exception as error:
            if "No row was found" in str(error):
                return {"msg": "not found"}, 404
            else:
                raise error

        enrollment_record.has_passed = updated_record.has_passed
        enrollment_record.is_official = updated_record.is_official
        enrollment_record.is_approved = updated_record.is_approved
        db.session.commit()

        return {"msg": "enrollment updated", "enrollment": self.enroll_schema.dump(enrollment_record)}, 201

    def delete(self, eng_id, course_id, trainer_id):
        try:
            query = (
                Enroll.query
                .filter(Enroll.eng_id == eng_id)
                .filter(Enroll.course_id == course_id)
                .filter(Enroll.trainer_id == trainer_id)
                .one()
            )
        except Exception as error:
            if "No row was found" in str(error):
                return {"msg": "not found"}, 404
            else:
                raise error
        db.session.delete(query)
        db.session.commit()
        return {"msg": "enrollment record deleted"}, 204

    @staticmethod
    def check_eligibility(course_id, eng_id):
        query = (
            Course.query
            .join(Prereq, Prereq.course_id == Course.course_id, isouter=True)
            .filter(Course.course_id == course_id)
            .all()
        )
        prereqs = CourseSchema(many=True).dump(query)
        if not prereqs:
            return True

        prereqs = prereqs[0]

        completed_courses = Enroll.query.filter(
            Enroll.eng_id == eng_id,
            Enroll.has_passed == True,
        ).all()

        fmted_completed_course = {c.course_id: c.has_passed for c in completed_courses}
        fmted_prereqs = [p['prereq_id'] for p in prereqs['prereqs']]
        counter = 0

        for preq in fmted_prereqs:
            counter += fmted_completed_course.get(preq, 0)

        return len(fmted_prereqs) == counter


class EnrollResourceList(Resource):
    """Get all enrollement records based on engineer id

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
                          $ref: '#/components/schemas/EnrollSchema'
    """
    method_decorators = [jwt_required()]

    def __init__(self):
        self.schema = EnrollSchema(many=True)

    def get(self, eng_id):
        query = Enroll.query.filter_by(eng_id=eng_id)
        return paginate(query, self.schema)


class EnrollByEngineerSelfResourceList(Resource):
    """Get all self-enrolled learners

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
                          $ref: '#/components/schemas/EnrollSchema'
    """
    method_decorators = [jwt_required()]

    def __init__(self):
        self.schema = EnrollSchema(many=True)

    def get(self):
        query = Enroll.query.filter_by(is_official=False)
        return paginate(query, self.schema)


class EnrollByCourseResourceList(Resource):
    """Get all enrolled learners based on course id

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
                          $ref: '#/components/schemas/EnrollSchema'
    """
    method_decorators = [jwt_required()]

    def __init__(self):
        self.schema = EnrollSchema(many=True)

    def get(self, course_id):
        query = Enroll.query.filter_by(course_id=course_id).order_by(Enroll.created_timestamp.desc())
        return paginate(query, self.schema)
