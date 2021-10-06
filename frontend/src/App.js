import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import React, { useState } from 'react'

import Navbar from './Components/Navbars/Navbar'
import Courses from './Pages/Courses/Courses'
import Records from './Pages/Records/Records'
import EnrolmentRequest from './Pages/EnrolmentRequest/EnrolmentRequest'
import Enrolled from './Pages/Enrolled/Enrolled'
import CreateCourse from './Pages/CreateCourse/CreateCourse'
import SelfEnrollmentForm from './Pages/SelfEnrollmentForm/SelfEnrollmentForm'
import TopNav from './Components/Navbars/TopNav/TopNav'
import CourseClasses from './Pages/CourseClasses/CourseClasses'
import CreateClass from './Pages/CreateClass/CreateClass'
import Home from './Pages/Home/Home'
import ClassDetails from './Pages/ClassDetails/ClassDetails'

function App() {
  const [leftOpen, setOpen] = useState(true)
  const [showNavbar, setNavbar] = useState('open')
  const [iconColor,setIconColor] = useState('icon')

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

  return (
    <>
      <div id='layout'>
        <Router>
          <Navbar leftOpen={showNavbar} toggleSidebar={toggleSidebar} iconColor={iconColor}></Navbar>

          <div id='main'>
            <TopNav />
            <div className='content'>
            <Switch>
              <Route path='/enrolmentrequest' component={EnrolmentRequest} />
              <Route path='/courses/selfenrollmentform' component={SelfEnrollmentForm} />
              <Route path='/courses' component={Courses} />
              <Route path='/records' component={Records} />
              <Route path='/enrolled' component={Enrolled} />
              <Route path='/createcourse' component={CreateCourse} />
              <Route path='/courseclasses' component={CourseClasses} />
              <Route path='/createclass' component={CreateClass} />
              <Route path='/classdetails' component={ClassDetails} />
              <Route path='/' component={Home} />
            </Switch>
            </div>
          </div>
        </Router>
      </div>
    </>
  )
}
export default App
