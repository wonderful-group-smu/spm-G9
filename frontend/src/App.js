import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import React, { useState } from 'react'

import Navbar from './Components/Navbars/Navbar'
import Courses from './Pages/Courses/Courses'
import Records from './Pages/Records/Records'
import SelfEnrollmentForm from './Pages/SelfEnrollmentForm/SelfEnrollmentForm'

import TopNav from './Components/Navbars/TopNav/TopNav'
import Home from './Pages/Home/Home'

function App() {
  const [leftOpen, setOpen] = useState(true)
  const [showNavbar, setNavbar] = useState('open')
  const [iconColor,setIconColor] = useState('icon')

  console.log(typeof(iconColor))

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
              <Route path='/courses/selfenrollmentform' component={SelfEnrollmentForm} />
              <Route path='/courses' component={Courses} />
              <Route path='/records' component={Records} />
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
