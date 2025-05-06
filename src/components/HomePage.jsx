import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaTasks, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">
                <FaTasks className="me-2" />
                Welcome to TaskFlow
            </h1>
            <p className="text-center text-muted fs-5">
                Stay organized and productive using Agile methods like Kanban
                and Scrum.
            </p>

            <div className="text-center my-4">
                <Link to="/task-list">
                    <Button
                        variant="primary"
                        size="lg"
                    >
                        <FaChartLine className="me-2" />
                        Get Started
                    </Button>
                </Link>
            </div>

            <Row className="g-4 mt-4">
                <Col md={6}>
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Card.Title>Kanban</Card.Title>
                            <Card.Text>
                                <strong>Pros:</strong>
                                <ul>
                                    <li>Visual workflow management</li>
                                    <li>Great for continuous delivery</li>
                                    <li>Flexible and easy to start</li>
                                    <li>Works well for ongoing work</li>
                                </ul>
                                <strong>Cons:</strong>
                                <ul>
                                    <li>Less structured</li>
                                    <li>No defined roles or timeboxes</li>
                                    <li>Can lead to scope creep</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Card.Title>Scrum</Card.Title>
                            <Card.Text>
                                <strong>Pros:</strong>
                                <ul>
                                    <li>Time-boxed sprints increase focus</li>
                                    <li>Defined roles and responsibilities</li>
                                    <li>Encourages continuous improvement</li>
                                    <li>
                                        Great for building features in phases
                                    </li>
                                </ul>
                                <strong>Cons:</strong>
                                <ul>
                                    <li>Can be rigid and ceremonial</li>
                                    <li>Needs full team commitment</li>
                                    <li>Heavy on meetings</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;
