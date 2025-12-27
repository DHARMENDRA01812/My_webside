import { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaSave, FaUserEdit } from 'react-icons/fa';

const ShopSettingsScreen = () => {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // यहाँ हम मौजूदा डेटा ला सकते हैं (अभी के लिए स्किप कर रहे हैं)
    setFullName(userInfo.name);
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        await axios.put('/api/shop-owner/profile', {
            fullName, mobile, bankName, accountNumber
        });
        toast.success('Profile Updated Successfully!');
    } catch (error) {
        toast.error('Update Failed');
    }
  };

  return (
    <Container className="my-5">
        <Row className="justify-content-center">
            <Col md={8}>
                <Card className="shadow-sm border-0 p-4">
                    <h3 className="mb-4 text-warning"><FaUserEdit className="me-2"/> Shop Settings</h3>
                    
                    <Form onSubmit={submitHandler}>
                        <h5 className="text-muted mb-3">Personal Details</h5>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Owner Name</Form.Label>
                                    <Form.Control value={fullName} onChange={(e)=>setFullName(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mobile Number</Form.Label>
                                    <Form.Control value={mobile} onChange={(e)=>setMobile(e.target.value)} placeholder="Update Mobile" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <h5 className="text-muted mb-3 mt-3">Bank Details (For Payouts)</h5>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Bank Name</Form.Label>
                                    <Form.Control value={bankName} onChange={(e)=>setBankName(e.target.value)} placeholder="e.g. SBI" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Account Number</Form.Label>
                                    <Form.Control value={accountNumber} onChange={(e)=>setAccountNumber(e.target.value)} placeholder="XXXX-XXXX-XXXX" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button type="submit" variant="warning" className="mt-3 w-100 fw-bold">
                            <FaSave className="me-2"/> Save Changes
                        </Button>
                    </Form>
                </Card>
            </Col>
        </Row>
    </Container>
  );
};

export default ShopSettingsScreen;