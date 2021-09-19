# cookiecutter-flask-restful

Added a Cookiecutter template for flask restful, including blueprints, application factory, and more.

## Introduction

This cookie cutter is a very simple boilerplate for starting a REST api using Flask, flask-restful, marshmallow, SQLAlchemy and jwt.
It comes with basic project structure and configuration, including blueprints, application factory and basics unit tests.

Features

* Simple flask application using application factory, blueprints
* [Flask command line interface](http://flask.pocoo.org/docs/1.0/cli/) integration
* Simple cli implementation with basics commands (init, run, etc.)
* [Flask Migrate](https://flask-migrate.readthedocs.io/en/latest/) included in entry point
* Authentication using [Flask-JWT-Extended](http://flask-jwt-extended.readthedocs.io/en/latest/) including access token and refresh token management
* Simple pagination utils
* Unit tests using pytest and factoryboy
* Configuration using environment variables
* OpenAPI json file and swagger UI

## Usage

- [cookiecutter-flask-restful](#cookiecutter-flask-restful)
  - [Introduction](#introduction)
  - [Usage](#usage)
  - [Setup](#setup)
    - [Install project requirements](#install-project-requirements)
    - [Run the REST API locally](#run-the-rest-api-locally)
    - [Authentication Demo](#authentication-demo)
    - [Tips to start work on a new service](#tips-to-start-work-on-a-new-service)
  - [Running tests](#running-tests)
    - [Using tox](#using-tox)
    - [Using pytest directly](#using-pytest-directly)
    - [Using docker](#using-docker)
  - [Installing a wsgi server](#installing-a-wsgi-server)
    - [Running with gunicorn](#running-with-gunicorn)
    - [Running a task](#running-a-task)
  - [Using docker](#using-docker-1)
  - [Makefile usage](#makefile-usage)
  - [Using APISpec and Swagger](#using-apispec-and-swagger)
  - [Used packages](#used-packages)

## Setup

### Install project requirements

Let's say you named your app `myapi` and your project `restful_api`

You can install it using pip:

```
cd ./restful_api

python -m venv .venv

# Depending on mac or windows
source .venv/Scripts/activate
source .venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Build CLI tool to initialize DB
pip install -e .
```

To list all commands

```
flask --help
flask myapi --help
```

### Run the REST API locally

Run the WAMP server and create a new database with PHPMyAdmin. For example, I am running MYSQL server on port 3306 with username root and no password. My new database name is `spmg9`.

So I place this `.flaskenv` file at `./restful_api`:

```
FLASK_ENV=development
FLASK_APP=myapi.app:create_app
SECRET_KEY=changeme
DATABASE_URI=mysql+pymysql://root:@localhost:3306/spmg9
```

Avaible configuration keys:

* `FLASK_ENV`: flask configuration key, enables `DEBUG` if set to `development`
* `SECREY_KEY`: your application secret key
* `DATABASE_URI`: SQLAlchemy connection string

Run commands to migrate the SQLAlchemy schemas into MySQL database.

I recommend watching this [tutorial](https://www.youtube.com/watch?v=BAOfjPuVby0).

```
# Prepare to migrate SQLAlchemy changes
flask db migrate

# Migrade SQLAlchemy changes
flask db upgrade

# Initialize with custom commands
flask myapi init
```

Run the Flask application.

```
flask run
```

You can test out with the authentication endpoint below. If the setup is successful, there will be a HTTP `200` response.

### Authentication Demo

To access protected resources, you will need an access token. You can generate 
an access and a refresh token using `/auth/login` endpoint, example using curl

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "testuser", "password": "testpassword"}' http://localhost:5000/auth/login
```

You can use access_token to access protected endpoints as a Bearer Token.

You can use refresh token to retrieve a new access_token using the endpoint `POST /auth/refresh`.

### Tips to start work on a new service

To create new schemas, modify `myapi/models`. To create new endpoints, create a new blueprint in a new folder by referring to `myapi/auth` and `myapi/api`. Then register the blueprint in `myapi/app.py`. To add dummy variables on initialization, add to `myapi/manage.py`.

Then run `flask db migrate` and `flask db upgrade` to update the schemas in the current database. Execute `flask run` to run the application.


## Running tests


### Using tox

Simplest way to run tests is to use tox, it will create a virtualenv for tests, install all dependencies and run pytest

```
tox
```

If you just want to run pytest and avoid linters you can use 

```
tox -e test
```

### Using pytest directly

If you want to run pytest manually without using tox you'll need to install some dependencies before

```
pip install pytest pytest-runner pytest-flask pytest-factoryboy pytest-celery factory_boy pytest-cov
```

Then you can invoke pytest

```
pytest --cov=myapi tests/
```

Note that tox is setting environment variables for you when testing, but when using pytest directly that's not the case. To avoid setting up env variables each time you run pytest, this cookiecutter provide a `.testenv` file that contains default configuration for testing. Don't forget to update it if your local env doesn't match those defaults.

### Using docker

Testing with docker is another great option, since it take cares of everything and spawn required services for you. To run tests within docker containers, you can use the provided Makefile:

Build images:

```bash
make build
```

Running tox with flake8, black and pytest:

```bash
make tox
```

Running tox with pytest only:

```bash
make tests
```

## Installing a wsgi server

### Running with gunicorn

This project provide a simple wsgi entry point to run gunicorn or uwsgi for example.

For gunicorn you only need to run the following commands

```
pip install gunicorn
gunicorn myapi.wsgi:app
```

And that's it ! Gunicorn is running on port 8000

If you chose gunicorn as your wsgi server, the proper commands should be in your docker-compose file.

### Running a task

To run a task you can either import it and call it

```python
>>> from myapi.tasks.example import dummy_task
>>> result = dummy_task.delay()
>>> result.get()
'OK'
```

## Using docker

**WARNING** both Dockerfile and `docker-compose.yml` are **NOT** suited for production, use them for development only or as a starting point.

This template offer simple docker support to help you get started and it comes with both Dockerfile and a `docker-compose.yml`. Please note that docker-compose is mostly useful when using celery
since it takes care of running rabbitmq, redis, your web API and celery workers at the same time, but it also work if you don't use celery at all.

Dockerfile has intentionally no entrypoint to allow you to run any command from it (server, shell, init, celery, ...)

Note that you still need to init your app on first start, even when using compose.

```bash
docker build -t myapp .
...
docker run --env-file=.flaskenv myapp myapi init
docker run --env-file=.flaskenv -p 5000:5000 myapp myapi run -h 0.0.0.0
 * Serving Flask app "myapi.app:create_app" (lazy loading)
 * Environment: development
 * Debug mode: on
 * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 214-619-010
```

With compose

```bash
docker-compose up
...
docker exec -it <container_id> flask myapi init
```

With docker-compose and the Makefile
```bash
make init
```

## Makefile usage

Initizalize the environment
```bash
make init
```

Build the containers
```bash
make build
```

Run the containers
```bash
make run
```

Create new database migration
```bash
make db-migrate
```

Apply database migrations
```bash
make db-upgrade
```

Run tests inside containers
```bash
make test
```

## Using APISpec and Swagger

This boilerplate comes with pre-configured APISpec and swagger endpoints. Using default configuration you have two endpoints avaible:

* `/swagger.json`: return OpenAPI specification file in json format
* `/swagger-ui`: swagger UI configured to hit OpenAPI json file

This come with a very simple extension that allow you to override basic settings of APISpec using your `config.py` file:

* `APISPEC_TITLE`: title for your spec, default to `{{cookiecutter.project_name}}`
* `APISPEC_VERSION`: version of your API, default to `1.0.0`
* `OPENAPI_VERSION`: OpenAPI version of your spec, default to `3.0.2`
* `SWAGGER_JSON_URL`: Url for your JSON specifications, default to `/swagger.json`
* `SWAGGER_UI_URL`: Url for swagger-ui, default to `/swagger-ui`
* `SWAGGER_URL_PREFIX`: URL prefix to use for swagger blueprint, default to `None`

## Used packages

* [Flask](http://flask.pocoo.org/)
* [Flask-RESTful](https://flask-restful.readthedocs.io/en/latest/)
* [Flask-Migrate](https://flask-migrate.readthedocs.io/en/latest/)
* [Flask-SQLAlchemy](http://flask-sqlalchemy.pocoo.org/2.3/)
* [Flask-Marshmallow](https://flask-marshmallow.readthedocs.io/en/latest/)
* [Flask-JWT-Extended](http://flask-jwt-extended.readthedocs.io/en/latest/)
* [marshmallow-sqlalchemy](https://marshmallow-sqlalchemy.readthedocs.io/en/latest/)
* [passlib](https://passlib.readthedocs.io/en/stable/)
* [tox](https://tox.readthedocs.io/en/latest/)
* [pytest](https://docs.pytest.org/en/latest/)
* [factoryboy](http://factoryboy.readthedocs.io/en/latest/)
* [dotenv](https://github.com/theskumar/python-dotenv)
* [apispec](https://github.com/marshmallow-code/apispec)