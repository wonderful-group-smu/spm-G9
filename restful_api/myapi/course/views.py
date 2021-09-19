from flask import Blueprint, current_app, jsonify
from flask_restful import Api
from marshmallow import ValidationError
from myapi.extensions import apispec
from myapi.course.resources import CourseList
from myapi.course.schemas import CourseSchema


blueprint = Blueprint("course", __name__, url_prefix="/course/v1")
api = Api(blueprint)


api.add_resource(CourseList, "/courses", endpoint="courses")

@blueprint.before_app_first_request
def register_views():
    apispec.spec.components.schema("CourseSchema", schema=CourseSchema)
    apispec.spec.path(view=CourseList, app=current_app)


@blueprint.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    """Return json error for marshmallow validation errors.

    This will avoid having to try/catch ValidationErrors in all endpoints, returning
    correct JSON response with associated HTTP 400 Status (https://tools.ietf.org/html/rfc7231#section-6.5.1)
    """
    return jsonify(e.messages), 400
