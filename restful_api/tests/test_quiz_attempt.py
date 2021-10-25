from flask import url_for


def test_get_single_quiz_attempt(
    client,
    db,
    engineer_employee_headers,
    quiz_attempt,
    employee,
    question_factory,
    question_option_factory
):
    db.session.add(quiz_attempt)
    db.session.commit()

    # Find unavailable quiz attempt
    quiz_attempt_url = url_for('api.quiz_attempt', quiz_id=9999, course_id=9999, section_id=9999, eng_id=9999)
    rep = client.get(quiz_attempt_url, headers=engineer_employee_headers)
    assert rep.status_code == 404

    # Get quiz attempt
    quiz_attempt_url = url_for('api.quiz_attempt', quiz_id=quiz_attempt.quiz_id, course_id=quiz_attempt.course_id, section_id=quiz_attempt.section_id, eng_id=employee.id)
    rep = client.get(quiz_attempt_url, headers=engineer_employee_headers)
    assert rep.status_code == 200, "Incorrect status code retrieved"
    rep_json = rep.get_json()
    assert rep_json['quiz_attempt']['course_id'] == quiz_attempt.course_id, "Incorrect course id retrieved"
    assert rep_json['quiz_attempt']['section_id'] == quiz_attempt.section_id, "Incorrect section id retrieved"
    assert rep_json['quiz_attempt']['quiz_id'] == quiz_attempt.quiz_id, "Incorrect quiz id retrieved"
    assert rep_json['quiz_attempt']['eng_id'] == employee.id, "Incorrect employee id retrieved"


def test_create_single_quiz_attempt(
    client,
    engineer_employee_headers,
    quiz,
    employee,
    section_completed,
    db
):
    """Test attempt a quiz"""
    db.session.add_all([quiz, employee, section_completed])
    db.session.commit()

    quiz_attempt_url = url_for('api.quiz_attempt', quiz_id=0, course_id=0, section_id=0, eng_id=0)

    request_json = {'course_id': quiz.course_id, 'section_id': quiz.section_id, "quiz_id": quiz.quiz_id, "eng_id": employee.id}
    rep = client.post(quiz_attempt_url, json=request_json, headers=engineer_employee_headers)
    assert rep.status_code == 201, "Incorrect status code retrieved"
    rep_json = rep.get_json()
    assert rep_json['quiz_attempt']['course_id'] == quiz.course_id, "Incorrect course id retrieved"
    assert rep_json['quiz_attempt']['section_id'] == quiz.section_id, "Incorrect section id retrieved"
    assert rep_json['quiz_attempt']['quiz_id'] == quiz.quiz_id, "Incorrect quiz id retrieved"
    assert rep_json['quiz_attempt']['eng_id'] == employee.id, "Incorrect employee id retrieved"
