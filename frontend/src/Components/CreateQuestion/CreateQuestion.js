import { bool, number, string } from "prop-types";
import { useState } from "react";

const CreateQuestion = (props) => {
    const [question, setQuestion] = useState(props)

    const changeQuestion = (e) => {
        setQuestion({
            question_id: props.question_id,
            question: e.target.value,
            question_type: props.question_type,
        })
    }

    return (
        <>
            <label htmlFor="inputDesc" className="form-label">Description</label>
            <textarea
                className="form-control"
                id="inputQuestionDesc"
                placeholder="Input Question..."
                rows="3"
                onChange={changeQuestion}
            />
        </>
    )
}

CreateQuestion.defaultProps = {
    question_id: 1,
    question: "",
    question_type: true,
}

CreateQuestion.propTypes = {
    question_id: number,
    question: string,
    question_type: bool,
}

export default CreateQuestion;