import React from 'react'
import ContentCard from '../../Components/ContentCard/ContentCard'
import './CourseContent.css'
import '../Pagelayout.css'

const CourseContent = () => {
  return (
    <div id='pagelayout'>
      <div id='section-header'>
        <h5 id='page-title'>IS111: Introduction to Python (Course Content)</h5>

         {/* <div className='progress'>
        <div
          className='progress-bar'
          role='progressbar'
          style={{'width': '25%'}}>
          25%
        </div> */}
      </div> 

        Your Progress
      <div className='progress'>
          
        <div
          className='progress-bar'
          role='progressbar'
          style={{'width': '25%'}}>
          25%
        </div>
      </div>

      {/* <div className='page-subtitle'>There are 3 lessons in this course</div> */}
      <div className='row'>
        <div className='col'>
          <ContentCard
            status={true}
            lessonNumber='1'
            lessonTitle='Introduction to variable'
          />
          <ContentCard
            status={false}
            lessonNumber='2'
            lessonTitle='Functions'
          />
          <ContentCard
            status={false}
            lessonNumber='3'
            lessonTitle='Application'
          />
        </div>

        {/* <div className='col-3'>
          <div className='white-bg'>
                Your progress<br/>
                <b>50%</b>

          </div>
    
        </div> */}
      </div>
    </div>
  )
}

export default CourseContent
