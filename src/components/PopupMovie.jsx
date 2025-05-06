import { useEffect, useState, useDispatch, useNavigate } from '../hooks';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { logout } from '../redux/authSlice';
import { API_URL } from '../config';

// import ModalHeader from 'react-bootstrap/ModalHeader'
// import ModalTitle from 'react-bootstrap/ModalTitle'
// import ModalBody from 'react-bootstrap/ModalBody'
// import ModalFooter from 'react-bootstrap/ModalFooter'

function PopupMovie({ movieId, token, show, onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [size, _setSize] = useState('md');

    useEffect(() => {
        if (!movieId || !token) return;

        const fetchMovie = async () => {
            try {
                const response = await axios.get(`${API_URL}/movie/movieById`, {
                    params: {
                        movieId,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                setMovie(response.data.data.movie);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    dispatch(logout());
                    navigate('/login');
                } else {
                    setMovie(error.message || 'Something went wrong');
                }
            }
        };

        fetchMovie();
    }, [movieId, token]);

    return movie ? (
        <>
            <Modal
                show={show}
                onHide={onClose}
                // backdrop="static"
                keyboard={true}
                size={size}
                centered
                aria-labelledby="contained-modal-title-vcenter"
                id="PopupMovie"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{movie.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="d-flex flex-column align-items-center text-center">
                        <img
                            src={movie.thumbnail}
                            alt={movie.title}
                            className="img-fluid mb-3 rounded shadow-sm"
                            style={{ maxHeight: '300px', objectFit: 'cover' }}
                        />
                        <h5 className="mb-3 text-primary">{movie.title}</h5>
                        <p className="text-muted">
                            <strong>Summary:</strong> {movie.summary}
                        </p>
                        <p className="text-success">
                            <strong>Revenue:</strong> $
                            {movie.revenue?.toLocaleString()}
                        </p>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={onClose}
                    >
                        Close Movie Detail
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    ) : (
        <>
            <Modal
                show={show}
                size={size}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                id="PopupMovie"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Fetching Movie...</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Loading...</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={onClose}
                    >
                        Close Popup
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupMovie;
