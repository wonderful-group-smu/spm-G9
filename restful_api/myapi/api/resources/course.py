
from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from myapi.api.schemas import CourseSchema, CourseStatusSchema, EnrollSchema
from myapi.extensions import db
from myapi.models import Course, Prereq, Enroll


class CourseResource(Resource):
    """Get, Create one course

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
                    example: course retrieved
                  course: CourseSchema

    post:
      tags:
        - api
      requestBody:
        content:
          application/json:
            schema:
              CourseSchema
      responses:
        201:
          content:
            application/json:
              schema:
                type: object
                properties:
                  msg:
                    type: string
                    example: course created
                  course: CourseSchema

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

    def get(self, course_id):
        try:
          query = (
            Course.query
            .join(Prereq, isouter=True)
            .filter(Course.course_id == course_id)
            .one()
          )
        except Exception as error:
          if "No row was found" in str(error):
            return {"msg": "not found"}, 404
          else:
            raise error

        schema = CourseSchema()
        course = schema.dump(query)
        return {"msg": "course retrieved", "course": schema.dump(course)}, 200

    # Removing 'course_id' will raise error when parsing
    def post(self, course_id):
        schema = CourseSchema()
        course = schema.load(request.json)
        try:
          db.session.add(course)
          db.session.commit()
        except AssertionError as error:
          if "blank-out primary key" in str(error):
            return {"msg": "duplicate object"}, 400
          else:
            raise error

        return {"msg": "course created", "course": schema.dump(course)}, 201

    def delete(self, course_id):
        course = Course.query.get_or_404(course_id)
        db.session.delete(course)
        db.session.commit()

        return {"msg": "course deleted"}, 204



class CourseList(Resource):
    """Get all courses, with boolean indicating if engineer is eligible / enrolled

    ---
    get:
      tags:
        - api
      parameters:
        - name: eng_id
          in: query
          type: integer
          required: true
          description: engineer id
      responses:
        400:
          description: no engineer id provided
        200:
          content:
            application/json:
              schema:
                type: object
                properties:
                  msg:
                    type: string
                    example: all courses retrieved
                  result: CourseSchema
            
    """

    method_decorators = [jwt_required()]

    def get(self, eng_id):
      
      all_courses = Course.query.all()
    
      official_enrolled_courses = Enroll.query.filter(
                  Enroll.eng_id==eng_id,
                  Enroll.is_official == True
                  ).all()
      self_enrolled_courses = SelfEnroll.query.filter(
                  Enroll.eng_id==eng_id,
                  Enroll.is_official == False
                  ).all()

      course_status_schema = CourseStatusSchema(many=True)
      enroll_schema = EnrollSchema(many=True)
      
      enrolled_courses = enroll_schema.dump(official_enrolled_courses) + enroll_schema.dump(self_enrolled_courses)

      courses = self.validate_prereqs(all_courses, enrolled_courses)
      
      return {"msg": "all courses retrieved", "results": course_status_schema.dump(courses)}, 200

    @staticmethod
    def validate_prereqs(courses, completed_courses):
      # convert completed courses to dict for O(1) check
      fmted_enrolled_courses = {k['course_id']:k['has_passed'] 
                                for k in completed_courses}
      
      # Check the pre-reqs to see if they are done
      for course in courses:
          completed = 0
          for preq in course.prereqs:
              completed += fmted_enrolled_courses.get(preq.prereq_id, 0)
              
          course.is_eligible = completed == len(course.prereqs) 

          if course.course_id in fmted_enrolled_courses:
              # only create the attribute if it is inside
              course.has_passed = fmted_enrolled_courses.get(course.course_id, None)
          
      return courses
   
    