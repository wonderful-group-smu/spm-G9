from myapi.models import Employee
from myapi.extensions import ma, db


class EmployeeSchema(ma.SQLAlchemyAutoSchema):

    id = ma.Int(dump_only=True)
    name = ma.String()
    user_type = ma.String(required=False)
    password = ma.String(load_only=True, required=True)

    class Meta:
        model = Employee
        sqla_session = db.session
        load_instance = True
        exclude = ("_password",)
