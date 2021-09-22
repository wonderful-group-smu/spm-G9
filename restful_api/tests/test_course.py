from flask import url_for
import pytest

@pytest.mark.skip(reason="SPM-29 blocked due to lack of dependencies on other tables")
def test_get_all_course(client, db, course_factory, admin_headers):
    course_url = url_for('api.courses')
    courses = course_factory.create_batch(30)

    db.session.add_all(courses)
    db.session.commit()

    rep = client.get(course_url, headers=admin_headers)
    assert rep.status_code == 200

    results = rep.get_json()
    for course in courses:
        assert any(c["cid"] == course.cid for c in results["results"])