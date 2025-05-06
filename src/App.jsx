import { Route, Routes, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import TaskList from './components/TaskList';
import { API_URL } from './config';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

function App() {
    return (
        <>
            <header>
                <NavBar />
            </header>

            <main>
                <Container className="mt-4">
                    <Routes>
                        <Route
                            path="/homepage"
                            element={<HomePage />}
                        />
                        <Route
                            path="/task-list"
                            element={<TaskList />}
                        />
                        <Route
                            path="/"
                            element={
                                <Navigate
                                    to="/homepage"
                                    replace
                                />
                            }
                        />{' '}
                        {/* Default route */}
                        {/* Catch-all route for invalid paths */}
                        <Route
                            path="*"
                            element={
                                <Navigate
                                    to="/homepage"
                                    replace
                                />
                            }
                        />
                    </Routes>
                </Container>
            </main>
        </>
    );
}

export default App;
