import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Bi from 'react-icons/bi';
import { Accordion } from 'react-bootstrap'
import CreateQuestion from '../../Components/CreateQuestion/CreateQuestion';
import { bool, number, string } from "prop-types";
import '../Pagelayout.css';
import './CreateSection.css';

const CreateSection = (props) => {
  const [sectionTitle, setSectionTitle] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [questions, setQuestions] = useState(props.questionArr);

  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    alert(`Submitted ${sectionTitle}, ${selectedFiles}`);
  }

  return (
    <div id='pagelayout'>

      <div id='section-header'>
        <button onClick={() => history.goBack()}><Bi.BiArrowBack className="back-arrow" /></button>
        <h5 id='page-title'>Add a Section</h5>
      </div>

      <form onSubmit={handleSubmit}>

        <label htmlFor="inputSectionTitle" className="form-label">Section Title</label>
        <input
          className="form-control"
          id="inputSectionTitle"
          placeholder="Input Section Title..."
          onChange={e => setSectionTitle(e.target.value)}
        />

        <label htmlFor="inputMaterials" className="form-label">Course Materials</label>
        <input
          className="form-control"
          type="file"
          id="formFileMultiple"
          multiple
          onChange={e => setSelectedFiles(e.target.files)}
        />

        <Accordion id="create-quiz-accordion" >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Section Quiz</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
              {
                questions.map((question, i) => (
                  <CreateQuestion key={i} question={question} setQuestions={setQuestions}/>
                ))
              }
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <button type="submit" className="btn btn-secondary submit">Add Section</button>
      </form>
    </div>
  )
}

CreateSection.defaultProps = {
  questionArr: [
    {
      question_id: 1,
      question_text: "",
      question_type: true,
    }
  ]
}

CreateSection.propTypes = {
  questionArr: [
    {
      question_id: number,
      question_text: string,
      question_type: bool,
    }
  ]
}

export default CreateSection;
