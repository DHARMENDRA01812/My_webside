import { Table, Card, Badge } from 'react-bootstrap';
import AdminLayout from '../../components/AdminLayout';

const TransactionScreen = () => {
    const transactions = [
        { id: 'TXN_12345', date: '2025-01-10', user: 'Rahul', amount: '₹1200', method: 'UPI', status: 'Success' },
        { id: 'TXN_67890', date: '2025-01-11', user: 'Sneha', amount: '₹4500', method: 'Card', status: 'Failed' },
    ];

    return (
        <AdminLayout title="Payment Transactions">
            <Card className="p-4 border-0 shadow-sm">
                <Table hover responsive>
                    <thead className="bg-light"><tr><th>Txn ID</th><th>Date</th><th>User</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
                    <tbody>
                        {transactions.map(t => (
                            <tr key={t.id}>
                                <td className="font-monospace">{t.id}</td>
                                <td>{t.date}</td>
                                <td>{t.user}</td>
                                <td className="fw-bold">{t.amount}</td>
                                <td>{t.method}</td>
                                <td><Badge bg={t.status === 'Success' ? 'success' : 'danger'}>{t.status}</Badge></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </AdminLayout>
    );
};
export default TransactionScreen;