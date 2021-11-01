import React, { useReducer, useState, useEffect } from 'react'
import QuizQuestion from '../../Components/QuizQuestion/QuizQuestion'
import '../Pagelayout.css'
import './TakeQuiz.css'
import GeneralModal from '../../Components/GeneralModal/GeneralModal'
import { useHistory, useLocation } from 'react-router-dom'
import { object } from 'prop-types'
import { getQuiz } from '../../Apis/Api'
import Spinner from '../../Components/Spinner/Spinner'

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  }
}

const TakeQuiz = () => {
  const location = useLocation()
  const { course_id, trainer_id, session_id } = location.state
  const [quizQuestions, setQuizQuestions] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getQuiz(course_id, session_id, trainer_id)
      .then((response) => {
        console.log(response.data)
        const allQuestions = response.data.quiz.questions
        const formattedQuestions = []
        for (let i = 0; i < allQuestions.length; i++) {
          const question = allQuestions[i].question
          const question_options = allQuestions[i].question_options
          const formattedOptions = {}

          for (let option = 0; option < question_options.length; option++) {
            const option_value = question_options[option].option_value
            const option_label = question_options[option].option_label
            formattedOptions[option_label] = option_value
          }
          formattedQuestions.push({
            question: question,
            options: formattedOptions,
          })
        }
        console.log(formattedQuestions)
        setQuizQuestions(formattedQuestions)
      })
      .then(() => setLoading(false))
  }, [])

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
  const total_question = quizQuestions.length

  return (
    <div id='pagelayout'>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div id='section-header'>
            <h5 id='page-title'>Section {session_id} Quiz</h5>
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
            {quizQuestions.map((data, i) => (
              <QuizQuestion
                question_number={i + 1}
                handleChange={handleChange}
                question={data.question}
                options={data.options}
                key={i}
              />
            ))}

            <button
              id='submit_quiz'
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
        </>
      )}
    </div>
  )
}

TakeQuiz.propTypes = {
  location: object,
}

export default TakeQuiz
