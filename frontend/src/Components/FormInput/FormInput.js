import React from 'react'
import PropTypes from 'prop-types'

const FormInput = (props) => {
    return (
        <div className='row g-6 align-items-center'  style={{display:'none'}} >
        <div className='col-auto'>
          <label className='col-form-label'>{props.labelName}</label>
        </div>
        <div className='col-auto input-box-size'>
          <input
            type={props.inputType}
            className='form-control'
            onChange={props.handleChange}
            name={props.inputName}
          />
        </div>
      </div>
    )
}

FormInput.propTypes = {
    labelName: PropTypes.string,
    inputType: PropTypes.string,
    handleChange: PropTypes.func,
    inputName:PropTypes.string, 
  }

export default FormInput
