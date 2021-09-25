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

def test_get_eligible_courses(
    client,
    db,
    admin_headers,
    employee,
    course_factory, 
    prereq_factory,
    official_enroll_factory,
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
    # Create the courses
    courses = course_factory.create_batch(num_courses)
    
    # Let course 0 be the base the other courses rely on
    enroll_one = official_enroll_factory(course_id=courses[0].course_id, has_passed=True, eng_id=employee.id)
    enroll_two = official_enroll_factory(course_id=courses[1].course_id, has_passed=False, eng_id=employee.id)
    
    # Add the pre-reqs to the courses
    prereq_one = prereq_factory(course_id=courses[1].course_id, prereq_id=courses[0].course_id)
    prereq_two = prereq_factory(course_id=courses[2].course_id, prereq_id=courses[1].course_id)
    prereq_three = prereq_factory(course_id=courses[2].course_id, prereq_id=courses[0].course_id)
    
    db.session.add_all(courses)
    db.session.add_all([employee])
    db.session.add_all([prereq_one, prereq_two, prereq_three])
    db.session.add_all([enroll_one, enroll_two])
    db.session.commit()

    # Get all courses
    course_url = url_for('api.courses', eng_id=employee.id)
    rep = client.get(course_url, headers=admin_headers)
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
    assert result[2]['isEligible'] == False, "Incorrect eligible status for course 2"
    
    assert result[3]['isActive'] == False, "Incorrect active status for course 3"
    assert result[3]['isComplete'] == False, "Incorrect complete status for course 3"
    assert result[3]['isEligible'] == True, "Incorrect eligible status for course 3"
    
    