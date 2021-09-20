from myapi.models import Employee
from myapi.extensions import ma, db


class EmployeeSchema(ma.SQLAlchemyAutoSchema):

    id = ma.Int(dump_only=True)
    name = ma.String(dump_only=True)
    
    class Meta:
        model = Employee
        sqla_session = db.session
        load_instance = True