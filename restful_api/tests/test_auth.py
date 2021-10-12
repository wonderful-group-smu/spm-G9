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
    assert "access_token" in rep.get_json()
    assert "refresh_token" in rep.get_json()

    request_json = {'name': employee.name, 'password': "wrong"}
    rep = client.post('/auth/login', json=request_json)

    assert rep.status_code == 400
    assert rep.get_json()["msg"] == "Bad credentials", "Incorrect response when wrong password given"
