import React, { useState } from "react";
import { useLocation } from 'react-router-dom'
import { Accordion } from 'react-bootstrap'
import CreateQuestion from '../../Components/CreateQuestion/CreateQuestion';
import { array } from "prop-types";
import '../Pagelayout.css';
import './CreateSection.css';
// import { addNewSection } from '../../Apis/Api';
import BackArrow from "../../Components/BackArrow/BackArrow";
import { addNewQuiz, addNewSection } from "../../Apis/Api";

const CreateSection = (props) => {
  const [sectionName, setSectionName] = useState("");
  const [materials, setMaterials] = useState([]);
  const [questionCount, setQuestionCount] = useState(1);
  const [questions, setQuestions] = useState(props.questionArr);
  const [isGraded, setIsGraded] = useState(false);
  const [passingMark, setPassingMark] = useState(50);
  const location = useLocation();
  const { courseClass } = location.state;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted ${sectionName}, ${materials}`);

    let commonData = {
      "course_id": courseClass.course.course_id,
      "trainer_id": courseClass.trainer_id,
    }

    addNewSection({
      ...commonData,
      "section_name": sectionName,
      "materials": "test"
    })
      .then(response => {
        commonData.section_id = response.data.class_section.section_id

        let question_options = {};
        let questionList =
          questions.map((question) => {
            if (question.questionType) {
              // mcq
              question_options = ['A', 'B', 'C', 'D'].map((letter, i) => {
                return {
                  ...commonData,
                  "question_id": question.questionID,
                  "is_correct": question.correctAnswer === letter,
                  "option_id": i,
                  "option_label": letter,
                  "option_value": question[`option${letter}`]
                }
              })
            }
            else {
              // t/f
              question_options = ['T', 'F'].map((letter, i) => {
                return {
                  ...commonData,
                  "question_id": question.questionID,
                  "is_correct": question.correctAnswer === letter,
                  "option_id": i,
                  "option_label": letter,
                  "option_value": letter === 'T' ? "True" : "False"
                }
              })
            }

            return {
              ...commonData,
              "question_id": question.questionID,
              "question": question.questionText,
              "question_type": question.questionType,
              "question_options": question_options,
            }
          })

        addNewQuiz({
          ...commonData,
          "is_graded": isGraded,
          "passing_mark": passingMark,
          "questions": questionList,
        }).then(response => console.log(response))
      })
  }

  const addQuestion = () => {
    let currentQuestions = questions;
    currentQuestions.push(questionTemplate(questionCount + 1));
    setQuestions(currentQuestions);
    setQuestionCount(questionCount + 1);
  }

  return (
    <div id='pagelayout'>

      <div id='section-header'>
        <BackArrow />
        <h5 id='page-title'>Add a Section</h5>
      </div>

      <form onSubmit={handleSubmit}>

        <label htmlFor="inputSectionName" className="form-label">Section Name</label>
        <input
          className="form-control section-form-control"
          id="inputSectionName"
          placeholder="Input Section Name..."
          onChange={e => setSectionName(e.target.value)}
        />

        <label htmlFor="inputMaterials" className="form-label">Section Materials</label>
        <input
          className="form-control section-form-control"
          id="inputMaterials"
          placeholder="Input Section Content..."
          onChange={e => setMaterials(e.target.value)}
        />

        <Accordion id="create-quiz-accordion" >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Section Quiz</Accordion.Header>
            <Accordion.Body>
              {
                questions.map((question, i) => {
                  return (
                    <>
                      <CreateQuestion key={i} questionID={question.questionID}
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

        
        <label htmlFor="isGradedSwitch" className="form-label" >Graded Quiz?</label>
        <div className="form-check form-switch" id="isGradedSwitch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="isGradedSwitch"
            onChange={e => setIsGraded(e.target.checked)}
          />
          <label className="form-check-label">{isGraded ? "Yes" : "No"}</label>
        </div>

        <label htmlFor="inputPassingMark" className="form-label">Quiz Passing Mark</label>
        <input
          className="form-control section-form-control"
          id="inputPassingMark"
          defaultValue={passingMark}
          onChange={e => setPassingMark(e.target.value)}
          type="number"
          min={0}
        />

        

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
