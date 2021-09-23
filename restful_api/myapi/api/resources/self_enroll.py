
from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from myapi.api.schemas import SelfEnrollSchema
from myapi.commons.pagination import paginate
from myapi.extensions import db
from myapi.models import SelfEnroll

class SelfEnrollResource(Resource):
    method_decorators = [jwt_required()]

    def get(self, eng_id, course_id):
        
        try:
            query = SelfEnroll.query.filter(SelfEnroll.eng_id == eng_id).filter(SelfEnroll.course_id == course_id).one()
        except Exception as error:
            if "No row was found" in str(error):
                return {"msg": "not found"}, 404
            else:
                raise error
        schema = SelfEnrollSchema()
        enrollment_record = schema.dump(query)
        return {"msg": "self enrollment record retrieved", "enrollment": schema.dump(enrollment_record)}, 200

    def post(self, eng_id, course_id):
        schema = SelfEnrollSchema()
        new_enrollment = schema.load(request.json)
        try:
            db.session.add(new_enrollment)
            db.session.commit()
        except AssertionError as error:
            if "blank-out primary key" in str(error):
                return {"msg": "duplicate object"}, 400
            else:
                raise error

        return {"msg": "enrollment created", "enrollment": schema.dump(new_enrollment)}, 201

class SelfEnrollResourceList(Resource):
    method_decorators = [jwt_required()]

    def get(self, eng_id):
        schema = SelfEnrollSchema(many=True)
        query = SelfEnroll.query.filter_by(eng_id=eng_id)

        return paginate(query, schema)

