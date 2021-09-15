// import React from 'react'
import './Navbar.scss'

import React from 'react'
import { Link } from 'react-router-dom'
import * as Bs from 'react-icons/bs'
import * as Io from 'react-icons/io'
import { SidebarData } from './SidebarData'
import './Navbar.css'


class Layout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      leftOpen: true,
      rightOpen: true,
    }
  }

  toggleSidebar = (event) => {
    let key = `${event.currentTarget.parentNode.id}Open`
    this.setState({ [key]: !this.state[key] })
  }

  render() {
    let leftOpen = this.state.leftOpen ? 'open' : 'closed'

    return (
      <div id='layout'>
        <div id='left' className={leftOpen}>
          <div className='icon' onClick={this.toggleSidebar}>
            &equiv;
          </div>
          <div className={`sidebar ${leftOpen}`}>
            <div className='header'>
              <h3 className='title'>Wonderful Group</h3>
            </div>
            {/* <hr/> */}
            <div className='content'>
              {/* <h3>Left content</h3> */}

              <ul className='nav-menu-items'>
                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
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

        <div id='main'>
          <div>
            <div className='header'>
              <span className='TopHeader'>
                <Io.IoMdNotifications size={25} />
                <span></span>
                <Bs.BsPeopleCircle size={25} />
              </span>
            </div>
          </div>
          <div className='content'>
            <h3>Main content</h3>

            <p>
              Nam accumsan eleifend metus at imperdiet. Mauris pellentesque
              ipsum nisi, et fringilla leo blandit sed. In tempor, leo sit amet
              fringilla imperdiet, ipsum enim sagittis sem, non molestie nisi
              purus consequat sapien. Proin at velit id elit tincidunt iaculis
              ac ac libero. Vivamus vitae tincidunt ex. Duis sit amet lacinia
              massa. Quisque lobortis tincidunt metus ut commodo. Sed euismod
              quam gravida condimentum commodo.
            </p>
            <br />
            <p>
              Vivamus tincidunt risus ut sapien tincidunt, ac fermentum libero
              dapibus. Duis accumsan enim ac magna tempor, vestibulum euismod
              nisl pharetra. Ut dictum lacus eu venenatis vestibulum. Vestibulum
              euismod at arcu ac blandit. Curabitur eu imperdiet magna. Duis
              bibendum efficitur diam, eget placerat nunc imperdiet eget. Morbi
              porta at leo sed porta. Nullam eleifend eleifend quam eget dictum.
            </p>
            <br />
            <p>
              Sed nulla erat, lacinia sit amet dui at, cursus blandit neque. In
              ultricies, dui a laoreet dignissim, risus mi cursus risus, at
              luctus sem arcu non tortor. In hac habitasse platea dictumst.
              Etiam ut vulputate augue. Aenean efficitur commodo ipsum, in
              aliquet arcu blandit non. Praesent sed tempus dui, non eleifend
              nisi. Proin non finibus diam, quis finibus ante. Fusce aliquam
              faucibus mauris, id consequat velit ultricies at. Aliquam neque
              erat, fermentum non aliquam id, mattis nec justo. Nullam eget
              suscipit lectus.
            </p>
            <p>
              Sed nulla erat, lacinia sit amet dui at, cursus blandit neque. In
              ultricies, dui a laoreet dignissim, risus mi cursus risus, at
              luctus sem arcu non tortor. In hac habitasse platea dictumst.
              Etiam ut vulputate augue. Aenean efficitur commodo ipsum, in
              aliquet arcu blandit non. Praesent sed tempus dui, non eleifend
              nisi. Proin non finibus diam, quis finibus ante. Fusce aliquam
              faucibus mauris, id consequat velit ultricies at. Aliquam neque
              erat, fermentum non aliquam id, mattis nec justo. Nullam eget
              suscipit lectus.
            </p>
            <p>
              Sed nulla erat, lacinia sit amet dui at, cursus blandit neque. In
              ultricies, dui a laoreet dignissim, risus mi cursus risus, at
              luctus sem arcu non tortor. In hac habitasse platea dictumst.
              Etiam ut vulputate augue. Aenean efficitur commodo ipsum, in
              aliquet arcu blandit non. Praesent sed tempus dui, non eleifend
              nisi. Proin non finibus diam, quis finibus ante. Fusce aliquam
              faucibus mauris, id consequat velit ultricies at. Aliquam neque
              erat, fermentum non aliquam id, mattis nec justo. Nullam eget
              suscipit lectus.
            </p>
            <p>
              Sed nulla erat, lacinia sit amet dui at, cursus blandit neque. In
              ultricies, dui a laoreet dignissim, risus mi cursus risus, at
              luctus sem arcu non tortor. In hac habitasse platea dictumst.
              Etiam ut vulputate augue. Aenean efficitur commodo ipsum, in
              aliquet arcu blandit non. Praesent sed tempus dui, non eleifend
              nisi. Proin non finibus diam, quis finibus ante. Fusce aliquam
              faucibus mauris, id consequat velit ultricies at. Aliquam neque
              erat, fermentum non aliquam id, mattis nec justo. Nullam eget
              suscipit lectus.
            </p>
            <p>
              Sed nulla erat, lacinia sit amet dui at, cursus blandit neque. In
              ultricies, dui a laoreet dignissim, risus mi cursus risus, at
              luctus sem arcu non tortor. In hac habitasse platea dictumst.
              Etiam ut vulputate augue. Aenean efficitur commodo ipsum, in
              aliquet arcu blandit non. Praesent sed tempus dui, non eleifend
              nisi. Proin non finibus diam, quis finibus ante. Fusce aliquam
              faucibus mauris, id consequat velit ultricies at. Aliquam neque
              erat, fermentum non aliquam id, mattis nec justo. Nullam eget
              suscipit lectus.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Layout
