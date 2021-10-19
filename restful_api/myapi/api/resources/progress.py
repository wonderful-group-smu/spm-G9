import json
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from myapi.api.schemas import EnrollSchema
from myapi.models import ClassSection, Enroll, SectionCompleted


class ProgressResource(Resource):
    """Single object employee progress resource
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
                      example: engineer course progress retrieved
                    progress:
                      type: object
                      example:
                        no_sections: 4
                        completed_sections: 3
    """

    method_decorators = [jwt_required()]

    def get(self, eng_id, course_id, trainer_id):
        num_sections = (ClassSection.query
                        .filter_by(
                            course_id=course_id,
                            trainer_id=trainer_id
                        )
                        .count()
                        )

        num_completed_sections = (SectionCompleted.query
                                  .filter_by(
                                      course_id=course_id,
                                      trainer_id=trainer_id,
                                      eng_id=eng_id
                                  )
                                  .count()
                                  )
        
        result = {
          "no_sections": num_sections,
          "completed_sections": num_completed_sections
        }

        return {"msg": "engineer course progress retrieved", "progress": result}, 
      
class ProgressListResource(Resource):
    """Multiple object employee progress resource
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
                      example: engineer overall course progress retrieved
                    progress:
                      type: object
                      example:
                        <course_id>:
                          no_sections: 4
                          completed_sections: 3
          404:
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    msg: engineer has no enrolled courses
    """

    method_decorators = [jwt_required()]

    def get(self, eng_id):
        query = Enroll.query.filter(Enroll.eng_id == eng_id).all()
        courses_taken = EnrollSchema(many=True).dump(query)
        result = {}

        if not courses_taken:
            return {"msg": "engineer has no enrolled courses"}, 404

        for c in courses_taken:
            num_sections = (ClassSection.query
                            .filter_by(
                                course_id=c['course_id'],
                                trainer_id=c['trainer_id']
                            )
                            .count()
                            )

            num_completed_sections = (SectionCompleted.query
                                      .filter_by(
                                          course_id=c['course_id'],
                                          trainer_id=c['trainer_id'],
                                          eng_id=c['eng_id']
                                      )
                                      .count()
                                      )

            result[c['course_id']] = {
                "no_sections": num_sections,
                "completed_sections": num_completed_sections,
            }

        return {"msg": "engineer overall course progress retrieved", "progress": result}, 200
