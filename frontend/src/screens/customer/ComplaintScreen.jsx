import { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const ComplaintScreen = () => {
    const [formData, setFormData] = useState({ subject: '', description: '', district: '', complaintType: 'Service' });

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/complaints', formData);
            toast.success('आपकी शिकायत दर्ज कर ली गई है।');
            setFormData({ subject: '', description: '', district: '', complaintType: 'Service' });
        } catch (err) { toast.error('विफल'); }
    };

    return (
        <Container className="py-5">
            <Card className="p-4 shadow-sm border-0 mx-auto" style={{ maxWidth: '600px' }}>
                <h3 className="fw-bold mb-4">Help & Support - दर्ज करें शिकायत</h3>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>शिकायत का प्रकार</Form.Label>
                        <Form.Select onChange={(e) => setFormData({...formData, complaintType: e.target.value})}>
                            <option>Service</option><option>Product</option><option>Payment</option><option>Staff</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>विषय (Subject)</Form.Label>
                        <Form.Control value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>जिला (District)</Form.Label>
                        <Form.Control value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>विवरण (Description)</Form.Label>
                        <Form.Control as="textarea" rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
                    </Form.Group>
                    <Button type="submit" variant="danger" className="w-100">Submit Complaint</Button>
                </Form>
            </Card>
        </Container>
    );
};
export default ComplaintScreen;