import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import PopupMovie from './PopupMovie';
import { logout } from '../redux/authSlice';
import { API_URL } from '../config';

import {
    useEffect,
    useState,
    useRef,
    useDispatch,
    useNavigate,
} from '../hooks';

const MoviesList = ({ token }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true); // to stop fetching when done
    const scrollContainerRef = useRef(null);

    const [yearFilter, setYearFilter] = useState(0); // Store selected year filter
    const [topRevenueLimit, setTopRevenueLimit] = useState(''); // '' means infinite scroll mode

    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchTopMoviesByRevenue = async () => {
            if (!topRevenueLimit || !token) return;

            setLoading(true);
            try {
                const response = await axios.get(
                    `${API_URL}/movie/moviesfiltered`,
                    {
                        params: {
                            ntop: topRevenueLimit,
                            year: yearFilter,
                        },
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );

                const newMovies = response.data.movies;

                setMovies(newMovies || []);
                setHasMore(false); // Disable infinite scroll
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    dispatch(logout());
                    navigate('/login');
                } else {
                    setError('Error fetching top revenue movies');
                    console.error(error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTopMoviesByRevenue();
    }, [topRevenueLimit, yearFilter, token]);

    useEffect(() => {
        let ignore = false;

        const fetchMovies = async () => {
            if (!token || loading || !hasMore || topRevenueLimit) return;

            setLoading(true);
            try {
                const response = await axios.get(`${API_URL}/movie/movies`, {
                    params: {
                        currentPage,
                        moviesPerPage: 30,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const newMovies = response.data.movies;

                if (!ignore) {
                    if (newMovies.length === 0) {
                        setHasMore(false);
                    } else {
                        setMovies((prev) => [...prev, ...newMovies]);
                    }
                }
            } catch (err) {
                if (error.response && error.response.status === 401) {
                    dispatch(logout());
                    navigate('/login');
                } else {
                    if (!ignore)
                        setError(err.message || 'Something went wrong');
                }
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        fetchMovies();

        return () => {
            ignore = true;
        };
    }, [token, currentPage, hasMore, topRevenueLimit]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            if (
                !loading &&
                hasMore &&
                container.scrollTop + container.clientHeight >=
                    container.scrollHeight - 100
            ) {
                setCurrentPage((prev) => prev + 1);
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    useEffect(() => {
        if (topRevenueLimit === '') {
            setMovies([]);
            setCurrentPage(1);
            setHasMore(true);
        }
    }, [topRevenueLimit]);

    const showMovieDetails = (movieId) => {
        setSelectedMovieId(movieId);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedMovieId(null);
    };

    if (error)
        return (
            <div className="text-danger text-center mt-5">Error: {error}</div>
        );

    return (
        <>
            <Row className="mb-3">
                <Col sm={6}>
                    <label>Filter by Year:</label>
                    <select
                        className="form-select"
                        value={yearFilter}
                        onChange={(e) => setYearFilter(e.target.value)}
                    >
                        <option value="">All Years</option>
                        <option value="2000">2000</option>
                        <option value="1989">1989</option>
                        <option value="1988">1988</option>
                        {/* Add more dynamically if needed */}
                    </select>
                </Col>
                <Col sm={6}>
                    <label>Filter by Revenue:</label>
                    <select
                        className="form-select"
                        value={topRevenueLimit}
                        onChange={(e) => setTopRevenueLimit(e.target.value)}
                    >
                        <option value="">
                            -- Show All (infinite scroll) --
                        </option>
                        {[10, 20, 30, 40, 50].map((num) => (
                            <option
                                key={num}
                                value={num}
                            >
                                Top {num} movies
                            </option>
                        ))}
                    </select>
                </Col>
            </Row>
            <Container
                className="mt-4 scrollY"
                ref={scrollContainerRef}
                style={{ height: '80vh', overflowY: 'scroll' }}
            >
                <Row>
                    {movies.map((movie) => (
                        <Col
                            sm={12}
                            md={4}
                            lg={3}
                            key={movie.id}
                            className="mb-4"
                        >
                            <Card>
                                <Card.Img
                                    variant="top"
                                    src={movie.thumbnail}
                                    alt={movie.title}
                                />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {movie.year}
                                    </Card.Subtitle>
                                    <Card.Text>{movie.description}</Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() =>
                                            showMovieDetails(movie.id)
                                        }
                                    >
                                        View Details
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                {loading && (
                    <div className="text-center my-4">
                        Loading more movies...
                    </div>
                )}
                {!hasMore && (
                    <div className="text-center my-4 text-muted">
                        No more movies to load.
                    </div>
                )}
                {showPopup && (
                    <PopupMovie
                        token={token}
                        movieId={selectedMovieId}
                        show={showPopup}
                        onClose={closePopup}
                    />
                )}
            </Container>
        </>
    );
};

export default MoviesList;
