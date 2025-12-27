import { useEffect, useState } from 'react';
import { Table, Button, Container, Badge, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout'; // ✅ AdminLayout Import

const OrderListScreen = () => {
  const [orders, setOrders] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      fetchOrders();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders'); 
      setOrders(data);
    } catch (error) {
      toast.error('Error fetching orders');
    }
  };

  return (
    // ✅ Wrappad in AdminLayout (ताकि साइडबार दिखे)
    <AdminLayout title="Global Orders">
        <Card className="shadow-sm border-0 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold m-0">System Orders (Admin)</h3>
                <Badge bg="primary">Total: {orders.length}</Badge>
            </div>

            <Table striped hover responsive className="align-middle mb-0">
                <thead className="bg-dark text-white">
                <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>DETAILS</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order._id}>
                    <td><span className="fw-bold">#{order._id.substring(0, 8)}</span></td>
                    <td>{order.user && order.user.name}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>₹{order.totalPrice}</td>
                    <td>
                        {order.isPaid ? <Badge bg="success">Paid</Badge> : <Badge bg="danger">Not Paid</Badge>}
                    </td>
                    <td>
                        {order.isDelivered ? <Badge bg="success">Delivered</Badge> : <Badge bg="warning" text="dark">Pending</Badge>}
                    </td>
                    <td>
                        <LinkContainer to={`/order/${order._id}`}>
                        <Button variant="light" size="sm" className="border">Details</Button>
                        </LinkContainer>
                    </td>
                    </tr>
                ))}
                {orders.length === 0 && (
                    <tr><td colSpan="7" className="text-center py-4 text-muted">No orders found.</td></tr>
                )}
                </tbody>
            </Table>
        </Card>
    </AdminLayout>
  );
};

export default OrderListScreen;