from myapi.models import Course
from myapi.extensions import ma, db

from .prereq import PrereqSchema

class CourseSchema(ma.SQLAlchemyAutoSchema):

    prereqs = ma.List(ma.Nested(PrereqSchema), required=False)
    
    class Meta:
        model = Course
        sqla_session = db.session
        load_instance = True