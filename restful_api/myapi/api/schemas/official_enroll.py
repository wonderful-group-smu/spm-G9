from myapi.models import OfficialEnroll
from myapi.extensions import ma, db


class OfficialEnrollSchema(ma.SQLAlchemyAutoSchema):
    
    eng_id = ma.Int()
    course_id = ma.Int()
    start_date = ma.Date()
    end_date = ma.Date()
    has_passed = ma.Boolean()
    
    class Meta:
        model = OfficialEnroll
        sqla_session = db.session
        load_instance = True