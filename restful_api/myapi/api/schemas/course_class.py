from myapi.models.course_class import CourseClass
from myapi.models import CourseClass
from myapi.extensions import ma, db


class CourseClassSchema(ma.SQLAlchemyAutoSchema):

    course_id = ma.Int()
    trainer_id = ma.Int()
    
    class Meta:
        model = CourseClass
        sqla_session = db.session
        load_instance = True