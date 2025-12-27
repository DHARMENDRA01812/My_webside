import { useState } from 'react';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout';

const AddStaffScreen = () => {
    const [formData, setFormData] = useState({
        fullName: '', fatherName: '', dob: '', gender: 'Male',
        mobile: '', email: '', role: 'Packing Staff', joiningDate: ''
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/staff', formData);
            toast.success('स्टाफ रजिस्टर हो गया! आईडी ईमेल पर भेज दी गई है।');
        } catch (err) {
            toast.error(err.response?.data?.message || 'त्रुटि हुई');
        }
    };

    return (
        <AdminLayout title="Add New Staff">
            <Container>
                <Card className="p-4 shadow-sm border-0">
                    <Form onSubmit={submitHandler}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>पूरा नाम</Form.Label>
                                    <Form.Control required onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>पद (Role)</Form.Label>
                                    <Form.Select onChange={(e) => setFormData({...formData, role: e.target.value})}>
                                        <option>Packing Staff</option>
                                        <option>Technical Staff</option>
                                        <option>Cashier</option>
                                        <option>Delivery Boy</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>मोबाइल नंबर</Form.Label>
                                    <Form.Control required onChange={(e) => setFormData({...formData, mobile: e.target.value})} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>ईमेल आईडी</Form.Label>
                                    <Form.Control type="email" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button type="submit" variant="dark" className="w-100 mt-3">Register Staff</Button>
                    </Form>
                </Card>
            </Container>
        </AdminLayout>
    );
};

export default AddStaffScreen;