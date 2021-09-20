import factory
from myapi.models import User, Engineer


class UserFactory(factory.Factory):

    username = factory.Sequence(lambda n: "user%d" % n)
    email = factory.Sequence(lambda n: "user%d@mail.com" % n)
    password = "mypwd"

    class Meta:
        model = User

class EngineerFactory(factory.Factory):
    id = factory.Sequence(lambda n: "%d" % n)
    name = factory.Sequence(lambda n: "engineer %d" % n)
    class Meta:
        model = Engineer
