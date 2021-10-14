import { bool, number, string } from "prop-types";
import './CreateQuestion.css';
// import { useState } from "react";

const CreateQuestion = () => {

    const changeQuestion = (e) => {
        // setQuestion({
        //     question_id: props.question_id,
        //     question: e.target.value,
        //     question_type: props.question_type,
        // })
        return (e)
    }

    return (
        <div className="create-question-container">
            <div className="question">
                <h6>Question Description</h6>
                <textarea
                    className="form-control"
                    id="inputQuestionDesc"
                    placeholder="Input Question..."
                    rows="4"
                    onChange={changeQuestion}
                />
                <div className="form-check" id="question-type">
                    <label className="form-check-label" htmlFor="question-type-mcq">
                        MCQ<input className="form-check-input" type="radio" name="question-type" id="question-type-mcq" />
                    </label>
                </div>
                <div className="form-check" id="question-type">
                    <label className="form-check-label" htmlFor="question-type-tf">
                        True/False<input className="form-check-input" type="radio" name="question-type" id="question-type-tf" />
                    </label>
                </div>
            </div>

            <div className="answer-options-container">
                <h6>Options</h6>
                <div className="answer-options">
                    <div className="input-group">
                        <span className="input-group-text" id="option-a">
                            a)
                        </span>
                        <input
                            type="text" className="form-control answer-option"
                            placeholder="Input Option A..." aria-label="option-a" aria-describedby="option-a"
                        />
                        <div className="form-check" id="correct-answer">
                            <input className="form-check-input" type="radio" name="correct-answer" id="answer-a" />
                        </div>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text" id="option-b">
                            b)
                        </span>
                        <input
                            type="text" className="form-control answer-option"
                            placeholder="Input Option B..." aria-label="option-a" aria-describedby="option-b"
                        />
                        <div className="form-check" id="correct-answer">
                            <input className="form-check-input" type="radio" name="correct-answer" id="answer-b" />
                        </div>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text" id="option-c">
                            c)
                        </span>
                        <input
                            type="text" className="form-control answer-option"
                            placeholder="Input Option C..." aria-label="option-a" aria-describedby="option-c"
                        />
                        <div className="form-check" id="correct-answer">
                            <input className="form-check-input" type="radio" name="correct-answer" id="answer-c" />
                        </div>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text" id="option-c">
                            d)
                        </span>
                        <input
                            type="text" className="form-control answer-option"
                            placeholder="Input Option D..." aria-label="option-a" aria-describedby="option-c"
                        />
                        <div className="form-check" id="correct-answer">
                            <input className="form-check-input" type="radio" name="correct-answer" id="answer-d" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

CreateQuestion.propTypes = {
    question_id: number,
    question_text: string,
    question_type: bool,
}

export default CreateQuestion;