import { array } from 'prop-types'
import * as Vsc from 'react-icons/vsc'
import './SectionFlow.css'

const SectionFlow = (props) => {

    return (
        <div className='column'>
            {
                props.sections.map((title, i) => (
                    i == 0 ?
                        <>
                            <button key={i} type="button" disabled id="section-btn" className="btn btn-outline-primary">
                                {title}
                            </button>
                        </>
                        :
                        <>
                            <Vsc.VscArrowRight className="section-link" />
                            <button key={i} type="button" disabled id="section-btn" className="btn btn-outline-primary">
                                {title}
                            </button>
                        </>
                ))
            }
        </div>
    )
}

SectionFlow.defaultProps = {
    sections: [
        "Variables & Operators",
        "Conditional Statements & Loops",
        "Lists, Tuples & Dictionaries",
        "File Read & Write"
    ]
}

SectionFlow.propTypes = {
    sections: array,
}

export default SectionFlow;