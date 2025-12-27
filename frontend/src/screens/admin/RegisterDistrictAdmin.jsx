import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Container, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout';
import { 
    FaUser, FaMapMarkerAlt, FaUniversity, FaSave, FaPhoneAlt, FaBriefcase 
} from 'react-icons/fa';
import { AllIndianBanks } from '../../utils/bankList';

const RegisterDistrictAdmin = () => {
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(false);

    // --- Dropdown States (अलग-अलग सेक्शन्स के लिए) ---
    const [permDistricts, setPermDistricts] = useState([]);
    const [permBlocks, setPermBlocks] = useState([]);
    
    const [tempDistricts, setTempDistricts] = useState([]);
    const [tempBlocks, setTempBlocks] = useState([]);
    
    const [officeDistricts, setOfficeDistricts] = useState([]);

    const [formData, setFormData] = useState({
        fullName: '', fatherName: '', dob: '', gender: 'Male',
        mobile: '', whatsapp: '', sameAsMobile: false, alternateMobile: '', email: '',
        aadhaarNumber: '', panNumber: '',
        permAddress: { state: '', district: '', block: '', full: '', pin: '' },
        tempAddress: { state: '', district: '', block: '', full: '', pin: '' },
        sameAsPerm: false,
        officeAddress: { state: '', district: '', full: '', pin: '' }, // Office के लिए सिर्फ State/Dist
        bankName: '', accountNumber: '', ifscCode: ''
    });

    const [files, setFiles] = useState({ photo: '', aadhaarImage: '', panImage: '', passbookImage: '' });

    // --- Initial Load (Get States) ---
    useEffect(() => {
        const fetchStates = async () => {
            try {
                const { data } = await axios.get('/api/locations/states');
                setStates(data);
            } catch (err) { toast.error("Error loading states"); }
        };
        fetchStates();
    }, []);

    // --- Generic Cascading Logic (Reusable) ---
    const handleLocationChange = async (type, level, value) => {
        const updatedData = { ...formData };

        if (level === 'state') {
            updatedData[type].state = value;
            updatedData[type].district = '';
            updatedData[type].block = '';

            const { data } = await axios.get(`/api/locations/districts/${value}`);
            if (type === 'permAddress') { setPermDistricts(data); setPermBlocks([]); }
            else if (type === 'tempAddress') { setTempDistricts(data); setTempBlocks([]); }
            else if (type === 'officeAddress') { setOfficeDistricts(data); }

        } else if (level === 'district') {
            updatedData[type].district = value;
            updatedData[type].block = '';

            if (type !== 'officeAddress') {
                const { data } = await axios.get(`/api/locations/blocks/${value}`);
                if (type === 'permAddress') setPermBlocks(data);
                else if (type === 'tempAddress') setTempBlocks(data);
            }
        } else if (level === 'block') {
            updatedData[type].block = value;
        }

        setFormData(updatedData);
    };

    // --- Checkbox Handlers ---
    const handleAddressCheck = (e) => {
        const checked = e.target.checked;
        setFormData(prev => ({
            ...prev,
            sameAsPerm: checked,
            tempAddress: checked ? { ...prev.permAddress } : { state: '', district: '', block: '', full: '', pin: '' }
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/admin-custom/district-admin', { ...formData, ...files });
            toast.success("District Admin Registered Successfully!");
            setLoading(false);
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration Failed");
            setLoading(false);
        }
    };

    return (
        <AdminLayout title="District Admin Registration">
            <Container className="pb-5">
                <Form onSubmit={submitHandler}>
                    
                    {/* SECTION 1: PERSONAL & CONTACT (Same as before) */}
                    <Card className="shadow-sm border-0 mb-4 rounded-4 overflow-hidden">
                        <div className="bg-primary p-3 text-white fw-bold"><FaUser className="me-2"/> 1. Personal & Contact Information</div>
                        <Card.Body className="p-4">
                            <Row className="g-3">
                                <Col md={4}><Form.Label>Full Name</Form.Label><Form.Control required onChange={(e)=>setFormData({...formData, fullName: e.target.value})}/></Col>
                                <Col md={4}><Form.Label>Father's Name</Form.Label><Form.Control required onChange={(e)=>setFormData({...formData, fatherName: e.target.value})}/></Col>
                                <Col md={2}><Form.Label>DOB</Form.Label><Form.Control type="date" required onChange={(e)=>setFormData({...formData, dob: e.target.value})}/></Col>
                                <Col md={2}><Form.Label>Gender</Form.Label>
                                    <Form.Select onChange={(e)=>setFormData({...formData, gender: e.target.value})}><option>Male</option><option>Female</option><option>Transgender</option></Form.Select>
                                </Col>
                                <Col md={4}><Form.Label>Mobile</Form.Label><Form.Control required type="number" onChange={(e)=>setFormData({...formData, mobile: e.target.value})}/></Col>
                                <Col md={4}><Form.Label>Email ID</Form.Label><Form.Control required type="email" onChange={(e)=>setFormData({...formData, email: e.target.value})}/></Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    {/* SECTION 2: PERMANENT & TEMPORARY ADDRESS */}
                    <Card className="shadow-sm border-0 mb-4 rounded-4 overflow-hidden">
                        <div className="bg-success p-3 text-white fw-bold"><FaMapMarkerAlt className="me-2"/> 2. Permanent & Temporary Address</div>
                        <Card.Body className="p-4">
                            <h6 className="fw-bold text-success border-bottom pb-2">Permanent Address</h6>
                            <Row className="g-3 mb-4">
                                <Col md={4}><Form.Label>State</Form.Label>
                                    <Form.Select required onChange={(e) => handleLocationChange('permAddress', 'state', e.target.value)}>
                                        <option value="">Select State</option>{states.map(s => <option key={s} value={s}>{s}</option>)}
                                    </Form.Select>
                                </Col>
                                <Col md={4}><Form.Label>District</Form.Label>
                                    <Form.Select required onChange={(e) => handleLocationChange('permAddress', 'district', e.target.value)} disabled={!permDistricts.length}>
                                        <option value="">Select District</option>{permDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                                    </Form.Select>
                                </Col>
                                <Col md={4}><Form.Label>Block</Form.Label>
                                    <Form.Select required onChange={(e) => handleLocationChange('permAddress', 'block', e.target.value)} disabled={!permBlocks.length}>
                                        <option value="">Select Block</option>
                                        {/* ✅ यहाँ से खाली () हटा दिया गया है */}
                                        {permBlocks.map(b => <option key={b._id} value={b.block}>{b.block}</option>)}
                                    </Form.Select>
                                </Col>
                                <Col md={10}><Form.Label>Full Address</Form.Label><Form.Control required onChange={(e)=>setFormData({...formData, permAddress: {...formData.permAddress, full: e.target.value}})}/></Col>
                                <Col md={2}><Form.Label>Pin Code</Form.Label><Form.Control required onChange={(e)=>setFormData({...formData, permAddress: {...formData.permAddress, pin: e.target.value}})}/></Col>
                            </Row>

                            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mt-4">
                                <h6 className="fw-bold text-success m-0">Temporary Address</h6>
                                <Form.Check type="checkbox" label="Same as Permanent Address" onChange={handleAddressCheck}/>
                            </div>
                            {!formData.sameAsPerm && (
                                <Row className="g-3 mt-2">
                                    <Col md={4}><Form.Label>State</Form.Label>
                                        <Form.Select required onChange={(e) => handleLocationChange('tempAddress', 'state', e.target.value)}>
                                            <option value="">Select State</option>{states.map(s => <option key={s} value={s}>{s}</option>)}
                                        </Form.Select>
                                    </Col>
                                    <Col md={4}><Form.Label>District</Form.Label>
                                        <Form.Select required onChange={(e) => handleLocationChange('tempAddress', 'district', e.target.value)} disabled={!tempDistricts.length}>
                                            <option value="">Select District</option>{tempDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                                        </Form.Select>
                                    </Col>
                                    <Col md={4}><Form.Label>Block</Form.Label>
                                        <Form.Select required onChange={(e) => handleLocationChange('tempAddress', 'block', e.target.value)} disabled={!tempBlocks.length}>
                                            <option value="">Select Block</option>{tempBlocks.map(b => <option key={b._id} value={b.block}>{b.block}</option>)}
                                        </Form.Select>
                                    </Col>
                                    <Col md={10}><Form.Control placeholder="Full Temporary Address" onChange={(e)=>setFormData({...formData, tempAddress: {...formData.tempAddress, full: e.target.value}})}/></Col>
                                    <Col md={2}><Form.Control placeholder="Pin Code" onChange={(e)=>setFormData({...formData, tempAddress: {...formData.tempAddress, pin: e.target.value}})}/></Col>
                                </Row>
                            )}
                        </Card.Body>
                    </Card>

                    {/* SECTION 3: OFFICE ADDRESS (WORK JURISDICTION) */}
                    <Card className="shadow-sm border-0 mb-4 rounded-4 overflow-hidden border-start border-danger border-5">
                        <div className="bg-white p-3 text-danger fw-bold border-bottom"><FaBriefcase className="me-2"/> 3. Office Address (Working Jurisdiction / Posting Area)</div>
                        <Card.Body className="p-4 bg-light bg-opacity-50">
                            <Row className="g-3">
                                <Col md={4}><Form.Label>Appointment State</Form.Label>
                                    <Form.Select required onChange={(e) => handleLocationChange('officeAddress', 'state', e.target.value)}>
                                        <option value="">Select State</option>{states.map(s => <option key={s} value={s}>{s}</option>)}
                                    </Form.Select>
                                </Col>
                                <Col md={4}><Form.Label>Appointment District</Form.Label>
                                    <Form.Select required onChange={(e) => handleLocationChange('officeAddress', 'district', e.target.value)} disabled={!officeDistricts.length}>
                                        <option value="">Select District</option>{officeDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                                    </Form.Select>
                                </Col>
                                <Col md={4}><Form.Label>Office Pin Code</Form.Label><Form.Control required onChange={(e)=>setFormData({...formData, officeAddress: {...formData.officeAddress, pin: e.target.value}})}/></Col>
                                <Col md={12}><Form.Label>Full Office Address</Form.Label><Form.Control required placeholder="Enter Complete Office Address..." onChange={(e)=>setFormData({...formData, officeAddress: {...formData.officeAddress, full: e.target.value}})}/></Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    {/* SECTION 4: BANKING (Same as before) */}
                    <Card className="shadow-sm border-0 mb-4 rounded-4 overflow-hidden">
                        <div className="bg-warning p-3 text-dark fw-bold"><FaUniversity className="me-2"/> 4. Banking Information</div>
                        <Card.Body className="p-4">
                            <Row className="g-3">
                                <Col md={4}><Form.Label>Bank Name</Form.Label>
                                    <Form.Select required onChange={(e) => setFormData({...formData, bankName: e.target.value})}>
                                        <option value="">Select Bank</option>{AllIndianBanks.map((b, idx) => <option key={idx} value={b.name}>{b.name}</option>)}
                                    </Form.Select>
                                </Col>
                                <Col md={4}><Form.Label>Account Number</Form.Label><Form.Control required onChange={(e)=>setFormData({...formData, accountNumber: e.target.value})}/></Col>
                                <Col md={4}><Form.Label>IFSC Code</Form.Label><Form.Control required onChange={(e)=>setFormData({...formData, ifscCode: e.target.value})}/></Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <Button type="submit" variant="dark" size="lg" className="w-100 py-3 rounded-pill shadow-lg mb-5" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : <><FaSave className="me-2"/> Final Register & Generate ID</>}
                    </Button>
                </Form>
            </Container>
        </AdminLayout>
    );
};

export default RegisterDistrictAdmin;