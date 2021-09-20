from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource
from myapi.api.schemas import EngineerSchema
from myapi.commons.pagination import paginate
from myapi.extensions import db
from myapi.models import Engineer

class EngineerResource(Resource):
    """single object engineer resource
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
                          $ref: '#/components/schemas/EngineerSchema'
    """

    method_decorators = [jwt_required()]

    def get(self, engineer_id):
        schema = EngineerSchema()
        engineer = Engineer.query.get_or_404(engineer_id)
        return {"engineer": schema.dump(engineer)}

class EngineerList(Resource):
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
                          $ref: '#/components/schemas/EngineerSchema'
    post:
      tags:
        - api
      requestBody:
        content:
          application/json:
            schema:
              EngineerSchema
      responses:
        201:
          content:
            application/json:
              schema:
                type: object
                properties:
                  msg:
                    type: string
                    example: engineer created
                  user: EngineerSchema
    """

    method_decorators = [jwt_required()]

    def get(self):
        schema = EngineerSchema(many=True)
        query = Engineer.query
        return paginate(query, schema)

    def post(self):
        schema = EngineerSchema()
        engineer = schema.load(request.json)

        db.session.add(engineer)
        db.session.commit()

        return {"msg": "engineer created", "engineer": schema.dump(engineer)}, 201
