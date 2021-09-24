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
    # print(completed_courses)
    fmted_completed_courses = {k['course_id']:1 for k in completed_courses}
    print(fmted_completed_courses)
    # Convert to dict for O(1) check
    prereqs = Prereq.query.all() 
    # Chose to query everything instead of using the MA schema to handle groupbys
    
    prereqs_dict = defaultdict(list)
    for preq in prereqs:
        prereqs_dict[preq.course_id].append(preq.prereq_id)
    
    # check if each course has prereqs
    for course in courses:
        completed = 0
        for cid in prereqs_dict[course['course_id']]:
            completed += fmted_completed_courses[cid]
            
        course['is_eligible'] = completed == len(prereqs_dict[course['course_id']])
            
    return courses
   