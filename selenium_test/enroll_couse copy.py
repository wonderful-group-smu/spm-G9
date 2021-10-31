from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import time

print('hi')

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get("http://localhost:3000/")
driver.maximize_window()
driver.implicitly_wait(10)  

# Login to the page
loginUsername = driver.find_element_by_id("loginUsername")
loginUsername.send_keys("testengineer")

loginPassword= driver.find_element_by_id('loginPassword')
loginPassword.send_keys("testpassword")

loginButton= driver.find_element_by_id('loginButton')
loginButton.click()

# Navigate to Course Page
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
else:
    print('button not clickable')

# modal_title= driver.find_element_by_id('Self-Enrollment Request Received')
# print(modal_title)



time.sleep(3)

driver.close()