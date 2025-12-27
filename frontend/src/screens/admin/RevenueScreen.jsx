import { Card, Row, Col, Table, Badge, Button } from 'react-bootstrap';
import AdminLayout from '../../components/AdminLayout';
import { FaDownload, FaMoneyBillWave } from 'react-icons/fa';

const RevenueScreen = () => {
  return (
    <AdminLayout title="Revenue Reports">
        <div className="d-flex justify-content-between mb-4">
            <h3>Financial Overview</h3>
            <Button variant="success"><FaDownload className="me-2"/> Download Report</Button>
        </div>
        <Row className="g-4 mb-4">
            <Col md={4}><Card className="p-4 bg-primary text-white"><h3>₹1,25,000</h3><span>Total Revenue</span></Card></Col>
            <Col md={4}><Card className="p-4 bg-warning text-dark"><h3>₹15,000</h3><span>Pending Payouts</span></Card></Col>
            <Col md={4}><Card className="p-4 bg-success text-white"><h3>₹85,000</h3><span>Net Profit</span></Card></Col>
        </Row>
        <Card className="p-4 border-0 shadow-sm">
            <h5>Recent Transactions</h5>
            <Table hover className="mt-3">
                <thead className="bg-light"><tr><th>ID</th><th>Shop</th><th>Amount</th><th>Type</th><th>Status</th></tr></thead>
                <tbody>
                    <tr><td>#TXN123</td><td>Amit Electronics</td><td>₹5,000</td><td>Commission</td><td><Badge bg="success">Paid</Badge></td></tr>
                    <tr><td>#TXN124</td><td>Raj Fashion</td><td>₹2,500</td><td>Payout</td><td><Badge bg="warning">Pending</Badge></td></tr>
                </tbody>
            </Table>
        </Card>
    </AdminLayout>
  );
};
export default RevenueScreen;