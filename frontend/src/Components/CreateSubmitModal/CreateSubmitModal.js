import { any, bool, func, string } from 'prop-types';
import { Modal } from 'react-bootstrap';

const CreateSubmitModal = (props) => {
    const setShow = props.setShow
    const handleClose = () => {
        setShow(false);
        props.history.goBack()
    } 

    return (

        
        <Modal show={props.show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Created {props.subject}</Modal.Title>
            </Modal.Header>
            <Modal.Body>You have created {props.title}!</Modal.Body>
        </Modal>


    )
}

CreateSubmitModal.propTypes = {
    history: any,
    show: bool,
    setShow: func,
    subject: string,
    title: string,
}

export default CreateSubmitModal;