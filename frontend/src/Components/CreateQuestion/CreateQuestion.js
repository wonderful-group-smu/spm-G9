import { useState } from 'react';
import { array, func, number } from "prop-types";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import * as Im from 'react-icons/im';
import './CreateQuestion.css';

const CreateQuestion = (props) => {
    const [questionType, setQuestionType] = useState(true);
    const questionID = props.questionID;
    const questions = props.questions;
    const setQuestions = props.setQuestions;

    const updateQuestion = (e) => {
        const questionIndex = questions.findIndex((obj => obj.questionID == questionID));
        questions[questionIndex].questionText = e.target.value;
        setQuestions(questions);
    }

    const deleteQuestion = () => {
        setQuestions(questions.filter(question => question.questionID != questionID))
    }

    const changeQuestionType = (e) => {
        if (e.target.id == 'question-type-mcq') {
            setQuestionType(true);
        }
        else if (e.target.id == 'question-type-tf') {
            setQuestionType(false);
        }
    }

    const updateOption = (e) => {
        const questionIndex = questions.findIndex((obj => obj.questionID == questionID));
        const thisOption = e.target.id; // e.target.id should be in the form "optionA", "optionB" etc.
        questions[questionIndex][thisOption] = e.target.value;
        setQuestions(questions);
    }

    const updateCorrectAnswer = (e) => {
        const questionIndex = questions.findIndex((obj => obj.questionID == questionID));
        const correctAnswer = e.target.id.slice(-1); // e.target.id should be in the form "answer-A", "answer-B" etc.
        questions[questionIndex]["correctAnswer"] = correctAnswer;
        setQuestions(questions);
    }

    return (
        <div className="create-question-container">
            <div className="question">
                <h6>
                    Question {questionID}
                    <button type="button" className="btn-sm btn-secondary delete-question" >
                        <Im.ImBin className="bin-icon" onClick={deleteQuestion} /> Delete Question
                    </button>
                </h6>
                <textarea
                    className="form-control"
                    id="inputQuestionDesc"
                    placeholder="Input Question..."
                    rows="4"
                    onChange={updateQuestion}
                />
                <div className="form-check" id="question-type">
                    <label className="form-check-label" htmlFor="question-type-mcq">
                        MCQ<input className="form-check-input" type="radio"
                            name={"question-type-" + questionID} id="question-type-mcq" onClick={changeQuestionType} defaultChecked />
                    </label>
                </div>
                <div className="form-check" id="question-type">
                    <label className="form-check-label" htmlFor="question-type-tf">
                        True/False<input className="form-check-input" type="radio"
                            name={"question-type-" + questionID} id="question-type-tf" onClick={changeQuestionType} />
                    </label>
                </div>
            </div>

            <div className="answer-options-container">
                <h6>
                    {questionType ? "Options" : "Correct Answer"}
                </h6>
                <div className="answer-options">
                    {questionType ?
                        <>
                            {
                                ["A", "B", "C", "D"].map((letter, i) => {
                                    return (
                                        <div className="input-group" key={i}>
                                            <span className="input-group-text" >
                                                {letter})
                                            </span>
                                            <input
                                                type="text" className="form-control answer-option"
                                                placeholder={"Input Option " + letter + "..."} aria-label={"option-" + letter} aria-describedby={"option-" + letter}
                                                onChange={updateOption} id={"option" + letter}
                                            />
                                            <div className="form-check" id="correct-answer">
                                                <OverlayTrigger placement="top" overlay={
                                                    <Tooltip>
                                                        Set {letter} as correct answer
                                                    </Tooltip>
                                                }>
                                                    <input className="form-check-input" type="radio"
                                                        name={"correct-answer-" + questionID} id={"answer-" + letter}
                                                        onClick={updateCorrectAnswer}
                                                    />
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </>
                        :
                        <>
                            <div className="form-check" id="correct-answer-tf">
                                <label className="form-check-label" htmlFor="correct-answer-true">
                                    True<input className="form-check-input" type="radio"
                                        name={"correct-answer-" + questionID} id="correct-answer-true" />
                                </label>
                            </div>
                            <div className="form-check" id="correct-answer-tf">
                                <label className="form-check-label" htmlFor="correct-answer-false">
                                    False<input className="form-check-input" type="radio"
                                        name={"correct-answer-" + questionID} id="correct-answer-false" />
                                </label>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

CreateQuestion.propTypes = {
    questionID: number,
    questions: array,
    setQuestions: func,
}

export default CreateQuestion;