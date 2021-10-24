from myapi.models import Question
from myapi.extensions import ma, db
from .question_option import QuestionOptionSchema


class QuestionSchema(ma.SQLAlchemyAutoSchema):

    course_id = ma.Int(required=False)
    trainer_id = ma.Int(required=False)
    section_id = ma.Int(required=False)
    quiz_id = ma.Int()
    question_id = ma.Int(required=False)
    question_options = ma.List(ma.Nested(QuestionOptionSchema), required=False)

    class Meta:
        model = Question
        sqla_session = db.session
        load_instance = True
