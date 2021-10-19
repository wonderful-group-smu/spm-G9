from myapi.models import QuestionOption
from myapi.extensions import ma, db


class QuestionOptionSchema(ma.SQLAlchemyAutoSchema):

    course_id = ma.Int()
    trainer_id = ma.Int()
    section_id = ma.Int()
    quiz_id = ma.Int()
    question_id = ma.Int()
    option_id = ma.Int(required=False)

    class Meta:
        model = QuestionOption
        sqla_session = db.session
        load_instance = True
