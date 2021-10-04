from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from myapi.api.schemas import EnrollSchema
from myapi.commons.pagination import paginate
from myapi.extensions import db
from myapi.models import Enroll

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
                allOf:
                  - $ref: '#/components/schemas/PaginatedResult'
                  - type: object
                    properties:
                      results:
                        type: array
                        items:
                          $ref: '#/components/schemas/EnrollSchema'
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
                  user: EnrollSchema
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
                  user: EnrollSchema
    """
    
  method_decorators = [jwt_required()]
  
  def __init__(self):
    self.schema = EnrollSchema()
    
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

      return {"msg": "enrollment record retrieved", "enrollment": self.schema.dump(query)}, 200
    
  def post(self, eng_id, course_id, trainer_id):
    new_enrollment = self.schema.load(request.json)
    
    try:
      db.session.add(new_enrollment)
      db.session.commit()
    except IntegrityError as e:
      return {"msg": str(e)}, 400
    
    return {"msg": "self enrollment created", "enrollment": self.schema.dump(new_enrollment)}, 201

  def put(self, eng_id, course_id, trainer_id):
    updated_record = self.schema.load(request.json)
    
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
    
    return {"msg": "enrollment updated", "enrollment": self.schema.dump(enrollment_record)}, 201
    

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
