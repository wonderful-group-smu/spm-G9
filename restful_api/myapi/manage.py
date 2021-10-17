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
        Course,
        Prereq,
        Employee,
        CourseClass,
        ClassSection,
        Quiz,
        Question,
        QuestionOption
    )

    items_to_add = []
    click.echo("create employee")
    employee_one = Employee(id=1, name="testengineer", user_type="ENG", password="testpassword")
    employee_two = Employee(id=2, name="testtrainer", user_type="ENG", password="testpassword")
    employee_three = Employee(id=3, name="testhr", user_type="HR", password="testpassword")
    items_to_add.append(employee_one)
    items_to_add.append(employee_two)
    items_to_add.append(employee_three)
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
    click.echo("create course class")
    course_class_one = CourseClass(course_id=2, trainer_id=2)
    items_to_add.append(course_class_one)
    click.echo("created course class")
    click.echo("create class section")
    class_section_one = ClassSection(course_id=2, trainer_id=2, section_name="section one name")
    items_to_add.append(class_section_one)
    click.echo("created class section")
    click.echo("create quiz")
    quiz_one = Quiz(course_id=2, trainer_id=2, section_id=1, is_graded=False)
    items_to_add.append(quiz_one)
    click.echo("created quiz")
    click.echo("create question")
    question_one = Question(course_id=2, trainer_id=2, section_id=1, quiz_id=1, question="question one", question_type=True)
    items_to_add.append(question_one)
    click.echo("created question")
    click.echo("create question's options")
    option_one = QuestionOption(course_id=2, trainer_id=2, section_id=1, quiz_id=1, question_id=1, option_label='T', option_value='True', is_correct=True)
    option_two = QuestionOption(course_id=2, trainer_id=2, section_id=1, quiz_id=1, question_id=1, option_label='F', option_value='False', is_correct=False)
    items_to_add.append(option_one)
    items_to_add.append(option_two)
    click.echo("created question's options")

    db.session.add_all(items_to_add)
    db.session.commit()


@cli.command("reset")
@with_appcontext
def reset():
    """Deletes all the data from tables
    """
    from myapi.extensions import db
    db.session.commit()
    drop_everything(db)
    db.create_all()


def drop_everything(db):
    """(On a live db) drops all foreign key constraints before dropping all tables.
    Workaround for SQLAlchemy not doing DROP ## CASCADE for drop_all()
    (https://github.com/pallets/flask-sqlalchemy/issues/722#issuecomment-705672929)
    """
    from sqlalchemy.engine.reflection import Inspector
    from sqlalchemy.schema import DropConstraint, DropTable, MetaData, Table

    con = db.engine.connect()
    trans = con.begin()
    inspector = Inspector.from_engine(db.engine)

    # We need to re-create a minimal metadata with only the required things to
    # successfully emit drop constraints and tables commands for postgres (based
    # on the actual schema of the running instance)
    meta = MetaData()
    tables = []
    all_fkeys = []

    for table_name in inspector.get_table_names():
        fkeys = []

        for fkey in inspector.get_foreign_keys(table_name):
            if not fkey["name"]:
                continue

            fkeys.append(db.ForeignKeyConstraint((), (), name=fkey["name"]))

        tables.append(Table(table_name, meta, *fkeys))
        all_fkeys.extend(fkeys)

    for fkey in all_fkeys:
        con.execute(DropConstraint(fkey))

    for table in tables:
        con.execute(DropTable(table))

    trans.commit()


if __name__ == "__main__":
    cli()
