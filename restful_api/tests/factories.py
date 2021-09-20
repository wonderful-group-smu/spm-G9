import factory
from myapi.models import User, Employee


class UserFactory(factory.Factory):

    username = factory.Sequence(lambda n: "user%d" % n)
    email = factory.Sequence(lambda n: "user%d@mail.com" % n)
    password = "mypwd"

    class Meta:
        model = User

class EmployeeFactory(factory.Factory):
    id = factory.Sequence(lambda n: "%d" % n)
    name = factory.Sequence(lambda n: "employee %d" % n)
    user_type = factory.Sequence(lambda n: "user type %d" % n)
    class Meta:
        model = Employee
