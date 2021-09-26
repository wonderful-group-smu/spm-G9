from flask import url_for

def test_add_course_trainer(client, db, course, admin_headers, employee):
    db.session.add(course)
    db.session.add(employee)
    db.session.commit()

    course_trainer_url = url_for('api.course_trainer')
    data = {"trainer_id": employee.id, "course_id": course.course_id}
    rep = client.post(course_trainer_url, json=data, headers=admin_headers)
    assert rep.status_code == 201, "Failed to add trainer to course"
  