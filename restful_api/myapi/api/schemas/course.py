from myapi.models import Course
from myapi.extensions import ma, db

from .prereq import PrereqSchema
from .course_trainer import CourseTrainerSchema

class CourseSchema(ma.SQLAlchemyAutoSchema):

    prereqs = ma.List(ma.Nested(PrereqSchema), required=False)
    course_trainers = ma.List(ma.Nested(CourseTrainerSchema), required=False)
    
    class Meta:
        model = Course
        sqla_session = db.session
        load_instance = True