from flask import url_for


def test_get_single_quiz(
    client,
    db,
    engineer_employee_headers,
    quiz_factory,
    question_factory,
    question_option_factory
):
    quizzes = quiz_factory.create_batch(3)
    db.session.add_all(quizzes)
    db.session.commit()

    # Find unavailable quiz
    quiz_url = url_for('api.quiz', quiz_id=9999, course_id=9999, section_id=9999)
    rep = client.get(quiz_url, headers=engineer_employee_headers)
    assert rep.status_code == 404

    # Get quiz without question
    quiz_url = url_for('api.quiz', quiz_id=quizzes[0].quiz_id, course_id=quizzes[0].course_id, section_id=quizzes[0].section_id)
    rep = client.get(quiz_url, headers=engineer_employee_headers)

    assert rep.status_code == 200
    rep_json = rep.get_json()
    assert rep_json['quiz']['quiz_id'] == quizzes[0].quiz_id, "Incorrect quiz id retrieved"
    assert rep_json['quiz']['class_section']['section_id'] == quizzes[0].class_section.section_id, "Incorrect class section retrieved"

    # Add question to quiz
    question_one = question_factory(quiz=quizzes[1])
    db.session.add(question_one)
    db.session.commit()

    quiz_url = url_for('api.quiz', quiz_id=quizzes[1].quiz_id, course_id=quizzes[0].course_id, section_id=quizzes[0].section_id)
    rep = client.get(quiz_url, headers=engineer_employee_headers)

    assert rep.status_code == 200
    assert len(rep.get_json()['quiz']['questions']) == 1, "Incorrect number of questions retrieved for quiz"

    # Add question_option to question
    question_option_one = question_option_factory(question=question_one)
    db.session.add(question_option_one)
    db.session.commit()

    quiz_url = url_for('api.quiz', quiz_id=quizzes[1].quiz_id, course_id=quizzes[0].course_id, section_id=quizzes[0].section_id)
    rep = client.get(quiz_url, headers=engineer_employee_headers)
    assert rep.status_code == 200
    assert len(rep.get_json()['quiz']['questions'][0]['question_options']) == 1, "Incorrect number of question options retrieved for question"

    # Add question_option_two to question
    question_option_two = question_option_factory(question=question_one)
    db.session.add(question_option_two)
    db.session.commit()

    quiz_url = url_for('api.quiz', quiz_id=quizzes[1].quiz_id, course_id=quizzes[0].course_id, section_id=quizzes[0].section_id)
    rep = client.get(quiz_url, headers=engineer_employee_headers)
    assert rep.status_code == 200
    assert len(rep.get_json()['quiz']['questions'][0]['question_options']) == 2, "Incorrect number of questions options retrieved for question"


def test_create_single_quiz(
    client,
    engineer_employee_headers,
    class_section,
):
    """Test creating quiz for an existing class section"""

    quiz_url = url_for('api.quiz', quiz_id=0, course_id=0, section_id=0)

    request_json = {'course_id': class_section.course_id, 'trainer_id': class_section.trainer_id, 'section_id': class_section.section_id, "is_graded": False}
    rep = client.post(quiz_url, json=request_json, headers=engineer_employee_headers)
    assert rep.status_code == 201, "Incorrect status code retrieved"
    rep_json = rep.get_json()
    assert rep_json['quiz']['course_id'] == class_section.course_id, "Incorrect course id retrieved"
    assert rep_json['quiz']['section_id'] == class_section.section_id, "Incorrect section id retrieved"


def test_delete_single_quiz(client, db, quiz, engineer_employee_headers):
    db.session.add(quiz)
    db.session.commit()

    # Delete quiz success
    quiz_url = url_for('api.quiz', quiz_id=quiz.quiz_id, course_id=quiz.course_id, section_id=quiz.section_id)
    rep = client.delete(quiz_url, headers=engineer_employee_headers)
    assert rep.status_code == 204, "Incorrect response code"

    # Delete quiz failure
    quiz_url = url_for('api.quiz', quiz_id=9999, course_id=9999, section_id=9999)
    rep = client.delete(quiz_url, headers=engineer_employee_headers)
    assert rep.status_code == 404, "Incorrect response code"


def test_get_quizzes_list(
    client,
    db,
    engineer_employee_headers,
    class_section,
    quiz_factory
):
    count = 3
    quizzes = [quiz_factory(class_section=class_section) for _ in range(count)]
    db.session.add(class_section)
    db.session.add_all(quizzes)
    db.session.commit()

    # Find unavailable/empty class section
    quiz_url = url_for('api.quizzes', section_id=9999)
    rep = client.get(quiz_url, headers=engineer_employee_headers)
    assert rep.status_code == 200, "Incorrect response code"
    assert len(rep.get_json()['quizzes']) == 0, "Incorrect number of quizzes in class section"

    # Get quizzes in class section
    quiz_url = url_for('api.quizzes', section_id=class_section.section_id)
    rep = client.get(quiz_url, headers=engineer_employee_headers)
    assert rep.status_code == 200
    rep_json = rep.get_json()
    assert len(rep_json['quizzes']) == count, "Incorrect number of quizzes in class section"
    # Check for all the quizzes in the list
    for quiz in rep_json['quizzes']:
        assert quiz['course_id'] == class_section.course_id, "Incorrect course id retrieved"
        assert quiz['trainer_id'] == class_section.trainer_id, "Incorrect trainer id retrieved"
        assert quiz['section_id'] == class_section.section_id, "Incorrect section id retrieved"
        assert quiz['quiz_id'] in [quiz.quiz_id for quiz in quizzes], "Incorrect section id retrieved"
