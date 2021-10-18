from myapi.models import SectionCompleted
from myapi.extensions import ma, db


class SectionCompletedSchema(ma.SQLAlchemyAutoSchema):

    eng_id = ma.Int(required=True)
    section_id = ma.Int(required=True)
    course_id = ma.Int(required=True)
    trainer_id = ma.Int(required=True)

    class Meta:
        model = SectionCompleted
        sqla_session = db.session
        load_instance = True
