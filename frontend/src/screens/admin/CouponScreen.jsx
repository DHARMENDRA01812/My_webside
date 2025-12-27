import { useState, useEffect } from 'react';
import { Table, Button, Card, Form, Row, Col, Badge, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout';
import { FaPlus, FaTrash, FaTag, FaSave } from 'react-icons/fa';

const CouponScreen = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Form State
    const [code, setCode] = useState('');
    const [discountType, setDiscountType] = useState('Percentage');
    const [value, setValue] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

    // 1. Fetch Coupons from DB
    const fetchCoupons = async () => {
        try {
            const { data } = await axios.get('/api/marketing/coupons');
            setCoupons(data);
        } catch (error) {
            toast.error('Failed to load coupons');
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    // 2. Create Coupon
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/marketing/coupons', {
                code, discountType, value: Number(value), expiryDate
            });
            toast.success('Coupon Created Successfully');
            setCode(''); setValue(''); setExpiryDate(''); // Reset Form
            fetchCoupons(); // Refresh List
        } catch (error) {
            toast.error(error.response?.data?.message || 'Creation Failed');
        }
        setLoading(false);
    };

    // 3. Delete Coupon
    const deleteHandler = async (id) => {
        if (window.confirm('Delete this coupon?')) {
            try {
                await axios.delete(`/api/marketing/coupons/${id}`);
                toast.success('Coupon Deleted');
                fetchCoupons();
            } catch (error) {
                toast.error('Delete Failed');
            }
        }
    };

    return (
        <AdminLayout title="Coupon Management">
            <Row>
                {/* --- Create Form --- */}
                <Col md={4}>
                    <Card className="p-4 border-0 shadow-sm mb-4">
                        <h5 className="mb-3 text-primary"><FaPlus className="me-2"/> Create New Coupon</h5>
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-3">
                                <Form.Label>Coupon Code</Form.Label>
                                <Form.Control 
                                    value={code} 
                                    onChange={(e) => setCode(e.target.value.toUpperCase())} 
                                    placeholder="e.g. HOLI2025" 
                                    required
                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Type</Form.Label>
                                        <Form.Select value={discountType} onChange={(e)=>setDiscountType(e.target.value)}>
                                            <option value="Percentage">Percentage (%)</option>
                                            <option value="Fixed">Fixed Amount (₹)</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Value</Form.Label>
                                        <Form.Control 
                                            type="number" 
                                            value={value} 
                                            onChange={(e)=>setValue(e.target.value)} 
                                            placeholder="10" 
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Expiry Date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    value={expiryDate} 
                                    onChange={(e)=>setExpiryDate(e.target.value)} 
                                    required
                                />
                            </Form.Group>
                            <Button type="submit" variant="dark" className="w-100" disabled={loading}>
                                {loading ? <Spinner size="sm"/> : <><FaSave className="me-2"/> Save Coupon</>}
                            </Button>
                        </Form>
                    </Card>
                </Col>

                {/* --- List Table --- */}
                <Col md={8}>
                    <Card className="p-4 border-0 shadow-sm">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="m-0"><FaTag className="me-2"/> Active Coupons</h5>
                            <Badge bg="info">Total: {coupons.length}</Badge>
                        </div>
                        <Table hover responsive className="align-middle">
                            <thead className="bg-light">
                                <tr><th>Code</th><th>Discount</th><th>Expiry</th><th>Status</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                {coupons.map(c => (
                                    <tr key={c._id}>
                                        <td className="fw-bold text-success">{c.code}</td>
                                        <td>{c.value} {c.discountType === 'Percentage' ? '%' : ' INR'}</td>
                                        <td>{new Date(c.expiryDate).toLocaleDateString()}</td>
                                        <td>
                                            {new Date(c.expiryDate) > new Date() ? 
                                                <Badge bg="success">Active</Badge> : 
                                                <Badge bg="danger">Expired</Badge>
                                            }
                                        </td>
                                        <td>
                                            <Button size="sm" variant="light" className="text-danger" onClick={() => deleteHandler(c._id)}>
                                                <FaTrash/>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {coupons.length === 0 && <tr><td colSpan="5" className="text-center">No coupons created yet.</td></tr>}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
        </AdminLayout>
    );
};

export default CouponScreen;