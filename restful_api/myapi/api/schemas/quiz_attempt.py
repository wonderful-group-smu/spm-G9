from myapi.models import QuizAttempt
from myapi.extensions import ma, db
from .answer import AnswerSchema


class QuizAttemptSchema(ma.SQLAlchemyAutoSchema):

    course_id = ma.Int()
    section_id = ma.Int()
    trainer_id = ma.Int()
    eng_id = ma.Int()
    answers = ma.List(ma.Nested(AnswerSchema), required=False)

    class Meta:
        model = QuizAttempt
        sqla_session = db.session
        load_instance = True
