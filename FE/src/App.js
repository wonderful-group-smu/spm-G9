import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import React, { useState } from 'react'

import Navbar from './Components/Navbars/Navbar'
import Courses from './Pages/Courses/Courses'
import Records from './Pages/Records/Records'

import TopNav from './Components/Navbars/TopNav/TopNav'
import Home from './Pages/Home/Home'

function App() {
  const [leftOpen, setOpen] = useState(true)

  const [showNavbar, setNavbar] = useState('open')

  const toggleSidebar = () => {
    setOpen(!leftOpen)
    if (leftOpen) {
      setNavbar('open')
    } else {
      setNavbar('closed')
    }
  }

  return (
    <>
      <div id='layout'>
        <Router>
          <Navbar leftOpen={showNavbar} toggleSidebar={toggleSidebar}></Navbar>

          <div id='main'>
            <TopNav />
            <div className='content'>
            <Switch>
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
