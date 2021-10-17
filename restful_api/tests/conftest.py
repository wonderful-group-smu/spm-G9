import json
import pytest
from dotenv import load_dotenv
from myapi.app import create_app
from myapi.extensions import db as _db
from pytest_factoryboy import register

from tests.factories import (
    EmployeeFactory,
    CourseFactory,
    PrereqFactory,
    EnrollFactory,
    CourseClassFactory,
    ClassSectionFactory,
    QuizFactory,
    QuestionFactory,
    QuestionOptionFactory
)

register(EmployeeFactory)
register(EnrollFactory)
register(PrereqFactory)
register(CourseFactory)
register(CourseClassFactory)
register(ClassSectionFactory)
register(QuizFactory)
register(QuestionFactory)
register(QuestionOptionFactory)


@pytest.fixture(scope="session")
def app():
    load_dotenv(".testenv")
    app = create_app(testing=True)
    return app


@pytest.fixture
def db(app):
    _db.app = app

    with app.app_context():
        _db.create_all()

    yield _db

    _db.session.close()
    _db.drop_all()


@pytest.fixture
def engineer_employee(db, employee_factory):
    employee = employee_factory(user_type="ENG", password="testpassword")

    db.session.add(employee)
    db.session.commit()

    return employee


@pytest.fixture
def engineer_employee_headers(engineer_employee, client):
    data = {
        'name': engineer_employee.name,
        'password': 'testpassword'
    }
    rep = client.post(
        '/auth/login',
        data=json.dumps(data),
        headers={'content-type': 'application/json'}
    )

    tokens = json.loads(rep.get_data(as_text=True))
    return {
        'content-type': 'application/json',
        'authorization': 'Bearer %s' % tokens['access_token']
    }


@pytest.fixture
def hr_employee(db, employee_factory):
    employee = employee_factory(user_type="HR", password="testpassword")

    db.session.add(employee)
    db.session.commit()

    return employee


@pytest.fixture
def hr_employee_headers(client, hr_employee):
    data = {
        'name': hr_employee.name,
        'password': 'testpassword'
    }
    rep = client.post(
        '/auth/login',
        data=json.dumps(data),
        headers={'content-type': 'application/json'}
    )

    tokens = json.loads(rep.get_data(as_text=True))
    return {
        'content-type': 'application/json',
        'authorization': 'Bearer %s' % tokens['access_token']
    }
