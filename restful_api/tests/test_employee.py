# author: Joel (primary)
from flask import url_for


def test_get_employee(client, db, employee, engineer_employee_headers):
    # test 404
    employee_url = url_for('api.employee_by_id', employee_id="100000")
    rep = client.get(employee_url, headers=engineer_employee_headers)
    assert rep.status_code == 404

    db.session.add(employee)
    db.session.commit()

    # test get_user
    employee_url = url_for('api.employee_by_id', employee_id=employee.id)
    rep = client.get(employee_url, headers=engineer_employee_headers)
    assert rep.status_code == 200

    data = rep.get_json()["employee"]
    assert data["id"] == employee.id
    assert data["name"] == employee.name
    assert data["user_type"] == employee.user_type


def test_get_all_employee(client, db, employee_factory, engineer_employee_headers):
    employees_url = url_for('api.employees')
    employees = employee_factory.create_batch(3)

    db.session.add_all(employees)
    db.session.commit()

    rep = client.get(employees_url, headers=engineer_employee_headers)
    assert rep.status_code == 200

    results = rep.get_json()
    for employee in employees:
        assert any(e["id"] == employee.id for e in results["results"])
