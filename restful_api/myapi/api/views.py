from flask import Blueprint, current_app, jsonify
from flask_restful import Api
from marshmallow import ValidationError
from myapi.api.resources import (
    EmployeeResource,
    EmployeeList,
    CourseList,
    CourseResource,
    CourseClassResource,
    ClassSectionResource,
    ClassSectionResourceList,
    EnrollResource,
    EnrollResourceList,
    EnrollByCourseResourceList,
    QuestionResource,
    QuestionResourceList,
)
from myapi.api.schemas import (
    EmployeeSchema,
    CourseSchema,
    CourseClassSchema,
    ClassSectionSchema,
    PrereqSchema,
    EnrollSchema,
    QuestionSchema
)
from myapi.extensions import apispec

blueprint = Blueprint("api", __name__, url_prefix="/api/v1")
api = Api(blueprint)


api.add_resource(EmployeeList, "/employees", endpoint="employees")
api.add_resource(EmployeeResource, "/employees/<int:employee_id>", endpoint="employee_by_id")
api.add_resource(EnrollResource, "/enroll/<int:eng_id>&<int:course_id>&<int:trainer_id>", endpoint="enrollment")
api.add_resource(EnrollResourceList, "/enrollments/<int:eng_id>", endpoint="enrollments")
api.add_resource(EnrollByCourseResourceList, "/enrollments_by_course/<int:course_id>", endpoint="enrollments_by_course")
api.add_resource(CourseList, "/courses/<int:eng_id>", endpoint="courses")
api.add_resource(CourseResource, "/course/<int:course_id>", endpoint="course")
api.add_resource(CourseClassResource, "/course_class/<int:course_id>&<int:trainer_id>", endpoint="course_class")
api.add_resource(ClassSectionResource, "/class_section/<int:section_id>", endpoint="class_section")
api.add_resource(ClassSectionResourceList, "/class_sections/<int:course_id>", endpoint="class_sections_by_course")
api.add_resource(QuestionResource, "/question/<int:question_id>", endpoint="question")
api.add_resource(QuestionResourceList, "/questions/<int:section_id>", endpoint="questions")


@blueprint.before_app_first_request
def register_views():
    """Return json error for marshmallow validation errors."""
    apispec.spec.components.schema("EmployeeSchema", schema=EmployeeSchema)
    apispec.spec.components.schema("CourseSchema", schema=CourseSchema)
    apispec.spec.components.schema("CourseClassSchema", schema=CourseClassSchema)
    apispec.spec.components.schema("ClassSectionSchema", schema=ClassSectionSchema)
    apispec.spec.components.schema("EnrollSchema", schema=EnrollSchema)
    apispec.spec.components.schema("PrereqSchema", schema=PrereqSchema)
    apispec.spec.path(view=EmployeeResource, app=current_app)
    apispec.spec.path(view=EmployeeList, app=current_app)
    apispec.spec.path(view=EnrollResource, app=current_app)
    apispec.spec.path(view=EnrollResourceList, app=current_app)
    apispec.spec.path(view=EnrollByCourseResourceList, app=current_app)
    apispec.spec.path(view=CourseResource, app=current_app)
    apispec.spec.path(view=CourseClassResource, app=current_app)
    apispec.spec.path(view=ClassSectionResource, app=current_app)
    apispec.spec.path(view=QuestionResource, app=current_app)
    apispec.spec.path(view=QuestionResourceList, app=current_app)

@blueprint.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    """Return json error for marshmallow validation errors.
    This will avoid having to try/catch ValidationErrors in all endpoints, returning
    correct JSON response with associated HTTP 400 Status (https://tools.ietf.org/html/rfc7231#section-6.5.1)
    """
    return jsonify(e.messages), 400
