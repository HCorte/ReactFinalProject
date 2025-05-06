import { useEffect, useSelector, useDispatch, useNavigate } from '../hooks';
import { logout } from '../redux/authSlice';

import { Navbar, Nav } from 'react-bootstrap';
import MoviesList from './movieList';

import 'bootstrap/dist/css/bootstrap.min.css';

const MainPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const token = useSelector((state) => state.auth.token);
    const username = useSelector((state) => state.auth.username);

    // States to manage the movies data, filters, and loading state

    useEffect(() => {
        if (!token) {
            navigate('/login'); // Or show a message, trigger logout, etc.
        }
    }, [token, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div>
            <Navbar
                bg="dark"
                variant="dark"
            >
                <Navbar.Brand href="/">
                    MovieApp - username: {username}
                </Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link href="/main">Home</Nav.Link>
                    <Nav.Link href="/add-movie">Add Movie</Nav.Link>
                    {/* <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link> */}
                    {isLoggedIn && (
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    )}
                </Nav>
            </Navbar>

            <MoviesList token={token} />
        </div>
    );
};

export default MainPage;
