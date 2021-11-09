# author: Phyo
from flask import url_for


def test_get_single_course_class(client, db, course_class, engineer_employee_headers):
    db.session.add(course_class)
    db.session.commit()

    # Find unavailable coures
    course_url = url_for('api.course_class', course_id=9999, trainer_id=9999)
    rep = client.get(course_url, headers=engineer_employee_headers)
    assert rep.status_code == 404

    # Get course class
    course_url = url_for('api.course_class', course_id=course_class.course_id, trainer_id=course_class.trainer_id)
    rep = client.get(course_url, headers=engineer_employee_headers)

    assert rep.status_code == 200
    assert rep.get_json()['course_class']['course_id'] == course_class.course_id, "Incorrect course id retrieved"
    assert rep.get_json()['course_class']['trainer_id'] == course_class.trainer_id, "Incorrect trainer id retrieved"

    assert rep.get_json()['course_class']['course']['name'] == course_class.course.name, "Incorrect course name retrieved"
    assert rep.get_json()['course_class']['trainer']['name'] == course_class.trainer.name, "Incorrect trainer name retrieved"
    assert rep.get_json()['course_class']['class_size'] == course_class.class_size, "Incorrect class size retrieved"

    # Test GET num_slots_remaining after adding one enrollment
    enrollment_url = url_for("api.enrollment", eng_id=0, course_id=course_class.course_id, trainer_id=course_class.trainer_id)
    request_json = {
        'eng_id': 0,
        'course_id': course_class.course_id,
        'trainer_id': course_class.trainer_id,
    }
    client.post(enrollment_url, json=request_json, headers=engineer_employee_headers)

    # get course_url again
    course_url = url_for('api.course_class', course_id=course_class.course_id, trainer_id=course_class.trainer_id)
    rep = client.get(course_url, headers=engineer_employee_headers)

    assert rep.get_json()['num_slots_remaining'] == course_class.class_size - 1, "Incorrect num slots retrieved"
    assert len(rep.get_json()['enrollments']) == 1, "Incorrect num of enrollments retrieved"
    assert rep.get_json()['enrollments'][0]['eng_id'] == 0, "Incorrect engineer enrolled"


def test_create_course_class(client, db, course, employee, engineer_employee_headers):
    db.session.add_all([course, employee])
    db.session.commit()

    # You need any integer for course_id, trainer_id
    course_url = url_for('api.course_class', course_id=0, trainer_id=0)

    request_json = {'course_id': course.course_id, 'trainer_id': employee.id}
    rep = client.post(course_url, json=request_json, headers=engineer_employee_headers)
    assert rep.status_code == 201, "Incorrect status code retrieved"
    assert rep.get_json()['course_class']['course_id'] == course.course_id, "Incorrect course id retrieved"

    # Create course failure due to missing attributes
    request_json = {'course_id': course.course_id}
    rep = client.post(course_url, json=request_json, headers=engineer_employee_headers)
    assert rep.status_code == 400, "Incorrect status code retrieved"


def test_delete_course_class(client, db, course_class, engineer_employee_headers):
    db.session.add(course_class)
    db.session.commit()

    # Delete course success
    course_url = url_for('api.course', course_id=course_class.course_id, trainer_id=course_class.trainer_id)
    rep = client.delete(course_url, headers=engineer_employee_headers)
    assert rep.status_code == 204, "Incorrect response code"

    # Delete course failure
    course_url = url_for('api.course', course_id=9999, trainer_id=9999)
    rep = client.delete(course_url, headers=engineer_employee_headers)
    assert rep.status_code == 404, "Incorrect response code"


def test_get_course_classes_by_course(client, db, course_class, course_class_factory, engineer_employee_headers):
    course_class_one = course_class
    db.session.add(course_class_one)
    db.session.commit()

    # Get course classes by course success
    course_url = url_for('api.course_classes_by_course', course_id=course_class_one.course_id)
    rep = client.get(course_url, headers=engineer_employee_headers)
    assert rep.status_code == 200, "Incorrect response code"
    assert rep.get_json()['course_classes'][0]['course_id'] == course_class_one.course_id, "Incorrect course id retrieved"

    course_class_two = course_class_factory(course=course_class.course)
    db.session.add(course_class_two)
    db.session.commit()
    # Get course classes after adding another one
    course_url = url_for('api.course_classes_by_course', course_id=course_class_one.course_id)
    rep = client.get(course_url, headers=engineer_employee_headers)
    assert rep.status_code == 200, "Incorrect response code"
    assert len(rep.get_json()['course_classes']) == 2, "Incorrect number of course classes"

    # Get course classes by course failure
    course_url = url_for('api.course_classes_by_course', course_id=9999)
    rep = client.get(course_url, headers=engineer_employee_headers)
    assert rep.status_code == 200, "Incorrect response code"
    assert len(rep.get_json()['course_classes']) == 0, "Incorrect number of course classes"
