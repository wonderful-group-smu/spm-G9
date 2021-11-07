import { array, bool, func } from 'prop-types';
import TrainerImages from '../../Assets/TrainerImages';
import Modal from 'react-bootstrap/Modal'

const TrainerListModal = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.onHide} centered>
                {props.trainerList.map((employee, i) => (
                    <div key={i}>
                        {employee.name}
                    </div>
                ))}
            </Modal>
        </>
    )
}
TrainerListModal.propTypes = {
    trainerList: array,
    show: bool,
    onHide: func,
}

export default TrainerListModal;