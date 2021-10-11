from flask import url_for


def test_get_single_question(
    client,
    db,
    admin_headers,
    question
):
    db.session.add(question)
    db.session.commit()

    # Find unavailable question
    question_url = url_for('api.question', question_id=9999)
    rep = client.get(question_url, headers=admin_headers)
    assert rep.status_code == 404

    # Get question
    question_url = url_for('api.question', question_id=question.question_id)
    rep = client.get(question_url, headers=admin_headers)

    assert rep.status_code == 200
    rep_json = rep.get_json()
    assert rep_json['question']['course_id'] == question.course_id, "Incorrect course id retrieved"
    assert rep_json['question']['trainer_id'] == question.trainer_id, "Incorrect trainer id retrieved"
    assert rep_json['question']['section_id'] == question.section_id, "Incorrect section id retrieved"
    assert rep_json['question']['question_id'] == question.question_id, "Incorrect question id retrieved"
    assert rep_json['question']['class_section']['section_id'] == question.class_section.section_id, "Incorrect class section retrieved"
    assert rep_json['question']['question'] == question.question, "Incorrect question description retrieved"
    assert rep_json['question']['answer'] == question.answer, "Incorrect question answer retrieved"


def test_create_single_question(
    client,
    admin_headers,
    class_section,
):
    """Test creating question with an existing class section"""

    question_url = url_for('api.question', question_id=0)

    request_json = {'course_id': class_section.course_id, 'trainer_id': class_section.trainer_id, 'section_id': class_section.section_id, "question": "question 1", "answer": "answer 1"}
    rep = client.post(question_url, json=request_json, headers=admin_headers)
    assert rep.status_code == 201, "Incorrect status code retrieved"
    rep_json = rep.get_json()
    assert rep_json['question']['course_id'] == class_section.course_id, "Incorrect course id retrieved"
    assert rep_json['question']['section_id'] == class_section.section_id, "Incorrect section id retrieved"

    # Create question failure due to missing attributes - question and answer
    request_json = {'course_id': class_section.course_id}
    rep = client.post(question_url, json=request_json, headers=admin_headers)
    assert rep.status_code == 400, "Incorrect status code retrieved"


def test_delete_single_question(client, db, question, admin_headers):
    db.session.add(question)
    db.session.commit()

    # Delete question success
    question_url = url_for('api.question', question_id=question.question_id)
    rep = client.delete(question_url, headers=admin_headers)
    assert rep.status_code == 204, "Incorrect response code"

    # Delete question failure
    question_url = url_for('api.question', question_id=9999)
    rep = client.delete(question_url, headers=admin_headers)
    assert rep.status_code == 404, "Incorrect response code"


def test_get_questions_list(
    client,
    db,
    admin_headers,
    class_section,
    question_factory
):
    count = 3
    questions = [question_factory(class_section=class_section) for _ in range(count)]
    db.session.add(class_section)
    db.session.add_all(questions)
    db.session.commit()

    # Find unavailable/empty class section
    question_url = url_for('api.questions', section_id=9999)
    rep = client.get(question_url, headers=admin_headers)
    assert rep.status_code == 200, "Incorrect response code"
    assert len(rep.get_json()['questions']) == 0, "Incorrect number of questions in class section"

    # Get questions in class section
    question_url = url_for('api.questions', section_id=class_section.section_id)
    rep = client.get(question_url, headers=admin_headers)
    assert rep.status_code == 200
    rep_json = rep.get_json()
    assert len(rep_json['questions']) == count, "Incorrect number of questions in class section"
    # Check for all the questions in the list
    for question in rep_json['questions']:
        assert question['course_id'] == class_section.course_id, "Incorrect course id retrieved"
        assert question['trainer_id'] == class_section.trainer_id, "Incorrect trainer id retrieved"
        assert question['section_id'] == class_section.section_id, "Incorrect section id retrieved"
        assert question['question_id'] in [qn.question_id for qn in questions], "Incorrect section id retrieved"
