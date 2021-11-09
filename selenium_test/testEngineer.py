import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import time
# pip install webdriver-manager
# pip install selenium


class WonderfulGroup(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome(ChromeDriverManager().install())
        self.driver.get("http://localhost:3000/")
        self.driver.implicitly_wait(20)
        self.driver.find_element_by_id(
            "loginUsername").send_keys("testengineer")
        self.driver.find_element_by_id(
            'loginPassword').send_keys("testpassword")
        self.driver.find_element_by_id('loginButton').click()

    # test function to test equality of two value
    def test_engineer_self_enroll(self):
        driver = self.driver
        courses_nav = driver.find_element_by_id('Courses')
        courses_nav.click()
        select_course = driver.find_element_by_id('Essential Skills')
        select_course.click()
        select_class = driver.find_element_by_id('classbutton')
        select_class.click()
        self_enroll = driver.find_element_by_id('engineer_enroll_button')
        time.sleep(1)
        if self_enroll.is_enabled():
            print('enabled')
            self_enroll.click()
            modal_title = driver.find_element_by_id(
                'Self-Enrollment Request Received').text
            print(modal_title)
            self.assertEqual("Self-Enrollment Request Received",
                             modal_title, 'Does not match')
        else:
            print('Cannot self-enroll')
            # self.assertEqual("APPLIED/ENROLLED",
            #                  self_enroll.text, 'Does not match')

    def test_quiz(self):
        driver = self.driver
        enrolled_nav = driver.find_element_by_id('Enrolled')
        enrolled_nav.click()
        select_course = driver.find_element_by_id('Intro to Engineering')
        select_course.click()

        select_quiz = driver.find_elements_by_class_name('quiz-link')[0]
        select_quiz.click()

        all_quiz_question = driver.find_elements_by_id('quiz_question')

        for i in range(len(all_quiz_question)):
            question_options = all_quiz_question[i].find_elements_by_id(
                'quiz_option')
            question_options[0].click()

        submit_button = driver.find_element_by_id('submit_quiz')
        submit_button.click()

        submit_modal = driver.find_element_by_id('Submit Quiz').text
        self.assertEqual("Submit Quiz", submit_modal, 'Does not match')
        time.sleep(1)

        submit_request = driver.find_element_by_class_name(
            'confirm-enroll')
        submit_request.click()

        time.sleep(2)

        score_modal = driver.find_element_by_id(
            'Your Score').text
        self.assertEqual("Your Score", score_modal, 'Does not match')

    def tearDown(self):
        # to close the browser
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
