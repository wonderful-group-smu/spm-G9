import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Bi from 'react-icons/bi';
import { array } from 'prop-types';
import '../Pagelayout.css';
import './CreateSection.css';

const CreateSection = () => {
  const [sectionTitle, setSectionTitle] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
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

        <button type="submit" className="btn btn-secondary submit">Add Section</button>

      </form>
    </div>
  )
}

CreateSection.defaultProps = {
  trainer: ["Daniel Lim", "Brock Place", "Misty Holder"],
  prereqs: ["IS110", "IS111", "IS112", "IS113"],
}

CreateSection.propTypes = {
  trainer: array,
  prereqs: array,
}

export default CreateSection
