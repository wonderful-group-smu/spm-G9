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
  course_url = url_for('api.class_section', course_id=9999, trainer_id=9999)
  rep = client.get(course_url, headers=admin_headers)
  assert rep.status_code == 404

  # Get course class
  course_url = url_for('api.class_section', course_id=class_section.course_id, trainer_id=class_section.trainer_id)
  rep = client.get(course_url, headers=admin_headers)

  assert rep.status_code == 200
  rep_json = rep.get_json()
  assert rep_json['class_section']['course_id'] == class_section.course_id, "Incorrect course id retrieved"
  assert rep_json['class_section']['trainer_id'] == class_section.trainer_id, "Incorrect trainer id retrieved"
  assert rep_json['class_section']['section_id'] == class_section.section_id, "Incorrect section id retrieved"
  assert rep_json['class_section']['course_class']['course_id'] == class_section.course_class.course_id, "Incorrect course class retrieved"

def test_create_single_class_section(
  client,
  db,
  admin_headers,
  class_section
  ):
  # You need any integer for course_id, trainer_id
  course_url = url_for('api.class_section', course_id=0, trainer_id=0)

  request_json = { 'course_id': class_section.course_id, 'trainer_id': class_section.trainer_id, "section_name": "section name" }
  rep = client.post(course_url, json=request_json, headers=admin_headers)
  assert rep.status_code == 201, "Incorrect status code retrieved"
  rep_json = rep.get_json()
  assert rep_json['class_section']['course_id'] == class_section.course_id, "Incorrect course id retrieved"
  assert rep_json['class_section']['trainer_id'] == class_section.trainer_id, "Incorrect trainer id retrieved"

  # Create class section failure due to missing attributes
  request_json = { 'course_id': class_section.course_id }
  rep = client.post(course_url, json=request_json, headers=admin_headers)
  assert rep.status_code == 400, "Incorrect status code retrieved"