import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException
import time
# pip install webdriver-manager
# pip install selenium


class WonderfulGroup(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome(ChromeDriverManager().install())
        self.driver.get("http://localhost:3000/")
        self.driver.implicitly_wait(20)
        self.driver.find_element_by_id(
            "loginUsername").send_keys("testhr")
        self.driver.find_element_by_id(
            'loginPassword').send_keys("testpassword")
        self.driver.find_element_by_id('loginButton').click()

    def test_approve_self_enroll(self):

        driver = self.driver
        enrolment_request_nav = driver.find_element_by_id('Enrolment Request')
        enrolment_request_nav.click()

        try:
            check_buttons = driver.find_elements_by_class_name('check')
            check_buttons[0].click()
            modal_title = driver.find_elements_by_tag_name('h5')[1].text
            self.assertEqual("Confirm Request", modal_title, 'Does not match')
            submit_request = driver.find_element_by_class_name(
                'confirm-enroll')
            submit_request.click()
            time.sleep(3)
            page_title = driver.find_element_by_id('title')
            self.assertEqual("Enrolment Request", page_title, 'Does not match')

        except:
            print('No request found')

    def test_reject_self_enroll(self):
        driver = self.driver
        enrolment_request_nav = driver.find_element_by_id('Enrolment Request')
        enrolment_request_nav.click()

        try:
            check_buttons = driver.find_elements_by_class_name('cross')
            check_buttons[0].click()
            modal_title = driver.find_elements_by_tag_name('h5')[1].text
            self.assertEqual("Reject Request", modal_title, 'Does not match')
            submit_request = driver.find_element_by_class_name(
                'confirm-enroll')
            submit_request.click()
            time.sleep(3)
            page_title = driver.find_element_by_id('title')
            self.assertEqual("Enrolment Request", page_title, 'Does not match')

        except:
            print('No request found')

    def test_create_course(self):
        driver = self.driver
        enrolment_request_nav = driver.find_element_by_id('Courses')
        enrolment_request_nav.click()
        create_course = driver.find_element_by_id('createCourse')
        create_course.click()

        driver.find_element_by_id('inputCourseName').send_keys("Selenium Test")
        driver.find_element_by_id('inputDesc').send_keys(
            "Selenium Test Description")

        submit_create_course = driver.find_element_by_id(
            'submit-create-course')
        submit_create_course.click()
        time.sleep(2)

    def test_create_class(self):
        driver = self.driver
        enrolment_request_nav = driver.find_element_by_id('Courses')
        enrolment_request_nav.click()
        select_course = driver.find_element_by_id('Intro to Engineering')
        select_course.click()

        create_class = driver.find_element_by_id('create_class')
        create_class.click()

        driver.find_element_by_id('inputTrainer').click()
        driver.find_elements_by_class_name('trainer-row')[0].click()

        time.sleep(2)
        driver.find_element_by_id('inputClassSize').send_keys(10)

        driver.find_elements_by_class_name('DayPickerInput')[
            0].find_element_by_tag_name('input').send_keys('2021-11-25')
        driver.find_elements_by_class_name('DayPickerInput')[
            1].find_element_by_tag_name('input').send_keys('2021-11-30')
        # time.sleep(5)

        driver.find_element_by_class_name('fitted-button').click()
        successful_creation = driver.find_element_by_id('Created Class').text
        self.assertEqual("Created Class", successful_creation,
                         'Does not match')

    def tearDown(self):
        # to close the browser
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
