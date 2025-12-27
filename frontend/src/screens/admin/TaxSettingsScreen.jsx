import { useState } from 'react';
import { Form, Button, Card, InputGroup } from 'react-bootstrap';
import AdminLayout from '../../components/AdminLayout';
import { FaSave, FaPercentage } from 'react-icons/fa';
import { toast } from 'react-toastify';

const TaxSettingsScreen = () => {
    const [gst, setGst] = useState(18);

    return (
        <AdminLayout title="Tax & GST Rules">
            <Card className="p-5 border-0 shadow-sm" style={{maxWidth: '500px'}}>
                <h4 className="mb-4">Global Tax Configuration</h4>
                <Form onSubmit={(e) => { e.preventDefault(); toast.success('Tax Rules Updated'); }}>
                    <Form.Group className="mb-3">
                        <Form.Label>Default GST Rate</Form.Label>
                        <InputGroup>
                            <Form.Control type="number" value={gst} onChange={(e) => setGst(e.target.value)} />
                            <InputGroup.Text><FaPercentage/></InputGroup.Text>
                        </InputGroup>
                        <Form.Text className="text-muted">This tax applies to all products by default.</Form.Text>
                    </Form.Group>
                    <Form.Check type="switch" label="Inclusive of Tax Prices" className="mb-4" defaultChecked />
                    <Button type="submit" variant="primary" className="w-100"><FaSave className="me-2"/> Save Settings</Button>
                </Form>
            </Card>
        </AdminLayout>
    );
};
export default TaxSettingsScreen;