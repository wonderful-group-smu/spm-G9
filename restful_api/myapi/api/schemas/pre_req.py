from myapi.models import PreReq
from myapi.extensions import ma, db


class PreReqSchema(ma.SQLAlchemyAutoSchema):
    
    class Meta:
        model = PreReq
        sqla_session = db.session
        load_instance = True