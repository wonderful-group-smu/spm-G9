from myapi.models import Enroll
from myapi.extensions import ma, db
from .course import CourseSchema
from .employee import EmployeeSchema


class EnrollSchema(ma.SQLAlchemyAutoSchema):

    eng_id = ma.Int()
    course_id = ma.Int()
    trainer_id = ma.Int()
    has_passed = ma.Boolean()
    is_official = ma.Boolean()
    is_approved = ma.Boolean(default=None)
    created_timestamp = ma.Int()

    course = ma.Nested(CourseSchema, required=False)
    trainer = ma.Nested(EmployeeSchema, required=False)
    eng = ma.Nested(EmployeeSchema, required=False)

    class Meta:
        model = Enroll
        sqla_session = db.session
        load_instance = True
