from myapi.models import QuestionOption
from myapi.extensions import ma, db


class QuestionOptionSchema(ma.SQLAlchemyAutoSchema):

    course_id = ma.Int(required=False)
    trainer_id = ma.Int(required=False)
    section_id = ma.Int(required=False)
    question_id = ma.Int()
    option_id = ma.Int()

    class Meta:
        model = QuestionOption
        sqla_session = db.session
        load_instance = True
