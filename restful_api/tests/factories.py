import factory
from myapi.models import User, Course

class UserFactory(factory.Factory):

    username = factory.Sequence(lambda n: "user%d" % n)
    email = factory.Sequence(lambda n: "user%d@mail.com" % n)
    password = "mypwd"

    class Meta:
        model = User

class CourseFactory(factory.Factory):
    cid = factory.Sequence(lambda n: "%d" % n)
    name = factory.Sequence(lambda n: "course %d" % n)
    description = factory.Sequence(lambda n: "course %d description" % n)
    class Meta:
        model = Course