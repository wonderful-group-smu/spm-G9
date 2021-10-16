import { useState } from 'react';
import { object } from "prop-types";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import './CreateQuestion.css';

const CreateQuestion = (props) => {
    const [questionType, setQuestionType] = useState(true)
    const question_id = props.question.question_id

    const changeQuestion = (e) => {
        // setQuestion({
        //     question_id: props.question_id,
        //     question: e.target.value,
        //     question_type: props.question_type,
        // })
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
                <h6>{question_id}) Question Description</h6>
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
                            name={"question-type-" + question_id} id="question-type-mcq" onClick={changeQuestionType} />
                    </label>
                </div>
                <div className="form-check" id="question-type">
                    <label className="form-check-label" htmlFor="question-type-tf">
                        True/False<input className="form-check-input" type="radio"
                            name={"question-type-" + question_id} id="question-type-tf" onClick={changeQuestionType} />
                    </label>
                </div>
            </div>

            <div className="answer-options-container">
                <h6>{questionType ? "Options" : "Correct Answer"}</h6>
                <div className="answer-options">
                    {questionType ?
                        <>
                            <div className="input-group">
                                <span className="input-group-text" id="option-a">
                                    A)
                                </span>
                                <input
                                    type="text" className="form-control answer-option"
                                    placeholder="Input Option A..." aria-label="option-a" aria-describedby="option-a"
                                />
                                <div className="form-check" id="correct-answer">
                                    <OverlayTrigger placement="top" overlay={
                                        <Tooltip>
                                            Set A as correct answer
                                        </Tooltip>
                                    }>
                                        <input className="form-check-input" type="radio"
                                            name={"correct-answer-" + question_id} id="answer-a"
                                        />
                                    </OverlayTrigger>
                                </div>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text" id="option-b">
                                    B)
                                </span>
                                <input
                                    type="text" className="form-control answer-option"
                                    placeholder="Input Option B..." aria-label="option-a" aria-describedby="option-b"
                                />
                                <div className="form-check" id="correct-answer">
                                    <OverlayTrigger placement="top" overlay={
                                        <Tooltip>
                                            Set B as correct answer
                                        </Tooltip>
                                    }>
                                        <input className="form-check-input" type="radio"
                                            name={"correct-answer-" + question_id} id="answer-b" />
                                    </OverlayTrigger>
                                </div>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text" id="option-c">
                                    C)
                                </span>
                                <input
                                    type="text" className="form-control answer-option"
                                    placeholder="Input Option C..." aria-label="option-a" aria-describedby="option-c"
                                />
                                <div className="form-check" id="correct-answer">
                                    <OverlayTrigger placement="top" overlay={
                                        <Tooltip>
                                            Set C as correct answer
                                        </Tooltip>
                                    }>
                                        <input className="form-check-input" type="radio"
                                            name={"correct-answer-" + question_id} id="answer-c" />
                                    </OverlayTrigger>
                                </div>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text" id="option-c">
                                    D)
                                </span>
                                <input
                                    type="text" className="form-control answer-option"
                                    placeholder="Input Option D..." aria-label="option-a" aria-describedby="option-c"
                                />
                                <div className="form-check" id="correct-answer">
                                    <OverlayTrigger placement="top" overlay={
                                        <Tooltip>
                                            Set D as correct answer
                                        </Tooltip>
                                    }>
                                        <input className="form-check-input" type="radio"
                                        name={"correct-answer-" + question_id} id="answer-d" />
                                    </OverlayTrigger>
                                </div>
                            </div>

                        </>
                        :
                        <>
                            <div className="form-check" id="correct-answer-tf">
                                <label className="form-check-label" htmlFor="correct-answer-true">
                                    True<input className="form-check-input" type="radio"
                                        name={"correct-answer-" + question_id} id="correct-answer-true" />
                                </label>
                            </div>
                            <div className="form-check" id="correct-answer-tf">
                                <label className="form-check-label" htmlFor="correct-answer-false">
                                    False<input className="form-check-input" type="radio"
                                        name={"correct-answer-" + question_id} id="correct-answer-false" />
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
    // question_id: number,
    // question_text: string,
    // question_type: bool,
    question: object,
}

export default CreateQuestion;