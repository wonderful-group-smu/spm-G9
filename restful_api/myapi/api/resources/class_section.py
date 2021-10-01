from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from myapi.api.schemas import ClassSectionSchema
from myapi.extensions import db
from myapi.models import ClassSection, CourseClass

class ClassSectionResource(Resource):
  """CRUD Operations on class section

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
                    example: class section retrieved
                  class_section: ClassSectionSchema
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
              ClassSectionSchema
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
                  class_section: ClassSectionSchema
    """
    
  # method_decorators = [jwt_required()]
  
  def __init__(self):
    self.schema = ClassSectionSchema()
    
  def get(self, course_id, trainer_id):
    try:
      query = (
        ClassSection.query
        .filter((ClassSection.course_id == course_id) & (ClassSection.trainer_id == trainer_id))
        .join(CourseClass, (CourseClass.course_id == ClassSection.course_id) & (CourseClass.trainer_id == ClassSection.trainer_id), isouter=True)
        .one()
      )
    except Exception as error:
      if "No row was found" in str(error):
        return {"msg": "not found"}, 404
      else:
        raise error

    return {"msg": "class section retrieved", "class_section": self.schema.dump(query)}, 200

  def post(self, course_id, trainer_id):
    class_section = self.schema.load(request.json)
    
    try:
      db.session.add(class_section)
      db.session.commit()
    except IntegrityError as e:
      return {"msg": str(e)}, 400
    
    return {"msg": "class section created", "class_section": self.schema.dump(class_section)}, 201


class ClassSectionResourceList(Resource):
    """Get all class sections

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
                    example: class sections retrieved
                  courses: 
                    type: array
                    items:
                      ClassSectionSchema
        404:
          content:
            application/json:
              schema:
                type: object
                properties:
                  msg: not found

    """

    method_decorators = [jwt_required()]

    def __init__(self):
        self.schema = ClassSectionSchema(many=True)

    def get(self, course_id):
        query = (
          ClassSection.query
          .filter(ClassSection.course_id == course_id)
          .join(CourseClass, (CourseClass.course_id == ClassSection.course_id) & (CourseClass.trainer_id == ClassSection.trainer_id), isouter=True)
          .all()
        )

        if len(query) == 0:
          return {"msg": "not found"}, 404

        return {"msg": "class sections retrieved", "class_sections": self.schema.dump(query)}, 200