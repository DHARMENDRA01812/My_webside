import { useState } from 'react';
import { Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
import AdminLayout from '../../components/AdminLayout';
import { FaPaperPlane, FaUserCircle } from 'react-icons/fa';

const LiveChatScreen = () => {
    const [messages, setMessages] = useState([
        { sender: 'user', text: 'Hi, where is my order #9823?' },
        { sender: 'admin', text: 'Checking, please wait a moment.' }
    ]);
    const [input, setInput] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        if(input.trim()) {
            setMessages([...messages, { sender: 'admin', text: input }]);
            setInput('');
        }
    };

    return (
        <AdminLayout title="Customer Support Chat">
            <Row>
                <Col md={4}>
                    <Card className="h-100 border-0 shadow-sm">
                        <div className="p-3 border-bottom fw-bold bg-light">Active Chats</div>
                        <ListGroup variant="flush">
                            <ListGroup.Item action active>
                                <div className="d-flex align-items-center">
                                    <FaUserCircle size={30} className="me-2"/>
                                    <div><strong>Rahul Kumar</strong><br/><small>Online</small></div>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item action>
                                <div className="d-flex align-items-center">
                                    <FaUserCircle size={30} className="me-2 text-secondary"/>
                                    <div><strong>Sneha</strong><br/><small className="text-muted">Offline</small></div>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col md={8}>
                    <Card className="border-0 shadow-sm" style={{height: '500px'}}>
                        <div className="p-3 border-bottom fw-bold">Chat with Rahul Kumar</div>
                        <div className="flex-grow-1 p-4 overflow-auto bg-light">
                            {messages.map((msg, i) => (
                                <div key={i} className={`d-flex mb-3 ${msg.sender === 'admin' ? 'justify-content-end' : ''}`}>
                                    <div className={`p-3 rounded-3 shadow-sm ${msg.sender === 'admin' ? 'bg-primary text-white' : 'bg-white'}`} style={{maxWidth: '70%'}}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 border-top bg-white">
                            <Form onSubmit={sendMessage} className="d-flex gap-2">
                                <Form.Control value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a reply..." />
                                <Button type="submit" variant="dark"><FaPaperPlane/></Button>
                            </Form>
                        </div>
                    </Card>
                </Col>
            </Row>
        </AdminLayout>
    );
};
export default LiveChatScreen;