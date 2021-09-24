from flask import url_for
import pytest

def test_get_single_course_with_prereq(client, db, course_factory, admin_headers, prereq_factory):
    courses = course_factory.create_batch(3)

    db.session.add_all(courses)
    db.session.commit()

    # Find unavailable coures
    course_url = url_for('api.course', course_id=9999)
    rep = client.get(course_url, headers=admin_headers)
    assert rep.status_code == 404

    # Get course without prereqs
    course_url = url_for('api.course', course_id=courses[0].course_id)
    rep = client.get(course_url, headers=admin_headers)

    assert rep.status_code == 200
    assert rep.get_json()['course']['name'] == courses[0].name, "Incorrect course retrieved"

    # Add prereq to second course
    prereq_one = prereq_factory(course_id=courses[1].course_id, prereq_id=courses[0].course_id)
    db.session.add(prereq_one)
    db.session.commit()

    # Get course with prereq
    course_url = url_for('api.course', course_id=courses[1].course_id)
    rep = client.get(course_url, headers=admin_headers)

    assert rep.status_code == 200
    assert len(rep.get_json()['course']['prereqs']) == 1, "Incorrect number of course pre-requisites"

def test_get_single_course_with_trainer(
    client,
    db,
    course,
    admin_headers,
    employee,
    course_trainer_factory,
):
    course_trainer = course_trainer_factory(course_id=course.course_id, trainer_id=employee.id)
    db.session.add(course)
    db.session.add(employee)
    db.session.add(course_trainer)
    db.session.commit()

    # Get course with trainer
    course_url = url_for('api.course', course_id=course.course_id)
    rep = client.get(course_url, headers=admin_headers)

    assert rep.status_code == 200
    assert len(rep.get_json()['course']['course_trainers']) == 1, "Incorrect number of course trainers"

@pytest.mark.bran
def test_get_eligible_courses(
    client,
    db,
    admin_headers,
    employee,
    course_factory, 
    prereq_factory,
    official_enroll_factory,
    ):
    
    # Create the courses
    courses = course_factory.create_batch(5)
    
    # Let course 0 be the base the other courses rely on
    enroll_one = official_enroll_factory(course_id=courses[0].course_id, has_passed=True, eng_id=employee.id)
    
    # Add the pre-reqs to the courses
    prereq_one = prereq_factory(course_id=courses[1].course_id, prereq_id=courses[0].course_id)
    prereq_two = prereq_factory(course_id=courses[2].course_id, prereq_id=courses[1].course_id)
    
    db.session.add_all(courses)
    db.session.add_all([employee])
    db.session.add_all([prereq_one, prereq_two])
    db.session.add_all([enroll_one])
    
    db.session.commit()

    # Get all courses
    course_url = url_for('api.courses', eng_id=employee.id)
    rep = client.get(course_url, headers=admin_headers)
    print(rep.get_json())
    assert rep.status_code == 200
    assert len(rep.get_json()['courses']) == 2, "Incorrect number of courses"
