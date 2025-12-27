import { useState } from 'react';
import { Table, Badge, Button, Card, Modal, Form } from 'react-bootstrap';
import AdminLayout from '../../components/AdminLayout';
import { FaMoneyCheckAlt, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';

const VendorPayoutScreen = () => {
    // Mock Data
    const [payouts, setPayouts] = useState([
        { id: 'PAY001', vendor: 'Amit Electronics', amount: 15000, status: 'Pending', bank: 'SBI - 9876XXXX' },
        { id: 'PAY002', vendor: 'Raja Fashion', amount: 8500, status: 'Paid', bank: 'HDFC - 1234XXXX' },
    ]);

    const handlePay = (id) => {
        if(window.confirm('Mark this amount as PAID to vendor bank account?')) {
            const updated = payouts.map(p => p.id === id ? {...p, status: 'Paid'} : p);
            setPayouts(updated);
            toast.success('Payout Processed Successfully');
        }
    };

    return (
        <AdminLayout title="Vendor Payout Management">
            <Card className="shadow-sm border-0 p-4">
                <Table hover responsive className="align-middle">
                    <thead className="bg-light">
                        <tr><th>Payout ID</th><th>Vendor Name</th><th>Bank Details</th><th>Amount</th><th>Status</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                        {payouts.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td className="fw-bold">{p.vendor}</td>
                                <td className="text-muted small">{p.bank}</td>
                                <td className="fw-bold text-success">₹{p.amount}</td>
                                <td>
                                    <Badge bg={p.status === 'Paid' ? 'success' : 'warning'} text={p.status === 'Pending' ? 'dark': 'white'}>
                                        {p.status}
                                    </Badge>
                                </td>
                                <td>
                                    {p.status === 'Pending' && (
                                        <Button size="sm" variant="outline-success" onClick={() => handlePay(p.id)}>
                                            <FaMoneyCheckAlt className="me-1"/> Pay Now
                                        </Button>
                                    )}
                                    {p.status === 'Paid' && <span className="text-success"><FaCheck/> Done</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </AdminLayout>
    );
};
export default VendorPayoutScreen;