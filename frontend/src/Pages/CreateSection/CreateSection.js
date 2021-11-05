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
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [questionCount, setQuestionCount] = useState(1);
  const [questions, setQuestions] = useState(props.questionArr);
  const location = useLocation();
  const { courseClass } = location.state;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted ${sectionName}, ${selectedFiles}`);

    addNewSection({
      "course_id": courseClass.course.course_id,
      "trainer_id": courseClass.trainer_id,
      "section_name": sectionName,
      "materials": "test"
    })
      .then(response => {
        let section_id = response.data.class_section.section_id
        let question_options = {};

        let questionList = 
          questions.map((question) => {
            if (question.questionType) {
              // mcq
              question_options = ['A', 'B', 'C', 'D'].map((letter, i) => {
                return {
                  "question_id": question.questionID,
                  "course_id": courseClass.course.course_id,
                  "section_id": section_id,
                  "trainer_id": courseClass.trainer_id,
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
                  "question_id": question.questionID,
                  "course_id": courseClass.course.course_id,
                  "section_id": section_id,
                  "trainer_id": courseClass.trainer_id,
                  "is_correct": question.correctAnswer === letter,
                  "option_id": i,
                  "option_label": letter,
                  "option_value": letter === 'T' ? "True" : "False"
                }
              })
            }

            return {
              "question_id": question.questionID,
              "course_id": courseClass.course.course_id,
              "section_id": section_id,
              "trainer_id": courseClass.trainer_id,
              "question": question.questionText,
              "question_type": question.questionType,
              "question_options": question_options,
            }
          })

        addNewQuiz({
          "course_id": courseClass.course.course_id,
          "section_id": section_id,
          "trainer_id": courseClass.trainer_id,
          "is_graded": false,
          "passing_mark": 0,
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

  const testButton = async () => {
    console.log(questions)
  }

  return (
    <div id='pagelayout'>

      <div id='section-header'>
        <BackArrow />
        <h5 id='page-title'>Add a Section</h5>
      </div>

      <form onSubmit={handleSubmit}>

        <label htmlFor="inputSectionName" className="form-label">Section Title</label>
        <input
          className="form-control section-form-control"
          id="inputSectionName"
          placeholder="Input Section Title..."
          onChange={e => setSectionName(e.target.value)}
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
        <button type="button" className="btn btn-info" onClick={testButton}>test</button>
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
