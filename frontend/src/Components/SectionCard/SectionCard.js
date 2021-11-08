import { array, bool, func, number, object } from "prop-types";
import * as Vsc from 'react-icons/vsc';
import './SectionCard.css';

const SectionCard = (props) => {
    const section = props.section;
    const uniqueID = `${section.course_id}${section.trainer_id}${props.index}`;

    return (
        <>
            {props.index == 0 ? "" : <Vsc.VscArrowRight className="section-link" />}
            <div
                className={`card ${props.deleteMode ? "sectionCard" : ""}`}
            >
                <div className="card-header">
                    ENG {uniqueID}
                </div>
                <div className="card-body">
                    {section.section_name}
                </div>
            </div>
        </>
    )
}

SectionCard.propTypes = {
    section: object,
    index: number,
    deleteMode: bool,
    selectedArr: array,
    setSelectedArr: func,
}

export default SectionCard;