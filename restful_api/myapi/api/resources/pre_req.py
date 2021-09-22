from myapi.api.schemas import PreReqSchema
from myapi.models import PreReq

# -------
# TODO: This is a work in progress, blocked till further notice
# -------
def validate_prereqs(courses):
    prereqs = PreReq.query.all()
    prereq_schema = PreReqSchema(many=True)
    prereqs = prereq_schema.dumps(prereqs).data
    
    for course in courses:
          for prereq in prereqs:
              if prereq['course_id'] == course['course_id']:
                  course['prereqs'].append(prereq)
    
    