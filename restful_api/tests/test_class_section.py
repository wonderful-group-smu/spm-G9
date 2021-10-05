from flask import url_for


def test_get_single_class_section(
    client,
    db,
    admin_headers,
    class_section
):
    db.session.add(class_section)
    db.session.commit()

    # Find unavailable class section
    course_url = url_for('api.class_section', section_id=9999)
    rep = client.get(course_url, headers=admin_headers)
    assert rep.status_code == 404

    # Get course class
    course_url = url_for('api.class_section', section_id=class_section.section_id)
    rep = client.get(course_url, headers=admin_headers)

    assert rep.status_code == 200
    rep_json = rep.get_json()
    assert rep_json['class_section']['course_id'] == class_section.course_id, "Incorrect course id retrieved"
    assert rep_json['class_section']['trainer_id'] == class_section.trainer_id, "Incorrect trainer id retrieved"
    assert rep_json['class_section']['section_id'] == class_section.section_id, "Incorrect section id retrieved"
    assert rep_json['class_section']['course_class']['course_id'] == class_section.course_class.course_id, "Incorrect course class retrieved"


def test_create_single_class_section(
    client,
    admin_headers,
    course_class,
):
    """Test creating class section with an existing course class"""

    # You need any integer for course_id, trainer_id
    course_url = url_for('api.class_section', section_id=0)

    request_json = {'course_id': course_class.course_id, 'trainer_id': course_class.trainer_id, "section_name": "section name"}
    rep = client.post(course_url, json=request_json, headers=admin_headers)
    assert rep.status_code == 201, "Incorrect status code retrieved"
    rep_json = rep.get_json()
    assert rep_json['class_section']['course_id'] == course_class.course_id, "Incorrect course id retrieved"
    assert rep_json['class_section']['trainer_id'] == course_class.trainer_id, "Incorrect trainer id retrieved"

    # Create class section failure due to missing attributes
    request_json = {'course_id': course_class.course_id}
    rep = client.post(course_url, json=request_json, headers=admin_headers)
    assert rep.status_code == 400, "Incorrect status code retrieved"


def test_delete_single_class_section(client, db, class_section, admin_headers):
    db.session.add(class_section)
    db.session.commit()

    # Delete course success
    course_url = url_for('api.class_section', section_id=class_section.section_id)
    rep = client.delete(course_url, headers=admin_headers)
    assert rep.status_code == 204, "Incorrect response code"

    # Delete course failure
    course_url = url_for('api.class_section', section_id=9999)
    rep = client.delete(course_url, headers=admin_headers)
    assert rep.status_code == 404, "Incorrect response code"


def test_get_class_section_list(
    client,
    db,
    admin_headers,
    course_class,
    class_section_factory
):
    count = 3
    class_sections = [class_section_factory(course_class=course_class) for _ in range(count)]
    db.session.add(course_class)
    db.session.add_all(class_sections)
    db.session.commit()

    # Find unavailable/ empty course class
    course_url = url_for('api.class_sections_by_course', course_id=9999)
    rep = client.get(course_url, headers=admin_headers)
    assert rep.status_code == 200, "Incorrect response code"
    assert len(rep.get_json()['class_sections']) == 0, "Incorrect number of class sections in course class"

    # Get class sections in course class
    course_url = url_for('api.class_sections_by_course', course_id=course_class.course_id)
    rep = client.get(course_url, headers=admin_headers)
    assert rep.status_code == 200
    rep_json = rep.get_json()
    assert len(rep_json['class_sections']) == count, "Incorrect number of class sections in course class"
    # Check for all the class sections in the list
    for class_section in rep_json['class_sections']:
        assert class_section['course_id'] == course_class.course_id, "Incorrect course id retrieved"
        assert class_section['trainer_id'] == course_class.trainer_id, "Incorrect trainer id retrieved"
        assert class_section['section_id'] in [cs.section_id for cs in class_sections], "Incorrect section id retrieved"
