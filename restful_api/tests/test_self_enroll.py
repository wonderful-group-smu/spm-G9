
from flask import url_for

def test_get_self_enrollment_for_one_engineer(client, db, self_enroll_factory,   admin_headers):
    # test 404 
    self_enrollment_url = url_for('api.self_enroll_by_ids', eng_id="9999", course_id="9999")
    rep = client.get(self_enrollment_url, headers=admin_headers)
    assert rep.status_code == 404

    self_enrollments = self_enroll_factory.create_batch(5)  
    db.session.add_all(self_enrollments)
    db.session.commit()

    # test get self enrollment
    self_enrollment_url = url_for('api.self_enroll_by_ids', eng_id=self_enrollments[0].eng_id, course_id=self_enrollments[0].course_id)
    rep = client.get(self_enrollment_url, headers=admin_headers)
    assert rep.status_code == 200, "Engineer self_enrollment endpoint not up"
    assert rep.get_json()["enrollment"]["eng_id"] == self_enrollments[0].eng_id, "Incorrect engineer self enrollment data retrieved"
    assert rep.get_json()["enrollment"]["course_id"] == self_enrollments[0].course_id, "Incorrect engineer self enrollment data retrieved"


def test_get_all_self_enrollments_for_one_engineer(client, db, self_enroll_factory, admin_headers):
    
    #test get_all self_enrollments
    self_enrollments = self_enroll_factory.create_batch(5)  
    self_enrollment_url = url_for('api.self_enroll', eng_id=self_enrollments[0].eng_id)

    db.session.add_all(self_enrollments)
    db.session.commit()

    rep = client.get(self_enrollment_url, headers=admin_headers)
    assert rep.status_code == 200, "Engineer self_enrollment endpoint not up"

    results = rep.get_json()
    for enrollment in self_enrollments:
        assert any(e["eng_id"]==enrollment.eng_id for e in results['results']), "Incorrect engineer self enrollment data retrieved"
        assert any(e["course_id"]==enrollment.course_id for e in results['results']), "Incorrect engineer self enrollment data retrieved"
        

