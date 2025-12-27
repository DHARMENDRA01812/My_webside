import { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Table, Badge, Form, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import { logout } from '../../slices/authSlice';
import { 
  FaBoxOpen, FaClipboardList, FaMoneyBillWave, FaSearch, FaBell, 
  FaSignOutAlt, FaPlus, FaStore, FaTachometerAlt, FaUserEdit, FaShippingFast
} from 'react-icons/fa';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const ShopOwnerDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!userInfo || !userInfo.isShopOwner) {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [userInfo, navigate]);

  const fetchData = async () => {
    try {
      const { data: prodData } = await axios.get('/api/products/myproducts');
      const { data: ordData } = await axios.get('/api/orders/shoporders');
      setProducts(prodData);
      setOrders(ordData);
    } catch (error) { console.error(error); }
  };

  const logoutHandler = () => { dispatch(logout()); navigate('/login'); };

  const totalEarnings = orders.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0);

  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ label: 'Weekly Sales', data: [500, 1200, 900, 1500, 2000, 2500, 3000], backgroundColor: '#ffc107', borderRadius: 5 }],
  };

  return (
    <div className="admin-fixed-wrapper">
      
      {/* SIDEBAR */}
      <div className="sidebar d-none d-lg-flex">
        <div className="sidebar-header">
            <h4 className="fw-bold m-0 text-warning">My Shop</h4>
            <small className="text-muted">ID: {userInfo?._id.substring(0,6)}</small>
        </div>
        <div className="sidebar-menu">
            <Link to="/shop-dashboard" className="sidebar-link active"><FaTachometerAlt className="me-3"/> Dashboard</Link>
            <Link to="/shop/productlist" className="sidebar-link"><FaBoxOpen className="me-3"/> Products <Badge bg="secondary" className="ms-auto">{products.length}</Badge></Link>
            <Link to="/shop/orders" className="sidebar-link"><FaClipboardList className="me-3"/> Orders <Badge bg="danger" className="ms-auto">{orders.length}</Badge></Link>
            <Link to="#" className="sidebar-link"><FaMoneyBillWave className="me-3"/> Earnings</Link>
            <Link to="/shop/settings" className="sidebar-link"><FaUserEdit className="me-3"/> Settings</Link>
        </div>
        <div className="sidebar-footer">
            <Button variant="danger" className="w-100" onClick={logoutHandler}><FaSignOutAlt className="me-2"/> Logout</Button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        
        {/* Header */}
        <div className="dashboard-header">
            <div>
                <h3 className="fw-bold text-dark mb-0">Shop Overview</h3>
                <p className="text-muted mb-0">Manage your products & orders.</p>
            </div>
            <div className="d-flex align-items-center gap-3">
                <LinkContainer to="/shop/productlist">
                    <Button variant="dark" className="shadow-sm"><FaPlus className="me-2"/> Add Product</Button>
                </LinkContainer>
            </div>
        </div>

        {/* Stats Row */}
        <Row className="g-4 mb-4">
            <Col md={4}>
                <Card className="stat-card p-4 h-100 gradient-4">
                    <div className="d-flex flex-column position-relative z-1">
                        <h2 className="fw-bold mb-1">{products.length}</h2>
                        <span className="opacity-75">Total Products</span>
                    </div>
                    <div className="stat-icon-bg"><FaBoxOpen/></div>
                </Card>
            </Col>
            <Col md={4}>
                <Card className="stat-card p-4 h-100 gradient-1">
                    <div className="d-flex flex-column position-relative z-1">
                        <h2 className="fw-bold mb-1">{orders.length}</h2>
                        <span className="opacity-75">Total Orders</span>
                    </div>
                    <div className="stat-icon-bg"><FaClipboardList/></div>
                </Card>
            </Col>
            <Col md={4}>
                <Card className="stat-card p-4 h-100 gradient-2">
                    <div className="d-flex flex-column position-relative z-1">
                        <h2 className="fw-bold mb-1">₹{totalEarnings}</h2>
                        <span className="opacity-75">Total Earnings</span>
                    </div>
                    <div className="stat-icon-bg"><FaMoneyBillWave/></div>
                </Card>
            </Col>
        </Row>

        {/* Sales Chart */}
        <Row className="g-4 mb-4">
            <Col md={12}>
                <Card className="table-card p-4 h-100 bg-dark text-white border-0">
                    <h5 className="fw-bold mb-4">Sales Performance</h5>
                    <div style={{ height: '250px' }}>
                        <Bar data={salesData} options={{ maintainAspectRatio: false, scales: { x: { ticks: { color: 'white' } }, y: { ticks: { color: 'white' } } } }} />
                    </div>
                </Card>
            </Col>
        </Row>

        {/* Recent Orders */}
        <Card className="table-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold m-0">Recent Orders</h5>
                <LinkContainer to="/shop/orders"><Button variant="outline-primary" size="sm">View All</Button></LinkContainer>
            </div>
            <Table hover responsive className="align-middle mb-0">
                <thead className="bg-light"><tr><th>Order ID</th><th>Customer</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                    {orders.slice(0, 5).map(order => (
                        <tr key={order._id}>
                            <td><strong>#{order._id.substring(0, 8)}</strong></td>
                            <td>{order.user?.name}</td>
                            <td>₹{order.totalPrice}</td>
                            <td><Badge bg={order.isDelivered ? 'success' : 'warning'}>{order.isDelivered ? 'Delivered' : 'Pending'}</Badge></td>
                            <td><LinkContainer to="/shop/orders"><Button size="sm" variant="light">Manage</Button></LinkContainer></td>
                        </tr>
                    ))}
                    {orders.length === 0 && <tr><td colSpan="5" className="text-center py-4">No orders yet.</td></tr>}
                </tbody>
            </Table>
        </Card>

      </div>
    </div>
  );
};

export default ShopOwnerDashboard;