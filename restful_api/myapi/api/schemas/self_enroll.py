from myapi.models import SelfEnroll
from myapi.extensions import ma, db


class SelfEnrollSchema(ma.SQLAlchemyAutoSchema):
    
    eng_id = ma.Int(dump_only=True)
    course_id = ma.Int(dump_only=True)

    class Meta:
        model = SelfEnroll
        sqla_session = db.session
        load_instance = True