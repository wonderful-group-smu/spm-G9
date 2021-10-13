from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from myapi.api.schemas import EnrollSchema, PrereqSchema
from myapi.commons.pagination import paginate
from myapi.extensions import db
from myapi.models import Enroll, Prereq


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
        db.session.commit()

        return {"msg": "enrollment updated", "enrollment": self.enroll_schema.dump(enrollment_record)}, 201

    @staticmethod
    def check_eligibility(course_id, eng_id):
        query = (
            Prereq.query
            .filter(Prereq.course_id == course_id)
            .all()
        )
        prereqs = PrereqSchema(many=True).dump(query)
		
        if not prereqs:
            return True

        completed_courses = Enroll.query.filter(
            Enroll.eng_id == eng_id,
            Enroll.has_passed == True,
        ).all()
        print(prereqs)
        fmted_completed_course = {c.course_id: c.has_passed for c in completed_courses}
        fmted_prereqs = [p.prereq_id for p in prereqs]
        counter = 0

        for preq in fmted_prereqs:
            counter += fmted_completed_course.get(preq.prereq_id, 0)

        return len(prereqs) == counter


class EnrollResourceList(Resource):
    """Get all officially enrolled courses based on engineer id

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


class EnrollByCourseResourceList(Resource):
    """Get all enrolled courses based on course id

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
