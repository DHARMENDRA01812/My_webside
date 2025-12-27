import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout';

const CreateShopScreen = () => {
    const [formData, setFormData] = useState({
        fullName: '', email: '', mobile: '', password: '', 
        shopType: 'Grocery', state: '', district: ''
    });
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        const fetchStates = async () => {
            const { data } = await axios.get('/api/locations/states');
            setStates(data);
        };
        fetchStates();
    }, []);

    const handleStateChange = async (state) => {
        setFormData({ ...formData, state });
        const { data } = await axios.get(`/api/locations/districts/${state}`);
        setDistricts(data);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/shop-owner/create-admin', formData);
            toast.success("Shop Owner created successfully!");
        } catch (err) { toast.error("Creation failed"); }
    };

    return (
        <AdminLayout title="Create New Verified Shop">
            <Container style={{ maxWidth: '800px' }}>
                <Card className="p-4 border-0 shadow-sm rounded-4">
                    <Form onSubmit={submitHandler}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Owner Full Name</Form.Label>
                                    <Form.Control required onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Personal Email (Communication)</Form.Label>
                                    <Form.Control type="email" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>State</Form.Label>
                                    <Form.Select onChange={(e) => handleStateChange(e.target.value)}>
                                        <option>Select State</option>
                                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>District</Form.Label>
                                    <Form.Select onChange={(e) => setFormData({ ...formData, district: e.target.value })}>
                                        <option>Select District</option>
                                        {districts.map(d => <option key={d} value={d}>{d}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-4">
                            <Form.Label>Initial Password</Form.Label>
                            <Form.Control type="password" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        </Form.Group>
                        <Button type="submit" variant="primary" className="w-100 py-3 fw-bold rounded-pill">Create & Approve Shop</Button>
                    </Form>
                </Card>
            </Container>
        </AdminLayout>
    );
};

export default CreateShopScreen;