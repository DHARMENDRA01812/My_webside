import { Table, Button, Card } from 'react-bootstrap';
import AdminLayout from '../../components/AdminLayout';
import { FaPrint, FaFileInvoice } from 'react-icons/fa';

const InvoiceListScreen = () => {
    // Mock Orders
    const invoices = [
        { id: 'INV-2025-001', date: '2025-02-15', customer: 'Rahul Kumar', amount: '₹12,000' },
        { id: 'INV-2025-002', date: '2025-02-16', customer: 'Priya Singh', amount: '₹4,500' },
    ];

    const handlePrint = (id) => {
        // असली ऐप में, यह PDF जनरेट करेगा
        window.print();
    };

    return (
        <AdminLayout title="Invoice Management">
            <Card className="shadow-sm border-0 p-4">
                <Table hover responsive>
                    <thead className="bg-light"><tr><th>Invoice #</th><th>Date</th><th>Customer</th><th>Amount</th><th>Action</th></tr></thead>
                    <tbody>
                        {invoices.map(inv => (
                            <tr key={inv.id}>
                                <td className="fw-bold text-primary"><FaFileInvoice className="me-2"/>{inv.id}</td>
                                <td>{inv.date}</td>
                                <td>{inv.customer}</td>
                                <td>{inv.amount}</td>
                                <td><Button size="sm" variant="outline-dark" onClick={() => handlePrint(inv.id)}><FaPrint/> Print</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </AdminLayout>
    );
};
export default InvoiceListScreen;