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
        self.driver.find_element_by_id("loginUsername").send_keys("testengineer")
        self.driver.find_element_by_id('loginPassword').send_keys("testpassword")
        self.driver.find_element_by_id('loginButton').click()

    # test function to test equality of two value
    def test_engineer_self_enroll(self):
        driver = self.driver
        courses_nav=driver.find_element_by_id('Courses')
        courses_nav.click()
        select_course= driver.find_element_by_id('course two name')
        select_course.click()
        select_class= driver.find_element_by_id('classbutton')
        select_class.click()
        self_enroll= driver.find_element_by_id('engineer_enroll_button')
        time.sleep(1)
        if self_enroll.is_enabled():
            print('enabled')
            self_enroll.click()
            modal_title= driver.find_element_by_id('Self-Enrollment Request Received').text
            print(modal_title)
            self.assertEqual("Self-Enrollment Request Received",modal_title, 'Does not match' )
        else:
            self.assertEqual("APPLIED/ENROLLED", self_enroll.text, 'Does not match' )

    def test_testing(self):
        driver = self.driver
        courses_nav=driver.find_element_by_id('Courses')
        courses_nav.click()
        select_course= driver.find_element_by_id('course two name')
        select_course.click()
        select_class= driver.find_element_by_id('classbutton')
        select_class.click()
        self_enroll= driver.find_element_by_id('engineer_enroll_button')
        time.sleep(1)
        if self_enroll.is_enabled():
            print('enabled')
            self_enroll.click()
            modal_title= driver.find_element_by_id('Self-Enrollment Request Received').text
            print(modal_title)
            self.assertEqual("Self-Enrollment Request Received",modal_title, 'Does not match' )
        else:
            self.assertEqual("APPLIED/ENROLLED", self_enroll.text, 'Does not match' )

    def tearDown(self):
        # to close the browser
        self.driver.close()

  
if __name__ == '__main__':
    unittest.main()