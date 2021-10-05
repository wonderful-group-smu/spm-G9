from flask import url_for


def test_get_single_course_class(client, db, course_class, admin_headers):
    db.session.add(course_class)
    db.session.commit()

    # Find unavailable coures
    course_url = url_for('api.course_class', course_id=9999, trainer_id=9999)
    rep = client.get(course_url, headers=admin_headers)
    assert rep.status_code == 404

    # Get course class
    course_url = url_for('api.course_class', course_id=course_class.course_id, trainer_id=course_class.trainer_id)
    rep = client.get(course_url, headers=admin_headers)

    assert rep.status_code == 200
    assert rep.get_json()['course_class']['course_id'] == course_class.course_id, "Incorrect course id retrieved"
    assert rep.get_json()['course_class']['trainer_id'] == course_class.trainer_id, "Incorrect trainer id retrieved"

    assert rep.get_json()['course_class']['course']['name'] == course_class.course.name, "Incorrect course name retrieved"
    assert rep.get_json()['course_class']['trainer']['name'] == course_class.trainer.name, "Incorrect trainer name retrieved"


def test_create_course_class(client, db, course, employee, admin_headers):
    db.session.add_all([course, employee])
    db.session.commit()

    # You need any integer for course_id, trainer_id
    course_url = url_for('api.course_class', course_id=0, trainer_id=0)

    request_json = {'course_id': course.course_id, 'trainer_id': employee.id}
    rep = client.post(course_url, json=request_json, headers=admin_headers)
    assert rep.status_code == 201, "Incorrect status code retrieved"
    assert rep.get_json()['course_class']['course_id'] == course.course_id, "Incorrect course id retrieved"

    # Create course failure due to missing attributes
    request_json = {'course_id': course.course_id}
    rep = client.post(course_url, json=request_json, headers=admin_headers)
    assert rep.status_code == 400, "Incorrect status code retrieved"


def test_delete_course_class(client, db, course_class, admin_headers):
    db.session.add(course_class)
    db.session.commit()

    # Delete course success
    course_url = url_for('api.course', course_id=course_class.course_id, trainer_id=course_class.trainer_id)
    rep = client.delete(course_url, headers=admin_headers)
    assert rep.status_code == 204, "Incorrect response code"

    # Delete course failure
    course_url = url_for('api.course', course_id=9999, trainer_id=9999)
    rep = client.delete(course_url, headers=admin_headers)
    assert rep.status_code == 404, "Incorrect response code"
