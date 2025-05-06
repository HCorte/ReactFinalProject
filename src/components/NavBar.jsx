import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

function NavBar() {
    return (
        <>
            <Navbar
                bg="light"
                expand="lg"
                className="mb-4"
            >
                <Container>
                    <Navbar.Brand href="/">TasksApp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link
                                as={NavLink}
                                to="/"
                                end
                                className={({ isActive }) =>
                                    isActive ? 'active' : ''
                                }
                            >
                                Home
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/task-list"
                                className={({ isActive }) =>
                                    isActive ? 'active' : ''
                                }
                            >
                                List Of Tasks
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/create-task"
                                className={({ isActive }) =>
                                    isActive ? 'active' : ''
                                }
                            >
                                Create Task
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;
