
from flask import url_for

def test_get_all_enrollments(client, db, official_enroll_factory, test_user_headers):
    official_enrollment_url = url_for('api.official_enroll')
    official_enrollments = official_enroll_factory.create_batch(30)
    
    db.session.add_all(official_enrollments)
    db.session.commit()

    res = client.get(official_enrollment_url, headers=test_user_headers)
    assert res.status_code == 200, "Official Enrollment endpoint not up"

    assert all(enrollment["eng_id"]==enrollment.eng_id for enrollment in res.data), "Incorrect engineer enrollment data retreived"
    assert all(enrollment["course_id"]==enrollment.course_id for enrollment in res.data), "Incorrect course id retrieved for enginer"
    
