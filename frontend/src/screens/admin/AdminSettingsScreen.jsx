import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Container, Spinner, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout';
import { FaSave, FaUpload, FaGlobe, FaPhoneAlt, FaStamp, FaPenNib, FaTools } from 'react-icons/fa';

const AdminSettingsScreen = () => {
    const [settings, setSettings] = useState({
        siteName: '', siteTagline: '', supportEmail: '', globalSupportNumber: '',
        minOrderAmount: 0, adminSignature: '', adminStamp: '', maintenanceMode: false
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await axios.get('/api/settings');
                setSettings(data);
            } catch (err) { toast.error('Failed to load settings'); }
        };
        fetchSettings();
    }, []);

    // इमेज अपलोड हैंडलर (Signature & Seal के लिए)
    const uploadFileHandler = async (e, fieldName) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const { data } = await axios.post('/api/upload', formData, config);
            setSettings({ ...settings, [fieldName]: data });
            setUploading(false);
            toast.success('Image uploaded successfully');
        } catch (error) {
            setUploading(false);
            toast.error('Upload failed');
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/api/settings', settings);
            toast.success('System settings updated successfully!');
        } catch (err) { toast.error('Update failed'); }
    };

    return (
        <AdminLayout title="Global System Settings">
            <Container fluid>
                <Form onSubmit={submitHandler}>
                    <Row className="g-4">
                        {/* 1. Website Identity */}
                        <Col lg={6}>
                            <Card className="shadow-sm border-0 h-100">
                                <Card.Header className="bg-white fw-bold"><FaGlobe className="me-2 text-primary"/> Website Identity</Card.Header>
                                <Card.Body>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Website Name</Form.Label>
                                        <Form.Control value={settings.siteName} onChange={(e) => setSettings({...settings, siteName: e.target.value})} placeholder="e.g. MyShop India" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Site Tagline</Form.Label>
                                        <Form.Control value={settings.siteTagline} onChange={(e) => setSettings({...settings, siteTagline: e.target.value})} placeholder="Quality at your doorstep" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Support Email Address</Form.Label>
                                        <Form.Control type="email" value={settings.supportEmail} onChange={(e) => setSettings({...settings, supportEmail: e.target.value})} />
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* 2. Official Documents (Signature & Stamp) */}
                        <Col lg={6}>
                            <Card className="shadow-sm border-0 h-100">
                                <Card.Header className="bg-white fw-bold"><FaStamp className="me-2 text-success"/> Digital Verification</Card.Header>
                                <Card.Body>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Admin Signature (for Certificates)</Form.Label>
                                        <div className="d-flex align-items-center gap-3">
                                            {settings.adminSignature && <img src={settings.adminSignature} alt="Sign" style={{height:'40px', border:'1px solid #ddd'}} />}
                                            <Form.Control type="file" onChange={(e) => uploadFileHandler(e, 'adminSignature')} />
                                        </div>
                                        <small className="text-muted"><FaPenNib/> Transparent PNG recommended</small>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Official Seal/Stamp (for Certificates)</Form.Label>
                                        <div className="d-flex align-items-center gap-3">
                                            {settings.adminStamp && <img src={settings.adminStamp} alt="Stamp" style={{height:'40px'}} />}
                                            <Form.Control type="file" onChange={(e) => uploadFileHandler(e, 'adminStamp')} />
                                        </div>
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* 3. Business Rules */}
                        <Col lg={6}>
                            <Card className="shadow-sm border-0 h-100">
                                <Card.Header className="bg-white fw-bold"><FaPhoneAlt className="me-2 text-danger"/> Business Rules & Support</Card.Header>
                                <Card.Body>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Global Customer Care Number</Form.Label>
                                        <Form.Control value={settings.globalSupportNumber} onChange={(e) => setSettings({...settings, globalSupportNumber: e.target.value})} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Minimum Order Amount (₹)</Form.Label>
                                        <Form.Control type="number" value={settings.minOrderAmount} onChange={(e) => setSettings({...settings, minOrderAmount: e.target.value})} />
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* 4. System Controls */}
                        <Col lg={6}>
                            <Card className="shadow-sm border-0 h-100 border-start border-4 border-warning">
                                <Card.Header className="bg-white fw-bold"><FaTools className="me-2 text-warning"/> System Maintenance</Card.Header>
                                <Card.Body>
                                    <Form.Check 
                                        type="switch"
                                        id="maintenance-mode"
                                        label="Enable Maintenance Mode"
                                        checked={settings.maintenanceMode}
                                        onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                                        className="fs-5 mb-3"
                                    />
                                    <p className="text-muted small">When enabled, customers will see a 'Under Maintenance' page and cannot place orders.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <div className="mt-5 mb-5">
                        <Button type="submit" variant="dark" size="lg" className="w-100 shadow" disabled={uploading}>
                            {uploading ? <><Spinner size="sm" className="me-2"/> Uploading...</> : <><FaSave className="me-2"/> Update All Global Settings</>}
                        </Button>
                    </div>
                </Form>
            </Container>
        </AdminLayout>
    );
};

export default AdminSettingsScreen;