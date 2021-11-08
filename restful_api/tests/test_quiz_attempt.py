# author: Joel (primary)
from flask import url_for


def test_get_single_quiz_attempt(
    client,
    db,
    engineer_employee_headers,
    quiz_attempt,
    employee,
    quiz_factory,
    quiz_attempt_factory,
    answer_factory
):
    quizzes = quiz_factory.create_batch(3)
    db.session.add(quiz_attempt)
    db.session.add_all(quizzes)
    db.session.commit()

    # Find unavailable quiz attempt
    quiz_attempt_url = url_for('api.quiz_attempt', course_id=9999, section_id=9999, trainer_id=9999, eng_id=9999)
    rep = client.get(quiz_attempt_url, headers=engineer_employee_headers)
    assert rep.status_code == 404

    # Get quiz attempt
    quiz_attempt_url = url_for(
        'api.quiz_attempt',
        course_id=quiz_attempt.course_id,
        section_id=quiz_attempt.section_id,
        trainer_id=quiz_attempt.trainer_id,
        eng_id=employee.id)

    rep = client.get(quiz_attempt_url, headers=engineer_employee_headers)
    assert rep.status_code == 200, "Incorrect status code retrieved"
    rep_json = rep.get_json()
    assert rep_json['quiz_attempt']['course_id'] == quiz_attempt.course_id, "Incorrect course id retrieved"
    assert rep_json['quiz_attempt']['section_id'] == quiz_attempt.section_id, "Incorrect section id retrieved"
    assert rep_json['quiz_attempt']['eng_id'] == employee.id, "Incorrect employee id retrieved"

    # Add answers to quiz attempt
    quiz_attempts = quiz_attempt_factory.create_batch(3)
    db.session.add_all(quiz_attempts)
    db.session.commit()

    answer_one = answer_factory(quiz_attempt=quiz_attempts[1])
    db.session.add(answer_one)
    db.session.commit()

    quiz_attempt_url = url_for(
        'api.quiz_attempt',
        course_id=quiz_attempts[1].course_id,
        section_id=quiz_attempts[1].section_id,
        trainer_id=quiz_attempts[1].trainer_id,
        eng_id=quiz_attempts[1].eng_id)
    rep = client.get(quiz_attempt_url, headers=engineer_employee_headers)
    assert rep.status_code == 200
    assert len(rep.get_json()['quiz_attempt']['answers']) == 1, "Incorrect number of answers retrieved for quiz attempt"
    assert rep.get_json()['quiz_attempt']['answers'][0]['answer_label'] == answer_one.answer_label, "Incorrect answer label retrieved for quiz attempt"


def test_create_single_quiz_attempt(
    client,
    engineer_employee_headers,
    quiz,
    employee,
    section_completed,
    answer,
    db
):
    """Test attempt a quiz"""
    db.session.add_all([quiz, employee, section_completed, answer])
    db.session.commit()

    quiz_attempt_url = url_for('api.quiz_attempt', course_id=quiz.course_id, section_id=quiz.section_id, trainer_id=quiz.trainer_id, eng_id=employee.id)

    request_json = {
        'course_id': quiz.course_id,
        'section_id': quiz.section_id,
        "trainer_id": quiz.trainer_id,
        "eng_id": employee.id,
        "answers": [{
            "question_id": answer.question_id,
            "answer_label": answer.answer_label,
            "course_id": answer.course_id,
            "section_id": answer.section_id,
            "trainer_id": answer.trainer_id}]
    }

    rep = client.post(quiz_attempt_url, json=request_json, headers=engineer_employee_headers)
    assert rep.status_code == 201, "Incorrect status code retrieved"
    rep_json = rep.get_json()
    assert rep_json['quiz_attempt']['course_id'] == quiz.course_id, "Incorrect course id retrieved"
    assert rep_json['quiz_attempt']['section_id'] == quiz.section_id, "Incorrect section id retrieved"
    assert rep_json['quiz_attempt']['eng_id'] == employee.id, "Incorrect employee id retrieved"
    assert rep_json['section_completed']['course_id'] == section_completed.course_id, "Incorrect course id retrieved"
    assert rep_json['section_completed']['section_id'] == section_completed.section_id, "Incorrect section id retrieved"
    assert rep_json['section_completed']['eng_id'] == section_completed.eng_id, "Incorrect eng id retrieved"
