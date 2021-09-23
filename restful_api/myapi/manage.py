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

    items_to_add = []
    click.echo("create user")
    user = User(id=1, username="test", email="test@mail.com", password="testpassword", active=True)
    items_to_add.append(user)
    click.echo("created user")
    click.echo("create employee")
    employee_one = Employee(id=1, name="test", user_type="ENG")
    items_to_add.append(employee_one)
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

    db.session.add_all(items_to_add)
    db.session.commit()


if __name__ == "__main__":
    cli()
