import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import {RiArtboardFill} from "react-icons/ri"


export const SidebarData=[
    {
        title:'Home',
        path:'/',
        icon: <AiIcons.AiFillHome />,
        cName:'nav-text'
    },
    {
        title:'Courses',
        path:'/courses',
        icon: <RiArtboardFill />,
        cName:'nav-text'
    },
    {
        title:'Records',
        path:'/records',
        icon: <FaIcons.FaListAlt />,
        cName:'nav-text'
    },

]