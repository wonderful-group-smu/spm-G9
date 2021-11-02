import React from 'react'
import { useHistory } from 'react-router-dom'
import * as Bs from 'react-icons/bs'
// import * as Io from 'react-icons/io'
import './TopNav.css'
import { NavDropdown } from 'react-bootstrap'
import { getEmployeeRole } from '../../../Apis/Api'

const TopNav = () => {
  let history = useHistory()

  function logout() {
    window.localStorage.removeItem('token')
    history.push('/')
    window.location.reload(false)
  }



  return (
    <div>
      <div>
        <div className='header'>
          <span className='TopHeader'>
            <Bs.BsBell size={25} />

            <span></span>
            <b>{getEmployeeRole()}&nbsp;</b>
            <NavDropdown
              title={<Bs.BsPeopleCircle size={25} />}
              id='profile-dropdown'
            >
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </span>
        </div>
      </div>
    </div>
  )
}

export default TopNav
