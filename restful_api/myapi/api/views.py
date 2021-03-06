from flask import Blueprint, current_app, jsonify
from flask_restful import Api
from marshmallow import ValidationError
from myapi.api.resources import (
    EmployeeResource,
    EmployeeList,
    CourseStatusList,
    CourseResource,
    CourseResourceList,
    CourseClassResource,
    CourseClassResourceList,
    CourseEligibleEngineerList,
    ClassSectionResource,
    ClassSectionResourceList,
    EnrollResource,
    EnrollResourceList,
    EnrollByEngineerSelfResourceList,
    EnrollByCourseResourceList,
    ProgressResource,
    ProgressListResource,
    QuizResource,
    QuizResourceList,
    QuizAttemptResource
)
from myapi.api.schemas import (
    EmployeeSchema,
    CourseSchema,
    CourseClassSchema,
    ClassSectionSchema,
    ClassSectionStatusSchema,
    PrereqSchema,
    EnrollSchema,
    QuizSchema,
    QuestionSchema,
    QuestionOptionSchema,
    QuizAttemptSchema
)
from myapi.extensions import apispec

blueprint = Blueprint("api", __name__, url_prefix="/api/v1")
api = Api(blueprint)


api.add_resource(EmployeeList, "/employees", endpoint="employees")
api.add_resource(EmployeeResource, "/employees/<int:employee_id>", endpoint="employee_by_id")
api.add_resource(EnrollResource, "/enroll/<int:eng_id>&<int:course_id>&<int:trainer_id>", endpoint="enrollment")
api.add_resource(EnrollResourceList, "/enrollments/<int:eng_id>", endpoint="enrollments")
api.add_resource(EnrollByEngineerSelfResourceList, "/self_enrollments", endpoint="self_enrollments")
api.add_resource(EnrollByCourseResourceList, "/enrollments_by_course/<int:course_id>", endpoint="enrollments_by_course")
api.add_resource(CourseStatusList, "/courses/<int:eng_id>", endpoint="courses_status")
api.add_resource(CourseResourceList, "/courses/all", endpoint="courses")
api.add_resource(CourseResource, "/course/<int:course_id>", endpoint="course")
api.add_resource(CourseClassResource, "/course_class/<int:course_id>&<int:trainer_id>", endpoint="course_class")
api.add_resource(CourseClassResourceList, "/course_classes/<int:course_id>", endpoint="course_classes_by_course")
api.add_resource(CourseEligibleEngineerList, "/course_eligible_engineers/<int:course_id>", endpoint="course_eligible_engineers")
api.add_resource(ClassSectionResource, "/class_section/<int:section_id>", endpoint="class_section")
api.add_resource(ClassSectionResourceList, "/class_sections/<int:course_id>&<int:trainer_id>&<int:eng_id>", endpoint="class_sections_by_course")
api.add_resource(ProgressResource, "/course_progress/<int:course_id>&<int:trainer_id>&<int:eng_id>", endpoint="course_progress")
api.add_resource(ProgressListResource, "/overall_progress/<int:eng_id>", endpoint="overall_progress")
api.add_resource(QuizResource, "/quiz/<int:course_id>&<int:section_id>&<int:trainer_id>", endpoint="quiz")
api.add_resource(QuizResourceList, "/quizzes/<int:course_id>&<int:trainer_id>", endpoint="quizzes")
api.add_resource(QuizAttemptResource, "/quiz_attempt/<int:course_id>&<int:section_id>&<int:trainer_id>&<int:eng_id>", endpoint="quiz_attempt")


@blueprint.before_app_first_request
def register_views():
    """Return json error for marshmallow validation errors."""
    apispec.spec.components.schema("EmployeeSchema", schema=EmployeeSchema)
    apispec.spec.components.schema("CourseSchema", schema=CourseSchema)
    apispec.spec.components.schema("CourseClassSchema", schema=CourseClassSchema)
    apispec.spec.components.schema("ClassSectionSchema", schema=ClassSectionSchema)
    apispec.spec.components.schema("ClassSectionStatusSchema", schema=ClassSectionStatusSchema)
    apispec.spec.components.schema("EnrollSchema", schema=EnrollSchema)
    apispec.spec.components.schema("PrereqSchema", schema=PrereqSchema)
    apispec.spec.components.schema("QuizSchema", schema=QuizSchema)
    apispec.spec.components.schema("QuestionSchema", schema=QuestionSchema)
    apispec.spec.components.schema("QuestionOptionSchema", schema=QuestionOptionSchema)
    apispec.spec.components.schema("QuizAttemptSchema", schema=QuizAttemptSchema)
    apispec.spec.path(view=EmployeeResource, app=current_app)
    apispec.spec.path(view=EmployeeList, app=current_app)
    apispec.spec.path(view=EnrollResource, app=current_app)
    apispec.spec.path(view=EnrollResourceList, app=current_app)
    apispec.spec.path(view=EnrollByEngineerSelfResourceList, app=current_app)
    apispec.spec.path(view=EnrollByCourseResourceList, app=current_app)
    apispec.spec.path(view=CourseStatusList, app=current_app)
    apispec.spec.path(view=CourseResourceList, app=current_app)
    apispec.spec.path(view=CourseResource, app=current_app)
    apispec.spec.path(view=CourseClassResource, app=current_app)
    apispec.spec.path(view=CourseClassResourceList, app=current_app)
    apispec.spec.path(view=CourseEligibleEngineerList, app=current_app)
    apispec.spec.path(view=ClassSectionResource, app=current_app)
    apispec.spec.path(view=ClassSectionResourceList, app=current_app)
    apispec.spec.path(view=ProgressResource, app=current_app)
    apispec.spec.path(view=ProgressListResource, app=current_app)
    apispec.spec.path(view=QuizResource, app=current_app)
    apispec.spec.path(view=QuizResourceList, app=current_app)
    apispec.spec.path(view=QuizAttemptResource, app=current_app)


@blueprint.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    """Return json error for marshmallow validation errors.
    This will avoid having to try/catch ValidationErrors in all endpoints, returning
    correct JSON response with associated HTTP 400 Status (https://tools.ietf.org/html/rfc7231#section-6.5.1)
    """
    return jsonify(e.messages), 400
