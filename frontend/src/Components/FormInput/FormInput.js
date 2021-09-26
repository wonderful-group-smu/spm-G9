import React from 'react'
import PropTypes from 'prop-types'

const FormInput = (props) => {
    return (
      // style={{display:'none'}}>   
        <div className='row g-6 align-items-center'  style={{display:'none'}} >  {/*need to have display none if dont want to take up html sp*/}
        <div className='col-auto'>
          <label className='col-form-label'>{props.labelName}</label>
        </div>
        <div className='col-auto input-box-size'>
          <input
            type={props.inputType}
            className='form-control'
            onChange={props.handleChange}
            name={props.inputName}
            // value={props.inputValue}
          />
        </div>
        {/* <div className='col-auto'>
        <span id='passwordHelpInline' className='form-text'>
          Must be 8-20 characters long.
        </span>
      </div> */}
      </div>
    )
}

FormInput.propTypes = {
    labelName: PropTypes.string,
    inputType: PropTypes.string,
    handleChange: PropTypes.func,
    inputName:PropTypes.string, 
    // inputValue: PropTypes.string
  }

export default FormInput
