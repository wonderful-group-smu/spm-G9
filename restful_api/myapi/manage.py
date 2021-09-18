import click
from flask.cli import with_appcontext


@click.group()
def cli():
    """Main entry point"""


@cli.command("init")
@with_appcontext
def init():
    """Create a new admin user"""
    from myapi.extensions import db
    from myapi.models import User

    print(db.engine.url.database)

    click.echo("create user")
    user = User(username="testuser", email="testuser@mail.com", password="testpassword", active=True)
    db.session.add(user)
    db.session.commit()
    click.echo("created user admin")


if __name__ == "__main__":
    cli()
