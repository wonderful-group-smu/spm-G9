import React from 'react'
import './ContentCard.css'
import * as Fi from 'react-icons/fi'

import {bool, string} from 'prop-types'

const ContentCard = (props) => {
  const contentStatus = props.status
  return (
    <div className='row-wrapper'>
      <div className='row content-bg'>
        <div className='col-2  content-title'>
          LESSON<div>{props.lessonNumber}</div>
        </div>
        <div className='col '>
          <div className='content-subtitle'>{props.lessonTitle}</div>
          <p>Download Materials</p>
        </div>

        <div className='col-2 content-status-parent'>
          {contentStatus ? (
            <div className='content-status-child completed'>
              <Fi.FiCheckCircle size={40} />
              <div>Completed</div>
            </div>
          ) : (
            <div className='content-status-child incomplete'>
              <Fi.FiXCircle size={40} />
              <div>Incomplete</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}



ContentCard.propTypes = {   
    status: bool,
    lessonNumber: string,
    lessonTitle: string
  }
  

export default ContentCard
