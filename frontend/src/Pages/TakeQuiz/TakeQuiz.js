import React, { useReducer, useState, useEffect } from 'react'
import QuizQuestion from '../../Components/QuizQuestion/QuizQuestion'
import '../Pagelayout.css'
import GeneralModal from '../../Components/GeneralModal/GeneralModal'
import { useHistory, useLocation } from 'react-router-dom'
import { object } from 'prop-types'
import { getQuiz, getEmployeeID, postQuizAttempt } from '../../Apis/Api'
import Spinner from '../../Components/Spinner/Spinner'
import Empty from '../../Components/Empty/Empty'

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  }
}

const TakeQuiz = () => {
  const location = useLocation()
  const { course_id, trainer_id, session_id } = location.state
  const [employeeId, setEmployeeId] = useState()
  const [quizQuestions, setQuizQuestions] = useState([])
  const [quizAnswers, setQuizAnswers] = useState([])
  const [viewScore, setScore] = useState()
  const [isLoading, setLoading] = useState(true)
  const [qnId, setQnId] = useState()
  const [yesQuiz, setYesQuiz] = useState(true)
  const history = useHistory()

  useEffect(() => {
    setEmployeeId(getEmployeeID())


    getQuiz(course_id, session_id, trainer_id)
      .then((response) => {
        const allQuestions = response.data.quiz.questions
        const question_id=response.data.quiz.questions[0].question_id
        setQnId(question_id)
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
        setQuizQuestions(formattedQuestions)
      })
      .catch(() => {
        setYesQuiz(!yesQuiz)
      })
      .then(() => setLoading(false))
  }, [])

  const [formData, setFormData] = useReducer(formReducer, {})
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    })
  }
  const [confirmSubmission, setConfirmSubmission] = React.useState(false)
  const [resultsModal, setResultModal] = React.useState(false)
  

  function handleClick() {
    postQuizAttempt(course_id, session_id, trainer_id, quizAnswers)
      .then((response) => {
        const score_arr = response.data.score.split('/')
        if (parseInt(score_arr.slice(-1)) / 2 <= parseInt(score_arr.slice())) {
          setScore(
            `Congratulations! You passed! \n Your score is  ${response.data.score}`
          )
          setResultModal(true)
          setConfirmSubmission(false)
        } else {
          setScore(
            `Ohh noooo!! Please try harder next time!  \n Your score is  ${response.data.score}`
          )
          setResultModal(true)
          setConfirmSubmission(false)
        }
      })
      .catch((error) => {
        return error
      })
  }

  const total_answered = Object.keys(formData).length
  const total_question = quizQuestions.length

  function formatAnswers() {
    const answer = []
    for (const question in formData) {
      const temp_anwswer = {
        course_id: course_id,
        section_id: session_id,
        trainer_id: trainer_id,
        question_id: qnId,
        eng_id: employeeId,
        answer_label: formData[question],
      }
      answer.push(temp_anwswer)
    }

    const detail_input = {
      course_id: course_id,
      eng_id: employeeId,
      section_id: session_id,
      trainer_id: trainer_id,
      answers: answer,
    }

    setQuizAnswers(detail_input)
  }

  return (
    <div id='pagelayout'>
      {isLoading ? (
        <Spinner />
      ) : yesQuiz ? (
        <>
          <div id='section-header'>
            <h5 id='page-title'>Section {session_id} Quiz</h5>
          </div>

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
                formatAnswers()
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

          <GeneralModal
            show={resultsModal}
            onHide={() => setResultModal(false)}
            modal_title='Your Score'
            modal_content={viewScore}
            button_content='Back to Home Page'
            button_action={() => {
              setResultModal(false)

              history.goBack()
            }}
          />
        </>
      ) : (
        <Empty text='Quiz is still being set up, come back later!' />
      )}
    </div>
  )
}

TakeQuiz.propTypes = {
  location: object,
}

export default TakeQuiz
