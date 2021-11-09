import React from 'react'
import * as FaIcons from 'react-icons/fa'
import { RiArtboardFill } from 'react-icons/ri'
import { getEmployeeRole } from '../../Apis/Api'

const Data = [
  {
    title: 'Courses',
    path: '/',
    icon: <RiArtboardFill />,
    cName: 'nav-text',
  },
]

try {
  const employeeRole = getEmployeeRole()
  if (employeeRole != 'ENG') {
    Data.push({
      title: 'Enrolment Request',
      path: '/enrolmentrequest',
      icon: <FaIcons.FaListAlt />,
      cName: 'nav-text',
    })

  } else {

    Data.push({
      title: 'Enrolled',
      path: '/enrolled',
      icon: <FaIcons.FaTasks />,
      cName: 'nav-text',
    })
  }
} catch (e) {
  console.log(e)
}



export const SidebarData = Data


