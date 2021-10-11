from flask import url_for

from myapi.models.prereq import Prereq


def test_create_single_course(client, engineer_employee_headers):
    course_url = url_for('api.course', course_id=0)

    # Create course failure due to non-nullable fields
    rep = client.post(course_url, json={'course_id': 1}, headers=engineer_employee_headers)
    assert rep.status_code == 400, "Incorrect response code"

    # Create course success
    # You need any integer for course_id
    request_json = {'course_id': 0, 'name': 'Test Course', 'description': 'Test description'}
    rep = client.post(course_url, json=request_json, headers=engineer_employee_headers)
    assert rep.status_code == 201, "Incorrect response code"


def test_get_single_course_with_prereq(client, db, course_factory, engineer_employee_headers, prereq_factory):
    courses = course_factory.create_batch(3)

    db.session.add_all(courses)
    db.session.commit()

    # Find unavailable coures
    course_url = url_for('api.course', course_id=9999)
    rep = client.get(course_url, headers=engineer_employee_headers)
    assert rep.status_code == 404

    # Get course without prereqs
    course_url = url_for('api.course', course_id=courses[0].course_id)
    rep = client.get(course_url, headers=engineer_employee_headers)

    assert rep.status_code == 200
    assert rep.get_json()['course']['name'] == courses[0].name, "Incorrect course retrieved"

    # Add prereq to second course
    prereq_one = prereq_factory(current_course=courses[1], prereq_course=courses[0])
    db.session.add(prereq_one)
    db.session.commit()

    # Get course with prereq
    course_url = url_for('api.course', course_id=courses[1].course_id)
    rep = client.get(course_url, headers=engineer_employee_headers)

    assert rep.status_code == 200
    assert len(rep.get_json()['course']['prereqs']) == 1, "Incorrect number of course pre-requisites"


def test_delete_single_course(client, db, course, engineer_employee_headers):
    db.session.add(course)
    db.session.commit()

    # Delete course success
    course_url = url_for('api.course', course_id=course.course_id)
    rep = client.delete(course_url, headers=engineer_employee_headers)
    assert rep.status_code == 204, "Incorrect response code"

    # Delete course failure
    course_url = url_for('api.course', course_id=9999)
    rep = client.delete(course_url, headers=engineer_employee_headers)
    assert rep.status_code == 404, "Incorrect response code"


def test_delete_single_course_drop_cascade(
    client,
    db,
    course_factory,
    engineer_employee_headers,
    prereq_factory,
    employee
):
    """Tests if deleting a course drop-cascades foreign keys"""
    courses = course_factory.create_batch(2)
    prereq_one = prereq_factory(current_course=courses[0], prereq_course=courses[1])

    db.session.add_all(courses)
    db.session.add_all([employee, prereq_one])
    db.session.commit()

    assert db.session.query(Prereq.course_id).filter_by(course_id=courses[0].course_id).first() is not None

    # Delete course success
    course_url = url_for('api.course', course_id=courses[0].course_id)
    rep = client.delete(course_url, headers=engineer_employee_headers)
    assert rep.status_code == 204, "Incorrect response code"

    assert db.session.query(Prereq.course_id).filter_by(course_id=courses[0].course_id).first() is None, "Fail to delete cascade course prereq"


def test_get_eligible_courses(
    client,
    db,
    engineer_employee_headers,
    course_factory,
    employee,
    prereq_factory,
    enroll_factory,
):

    # Configurations for test
    num_courses = 4

    # ---------
    # NOTE: This test has 3 courses.
    # Course 0 is completed.
    # Course 1 is in progress, relies on course 0.
    # Course 2 is inactive, relies on course 0 and course 1.
    # Course 3 is inactive and has no prereqs.
    # ---------
    # Enroll Factory will generate enrollments, course and trainers etc.
    courses = course_factory.create_batch(num_courses)
    enrolment_one = enroll_factory(eng=employee, course=courses[0], has_passed=True)  # Completed
    enrolment_two = enroll_factory(eng=employee, course=courses[1])  # In progress

    # Add the pre-reqs to the courses
    #
    #  Course 0 -> Course 1
    #          \----->    \->  Course 2
    prereq_one = prereq_factory(current_course=courses[1], prereq_course=courses[0])
    prereq_two = prereq_factory(current_course=courses[2], prereq_course=courses[1])
    prereq_three = prereq_factory(current_course=courses[2], prereq_course=courses[0])

    db.session.add_all(courses)
    db.session.add_all([enrolment_one, enrolment_two])
    db.session.add_all([prereq_one, prereq_two, prereq_three])
    db.session.commit()

    # Get all courses
    course_url = url_for('api.courses', eng_id=employee.id)
    rep = client.get(course_url, headers=engineer_employee_headers)
    result = rep.get_json()['results']

    assert rep.status_code == 200
    assert len(result) == num_courses, "Incorrect number of courses"
    assert result[0]['isActive'] == False, "Incorrect active status for course 0"
    assert result[0]['isComplete'] == True, "Incorrect complete status for course 0"

    assert result[1]['isActive'] == True, "Incorrect active status for course 1"
    assert result[1]['isComplete'] == False, "Incorrect complete status for course 1"
    assert result[1]['isEligible'] == True, "Incorrect eligible status for course 1"

    assert result[2]['isActive'] == False, "Incorrect active status for course 2"
    assert result[2]['isComplete'] == False, "Incorrect complete status for course 2"
    assert result[2]['isEligible'] == False, "Incorrect eligible status for course 2"  # Engineer has not finished course 1

    assert result[3]['isActive'] == False, "Incorrect active status for course 3"
    assert result[3]['isComplete'] == False, "Incorrect complete status for course 3"
    assert result[3]['isEligible'] == True, "Incorrect eligible status for course 3"
