import { Container, Row, Col, Card, ProgressBar, ListGroup, Button } from 'react-bootstrap';
import AdminLayout from '../../components/AdminLayout';
import { FaServer, FaBug, FaUserCheck, FaDownload, FaHistory } from 'react-icons/fa';

const SystemReportScreen = () => {
  return (
    <AdminLayout title="System Reports & Logs">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold text-dark">System Health Monitor</h3>
            <Button variant="dark" size="sm"><FaDownload className="me-2"/> Download Logs</Button>
        </div>

        {/* --- Top Stats --- */}
        <Row className="g-4 mb-4">
            <Col md={4}>
                <Card className="p-4 border-0 shadow-sm text-center">
                    <FaServer size={40} className="text-primary mb-3 mx-auto"/>
                    <h5>Server Status</h5>
                    <Badge bg="success" className="p-2 mt-1">Operational</Badge>
                    <small className="text-muted d-block mt-2">Uptime: 99.9%</small>
                </Card>
            </Col>
            <Col md={4}>
                <Card className="p-4 border-0 shadow-sm text-center">
                    <FaBug size={40} className="text-danger mb-3 mx-auto"/>
                    <h5>Error Logs</h5>
                    <h2 className="fw-bold">0</h2>
                    <small className="text-muted">No critical errors found.</small>
                </Card>
            </Col>
            <Col md={4}>
                <Card className="p-4 border-0 shadow-sm text-center">
                    <FaUserCheck size={40} className="text-info mb-3 mx-auto"/>
                    <h5>Active Sessions</h5>
                    <h2 className="fw-bold">12</h2>
                    <small className="text-muted">Users currently online.</small>
                </Card>
            </Col>
        </Row>

        {/* --- Resource Usage --- */}
        <Card className="p-4 shadow-sm border-0 mb-4">
            <h5 className="fw-bold mb-4">Resource Utilization</h5>
            <div className="mb-3">
                <div className="d-flex justify-content-between"><span>CPU Load</span><span>34%</span></div>
                <ProgressBar now={34} variant="info" style={{height:'8px'}} className="mt-1"/>
            </div>
            <div className="mb-3">
                <div className="d-flex justify-content-between"><span>Memory Usage (RAM)</span><span>62%</span></div>
                <ProgressBar now={62} variant="warning" style={{height:'8px'}} className="mt-1"/>
            </div>
            <div className="mb-3">
                <div className="d-flex justify-content-between"><span>Database Storage</span><span>45%</span></div>
                <ProgressBar now={45} variant="success" style={{height:'8px'}} className="mt-1"/>
            </div>
        </Card>

        {/* --- Recent Activity Logs --- */}
        <Card className="p-4 shadow-sm border-0">
            <h5 className="fw-bold mb-3"><FaHistory className="me-2"/> Recent System Activity</h5>
            <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <div><strong>New User Registration</strong> <span className="text-muted">- Rahul Kumar</span></div>
                    <small className="text-muted">2 mins ago</small>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <div><strong>Shop Approved</strong> <span className="text-muted">- Amit Electronics (Patna)</span></div>
                    <small className="text-muted">1 hour ago</small>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <div><strong>Order Placed</strong> <span className="text-muted">- Order #98234</span></div>
                    <small className="text-muted">3 hours ago</small>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <div><strong className="text-danger">Failed Login Attempt</strong> <span className="text-muted">- IP: 192.168.1.45</span></div>
                    <small className="text-muted">5 hours ago</small>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    </AdminLayout>
  );
};

// Helper for Badge since React-Bootstrap Badge wasn't imported
const Badge = ({bg, children, className}) => (
    <span className={`badge bg-${bg} ${className}`}>{children}</span>
);

export default SystemReportScreen;