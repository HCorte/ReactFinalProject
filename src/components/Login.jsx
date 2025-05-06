import { useEffect, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PopupRegistration from '../components/PopupRegistration';

import '../css/Login.css';

const Login = ({
    onClickLogin,
    onClickRegister,
    registration,
    showpopup,
    setRegistration,
    closePopup,
}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    useEffect(() => {
        setUsername('');
        setPassword('');
        setEmail('');
        setFirstname('');
        setLastname('');
    }, [registration]);

    const handleLoginSubmit = (event) => {
        event.preventDefault(); //prevents the normal js behaviour of a form
        onClickLogin(username, password);
    };

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        onClickRegister(username, password, email, firstname, lastname);
    };

    // const closePopup = () => {
    //     showPopup = false;
    // }

    const loginFormElement = () => {
        return (
            <>
                <div className="ui container loginForm">
                    <div className="ui segment">
                        <form
                            onSubmit={handleLoginSubmit}
                            className="ui form"
                        >
                            <div className="millIcon">
                                <img src="http://smiity.com/admin/resources/images/smiity_logo.png" />
                            </div>
                            <div className="field">
                                <span>USERNAME</span>
                                <input
                                    type="text"
                                    placeholder="username"
                                    autoComplete="new-password"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                                <div className="line" />
                            </div>
                            <div className="field">
                                <span>PASSWORD</span>
                                <input
                                    type="password"
                                    placeholder="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <div className="line" />
                            </div>
                            <button id="login">
                                <span>LOGIN</span>
                            </button>
                        </form>
                        <button
                            id="registration"
                            onClick={() => setRegistration(true)}
                        >
                            <span>REGISTRATION</span>
                        </button>
                    </div>
                </div>
                {showpopup && (
                    <PopupRegistration
                        showPopup={showpopup}
                        closePopup={closePopup}
                    />
                )}
            </>
        );
    };

    const registrationFormElement = () => {
        return (
            <>
                <div className="ui container registrationForm">
                    <div className="ui segment">
                        <Form onSubmit={handleRegisterSubmit}>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    md="4"
                                    className="field"
                                >
                                    <Form.Label>Username</Form.Label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="username"
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                    <div className="line" />
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="4"
                                    className="field"
                                >
                                    <Form.Label>Email</Form.Label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="email@example.com"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                    <div className="line" />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    md="4"
                                    className="field"
                                >
                                    <Form.Label>First name</Form.Label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="firstname"
                                        onChange={(e) =>
                                            setFirstname(e.target.value)
                                        }
                                    />
                                    <div className="line" />
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="4"
                                    className="field"
                                >
                                    <Form.Label>Last name</Form.Label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="lastname"
                                        onChange={(e) =>
                                            setLastname(e.target.value)
                                        }
                                    />
                                    <div className="line" />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    md="4"
                                    className="field"
                                >
                                    <Form.Label>password</Form.Label>
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <div className="line" />
                                </Form.Group>
                            </Row>
                            {/* <Row>
                            <Form.Group>
                                <label>
                                    <input 
                                        name="terms" 
                                        type="checkbox" 
                                        label="Agree to terms and conditions"
                                        style={{marginRight: '10px'}} />
                                        Agree to terms and conditions
                                </label>					
                            </Form.Group>
                        </Row> */}
                            <Row className="center-button">
                                <Button
                                    type="submit"
                                    id="registration"
                                >
                                    Create Account
                                </Button>
                            </Row>
                        </Form>
                    </div>
                </div>
            </>
        );
    };

    const ComponentShowed = () => {
        if (registration) {
            return registrationFormElement();
        } else {
            return loginFormElement();
        }
    };

    return <>{ComponentShowed()}</>;
};

export default Login;
