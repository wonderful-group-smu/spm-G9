
from flask import url_for
from myapi.models import Engineer

def test_get_engineer(client, db, engineer, admin_headers):
    # test 404
    engineer_url = url_for('api.engineer_by_id', engineer_id="100000")
    rep = client.get(engineer_url, headers=admin_headers)
    assert rep.status_code == 404

    db.session.add(engineer)
    db.session.commit()

    # test get_user
    engineer_url = url_for('api.engineer_by_id', engineer_id=engineer.id)
    rep = client.get(engineer_url, headers=admin_headers)
    assert rep.status_code == 200

    data = rep.get_json()["engineer"]
    assert data["id"] == engineer.id
    assert data["name"] == engineer.name



def test_get_all_engineer(client, db, engineer_factory, admin_headers):
    engineers_url = url_for('api.engineers')
    engineers = engineer_factory.create_batch(30)
    
    db.session.add_all(engineers)
    db.session.commit()

    rep = client.get(engineers_url, headers=admin_headers)
    assert rep.status_code == 200

    results = rep.get_json()
    for engineer in engineers:
        assert any(e["id"]==engineer.id for e in results["results"])
