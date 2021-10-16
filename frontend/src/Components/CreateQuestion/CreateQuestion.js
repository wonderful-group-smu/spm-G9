import { useState } from 'react';
import { object } from "prop-types";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import './CreateQuestion.css';

const CreateQuestion = (props) => {
    // const [questionText, setQuestionText] = useState("");
    const [questionType, setQuestionType] = useState(true);
    const questionID = props.question.questionID;

    const changeQuestion = (e) => {
        return (e)
    }

    const changeQuestionType = (e) => {
        if (e.target.id == 'question-type-mcq') {
            setQuestionType(true);
        }
        else if (e.target.id == 'question-type-tf') {
            setQuestionType(false);
        }
    }

    return (
        <div className="create-question-container">
            <div className="question">
                <h6>{questionID}) Question Description</h6>
                <textarea
                    className="form-control"
                    id="inputQuestionDesc"
                    placeholder="Input Question..."
                    rows="4"
                    onChange={changeQuestion}
                />
                <div className="form-check" id="question-type">
                    <label className="form-check-label" htmlFor="question-type-mcq">
                        MCQ<input className="form-check-input" type="radio"
                            name={"question-type-" + questionID} id="question-type-mcq" onClick={changeQuestionType} />
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
                <h6>{questionType ? "Options" : "Correct Answer"}</h6>
                <div className="answer-options">
                    {questionType ?
                        <>
                            {
                                ["A", "B", "C", "D"].map((letter, i) => {
                                    return (
                                        <div className="input-group" key={i}>
                                            <span className="input-group-text" id={"option-" + letter}>
                                                {letter})
                                            </span>
                                            <input
                                                type="text" className="form-control answer-option"
                                                placeholder={"Input Option " + letter + "..."} aria-label={"option-" + letter} aria-describedby={"option-" + letter}
                                            />
                                            <div className="form-check" id="correct-answer">
                                                <OverlayTrigger placement="top" overlay={
                                                    <Tooltip>
                                                        Set {letter} as correct answer
                                                    </Tooltip>
                                                }>
                                                    <input className="form-check-input" type="radio"
                                                        name={"correct-answer-" + questionID} id={"answer-" + letter}
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
    question: object,
}

export default CreateQuestion;