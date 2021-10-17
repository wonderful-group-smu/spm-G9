import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Bi from 'react-icons/bi';
import { Accordion } from 'react-bootstrap'
import CreateQuestion from '../../Components/CreateQuestion/CreateQuestion';
import { array } from "prop-types";
import '../Pagelayout.css';
import './CreateSection.css';

const CreateSection = (props) => {
  const [sectionTitle, setSectionTitle] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [questionCount, setQuestionCount] = useState(1);
  const [questions, setQuestions] = useState(props.questionArr);

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    alert(`Submitted ${sectionTitle}, ${selectedFiles}`);
  }

  const addQuestion = () => {
    let currentQuestions = questions;
    currentQuestions.push(questionTemplate(questionCount + 1));
    setQuestions(currentQuestions);
    setQuestionCount(questionCount + 1);
  }

  // const testButton = () => {
  //   console.log(questions)
  // }

  return (
    <div id='pagelayout'>

      <div id='section-header'>
        <button onClick={() => history.goBack()}><Bi.BiArrowBack className="back-arrow" /></button>
        <h5 id='page-title'>Add a Section</h5>
      </div>

      <form onSubmit={handleSubmit}>

        <label htmlFor="inputSectionTitle" className="form-label">Section Title</label>
        <input
          className="form-control section-form-control"
          id="inputSectionTitle"
          placeholder="Input Section Title..."
          onChange={e => setSectionTitle(e.target.value)}
        />

        <label htmlFor="inputMaterials" className="form-label">Course Materials</label>
        <input
          className="form-control section-form-control"
          type="file"
          id="formFileMultiple"
          multiple
          onChange={e => setSelectedFiles(e.target.files)}
        />

        <Accordion id="create-quiz-accordion" >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Section Quiz</Accordion.Header>
            <Accordion.Body>
              {
                questions.map((question, i) => {
                  console.log(i)
                  return (
                    <>
                      <CreateQuestion key={i} question={question}
                      questions={questions} setQuestions={setQuestions}
                      />
                      <hr />
                    </>
                  )
                })
              }
              <button type="button" className="btn btn-outline-primary" onClick={addQuestion}>Add Question</button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {/* <button type="button" className="btn btn-secondary" onClick={testButton}>test</button> */}
        <button type="submit" className="btn btn-secondary submit">Add Section</button>
      </form>
    </div>
  )
}

const questionTemplate = (questionCount) => {
  return (
    {
      questionID: questionCount,
      questionText: "",
      questionType: true,
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctAnswer: "",
    }
  )
} 

CreateSection.defaultProps = {
  questionArr: [
    questionTemplate(1),
  ]
}

CreateSection.propTypes = {
  questionArr: array,
}

export default CreateSection;
