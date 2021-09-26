import React from 'react'
// import '../../Pages/Pagelayout.css'
import './CourseDescription.css'
import * as Bs from 'react-icons/bs'
import * as Fi from 'react-icons/fi'
const FormDescription = () => {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div className='white-bg course-detail'>
          <h4>Course Details</h4>
          <hr />
          <div className='row'>
            <div className='col'>  <b><Fi.FiCalendar /> Start</b></div>
            <div className='col'>  <b><Fi.FiCalendar /> End</b></div>
            <div className='col'><b> <Bs.BsPeopleCircle/>&nbsp; Instructor</b></div>
          </div>

        <div className='row'>
            <div className='col'> 4 January 2021</div>
            <div className='col'> 21 January 2021</div>
            <div className='col'> Daniel Lim</div>
          </div>
          <br/>
        </div>

        <div style={{paddingLeft:'1rem'}}></div>

        <div className='white-bg eligibility'>
          <h4>Your Eligibility</h4>
          <hr />
          <h3 className='tick-icon'> <Fi.FiCheckCircle /> OKAY!</h3>
        </div>
      </div>
      <br />

      <div className='white-bg'>
        <h4>Description</h4>
        <hr />
        <p>
          This Specialization builds on the success of the Python for Everybody
          course and will introduce fundamental programming concepts including
          data structures, networked application program interfaces, and
          databases, using the Python programming language. In the Capstone
          Project, you’ll use the technologies learned throughout the
          Specialization to design and create your own applications for data
          retrieval, processing, and visualization.
        </p>
      </div>
    </div>
  )
}

export default FormDescription
