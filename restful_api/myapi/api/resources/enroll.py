from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
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
                          $ref: '#/components/schemas/OfficialEnrollSchema'
    post:
      tags:
        - api
      requestBody:
        content:
          application/json:
            schema:
              OfficialEnrollSchema
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
                  user: OfficialEnrollSchema
    put:
      tags:
        - api
      requestBody:
        content:
          application/json:
            schema:
              OfficialEnrollSchema
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
    enrollment_record = Enroll.query.get_or_404(eng_id, course_id, trainer_id)
    return {"msg": "enrollment record retrieved", "enrollment": self.schema.dump(enrollment_record)}, 200
    
  def post(self, eng_id, course_id, trainer_id):
    new_enrollment = self.schema.load(request.json)
    try:
        db.session.add(new_enrollment)
        db.session.commit()
    except AssertionError as error:
        if "blank-out primary key" in str(error):
            return {"msg": "duplicate object"}, 400
        else:
            raise error
    return {"msg": "self enrollment created", "enrollment": self.schema.dump(new_enrollment)}, 201

  def put(self, eng_id, course_id, trainer_id, has_passed):
    enrollment_record = EnrollSchema.query.get_or_404(eng_id, course_id, trainer_id)
    enrollment_record.has_passed = has_passed
    db.session.commit()
    
    return {"msg": "enrollment created", "enrollment": self.schema.dump(enrollment_record)}, 201
    

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
                          $ref: '#/components/schemas/OfficialEnrollSchema'
    """
    method_decorators = [jwt_required()]

    def __init__(self):
      self.schema = EnrollSchema(many=True)

    def get(self, eng_id):
      query = Enroll.query.filter_by(eng_id=eng_id)
      return paginate(query, self.schema)
