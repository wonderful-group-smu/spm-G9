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
  assert rep.get_json()['class_section']['course_id'] == class_section.course_id, "Incorrect course id retrieved"
  assert rep.get_json()['class_section']['trainer_id'] == class_section.trainer_id, "Incorrect trainer id retrieved"
  assert rep.get_json()['class_section']['section_id'] == class_section.section_id, "Incorrect section id retrieved"
