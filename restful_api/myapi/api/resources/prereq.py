from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from myapi.api.schemas import PrereqSchema
from myapi.models import Prereq
from myapi.extensions import db
from myapi.commons.pagination import paginate
from collections import defaultdict

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
   