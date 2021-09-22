from flask import Blueprint, current_app, jsonify
from flask_restful import Api
from marshmallow import ValidationError
from myapi.api.resources import (CourseList, EmployeeList, EmployeeResource,
                                 OfficialEnrollResource,
                                 OfficialEnrollResourceList, UserList,
                                 UserResource)
from myapi.api.schemas import (CourseSchema, EmployeeSchema,
                               OfficialEnrollSchema, UserSchema)
from myapi.extensions import apispec

blueprint = Blueprint("api", __name__, url_prefix="/api/v1")
api = Api(blueprint)


api.add_resource(UserResource, "/users/<int:user_id>", endpoint="user_by_id")
api.add_resource(UserList, "/users", endpoint="users")
api.add_resource(EmployeeList, "/employees", endpoint="employees")
api.add_resource(EmployeeResource, "/employees/<int:employee_id>", endpoint="employee_by_id")
api.add_resource(OfficialEnrollResource, "/official_enroll/<int:employee_id>&<int:course_id>", endpoint="official_enroll_by_ids")
api.add_resource(OfficialEnrollResourceList, "/official_enroll", endpoint="official_enroll")
api.add_resource(CourseList, "/courses", endpoint="courses")


@blueprint.before_app_first_request
def register_views():
    apispec.spec.components.schema("UserSchema", schema=UserSchema)
    apispec.spec.components.schema("EmployeeSchema", schema=EmployeeSchema)
    apispec.spec.components.schema("CourseSchema", schema=CourseSchema)
    apispec.spec.components.schema("OfficialEnrollSchema", schema=OfficialEnrollSchema)
    apispec.spec.path(view=UserResource, app=current_app)
    apispec.spec.path(view=UserList, app=current_app)
    apispec.spec.path(view=EmployeeResource, app=current_app)
    apispec.spec.path(view=EmployeeList, app=current_app)
    apispec.spec.path(view=OfficialEnrollResource, app=current_app)
    apispec.spec.path(view=OfficialEnrollResourceList, app=current_app)
    apispec.spec.path(view=CourseList, app=current_app)

@blueprint.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    """Return json error for marshmallow validation errors.

    This will avoid having to try/catch ValidationErrors in all endpoints, returning
    correct JSON response with associated HTTP 400 Status (https://tools.ietf.org/html/rfc7231#section-6.5.1)
    """
    return jsonify(e.messages), 400
