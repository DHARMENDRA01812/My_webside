import { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ShopRegisterScreen = () => {
  const navigate = useNavigate();

  // सारे फॉर्म फील्ड्स का स्टेट
  const [formData, setFormData] = useState({
    fullName: '', fatherName: '', dob: '', mobile: '', email: '',
    aadhaarNumber: '', panNumber: '', gstNumber: '',
    
    // Addresses
    permState: 'Bihar', permDistrict: 'Patna', permBlock: 'Patna Sadar', permBlockCode: '0123', permAddress: '', permPin: '',
    currState: '', currDistrict: '', currBlock: '', currAddress: '', currPin: '',
    isSameAddress: false,
    
    shopState: 'Bihar', shopDistrict: 'Patna', shopBlock: 'Patna Sadar', shopAddress: '', shopPin: '',
    
    bankName: 'SBI', accountNumber: '', ifscCode: ''
  });

  // फाइल्स का स्टेट
  const [files, setFiles] = useState({
    photo: null, aadhaarImage: null, panImage: null,
    shopImageInside: null, shopImageOutside: null, passbookImage: null
  });

  // टेक्स्ट इनपुट हैंडलर
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
        setFormData({ ...formData, [name]: checked });
    } else {
        setFormData({ ...formData, [name]: value });
    }
  };

  // फाइल इनपुट हैंडलर
  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // FormData ऑब्जेक्ट बनाएं (फाइल अपलोड के लिए जरुरी)
    const dataPayload = new FormData();
    
    // फाइल्स जोड़ें
    for (let key in files) {
        if(files[key]) dataPayload.append(key, files[key]);
    }

    // JSON डेटा को स्ट्रिंग बनाकर भेजें
    const appData = {
        fullName: formData.fullName,
        fatherName: formData.fatherName,
        dob: formData.dob,
        mobile: formData.mobile,
        email: formData.email,
        aadhaarNumber: formData.aadhaarNumber,
        panNumber: formData.panNumber,
        gstNumber: formData.gstNumber,
        permanentAddress: {
            state: formData.permState, district: formData.permDistrict,
            block: formData.permBlock, blockCode: formData.permBlockCode,
            fullAddress: formData.permAddress, pinCode: formData.permPin
        },
        currentAddress: formData.isSameAddress ? {
             state: formData.permState, district: formData.permDistrict,
             block: formData.permBlock, fullAddress: formData.permAddress, pinCode: formData.permPin
        } : {
             state: formData.currState, district: formData.currDistrict,
             block: formData.currBlock, fullAddress: formData.currAddress, pinCode: formData.currPin
        },
        shopAddress: {
            state: formData.shopState, district: formData.shopDistrict,
            block: formData.shopBlock, fullAddress: formData.shopAddress, pinCode: formData.shopPin
        },
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode
    };

    dataPayload.append('data', JSON.stringify(appData));

    try {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        await axios.post('/api/shop-owner/register', dataPayload, config);
        toast.success('Application Submitted Successfully!');
        navigate('/');
    } catch (error) {
        toast.error(error.response?.data?.message || 'Error uploading data');
    }
  };

  return (
    <Container>
      <Card className="p-4 my-3 shadow-sm">
        <h2 className="text-center mb-4">Shop Owner Registration</h2>
        <Form onSubmit={submitHandler}>
            
            <h5 className="bg-light p-2 mb-3">I. Personal Information</h5>
            <Row>
                <Col md={4}><Form.Group className="mb-3"><Form.Label>Full Name</Form.Label><Form.Control required name="fullName" onChange={handleChange} /></Form.Group></Col>
                <Col md={4}><Form.Group className="mb-3"><Form.Label>Father Name</Form.Label><Form.Control required name="fatherName" onChange={handleChange} /></Form.Group></Col>
                <Col md={4}><Form.Group className="mb-3"><Form.Label>DOB</Form.Label><Form.Control type="date" required name="dob" onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row>
                <Col md={4}><Form.Group className="mb-3"><Form.Label>Mobile</Form.Label><Form.Control required name="mobile" onChange={handleChange} /></Form.Group></Col>
                <Col md={4}><Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" required name="email" onChange={handleChange} /></Form.Group></Col>
                <Col md={4}><Form.Group className="mb-3"><Form.Label>Your Photo</Form.Label><Form.Control type="file" required name="photo" onChange={handleFileChange} /></Form.Group></Col>
            </Row>

            <h5 className="bg-light p-2 mb-3">II. Identity Proof</h5>
            <Row>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Aadhaar No.</Form.Label><Form.Control required name="aadhaarNumber" onChange={handleChange} /></Form.Group></Col>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Upload Aadhaar</Form.Label><Form.Control type="file" required name="aadhaarImage" onChange={handleFileChange} /></Form.Group></Col>
            </Row>
            <Row>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>PAN No.</Form.Label><Form.Control required name="panNumber" onChange={handleChange} /></Form.Group></Col>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Upload PAN</Form.Label><Form.Control type="file" required name="panImage" onChange={handleFileChange} /></Form.Group></Col>
            </Row>
            <Row><Col md={12}><Form.Group className="mb-3"><Form.Label>GST No. (Optional)</Form.Label><Form.Control name="gstNumber" onChange={handleChange} /></Form.Group></Col></Row>

            <h5 className="bg-light p-2 mb-3">III. Permanent Address</h5>
            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3"><Form.Label>State</Form.Label>
                    <Form.Select name="permState" onChange={handleChange}>
                        <option value="Bihar">Bihar</option>
                        <option value="UP">UP</option>
                    </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3"><Form.Label>District</Form.Label>
                    <Form.Select name="permDistrict" onChange={handleChange}>
                        <option value="Patna">Patna</option>
                        <option value="Gaya">Gaya</option>
                    </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3"><Form.Label>Block</Form.Label>
                    <Form.Select name="permBlock" onChange={handleChange}>
                        <option value="Patna Sadar">Patna Sadar</option>
                        <option value="Danapur">Danapur</option>
                    </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                 <Col md={8}><Form.Group className="mb-3"><Form.Label>Full Address</Form.Label><Form.Control required name="permAddress" onChange={handleChange} /></Form.Group></Col>
                 <Col md={4}><Form.Group className="mb-3"><Form.Label>Pin Code</Form.Label><Form.Control required name="permPin" onChange={handleChange} /></Form.Group></Col>
            </Row>

            <h5 className="bg-light p-2 mb-3">IV. Current Address</h5>
            <Form.Check type="checkbox" label="Same as Permanent Address" name="isSameAddress" onChange={handleChange} className="mb-3" />
            
            {!formData.isSameAddress && (
                 <Row>
                    <Col md={12}><Form.Control placeholder="Enter Current Address Details..." name="currAddress" onChange={handleChange}/></Col>
                 </Row>
            )}

            <h5 className="bg-light p-2 mb-3">V. Shop Details</h5>
             <Row>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Shop Address</Form.Label><Form.Control required name="shopAddress" onChange={handleChange} /></Form.Group></Col>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Shop Pin</Form.Label><Form.Control required name="shopPin" onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Shop Photo (Inside)</Form.Label><Form.Control type="file" required name="shopImageInside" onChange={handleFileChange} /></Form.Group></Col>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Shop Photo (Outside)</Form.Label><Form.Control type="file" required name="shopImageOutside" onChange={handleFileChange} /></Form.Group></Col>
            </Row>

            <h5 className="bg-light p-2 mb-3">VI. Bank Details</h5>
            <Row>
                <Col md={4}>
                    <Form.Group className="mb-3"><Form.Label>Bank Name</Form.Label>
                    <Form.Select name="bankName" onChange={handleChange}>
                        <option value="SBI">SBI</option>
                        <option value="PNB">PNB</option>
                        <option value="HDFC">HDFC</option>
                    </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={4}><Form.Group className="mb-3"><Form.Label>Account No.</Form.Label><Form.Control required name="accountNumber" onChange={handleChange} /></Form.Group></Col>
                <Col md={4}><Form.Group className="mb-3"><Form.Label>IFSC Code</Form.Label><Form.Control required name="ifscCode" onChange={handleChange} /></Form.Group></Col>
            </Row>
            <Row>
                <Col md={12}><Form.Group className="mb-3"><Form.Label>Upload Passbook/Cheque</Form.Label><Form.Control type="file" required name="passbookImage" onChange={handleFileChange} /></Form.Group></Col>
            </Row>

            <Button type="submit" variant="success" size="lg" className="w-100 mt-4">Submit Application</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ShopRegisterScreen;