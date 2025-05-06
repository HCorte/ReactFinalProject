import {
    useEffect,
    // , useState
} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function PopupRegistration({ showPopup, closePopup }) {
    // const [showPopup, setShowPopup] = useState(false);

    // const closePopup = () => {
    //     setShowPopup(false);
    // };

    useEffect(() => {
        let timer;
        if (showPopup) {
            timer = setTimeout(() => {
                closePopup();
            }, 4000);
        }
        return () => clearTimeout(timer);
    }, [showPopup]);

    return (
        <>
            <Modal
                show={showPopup}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                keyboard={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Account Created</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Account Created Successfully</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={closePopup}
                    >
                        Close Popup
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupRegistration;
