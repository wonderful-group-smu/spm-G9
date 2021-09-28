import click
from flask.cli import with_appcontext


@click.group()
def cli():
    """Main entry point"""


@cli.command("init")
@with_appcontext
def init():
    from myapi.extensions import db
    from myapi.models import (
        User,
        Course,
        Prereq,
        Employee,
        OfficialEnroll
    )

    items_to_add = []
    click.echo("create user")
    user_one = User(id=1, username="testuser", email="test@mail.com", password="testpassword", active=True)
    user_two = User(id=2, username="testtrainer", email="trainer@mail.com", password="trainerpassword", active=True)
    items_to_add.append(user_one)
    items_to_add.append(user_two)
    click.echo("created user")
    click.echo("create employee")
    employee_one = Employee(id=1, name="testuser", user_type="ENG")
    employee_two = Employee(id=2, name="testtrainer", user_type="ENG")
    items_to_add.append(employee_one)
    items_to_add.append(employee_two)
    click.echo("created employee")
    click.echo("create courses")
    course_one = Course(course_id=1, description="course one description", name="course one name")
    course_two = Course(course_id=2, description="course two description", name="course two name")
    items_to_add.append(course_one)
    items_to_add.append(course_two)
    click.echo("created courses")
    click.echo("create prereq")
    prereq_one = Prereq(course_id=2, prereq_id=1)
    items_to_add.append(prereq_one)
    click.echo("created prereq")

    click.echo("create official enrol")
    official_enrol_one = OfficialEnroll(eng_id=1, course_id=2)
    items_to_add.append(official_enrol_one)
    click.echo("created official enrol")

    db.session.add_all(items_to_add)
    db.session.commit()

@cli.command("reset")
@with_appcontext
def reset():
    """Deletes all the data from tables
    """
    from myapi.extensions import db
    db.session.commit()
    db.drop_all()
    db.create_all()


if __name__ == "__main__":
    cli()
