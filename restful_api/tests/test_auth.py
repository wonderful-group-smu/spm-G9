import jwt
import json


def test_login(
    client,
    db,
    employee_factory
):
    employee = employee_factory(name="testengineer", password="testpassword")
    db.session.add(employee)
    db.session.commit()

    request_json = {'name': employee.name, 'password': "testpassword"}
    rep = client.post('/auth/login', json=request_json)

    assert rep.status_code == 200, "Incorrect response when credentials are true"
    rep_json = rep.get_json()
    assert "access_token" in rep_json
    assert "refresh_token" in rep_json
    decoded_token = jwt.decode(rep_json["access_token"], options={"verify_signature": False})
    assert "user_type" in decoded_token
    assert decoded_token["user_type"] == employee.user_type

    request_json = {'name': employee.name, 'password': "wrong"}
    rep = client.post('/auth/login', json=request_json)

    assert rep.status_code == 400
    assert rep.get_json()["msg"] == "Bad credentials", "Incorrect response when wrong password given"


def test_refresh(client, engineer_employee):
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
    refresh_headers = {
        'content-type': 'application/json',
        'authorization': 'Bearer %s' % tokens['refresh_token']
    }
    rep = client.post('/auth/refresh', headers=refresh_headers)
    assert rep.status_code == 200, "Incorrect response code"
    assert "access_token" in rep.get_json()
