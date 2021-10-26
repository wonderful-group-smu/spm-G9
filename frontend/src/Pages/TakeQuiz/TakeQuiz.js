import React, { useReducer, useState, useEffect } from 'react'
import QuizQuestion from '../../Components/QuizQuestion/QuizQuestion'
import '../Pagelayout.css'
import './TakeQuiz.css'
import GeneralModal from '../../Components/GeneralModal/GeneralModal'
import { useHistory } from 'react-router-dom'
import { object } from 'prop-types'

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  }
}

const TakeQuiz = (props) => {
  const [whichQuiz, setQuiz] = useState()

  useEffect(() => {
    setQuiz(props.location.state)
  }, [])

  console.log(whichQuiz)

  const [formData, setFormData] = useReducer(formReducer, {})
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitting(true)

    setTimeout(() => {
      setSubmitting(false)
    }, 3000)
  }

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    })
  }

  const [confirmSubmission, setConfirmSubmission] = React.useState(false)

  const history = useHistory()
  function handleClick() {
    history.push('/')
  }

  const total_answered = Object.keys(formData).length
  const total_question = 2

  //   save the options to pass it into component
  const options = { A: 'yes', B: 'hello', C: 'Maybe', D: 'I am not sure' }
  const options2 = { A: 'true', B: 'hello', C: 'Maybe', D: 'I am not sure' }

  return (
    <div id='pagelayout'>
      <div id='section-header'>
        <h5 id='page-title'>Quiz 1- Introduction to Variable</h5>
      </div>

      {submitting && (
        <div>
          You are submitting the following:
          <ul>
            {Object.entries(formData).map(([name, value]) => (
              <li key={name}>
                <strong>{name}</strong>:{value.toString()}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <QuizQuestion
          question_number='1'
          handleChange={handleChange}
          question='Please select the correct option'
          options={options}
        />
        <QuizQuestion
          question_number='2'
          handleChange={handleChange}
          question='Which is the correct statement?'
          options={options2}
        />

        <button
          type='submit'
          className='fitted-button'
          onClick={() => {
            setConfirmSubmission(true)
          }}
        >
          Submit Quiz
        </button>
      </form>

      <>
        {total_answered == total_question ? (
          <>
            <GeneralModal
              show={confirmSubmission}
              onHide={() => setConfirmSubmission(false)}
              modal_title='Submit Quiz'
              modal_content='Are you sure you want to submit the quiz?'
              button_content='Yes'
              button_action={handleClick}
            />
          </>
        ) : (
          <>
            <GeneralModal
              show={confirmSubmission}
              onHide={() => setConfirmSubmission(false)}
              modal_title='Quiz not completed'
              modal_content='Please complete the quiz before submitting'
              button_content='Ok'
              button_action={() => setConfirmSubmission(false)}
            />
          </>
        )}
      </>
    </div>
  )
}

TakeQuiz.propTypes = {
  location: object,
}

export default TakeQuiz
