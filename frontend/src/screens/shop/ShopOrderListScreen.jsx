import { useEffect, useState } from 'react';
import { Table, Button, Badge, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaClipboardList, FaTruck } from 'react-icons/fa';
import AdminLayout from '../../components/AdminLayout'; // ✅ Admin Layout

const ShopOrderListScreen = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.isShopOwner) {
      fetchShopOrders();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const fetchShopOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders/shoporders');
      setOrders(data);
    } catch (error) {
      toast.error('Error fetching orders');
    }
  };

  const deliverHandler = async (id) => {
      if(window.confirm('Mark this order as delivered?')) {
        try {
            await axios.put(`/api/orders/${id}/deliver`);
            toast.success('Order Marked as Delivered');
            fetchShopOrders(); // Refresh Data
        } catch (error) {
            toast.error('Error updating status');
        }
      }
  };

  return (
    <AdminLayout title="Shop Orders">
      <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold"><FaClipboardList className="me-2"/> Shop Orders</h3>
          <Badge bg="primary" className="p-2 fs-6">Total Orders: {orders.length}</Badge>
      </div>

      <Card className="shadow-sm border-0 p-4">
        {orders.length === 0 ? (
            <div className="alert alert-info text-center">No orders received yet.</div>
        ) : (
            <Table striped hover responsive className='align-middle mb-0'>
                <thead className="bg-light">
                <tr>
                    <th>ORDER ID</th>
                    <th>CUSTOMER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAYMENT</th>
                    <th>DELIVERY</th>
                    <th>ACTION</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order._id}>
                    <td><span className="fw-bold">#{order._id.substring(0, 8)}</span></td>
                    <td>
                        <div>{order.user?.name}</div>
                        <small className="text-muted">{order.user?.email}</small>
                    </td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>₹{order.totalPrice}</td>
                    <td>
                        {order.isPaid ? <Badge bg="success">Paid</Badge> : <Badge bg="danger">Not Paid</Badge>}
                    </td>
                    <td>
                        {order.isDelivered ? <Badge bg="success">Delivered</Badge> : <Badge bg="warning" text="dark">Pending</Badge>}
                    </td>
                    <td>
                        {!order.isDelivered ? (
                            <Button variant="outline-primary" size="sm" onClick={() => deliverHandler(order._id)}>
                                <FaTruck className="me-1"/> Mark Delivered
                            </Button>
                        ) : (
                            <span className="text-success"><FaCheck/> Completed</span>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        )}
      </Card>
    </AdminLayout>
  );
};

export default ShopOrderListScreen;