import { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col, InputGroup, Alert } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout';
import { FaPercentage, FaSave, FaMoneyBillWave, FaInfoCircle } from 'react-icons/fa';

const CommissionScreen = () => {
    const [rates, setRates] = useState({
        systemAdminRate: 0,
        districtAdminRate: 0,
        taxRate: 18
    });
    const [loading, setLoading] = useState(false);

    // Fetch Current Settings
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await axios.get('/api/settings');
                if(data.commission) {
                    setRates(data.commission);
                }
            } catch (error) { toast.error('Error fetching rates'); }
        };
        fetchSettings();
    }, []);

    // Save Settings
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put('/api/settings', {
                commission: rates
            });
            toast.success('Commission Rates Updated Successfully!');
        } catch (error) {
            toast.error('Update Failed');
        }
        setLoading(false);
    };

    // Calculation Preview
    const exampleAmount = 1000;
    const sysEarnings = (exampleAmount * rates.systemAdminRate) / 100;
    const distEarnings = (exampleAmount * rates.districtAdminRate) / 100;
    const sellerEarnings = exampleAmount - sysEarnings - distEarnings;

    return (
        <AdminLayout title="Commission & Tax Configuration">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
                        <div className="bg-primary p-4 text-white">
                            <h4 className="m-0 fw-bold"><FaMoneyBillWave className="me-2"/> Revenue Sharing Rules</h4>
                            <p className="mb-0 opacity-75 small">Set the percentage cut for each order automatically.</p>
                        </div>
                        
                        <Card.Body className="p-4">
                            <Form onSubmit={submitHandler}>
                                <Row className="g-4">
                                    {/* 1. System Admin Commission */}
                                    <Col md={6}>
                                        <Card className="h-100 border bg-light">
                                            <Card.Body>
                                                <Form.Label className="fw-bold text-danger">System Admin Commission</Form.Label>
                                                <InputGroup>
                                                    <Form.Control 
                                                        type="number" 
                                                        step="0.1"
                                                        value={rates.systemAdminRate} 
                                                        onChange={(e) => setRates({...rates, systemAdminRate: e.target.value})} 
                                                        className="fs-5 fw-bold"
                                                    />
                                                    <InputGroup.Text><FaPercentage/></InputGroup.Text>
                                                </InputGroup>
                                                <Form.Text className="text-muted">Fee taken by the platform.</Form.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    {/* 2. District Admin Commission */}
                                    <Col md={6}>
                                        <Card className="h-100 border bg-light">
                                            <Card.Body>
                                                <Form.Label className="fw-bold text-info">District Admin Commission</Form.Label>
                                                <InputGroup>
                                                    <Form.Control 
                                                        type="number" 
                                                        step="0.1"
                                                        value={rates.districtAdminRate} 
                                                        onChange={(e) => setRates({...rates, districtAdminRate: e.target.value})} 
                                                        className="fs-5 fw-bold"
                                                    />
                                                    <InputGroup.Text><FaPercentage/></InputGroup.Text>
                                                </InputGroup>
                                                <Form.Text className="text-muted">Fee for local management.</Form.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    {/* 3. GST / Tax Rate */}
                                    <Col md={12}>
                                        <div className="p-3 border rounded">
                                            <Form.Label className="fw-bold text-dark">Global Tax / GST Rate</Form.Label>
                                            <InputGroup style={{maxWidth: '200px'}}>
                                                <Form.Control 
                                                    type="number" 
                                                    value={rates.taxRate} 
                                                    onChange={(e) => setRates({...rates, taxRate: e.target.value})} 
                                                />
                                                <InputGroup.Text><FaPercentage/></InputGroup.Text>
                                            </InputGroup>
                                        </div>
                                    </Col>
                                </Row>

                                {/* Live Preview Section */}
                                <Alert variant="success" className="mt-4 border-0">
                                    <h6 className="fw-bold"><FaInfoCircle className="me-2"/> Live Calculation Preview</h6>
                                    <p className="mb-2 small">If a product is sold for <strong>₹1,000</strong>:</p>
                                    <ul className="mb-0">
                                        <li>System Admin earns: <strong>₹{sysEarnings}</strong> ({rates.systemAdminRate}%)</li>
                                        <li>District Admin earns: <strong>₹{distEarnings}</strong> ({rates.districtAdminRate}%)</li>
                                        <li>Shop Owner receives: <strong>₹{sellerEarnings}</strong> (Remaining)</li>
                                    </ul>
                                </Alert>

                                <Button type="submit" variant="dark" size="lg" className="w-100 mt-3 rounded-pill fw-bold" disabled={loading}>
                                    <FaSave className="me-2"/> Save Global Rules
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </AdminLayout>
    );
};

export default CommissionScreen;