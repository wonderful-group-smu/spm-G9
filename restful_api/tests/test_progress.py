from flask import url_for
import json


def test_get_single_course_progress(
    client,
    db,
    employee,
    course_class,
    class_section_factory,
    section_completed_factory,
    engineer_employee_headers,
):

    sections = [class_section_factory(course_class=course_class) for _ in range(4)]
    db.session.add_all(sections + [employee])
    db.session.commit()

    progress_url = url_for(
        'api.course_progress', 
        eng_id=employee.id, 
        course_id=course_class.course_id, 
        trainer_id=course_class.trainer.id
    )
    
    rep = client.get(progress_url, headers=engineer_employee_headers)
    assert rep.status_code == 200
    json_payload = rep.get_json()[0]['progress']
    assert json_payload['completed_sections'] == 0
    assert json_payload['no_sections'] == 4

    completed_sections = [section_completed_factory(class_section=sections[i], engineer=employee) for i in range(3)]
    db.session.add_all(completed_sections)
    db.session.commit()
    
    rep = client.get(progress_url, headers=engineer_employee_headers)
    assert rep.status_code == 200
    json_payload = rep.get_json()[0]['progress']
    assert json_payload['completed_sections'] == 3
    assert json_payload['no_sections'] == 4

def test_get_overall_progress(
    client,
    db,
    employee,
    course_class,
    class_section_factory,
    section_completed_factory,
    engineer_employee_headers,
    enroll_factory
):

    sections = [class_section_factory(course_class=course_class) for _ in range(4)]
    completed_sections = [section_completed_factory(class_section=sections[i], engineer=employee) for i in range(3)]
    enrollment = enroll_factory(course_id=course_class.course_id,
                                trainer_id=course_class.course_id,
                                eng=employee,
                                trainer=course_class.trainer,
                                course=course_class.course)

    db.session.add_all(completed_sections + sections + [employee, enrollment])
    db.session.commit()

    progress_url = url_for('api.overall_progress', eng_id=employee.id)
    rep = client.get(progress_url, headers=engineer_employee_headers)
    assert rep.status_code == 200
    json_payload = rep.get_json()['progress']
    assert json_payload[str(course_class.course_id)]['completed_sections'] == 3
    assert json_payload[str(course_class.course_id)]['no_sections'] == 4

    completed_section_4 = section_completed_factory(class_section=sections[-1], engineer=employee)
    db.session.add(completed_section_4)
    db.session.commit()

    rep = client.get(progress_url, headers=engineer_employee_headers)
    assert rep.status_code == 200
    json_payload = rep.get_json()['progress']
    assert json_payload[str(course_class.course_id)]['completed_sections'] == 4
    assert json_payload[str(course_class.course_id)]['no_sections'] == 4


def test_get_overall_progress_no_enrollment(
    client,
    db,
    employee,
    course_class,
    class_section_factory,
    section_completed_factory,
    engineer_employee_headers,
):

    sections = [class_section_factory(course_class=course_class) for _ in range(4)]
    completed_sections = [section_completed_factory(class_section=sections[i], engineer=employee) for i in range(3)]
    db.session.add_all(completed_sections + sections + [employee])
    db.session.commit()

    progress_url = url_for('api.overall_progress', eng_id=employee.id)
    rep = client.get(progress_url, headers=engineer_employee_headers)
    assert rep.status_code == 404
