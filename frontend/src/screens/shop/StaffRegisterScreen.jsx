import { useState } from 'react';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout';

const StaffRegisterScreen = () => {
    const [formData, setFormData] = useState({
        fullName: '', fatherName: '', dob: '', gender: 'Male',
        mobile: '', whatsapp: '', email: '', role: 'Packing Staff',
        qualification: 'Graduate', joiningDate: '',
        permanentAddress: { state: '', district: '', block: '', fullAddress: '', pinCode: '' },
        isSameAddress: false,
        temporaryAddress: { state: '', district: '', block: '', fullAddress: '', pinCode: '' },
        bankDetails: { bankName: '', accountNumber: '', ifscCode: '' }
    });

    const [files, setFiles] = useState({});

    const handleFile = (e) => {
        setFiles({ ...files, [e.target.name]: e.target.files[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        // नोट: यहाँ आपको पहले फाइल्स को /api/upload पर अपलोड करके उनके URL प्राप्त करने होंगे।
        // सरलता के लिए मान लेते हैं कि URL प्राप्त हो गए हैं।
        try {
            await axios.post('/api/staff', formData);
            toast.success('स्टाफ रजिस्टर हो गया और आईडी ईमेल कर दी गई!');
        } catch (err) {
            toast.error('पंजीकरण विफल');
        }
    };

    return (
        <AdminLayout title="Staff Registration">
            <Container className="py-4">
                <Form onSubmit={submitHandler}>
                    <Card className="p-4 mb-4 shadow-sm border-0">
                        <h5 className="text-primary mb-3">1. व्यक्तिगत विवरण (Personal Details)</h5>
                        <Row>
                            <Col md={4}><Form.Group className="mb-3"><Form.Label>पूरा नाम</Form.Label><Form.Control required onChange={(e) => setFormData({...formData, fullName: e.target.value})} /></Form.Group></Col>
                            <Col md={4}><Form.Group className="mb-3"><Form.Label>पिता का नाम</Form.Label><Form.Control required onChange={(e) => setFormData({...formData, fatherName: e.target.value})} /></Form.Group></Col>
                            <Col md={4}><Form.Group className="mb-3"><Form.Label>जन्मतिथि</Form.Label><Form.Control type="date" required onChange={(e) => setFormData({...formData, dob: e.target.value})} /></Form.Group></Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>लिंग</Form.Label>
                                    <Form.Select onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                                        <option>Male</option><option>Female</option><option>Transgender</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4}><Form.Group className="mb-3"><Form.Label>मोबाइल नंबर</Form.Label><Form.Control required onChange={(e) => setFormData({...formData, mobile: e.target.value})} /></Form.Group></Col>
                            <Col md={4}><Form.Group className="mb-3"><Form.Label>पद/भूमिका</Form.Label>
                                <Form.Select onChange={(e) => setFormData({...formData, role: e.target.value})}>
                                    <option>Packing Staff</option><option>Technical Staff</option><option>Cashier</option><option>Security Guard</option><option>Delivery Boy</option>
                                </Form.Select>
                            </Form.Group></Col>
                        </Row>
                    </Card>

                    <Card className="p-4 mb-4 shadow-sm border-0">
                        <h5 className="text-primary mb-3">2. बैंक और शैक्षणिक विवरण (Bank & Education)</h5>
                        <Row>
                            <Col md={4}><Form.Group className="mb-3"><Form.Label>बैंक का नाम</Form.Label><Form.Control onChange={(e) => setFormData({...formData, bankDetails: {...formData.bankDetails, bankName: e.target.value}})} /></Form.Group></Col>
                            <Col md={4}><Form.Group className="mb-3"><Form.Label>अकाउंट नंबर</Form.Label><Form.Control onChange={(e) => setFormData({...formData, bankDetails: {...formData.bankDetails, accountNumber: e.target.value}})} /></Form.Group></Col>
                            <Col md={4}><Form.Group className="mb-3"><Form.Label>IFSC कोड</Form.Label><Form.Control onChange={(e) => setFormData({...formData, bankDetails: {...formData.bankDetails, ifscCode: e.target.value}})} /></Form.Group></Col>
                        </Row>
                        <Row>
                            <Col md={6}><Form.Group className="mb-3"><Form.Label>शैक्षणिक योग्यता</Form.Label>
                                <Form.Select onChange={(e) => setFormData({...formData, qualification: e.target.value})}>
                                    <option>8th</option><option>10th</option><option>12th</option><option>Graduate</option><option>Other</option>
                                </Form.Select>
                            </Form.Group></Col>
                            <Col md={6}><Form.Group className="mb-3"><Form.Label>योग्यता प्रमाण पत्र (Upload)</Form.Label><Form.Control type="file" name="eduCertificate" onChange={handleFile} /></Form.Group></Col>
                        </Row>
                    </Card>

                    <div className="d-flex gap-3">
                        <Button type="submit" variant="success" size="lg">Register Staff</Button>
                        <Button variant="secondary" size="lg">Cancel</Button>
                    </div>
                </Form>
            </Container>
        </AdminLayout>
    );
};

export default StaffRegisterScreen;