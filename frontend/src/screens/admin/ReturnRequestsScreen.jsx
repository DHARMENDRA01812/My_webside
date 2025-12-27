import { useState, useEffect } from 'react';
import { Table, Button, Card, Badge, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout';
import { FaCheck, FaTimes, FaUndo, FaEye } from 'react-icons/fa';

const ReturnRequestsScreen = () => {
    const [returns, setReturns] = useState([]);
    
    // Modal State for Action
    const [showModal, setShowModal] = useState(false);
    const [selectedReq, setSelectedReq] = useState(null);
    const [adminComment, setAdminComment] = useState('');

    useEffect(() => {
        fetchReturns();
    }, []);

    const fetchReturns = async () => {
        try {
            const { data } = await axios.get('/api/returns');
            setReturns(data);
        } catch (error) {
            toast.error('Error fetching return requests');
        }
    };

    const handleActionClick = (req) => {
        setSelectedReq(req);
        setShowModal(true);
    };

    const submitAction = async (status) => {
        try {
            await axios.put(`/api/returns/${selectedReq._id}`, {
                status,
                adminComment
            });
            toast.success(`Request ${status}`);
            setShowModal(false);
            setAdminComment('');
            fetchReturns(); // Refresh list
        } catch (error) {
            toast.error('Update failed');
        }
    };

    return (
        <AdminLayout title="Return & Refund Management">
            <Card className="p-4 border-0 shadow-sm">
                <h5 className="mb-4 text-primary"><FaUndo className="me-2"/> Customer Return Requests</h5>
                
                <Table hover responsive className="align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {returns.map(r => (
                            <tr key={r._id}>
                                <td className="fw-bold text-dark">
                                    {r.order ? r.order.substring(0, 8) : 'N/A'}
                                </td>
                                <td>
                                    <div>{r.user?.name}</div>
                                    <small className="text-muted">{r.user?.email}</small>
                                </td>
                                <td>{r.product?.name || 'Unknown Product'}</td>
                                <td>{r.reason}</td>
                                <td>
                                    <Badge bg={
                                        r.status === 'Pending' ? 'warning' : 
                                        r.status === 'Approved' ? 'success' : 'danger'
                                    }>
                                        {r.status}
                                    </Badge>
                                </td>
                                <td>
                                    {r.status === 'Pending' ? (
                                        <Button size="sm" variant="outline-primary" onClick={() => handleActionClick(r)}>
                                            Process
                                        </Button>
                                    ) : (
                                        <span className="text-muted small">{r.adminComment || '-'}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {returns.length === 0 && <tr><td colSpan="6" className="text-center py-4">No return requests found.</td></tr>}
                    </tbody>
                </Table>
            </Card>

            {/* Action Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton><Modal.Title>Process Return</Modal.Title></Modal.Header>
                <Modal.Body>
                    <p><strong>Customer Reason:</strong> {selectedReq?.reason}</p>
                    <Form.Group>
                        <Form.Label>Admin Note (Visible to User)</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            value={adminComment} 
                            onChange={(e) => setAdminComment(e.target.value)} 
                            placeholder="e.g. Refund initiated, will reflect in 3 days."
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => submitAction('Rejected')}>
                        <FaTimes className="me-1"/> Reject
                    </Button>
                    <Button variant="success" onClick={() => submitAction('Approved')}>
                        <FaCheck className="me-1"/> Approve & Refund
                    </Button>
                </Modal.Footer>
            </Modal>
        </AdminLayout>
    );
};

export default ReturnRequestsScreen;