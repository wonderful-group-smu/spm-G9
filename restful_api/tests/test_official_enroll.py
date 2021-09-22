
from flask import url_for

def test_get_all_enrollments(client, db, official_enroll_factory, test_user_headers):
    official_enrollments = official_enroll_factory.create_batch(5)
    official_enrollment_url = url_for('api.official_enroll', eng_id=official_enrollments[0].eng_id)

    db.session.add_all(official_enrollments)
    db.session.commit()

    res = client.get(official_enrollment_url, headers=test_user_headers)
    assert res.status_code == 200, "Official Enrollment endpoint not up"
    
    results = res.get_json()
    for enrollment in official_enrollments:
        assert any(e["eng_id"]==enrollment.eng_id for e in results['results']), "Incorrect engineer enrollment data retreived"
        assert any(e["course_id"]==enrollment.course_id for e in results['results']), "Incorrect course id retrieved for enginer"
    
