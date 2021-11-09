import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import React, { useState, useEffect } from 'react'
import Navbar from './Components/Navbars/Navbar'
import Courses from './Pages/Courses/Courses'
import EnrolmentRequest from './Pages/EnrolmentRequest/EnrolmentRequest'
import Enrolled from './Pages/Enrolled/Enrolled'
import TopNav from './Components/Navbars/TopNav/TopNav'
import CourseClasses from './Pages/CourseClasses/CourseClasses'
import CreateClass from './Pages/CreateClass/CreateClass'
import ClassDetails from './Pages/ClassDetails/ClassDetails'
import CreateSection from './Pages/CreateSection/CreateSection'
import LoginPage from './Pages/LoginPage/LoginPage'
import CourseContent from './Pages/CourseContent/CourseContent'
import TakeQuiz from './Pages/TakeQuiz/TakeQuiz'


import { getEmployeeRole } from './Apis/Api'

function App() {
  const [leftOpen, setOpen] = useState(true)
  const [showNavbar, setNavbar] = useState('open')
  const [iconColor, setIconColor] = useState('icon')
  const [loginStatus, setLoginStatus] = useState(false)
  const [employeeRole, setEmployeeRole] = useState()

  // const loginStatus = false

  const toggleSidebar = () => {
    setOpen(!leftOpen)
    if (leftOpen) {
      setNavbar('open')
      setIconColor('icon')
    } else {
      setNavbar('closed')
      setIconColor('icon-closed')
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setEmployeeRole(getEmployeeRole())
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
  }, [])

  console.log(employeeRole)
  return (
    <>
      <div id='layout'>
        <Router>
          {loginStatus == false ? (
            <LoginPage />
          ) : (
            <>
              <Navbar
                leftOpen={showNavbar}
                toggleSidebar={toggleSidebar}
                iconColor={iconColor}
              ></Navbar>

              <div id='main'>
                <TopNav />
                <div className='content'>
                  <Switch>
                    {/* ONLYHR */}
                    <Route
                      path='/enrolmentrequest'
                      component={EnrolmentRequest}
                    />
                    <Route path='/createclass' component={CreateClass} />
                    <Route path='/createsection' component={CreateSection} />

                    {/* OnlyEngineers */}
            
                    <Route path='/takequiz' component={TakeQuiz} />
                    <Route path='/enrolled' component={Enrolled} />

                    {/* ALL */}

                    <Route path='/coursecontent' component={CourseContent} />
                    <Route path='/courseclasses' component={CourseClasses} />
                    <Route path='/classdetails' component={ClassDetails} />
                    <Route path='/' component={Courses} />

                    {/* Notneed */}

                    {/* <Route path='/' component={Home} />

                    {/* <Route path='/quiz' component={Quiz} /> */}
                    {/* <Route path='/courses' component={Courses} />   */}
                  </Switch>
                </div>
              </div>
            </>
          )}
        </Router>
      </div>
    </>
  )
}
export default App

// <div id='layout'>
//         <Router>
//           <Navbar leftOpen={showNavbar} toggleSidebar={toggleSidebar} iconColor={iconColor}></Navbar>

//           <div id='main'>
//             <Switch>
//               <Route path='/loginpage' component={LoginPage} />
//             </Switch>
//             <TopNav />
//             <div className='content'>
//             <Switch>

//               <Route path='/enrolmentrequest' component={EnrolmentRequest} />
//               <Route path='/courses/selfenrollmentform' component={SelfEnrollmentForm} />
//               <Route path='/courses' component={Courses} />
//               <Route path='/records' component={Records} />
//               <Route path='/enrolled' component={Enrolled} />
//               <Route path='/createcourse' component={CreateCourse} />
//               <Route path='/hrclasses' component={HrClasses} />
//               <Route path='/hrclassdetails' component={HrClassDetails} />
//               <Route path='/' component={Home} />
//             </Switch>
//             </div>
//           </div>

//         </Router>
//       </div>
//     </>
