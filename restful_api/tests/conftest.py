import json
import pytest
from dotenv import load_dotenv
from myapi.models import User
from myapi.app import create_app
from myapi.extensions import db as _db
from pytest_factoryboy import register

from tests.factories import (
    UserFactory,
    EmployeeFactory,
    CourseFactory,
    PrereqFactory,
    OfficialEnrollFactory,
    CourseTrainerFactory
)

register(UserFactory)
register(EmployeeFactory)
register(OfficialEnrollFactory)
register(EmployeeFactory)
register(PrereqFactory)
register(CourseFactory)
register(CourseTrainerFactory)

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
def admin_user(db):
    user = User(
        username='admin',
        email='admin@admin.com',
        password='admin'
    )

    db.session.add(user)
    db.session.commit()

    return user


@pytest.fixture
def admin_headers(admin_user, client):
    data = {
        'username': admin_user.username,
        'password': 'admin'
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
def admin_refresh_headers(admin_user, client):
    data = {
        'username': admin_user.username,
        'password': 'admin'
    }
    rep = client.post(
        '/auth/login',
        data=json.dumps(data),
        headers={'content-type': 'application/json'}
    )

    tokens = json.loads(rep.get_data(as_text=True))
    return {
        'content-type': 'application/json',
        'authorization': 'Bearer %s' % tokens['refresh_token']
    }
    

@pytest.fixture
def test_user(db):
    user = User(
        username='testuser',
        email='testuser@mail.com',
        password='testpassword'
    )

    db.session.add(user)
    db.session.commit()

    return user


@pytest.fixture
def test_user_headers(client, test_user):
    data = {
        'username': 'testuser',
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