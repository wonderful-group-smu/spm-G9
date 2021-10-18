from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from myapi.api.schemas import ClassSectionSchema, SectionCompletedSchema
from myapi.extensions import db
from myapi.models import ClassSection, SectionCompleted, CourseClass


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
        self.schema = ClassSectionSchema()

    def get(self, section_id):
        try:
            query = (
                ClassSection.query
                .filter(ClassSection.section_id == section_id)
                .join(CourseClass, (CourseClass.course_id == ClassSection.course_id) & (CourseClass.trainer_id == ClassSection.trainer_id), isouter=True)
                .one()
            )
        except Exception as error:
            if "No row was found" in str(error):
                return {"msg": "not found"}, 404
            else:
                raise error

        return {"msg": "class section retrieved", "class_section": self.schema.dump(query)}, 200

    def post(self, section_id):
        class_section = self.schema.load(request.json)

        try:
            db.session.add(class_section)
            db.session.commit()
        except IntegrityError as e:
            return {"msg": str(e)}, 400

        return {"msg": "class section created", "class_section": self.schema.dump(class_section)}, 201

    def delete(self, section_id):
        class_section = ClassSection.query.get_or_404(section_id)
        db.session.delete(class_section)
        db.session.commit()

        return {"msg": "course class deleted"}, 204


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
                      ClassSectionStatusSchema

    """

    method_decorators = [jwt_required()]

    def __init__(self):
        self.schema = ClassSectionSchema(many=True)

    def get(self, course_id, trainer_id, eng_id):
        completed_section_query = (
            SectionCompleted.query.filter(
                SectionCompleted.eng_id == eng_id,
                SectionCompleted.course_id == course_id,
                SectionCompleted.trainer_id == trainer_id
            )
            .all()
        )
        completed_section_id_set = {section["section_id"] for section in SectionCompletedSchema(many=True).dump(completed_section_query)}
        query = (
            ClassSection.query
            .filter(ClassSection.course_id == course_id, ClassSection.trainer_id == trainer_id)
            .all()
        )

        raw_sections = self.schema.dump(query)
        processed_sections = [
            {**section, "has_completed": section["section_id"] in completed_section_id_set}
            for section in raw_sections
        ]

        return {"msg": "class sections retrieved", "class_sections": processed_sections}, 200
