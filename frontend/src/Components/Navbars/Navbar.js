// import React from 'react'
import './Navbar.scss'

import React from 'react'
import { Link } from 'react-router-dom'
// import * as Bs from 'react-icons/bs'
// import * as Io from 'react-icons/io'
import { SidebarData } from './SidebarData'
import './Navbar.css'
// import TopNav from "./TopNav/TopNav"
import { string } from 'prop-types'


function Navbar(props){

  
  return(
        <>
        <div id='left' className={props.leftOpen}>
          <div className={props.iconColor} onClick={props.toggleSidebar}>
            &equiv;
          </div>
          <div className={`sidebar ${props.leftOpen}`}>
            <div className='header'>
              <h3 className='title'>Wonderful Group</h3>
            </div>
            {/* <hr/> */}
            <div className='content'>

              <ul className='nav-menu-items'>
                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path} >
                        {item.icon}
                        <span className='item-title'>{item.title}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>

       
      </>
    
  )
}

Navbar.propTypes = {
  leftOpen: string,
  iconColor: string,
  toggleSidebar: string,
}


export default Navbar
