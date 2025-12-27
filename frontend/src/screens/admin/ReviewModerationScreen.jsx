import { useState } from 'react';
import { Table, Button, Badge, Card } from 'react-bootstrap';
import AdminLayout from '../../components/AdminLayout';
import { FaCheck, FaTrash, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ReviewModerationScreen = () => {
    const [reviews, setReviews] = useState([
        { id: 1, user: 'Rahul', product: 'iPhone 13', comment: 'Amazing product!', rating: 5, status: 'Pending' },
        { id: 2, user: 'Simran', product: 'Saree', comment: 'Bad quality fabric.', rating: 2, status: 'Pending' }
    ]);

    const handleAction = (id, action) => {
        if(action === 'approve') {
            setReviews(reviews.map(r => r.id === id ? {...r, status: 'Approved'} : r));
            toast.success('Review Approved');
        } else {
            setReviews(reviews.filter(r => r.id !== id));
            toast.error('Review Deleted');
        }
    };

    return (
        <AdminLayout title="Customer Reviews">
            <Card className="shadow-sm border-0 p-4">
                <Table hover responsive className="align-middle">
                    <thead className="bg-light"><tr><th>User</th><th>Product</th><th>Review</th><th>Rating</th><th>Status</th><th>Action</th></tr></thead>
                    <tbody>
                        {reviews.map(r => (
                            <tr key={r.id}>
                                <td className="fw-bold">{r.user}</td>
                                <td className="text-primary">{r.product}</td>
                                <td>{r.comment}</td>
                                <td className="text-warning">{r.rating} <FaStar/></td>
                                <td><Badge bg={r.status === 'Pending' ? 'warning' : 'success'}>{r.status}</Badge></td>
                                <td>
                                    {r.status === 'Pending' && (
                                        <>
                                            <Button size="sm" variant="success" className="me-2" onClick={() => handleAction(r.id, 'approve')}><FaCheck/></Button>
                                            <Button size="sm" variant="danger" onClick={() => handleAction(r.id, 'reject')}><FaTrash/></Button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {reviews.length === 0 && <tr><td colSpan="6" className="text-center">No pending reviews.</td></tr>}
                    </tbody>
                </Table>
            </Card>
        </AdminLayout>
    );
};
export default ReviewModerationScreen;