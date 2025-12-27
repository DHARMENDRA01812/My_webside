import { Form, Button, Card, Col, Row } from 'react-bootstrap';
import AdminLayout from '../../components/AdminLayout';
import { FaSave } from 'react-icons/fa';

const GeneralSettingsScreen = () => {
  return (
    <AdminLayout title="General Settings">
        <Card className="p-5 border-0 shadow-sm" style={{maxWidth: '800px'}}>
            <h4 className="mb-4">Site Configuration</h4>
            <Form>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label>Site Name</Form.Label>
                        <Form.Control type="text" defaultValue="MyShop Multi-Vendor"/>
                    </Col>
                    <Col md={6}>
                        <Form.Label>Support Email</Form.Label>
                        <Form.Control type="email" defaultValue="support@myshop.com"/>
                    </Col>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>Site Logo URL</Form.Label>
                    <Form.Control type="text" defaultValue="/logo.png"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check type="switch" label="Enable Maintenance Mode" />
                </Form.Group>
                <Button variant="primary"><FaSave className="me-2"/> Save Changes</Button>
            </Form>
        </Card>
    </AdminLayout>
  );
};
export default GeneralSettingsScreen;