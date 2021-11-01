import React from 'react'
import { ReactComponent as EmptyPage } from '../../Assets/EmptyPage.svg'
import {string} from 'prop-types'

const Empty = (props) => {
  return (
    <div className='center-content-flexbox'>
      <div style={{ width: '500px' }}>
        <EmptyPage />
        <h4 style={{textAlign:'center', color:'rgb(243, 107, 130)'}}>{props.text}</h4>
      </div>
      
    </div>
  )
}


Empty.propTypes = {
    text: string
  }
  

export default Empty

