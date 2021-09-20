import React from 'react'
import * as Bs from 'react-icons/bs'
import * as Io from 'react-icons/io'
import "./TopNav.css"

const TopNav = () => {
    return (
        <div>
            <div>
            <div className='header'>
              <span className='TopHeader'>
                <Io.IoMdNotifications size={25} />
                <span></span>
                <Bs.BsPeopleCircle size={25} />
              </span>
            </div>
          </div>
            
        </div>
    )
}

export default TopNav
