from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from myapi.api.schemas import CourseClassSchema
from myapi.extensions import db
from myapi.models import CourseClass, Employee, Course

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
                  course: CourseClassSchema
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
                  course: CourseClassSchema

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

    return {"msg": "course class retrieved", "course_class": self.schema.dump(query)}, 200
    
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