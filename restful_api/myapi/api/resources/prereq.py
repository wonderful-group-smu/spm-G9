from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from myapi.api.schemas import PrereqSchema
from myapi.models import Prereq
from myapi.extensions import db
from myapi.commons.pagination import paginate

# -------
# TODO: This is a work in progress, blocked till further notice
# -------
def validate_prereqs(courses):
    prereqs = Prereq.query.all()
    prereq_schema = PrereqSchema(many=True)
    prereqs = prereq_schema.dumps(prereqs).data
    
    for course in courses:
          for prereq in prereqs:
              if prereq['course_id'] == course['course_id']:
                  course['prereqs'].append(prereq)
