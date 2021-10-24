import React from 'react'
import '../Pagelayout.css'
import QuizQuestionAnswer from '../../Components/QuizQuestion/QuizQuestionAnswer'

const QuizFeedback = () => {
  const options = { A: 'yes', B: 'hello', C: 'Maybe', D: 'I am not sure' }
  return (
    <div id='pagelayout'>
      <div id='section-header'>
        <h5 id='page-title'>Feedback: Quiz 1- Introduction to Variable</h5>
      </div>
      <QuizQuestionAnswer
        question_number='1'
        question='Please select the correct option'
        options={options}
        CorrectAnswer='C'
        WrongAnswer='A'
      />

      <QuizQuestionAnswer
        question_number='1'
        question='Please select the correct option'
        options={options}
        CorrectAnswer='C'
        WrongAnswer='A'
      />
    </div>
  )
}

export default QuizFeedback
