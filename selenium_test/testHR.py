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
            "loginUsername").send_keys("testengineer")
        self.driver.find_element_by_id(
            'loginPassword').send_keys("testpassword")
        self.driver.find_element_by_id('loginButton').click()

    def test_approve_self_enroll(self):
        driver = self.driver
        enrolment_request_nav = driver.find_element_by_id('Enrolment Request')
        enrolment_request_nav.click()

        check_buttons = driver.find_elements_by_class_name('check')
        if len(check_buttons) > 0:
            check_buttons[0].click()
            modal_title = driver.find_elements_by_tag_name('h5')[1].text
            self.assertEqual("Confirm Request", modal_title, 'Does not match')
            submit_request = driver.find_element_by_class_name(
                'confirm-enroll')
            submit_request.click()
            time.sleep(3)
        else:
            print('No request found')

    def test_approve_self_enroll(self):
        driver = self.driver
        # Navigate to Course Page
        enrolment_request_nav = driver.find_element_by_id('Enrolment Request')
        enrolment_request_nav.click()
        check_buttons = driver.find_elements_by_class_name('cross')
        if len(check_buttons) > 0:
            check_buttons[0].click()
            modal_title = driver.find_elements_by_tag_name('h5')[1].text
            self.assertEqual("Reject Request", modal_title, 'Does not match')
            submit_request = driver.find_element_by_class_name(
                'confirm-enroll')
            submit_request.click()
            time.sleep(3)
        else:
            print('No request found')

    def tearDown(self):
        # to close the browser
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
