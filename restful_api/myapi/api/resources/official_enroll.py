from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from myapi.api.schemas import OfficialEnrollSchema
from myapi.commons.pagination import paginate
from myapi.extensions import db
from myapi.models import OfficialEnroll

class OfficialEnrollResource(Resource):

    method_decorators = [jwt_required()]
    
    def __init__(self):
      self.schema = OfficialEnrollSchema()
      
    def get(self, eng_id, course_id):
      enrollment_record = OfficialEnroll.query.get_or_404(eng_id, course_id)
      return {"employee": self.schema.dump(enrollment_record)}
      
    def post(self, eng_id, course_id, start_date, end_date):
      new_enrollment = OfficialEnroll(eng_id, course_id, start_date, end_date)
      
      db.session.add(new_enrollment)
      db.session.commit()
      
      return {"msg": "enrollment created", "enrollment": self.schema.dump(new_enrollment)}, 201
    
    def put(self, eng_id, course_id, has_passed):
      enrollment_record = OfficialEnroll.query.get_or_404(eng_id, course_id)
      enrollment_record.has_passed = has_passed
      db.session.commit()
      
      return {"msg": "enrollment created", "enrollment": self.schema.dump(enrollment_record)}, 201
      

class OfficialEnrollResourceList(Resource):

    method_decorators = [jwt_required()]

    def __init__(self):
      self.schema = OfficialEnrollSchema()

    def get(self, eng_id):
      schema = OfficialEnrollSchema(many=True)
      query = OfficialEnroll.query.filter_by(eng_id=eng_id)
      return paginate(query, schema)
