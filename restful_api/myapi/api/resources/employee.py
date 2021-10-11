from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from myapi.api.schemas import EmployeeSchema
from myapi.commons.pagination import paginate
from myapi.extensions import db
from myapi.models import Employee


class EmployeeResource(Resource):
    """single object Employee resource
    ---
    get:
      tags:
        - api
      responses:
        200:
          content:
            application/json:
              schema:
                allOf:
                  - $ref: '#/components/schemas/PaginatedResult'
                  - type: object
                    properties:
                      results:
                        type: array
                        items:
                          $ref: '#/components/schemas/EmployeeSchema'
    """

    method_decorators = [jwt_required()]

    def get(self, employee_id):
        schema = EmployeeSchema()
        employee = Employee.query.get_or_404(employee_id)
        return {"employee": schema.dump(employee)}


class EmployeeList(Resource):
    """Creation and get_all

    ---
    get:
      tags:
        - api
      responses:
        200:
          content:
            application/json:
              schema:
                allOf:
                  - $ref: '#/components/schemas/PaginatedResult'
                  - type: object
                    properties:
                      results:
                        type: array
                        items:
                          $ref: '#/components/schemas/EmployeeSchema'
    post:
      tags:
        - api
      requestBody:
        content:
          application/json:
            schema:
              EmployeeSchema
      responses:
        201:
          content:
            application/json:
              schema:
                type: object
                properties:
                  msg:
                    type: string
                    example: Employee created
                  employee: EmployeeSchema
    """

    method_decorators = [jwt_required()]

    def get(self):
        schema = EmployeeSchema(many=True)
        query = Employee.query
        return paginate(query, schema)

    def post(self):
        schema = EmployeeSchema()
        employee = schema.load(request.json)

        db.session.add(employee)
        db.session.commit()

        return {"msg": "employee created", "employee": schema.dump(employee)}, 201
