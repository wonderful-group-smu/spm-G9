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
    quiz_url = url_for('api.quiz', course_id=9999, section_id=9999, trainer_id=9999)
    rep = client.get(quiz_url, headers=engineer_employee_headers)
    assert rep.status_code == 404

    # Get quiz without question
    quiz_url = url_for('api.quiz', course_id=quizzes[0].course_id, section_id=quizzes[0].section_id, trainer_id=quizzes[0].trainer_id)
    rep = client.get(quiz_url, headers=engineer_employee_headers)

    assert rep.status_code == 200
    rep_json = rep.get_json()
    assert rep_json['quiz']['course_id'] == quizzes[0].course_id, "Incorrect course id retrieved"
    assert rep_json['quiz']['section_id'] == quizzes[0].section_id, "Incorrect section id retrieved"

    # Add question to quiz
    question_one = question_factory(quiz=quizzes[0])
    db.session.add(question_one)
    db.session.commit()

    quiz_url = url_for('api.quiz', course_id=quizzes[0].course_id, section_id=quizzes[0].section_id, trainer_id=quizzes[0].trainer_id)
    rep = client.get(quiz_url, headers=engineer_employee_headers)

    assert rep.status_code == 200
    assert len(rep.get_json()['quiz']['questions']) == 1, "Incorrect number of questions retrieved for quiz"

    # Add question_option to question
    question_option_one = question_option_factory(question=question_one)
    db.session.add(question_option_one)
    db.session.commit()

    quiz_url = url_for('api.quiz', course_id=quizzes[0].course_id, section_id=quizzes[0].section_id, trainer_id=quizzes[0].trainer_id)
    rep = client.get(quiz_url, headers=engineer_employee_headers)
    assert rep.status_code == 200
    assert len(rep.get_json()['quiz']['questions'][0]['question_options']) == 1, "Incorrect number of question options retrieved for question"

    # Add question_option_two to question
    question_option_two = question_option_factory(question=question_one)
    db.session.add(question_option_two)
    db.session.commit()

    quiz_url = url_for('api.quiz', course_id=quizzes[0].course_id, section_id=quizzes[0].section_id, trainer_id=quizzes[0].trainer_id)
    rep = client.get(quiz_url, headers=engineer_employee_headers)
    assert rep.status_code == 200
    assert len(rep.get_json()['quiz']['questions'][0]['question_options']) == 2, "Incorrect number of questions options retrieved for question"


def test_create_single_quiz(
    client,
    engineer_employee_headers,
    class_section,
):
    """Test creating quiz for an existing class section"""

    quiz_url = url_for('api.quiz', course_id=0, section_id=0, trainer_id=0)

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
    quiz_url = url_for('api.quiz', course_id=quiz.course_id, section_id=quiz.section_id, trainer_id=quiz.trainer_id)
    rep = client.delete(quiz_url, headers=engineer_employee_headers)
    assert rep.status_code == 204, "Incorrect response code"

    # Delete quiz failure
    quiz_url = url_for('api.quiz', course_id=9999, section_id=9999, trainer_id=9999)
    rep = client.delete(quiz_url, headers=engineer_employee_headers)
    assert rep.status_code == 404, "Incorrect response code"


def test_get_quizzes_list(
    client,
    db,
    engineer_employee_headers,
    class_section_factory,
    course_class,
    quiz_factory
):
    count = 3
    class_sections = [class_section_factory(course_class=course_class) for _ in range(count)]
    db.session.add_all(class_sections)
    db.session.commit()
    quizzes = [quiz_factory(class_section=class_section) for class_section in class_sections]
    db.session.add_all(quizzes)
    db.session.commit()

    # Find unavailable/empty class section
    quiz_url = url_for('api.quizzes', course_id=9999, trainer_id=9999)
    rep = client.get(quiz_url, headers=engineer_employee_headers)
    assert rep.status_code == 200, "Incorrect response code"
    assert len(rep.get_json()['quizzes']) == 0, "Incorrect number of quizzes in class section"
    # Get quizzes in class section
    quiz_url = url_for('api.quizzes', course_id=course_class.course_id, trainer_id=course_class.trainer_id)
    rep = client.get(quiz_url, headers=engineer_employee_headers)
    assert rep.status_code == 200
    rep_json = rep.get_json()
    assert len(rep_json['quizzes']) == count, "Incorrect number of quizzes in class section"
    # Check for all the quizzes in the list
    for quiz in rep_json['quizzes']:
        assert quiz['course_id'] == course_class.course_id, "Incorrect course id retrieved"
        assert quiz['trainer_id'] == course_class.trainer_id, "Incorrect trainer id retrieved"
