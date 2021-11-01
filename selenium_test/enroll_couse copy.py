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


enrolled_nav=driver.find_element_by_id('Enrolled')
enrolled_nav.click()
select_course= driver.find_element_by_id('course two name')
select_course.click()

select_quiz= driver.find_elements_by_class_name('quiz-link')[0]
select_quiz.click()

all_quiz_question= driver.find_elements_by_id('quiz_question')

# all_quiz_question.find_elements_by_class_name('form-check-label')[0].click()


for i in range(len(all_quiz_question)):
    question_options=all_quiz_question[i].find_elements_by_id('quiz_option')
    question_options[0].click()

submit_button= driver.find_element_by_id('submit_quiz')
submit_button.click()

submit_modal= driver.find_element_by_id('Submit Quiz')



# select_class= driver.find_element_by_id('classbutton')
# select_class.click()

# self_enroll= driver.find_element_by_id('engineer_enroll_button')
# time.sleep(1)
# if self_enroll.is_enabled():
#     print('enabled')
#     self_enroll.click()
# else:
#     print('button not clickable')

# modal_title= driver.find_element_by_id('Self-Enrollment Request Received')
# print(modal_title)



time.sleep(3)

driver.close()