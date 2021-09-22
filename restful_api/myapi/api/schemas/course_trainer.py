from myapi.models.course_trainer import CourseTrainer
from myapi.models import CourseTrainer
from myapi.extensions import ma, db


class CourseTrainerSchema(ma.SQLAlchemyAutoSchema):
    
    course_id = ma.Int()
    trainer_id = ma.Int()

    class Meta:
        model = CourseTrainer
        sqla_session = db.session
        load_instance = True