import React from 'react'
import { func, string, object } from 'prop-types'
import './QuizQuestion.css'

const QuizQuestionAnswer = (props) => {

  const CorrectAnswer=props.CorrectAnswer
  const WrongAnswer=props.WrongAnswer

  console.log(CorrectAnswer, WrongAnswer)


  return (
    <div className='white-bg table-padding'>
      <div className='quiz-number'>Question {props.question_number}</div>
      <div className='quiz-question'>{props.question}</div>

      {Object.keys(props.options).map((option, option_key) => (

        <div key={option_key} className={(option== CorrectAnswer)? 'optionColor-Correct': (option== WrongAnswer)? 'optionColor-Wrong': 'ho'}>
          <div className='form-check quiz-option'>
            <label className='form-check-label '>
              <input
                className='form-check-input'
                type='radio'
                name={props.question_number}
                value={option}
                onChange={props.handleChange}
                key={option_key}
                disabled
              />
              {props.options[option]}
            </label>
          </div>
        </div>
      ))}
    </div>
  )
}

QuizQuestionAnswer.propTypes = {
  handleChange: func,
  question_number: string,
  question: string,
  options: object,
  CorrectAnswer: string,
  WrongAnswer: string
}

export default QuizQuestionAnswer
