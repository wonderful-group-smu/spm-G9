import click
from flask.cli import with_appcontext


@click.group()
def cli():
    """Main entry point"""


@cli.command("init")
@with_appcontext
def init():
    from myapi.extensions import db
    from myapi.models import User, Course, Prereq, Employee

    click.echo("create user")
    user = User(id=1, username="test", email="test@mail.com", password="testpassword", active=True)
    db.session.add(user)
    db.session.commit()
    click.echo("created user")
    click.echo("create employee")
    employee_one = Employee(id=1, name="test", user_type="ENG")
    db.session.add(employee_one)
    db.session.commit()
    click.echo("created employee")
    click.echo("create courses")
    course_one = Course(course_id=1, description="course one description", name="course one name")
    course_two = Course(course_id=2, description="course two description", name="course two name")
    db.session.add(course_one)
    db.session.add(course_two)
    db.session.commit()
    click.echo("created courses")
    click.echo("create prereq")
    prereq_one = Prereq(course_id=2, prereq_id=1)
    db.session.add(prereq_one)
    db.session.commit()
    click.echo("created prereq")


if __name__ == "__main__":
    cli()
