from flask import request, jsonify, Blueprint, current_app as app
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_current_user,
)

from myapi.models import Employee
from myapi.extensions import pwd_context, jwt, apispec

from datetime import timedelta

blueprint = Blueprint("auth", __name__, url_prefix="/auth")


@blueprint.route("/login", methods=["POST"])
def login():
    """Authenticate employee and return tokens

    ---
    post:
      tags:
        - auth
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
                  example: myuser
                  required: true
                password:
                  type: string
                  example: P4$$w0rd!
                  required: true
      responses:
        200:
          content:
            application/json:
              schema:
                type: object
                properties:
                  access_token:
                    type: string
                    example: myaccesstoken
                  refresh_token:
                    type: string
                    example: myrefreshtoken
        400:
          description: bad request
      security: []
    """
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    name = request.json.get("name", None)
    password = request.json.get("password", None)
    if not name or not password:
        return jsonify({"msg": "Missing username or password"}), 400

    employee = Employee.query.filter_by(name=name).first()
    if employee is None or not pwd_context.verify(password, employee.password):
        return jsonify({"msg": "Bad credentials"}), 400

    access_token = create_access_token(
        identity=employee.id,
        expires_delta=timedelta(days=7),
        additional_claims={'user_type': employee.user_type}
    )
    refresh_token = create_refresh_token(identity=employee.id)

    ret = {"access_token": access_token, "refresh_token": refresh_token}
    return jsonify(ret), 200


@blueprint.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    """Get an access token from a refresh token

    ---
    post:
      tags:
        - auth
      parameters:
        - in: header
          name: Authorization
          required: true
          description: valid refresh token
      responses:
        200:
          content:
            application/json:
              schema:
                type: object
                properties:
                  access_token:
                    type: string
                    example: myaccesstoken
        400:
          description: bad request
        401:
          description: unauthorized
    """
    employee = get_current_user()
    access_token = create_access_token(
        identity=employee.id,
        expires_delta=timedelta(days=7),
        additional_claims={'user_type': employee.user_type}
    )
    ret = {"access_token": access_token}
    return jsonify(ret), 200


@jwt.user_lookup_loader
def user_loader_callback(jwt_headers, jwt_payload):
    identity = jwt_payload["sub"]
    return Employee.query.get(identity)


@blueprint.before_app_first_request
def register_views():
    apispec.spec.path(view=login, app=app)
    apispec.spec.path(view=refresh, app=app)
