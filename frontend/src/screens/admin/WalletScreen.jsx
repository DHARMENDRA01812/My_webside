import { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Badge, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout';
import { FaWallet, FaArrowUp, FaArrowDown, FaHistory, FaMoneyBillWave, FaDownload } from 'react-icons/fa';

const WalletScreen = () => {
    const [wallet, setWallet] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWallet = async () => {
            try {
                const { data } = await axios.get('/api/wallet/my');
                setWallet(data);
            } catch (error) {
                toast.error('Error fetching wallet data');
            } finally {
                setLoading(false);
            }
        };
        fetchWallet();
    }, []);

    if (loading) {
        return (
            <AdminLayout title="My Wallet">
                <div className="d-flex justify-content-center align-items-center" style={{height: '60vh'}}>
                    <Spinner animation="border" variant="primary" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="My Earnings & Wallet">
            {/* --- Top Stats Cards --- */}
            <Row className="mb-4 g-4">
                <Col md={6}>
                    <Card className="bg-primary text-white shadow-sm border-0 h-100 rounded-4 overflow-hidden position-relative">
                        <div className="position-absolute top-0 end-0 p-3 opacity-25">
                            <FaWallet size={80} />
                        </div>
                        <Card.Body className="p-4 d-flex flex-column justify-content-center">
                            <h6 className="text-uppercase mb-2 opacity-75 fw-bold">Current Balance</h6>
                            <h1 className="fw-bold display-4 mb-0">₹{wallet?.balance?.toLocaleString('en-IN') || 0}</h1>
                            <small className="mt-2 opacity-75">Available for Payout</small>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="bg-success text-white shadow-sm border-0 h-100 rounded-4 overflow-hidden position-relative">
                        <div className="position-absolute top-0 end-0 p-3 opacity-25">
                            <FaMoneyBillWave size={80} />
                        </div>
                        <Card.Body className="p-4 d-flex flex-column justify-content-center">
                            <h6 className="text-uppercase mb-2 opacity-75 fw-bold">Total Lifetime Earnings</h6>
                            <h1 className="fw-bold display-4 mb-0">₹{wallet?.totalEarned?.toLocaleString('en-IN') || 0}</h1>
                            <small className="mt-2 opacity-75">Gross income generated till date</small>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* --- Transaction History Table --- */}
            <Card className="shadow-sm border-0 rounded-4">
                <div className="card-header bg-white py-3 px-4 border-bottom d-flex justify-content-between align-items-center">
                    <h5 className="m-0 fw-bold text-secondary"><FaHistory className="me-2"/> Transaction History</h5>
                    <Button variant="outline-dark" size="sm" className="rounded-pill">
                        <FaDownload className="me-2"/> Statement
                    </Button>
                </div>
                <div className="table-responsive">
                    <Table hover className="align-middle mb-0">
                        <thead className="bg-light text-secondary small text-uppercase">
                            <tr>
                                <th className="ps-4">Date & Time</th>
                                <th>Description</th>
                                <th>Reference ID</th>
                                <th>Type</th>
                                <th className="text-end pe-4">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wallet?.transactions?.length > 0 ? (
                                // Show latest transactions first
                                wallet.transactions.slice().reverse().map((txn) => (
                                    <tr key={txn._id} style={{borderBottom: '1px solid #f0f0f0'}}>
                                        <td className="ps-4 text-muted small">
                                            <div className="fw-bold text-dark">{new Date(txn.date).toLocaleDateString()}</div>
                                            {new Date(txn.date).toLocaleTimeString()}
                                        </td>
                                        <td>
                                            <div className="fw-bold text-dark">{txn.description}</div>
                                            <small className="text-muted">Auto-Credited</small>
                                        </td>
                                        <td>
                                            {txn.orderId ? (
                                                <Badge bg="light" text="dark" className="border font-monospace">
                                                    #{typeof txn.orderId === 'object' ? txn.orderId._id?.substring(0,8) : txn.orderId?.substring(0,8)}
                                                </Badge>
                                            ) : '-'}
                                        </td>
                                        <td>
                                            {txn.type === 'Credit' ? 
                                                <Badge bg="success" className="bg-opacity-10 text-success border border-success rounded-pill px-3">
                                                    <FaArrowUp className="me-1"/> Credit
                                                </Badge> : 
                                                <Badge bg="danger" className="bg-opacity-10 text-danger border border-danger rounded-pill px-3">
                                                    <FaArrowDown className="me-1"/> Debit
                                                </Badge>
                                            }
                                        </td>
                                        <td className={`text-end pe-4 fw-bold fs-6 ${txn.type === 'Credit' ? 'text-success' : 'text-danger'}`}>
                                            {txn.type === 'Credit' ? '+' : '-'} ₹{txn.amount.toFixed(2)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">
                                        <div className="opacity-50 mb-2"><FaWallet size={40}/></div>
                                        No transactions found yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </Card>
        </AdminLayout>
    );
};

export default WalletScreen;