from myapi.models import CourseClass
from myapi.extensions import ma, db
from .course import CourseSchema
from .employee import EmployeeSchema


class CourseClassSchema(ma.SQLAlchemyAutoSchema):

    course_id = ma.Int()
    trainer_id = ma.Int()

    course = ma.Nested(CourseSchema, required=False)
    trainer = ma.Nested(EmployeeSchema, required=False)

    class Meta:
        model = CourseClass
        sqla_session = db.session
        load_instance = True
