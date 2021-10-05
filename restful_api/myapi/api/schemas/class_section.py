from myapi.models import ClassSection
from myapi.extensions import ma, db
from .course_class import CourseClassSchema


class ClassSectionSchema(ma.SQLAlchemyAutoSchema):

    course_id = ma.Int()
    trainer_id = ma.Int()
    section_id = ma.Int(required=False)
    course_class = ma.Nested(CourseClassSchema, required=False)

    class Meta:
        model = ClassSection
        sqla_session = db.session
        load_instance = True
