import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
    Container,
    Row,
    Col,
    Form,
    Button,
    ListGroup,
    Badge,
    Card,
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get(`http://localhost:3001/tasks`);
            setTasks(response.data);
        };

        fetchTasks();
    }, []);

    const handleAddTask = async () => {
        const { title, description, priority } = newTask;
        if (title.trim() && description.trim()) {
            const newTaskData = {
                title,
                description,
                priority,
                done: false,
            };
            try {
                const response = await axios.post(
                    'http://localhost:3001/tasks',
                    newTaskData
                );
                const createdTask = response.data;

                setTasks([...tasks, createdTask]);
                setNewTask({ title: '', description: '', priority: 'media' });
            } catch (error) {
                console.error('Erro ao adicionar tarefa:', error);
            }
        }
    };

    const handleToggleDone = async (id) => {
        const taskToUpdate = tasks.find((task) => task.id === id);
        if (!taskToUpdate) return;

        const updatedDone = !taskToUpdate.done;

        const response = await axios.patch(
            `http://localhost:3001/tasks/${id}`,
            { done: updatedDone }
        );

        console.log('Updated:', response.data);
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, done: updatedDone } : task
            )
        );
    };

    const handleDeleteTask = async (id) => {
        const response = await axios.delete(
            `http://localhost:3001/tasks/${id}`
        );
        console.log(`deleted:`, response.data);
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const getPriorityVariant = (priority) => {
        switch (priority) {
            case 'alta':
                return 'danger';
            case 'media':
                return 'warning';
            case 'baixa':
                return 'success';
            default:
                return 'secondary';
        }
    };

    return (
        <Container className="my-5">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h3 className="mb-4 text-center">Lista de Tarefas</h3>

                    {/* Form */}
                    <Card className="mb-4">
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Título</Form.Label>
                                    <Form.Control
                                        value={newTask.title}
                                        onChange={(e) =>
                                            setNewTask({
                                                ...newTask,
                                                title: e.target.value,
                                            })
                                        }
                                        placeholder="Digite o título da tarefa"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control
                                        value={newTask.description}
                                        onChange={(e) =>
                                            setNewTask({
                                                ...newTask,
                                                description: e.target.value,
                                            })
                                        }
                                        placeholder="Digite a descrição da tarefa"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Prioridade</Form.Label>
                                    <Form.Select
                                        value={newTask.priority}
                                        onChange={(e) =>
                                            setNewTask({
                                                ...newTask,
                                                priority: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="baixa">Baixa</option>
                                        <option value="media">Média</option>
                                        <option value="alta">Alta</option>
                                    </Form.Select>
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    onClick={handleAddTask}
                                >
                                    Adicionar Tarefa
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="g-4">
                {/* Task List */}
                {tasks.map((task) => (
                    <Col
                        key={task.id}
                        md={4}
                    >
                        <Card>
                            <Card.Body>
                                <Form.Check
                                    type="checkbox"
                                    checked={task.done}
                                    onChange={() => handleToggleDone(task.id)}
                                    className="me-3"
                                    style={{ marginTop: '0.3rem' }}
                                />
                                <div className="flex-grow-1">
                                    <Card.Title
                                        style={{
                                            textDecoration: task.done
                                                ? 'line-through'
                                                : 'none',
                                        }}
                                    >
                                        {task.title}
                                    </Card.Title>
                                    <Card.Text
                                        style={{
                                            textDecoration: task.done
                                                ? 'line-through'
                                                : 'none',
                                        }}
                                    >
                                        {task.description}
                                    </Card.Text>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <Badge
                                            bg={getPriorityVariant(
                                                task.priority
                                            )}
                                        >
                                            {task.priority}
                                        </Badge>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() =>
                                                handleDeleteTask(task.id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                {/* <Col md={{ span: 8, offset: 2 }}>
                    <ListGroup>
                        {tasks.map((task) => (
                            <ListGroup.Item
                                key={task.id}
                                className="d-flex justify-content-between align-items-start"
                            >
                                <Form.Check
                                    type="checkbox"
                                    checked={task.done}
                                    onChange={() => handleToggleDone(task.id)}
                                    className="me-3"
                                />
                                <div className="me-auto">
                                    <div
                                        className="fw-bold"
                                        style={{
                                            textDecoration: task.done
                                                ? 'line-through'
                                                : 'none',
                                        }}
                                    >
                                        {task.title}{' '}
                                        <Badge
                                            bg={getPriorityVariant(
                                                task.priority
                                            )}
                                        >
                                            {task.priority}
                                        </Badge>
                                    </div>
                                    <div
                                        className="text-muted"
                                        style={{
                                            textDecoration: task.done
                                                ? 'line-through'
                                                : 'none',
                                        }}
                                    >
                                        {task.description}
                                    </div>
                                </div>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDeleteTask(task.id)}
                                >
                                    Excluir
                                </Button>
                            </ListGroup.Item>
                        ))}
                        {tasks.length === 0 && (
                            <ListGroup.Item className="text-center text-muted">
                                Nenhuma tarefa adicionada.
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Col> */}
            </Row>
        </Container>
    );
}

export default TaskList;
