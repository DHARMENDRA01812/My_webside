import { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import AdminLayout from '../../components/AdminLayout';
import { FaPaperPlane, FaBell } from 'react-icons/fa';
import { toast } from 'react-toastify';

const NotificationScreen = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const sendHandler = (e) => {
        e.preventDefault();
        toast.success(`Notification Sent: "${title}" to all users!`);
        setTitle('');
        setMessage('');
    };

    return (
        <AdminLayout title="Push Notifications">
            <Container style={{maxWidth: '600px'}}>
                <Card className="shadow-lg border-0 p-4 rounded-4">
                    <div className="text-center mb-4 text-primary">
                        <FaBell size={50} />
                        <h4 className="mt-2">Send Alerts to Users</h4>
                    </div>
                    <Form onSubmit={sendHandler}>
                        <Form.Group className="mb-3">
                            <Form.Label>Target Audience</Form.Label>
                            <Form.Select>
                                <option>All Customers</option>
                                <option>Shop Owners Only</option>
                                <option>District Admins Only</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Notification Title</Form.Label>
                            <Form.Control value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Big Sale Tomorrow!" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Message Body</Form.Label>
                            <Form.Control as="textarea" rows={4} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Enter details..." required />
                        </Form.Group>
                        <Button type="submit" variant="primary" size="lg" className="w-100 rounded-pill">
                            <FaPaperPlane className="me-2"/> Send Notification
                        </Button>
                    </Form>
                </Card>
            </Container>
        </AdminLayout>
    );
};
export default NotificationScreen;