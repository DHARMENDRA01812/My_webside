import { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Table, Badge, ProgressBar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';
import { 
  FaStore, FaUsers, FaShoppingCart, FaRupeeSign, 
  FaExclamationTriangle, FaEllipsisV, FaBox 
} from 'react-icons/fa';

// ✅ FIX: Chart.js Import & Registration including Filler
import { 
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, 
  Title, Tooltip, Legend, ArcElement, BarElement, Filler 
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

// ✅ Register Plugins
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, 
  BarElement, Title, Tooltip, Legend, ArcElement, Filler
);

const SystemAdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({ 
      revenue: 0, users: 0, orders: 0, shops: 0, 
      pendingShops: 0, activeUsers: 145 // Mock Real-time User Count
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
        navigate('/login');
    } else {
        fetchData();
    }
  }, [userInfo, navigate]);

  const fetchData = async () => {
    try {
        // Parallel API calls for better performance
        const [usersRes, ordersRes, shopsRes, productsRes] = await Promise.all([
            axios.get('/api/users'),
            axios.get('/api/orders'),
            axios.get('/api/shop-owner/all'),
            axios.get('/api/products')
        ]);

        const orders = ordersRes.data;
        const products = productsRes.data;

        // 1. Calculate Total Revenue (Paid Orders Only)
        const totalRevenue = orders.reduce((acc, x) => acc + (x.isPaid ? x.totalPrice : 0), 0);

        // 2. Logic for Top Selling Products
        const productMap = {};
        orders.forEach(order => {
            order.orderItems.forEach(item => {
                if(productMap[item.name]) productMap[item.name] += item.qty;
                else productMap[item.name] = item.qty;
            });
        });

        // Convert Map to Array, Sort Descending, Take Top 5
        const topSelling = Object.entries(productMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, qty]) => ({ name, qty }));

        // 3. Logic for Low Stock Products (< 5 quantity)
        const lowStock = products.filter(p => p.countInStock < 5).slice(0, 5);

        // 4. Update Stats State
        setStats({
            revenue: totalRevenue,
            users: usersRes.data.length,
            orders: orders.length,
            shops: shopsRes.data.filter(s => s.status === 'Approved').length,
            pendingShops: shopsRes.data.filter(s => s.status === 'Pending System').length,
            activeUsers: 145 // Keep mock for now
        });

        setRecentOrders(orders.slice(0, 5));
        setTopProducts(topSelling);
        setLowStockProducts(lowStock);

    } catch (error) { 
        console.error("Error fetching dashboard data", error); 
    }
  };

  // --- Charts Configuration ---
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (₹)',
        data: [12000, 15000, 8000, 24000, 20000, stats.revenue > 30000 ? stats.revenue : 30000],
        borderColor: '#4e73df',
        backgroundColor: 'rgba(78, 115, 223, 0.1)', // Light blue fill
        tension: 0.4,
        fill: true, // Requires Filler plugin
      },
    ],
  };

  const doughnutData = {
    labels: ['Active Shops', 'Pending Shops', 'Rejected'],
    datasets: [{
      data: [stats.shops, stats.pendingShops, 2], // 2 is mock rejected count
      backgroundColor: ['#1cc88a', '#f6c23e', '#e74a3b'],
      hoverOffset: 4,
      borderWidth: 0
    }]
  };

  return (
    <AdminLayout title="System Overview">
        
        {/* --- 1. Top Stats Cards (Widgets) --- */}
        <Row className="mb-4 g-3">
            {/* Revenue Card */}
            <Col xl={3} md={6}>
                <div className="dashboard-card p-3 stat-left-border-primary h-100">
                    <Row className="align-items-center h-100">
                        <Col>
                            <div className="stat-label text-primary">Total Revenue</div>
                            <div className="stat-value">₹{stats.revenue.toLocaleString()}</div>
                        </Col>
                        <Col xs="auto">
                            <FaRupeeSign size={32} style={{color: '#dddfeb'}}/>
                        </Col>
                    </Row>
                </div>
            </Col>

            {/* Users Card */}
            <Col xl={3} md={6}>
                <div className="dashboard-card p-3 stat-left-border-success h-100">
                    <Row className="align-items-center h-100">
                        <Col>
                            <div className="stat-label text-success">Total Users</div>
                            <div className="stat-value">{stats.users}</div>
                        </Col>
                        <Col xs="auto">
                            <FaUsers size={32} style={{color: '#dddfeb'}}/>
                        </Col>
                    </Row>
                </div>
            </Col>

            {/* Orders Card */}
            <Col xl={3} md={6}>
                <div className="dashboard-card p-3 stat-left-border-info h-100">
                    <Row className="align-items-center h-100">
                        <Col>
                            <div className="stat-label text-info">Total Orders</div>
                            <div className="stat-value">{stats.orders}</div>
                        </Col>
                        <Col xs="auto">
                            <FaShoppingCart size={32} style={{color: '#dddfeb'}}/>
                        </Col>
                    </Row>
                </div>
            </Col>

            {/* Pending Shops Card */}
            <Col xl={3} md={6}>
                <div className="dashboard-card p-3 stat-left-border-warning h-100">
                    <Row className="align-items-center h-100">
                        <Col>
                            <div className="stat-label text-warning">Pending Shops</div>
                            <div className="stat-value">{stats.pendingShops}</div>
                        </Col>
                        <Col xs="auto">
                            <FaStore size={32} style={{color: '#dddfeb'}}/>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>

        {/* --- 2. Charts Section --- */}
        <Row className="mb-4 g-4">
            {/* Revenue Line Chart */}
            <Col lg={8}>
                <div className="dashboard-card">
                    <div className="card-header-custom">
                        <h6 className="card-title-custom">Revenue Overview</h6>
                        <FaEllipsisV className="text-muted cursor-pointer"/>
                    </div>
                    <div className="p-4" style={{height: '350px'}}>
                        <Line 
                            data={lineChartData} 
                            options={{ 
                                maintainAspectRatio: false, 
                                plugins: { legend: { display: false } },
                                scales: {
                                    y: { grid: { borderDash: [2] }, ticks: { callback: (val) => '₹' + val } },
                                    x: { grid: { display: false } }
                                }
                            }} 
                        />
                    </div>
                </div>
            </Col>

            {/* Shop Distribution Doughnut Chart */}
            <Col lg={4}>
                <div className="dashboard-card">
                    <div className="card-header-custom">
                        <h6 className="card-title-custom">Shop Status</h6>
                    </div>
                    <div className="p-4 d-flex justify-content-center align-items-center" style={{height: '350px'}}>
                        <div style={{width: '250px'}}>
                            <Doughnut 
                                data={doughnutData} 
                                options={{ 
                                    cutout: '70%',
                                    plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, padding: 20 } } } 
                                }} 
                            />
                        </div>
                    </div>
                </div>
            </Col>
        </Row>

        {/* --- 3. Recent Activity & Products --- */}
        <Row className="g-4">
            {/* Left Column: Recent Orders Table */}
            <Col lg={8}>
                <div className="dashboard-card h-100">
                    <div className="card-header-custom">
                        <h6 className="card-title-custom">Recent Global Orders</h6>
                        <Link to="/admin/orderlist" className="btn btn-sm btn-primary shadow-sm px-3">View All</Link>
                    </div>
                    <Table responsive hover className="align-middle custom-table mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4">Order ID</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th className="text-end pe-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map(order => (
                                <tr key={order._id}>
                                    <td className="ps-4"><span className="fw-bold text-primary">#{order._id.substring(0,6)}</span></td>
                                    <td>{order.user?.name || 'Guest'}</td>
                                    <td><span className="fw-bold">₹{order.totalPrice}</span></td>
                                    <td>
                                        {order.isPaid ? 
                                            <Badge bg="success" className="px-3 py-2 rounded-pill">Paid</Badge> : 
                                            <Badge bg="warning" text="dark" className="px-3 py-2 rounded-pill">Pending</Badge>
                                        }
                                    </td>
                                    <td className="text-end pe-4">
                                        <Link to={`/order/${order._id}`} className="btn btn-sm btn-light border px-3">Details</Link>
                                    </td>
                                </tr>
                            ))}
                            {recentOrders.length === 0 && <tr><td colSpan="5" className="text-center py-5 text-muted">No orders found.</td></tr>}
                        </tbody>
                    </Table>
                </div>
            </Col>

            {/* Right Column: Top Products & Alerts */}
            <Col lg={4}>
                {/* Top Selling Products */}
                <div className="dashboard-card mb-4">
                    <div className="card-header-custom bg-info text-white border-0">
                        <h6 className="m-0 fw-bold text-white"><FaBox className="me-2"/> Top Selling Products</h6>
                    </div>
                    <div className="p-4">
                        {topProducts.map((prod, idx) => (
                            <div key={idx} className="mb-3">
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="small fw-bold text-dark">{prod.name}</span>
                                    <span className="small text-muted">{prod.qty} Sold</span>
                                </div>
                                <ProgressBar now={prod.qty * 10} variant="info" style={{height: '6px'}} />
                            </div>
                        ))}
                        {topProducts.length === 0 && <p className="text-muted small text-center my-3">No sales data available yet.</p>}
                    </div>
                </div>

                {/* Low Stock Alert */}
                <div className="dashboard-card">
                    <div className="card-header-custom">
                        <h6 className="card-title-custom text-danger"><FaExclamationTriangle className="me-2"/> Low Stock Alert</h6>
                    </div>
                    <div className="p-0">
                        {lowStockProducts.length > 0 ? (
                            <ul className="list-group list-group-flush">
                                {lowStockProducts.map(p => (
                                    <li key={p._id} className="list-group-item d-flex justify-content-between align-items-center px-4 py-3">
                                        <span className="text-truncate" style={{maxWidth: '180px'}}>{p.name}</span>
                                        <Badge bg="danger" pill>{p.countInStock} Left</Badge>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-4 text-center text-success">
                                <FaBox size={24} className="mb-2"/><br/>
                                <small>All stock levels are healthy!</small>
                            </div>
                        )}
                        <div className="p-3 text-center border-top bg-light">
                            <Link to="/admin/inventory" className="small text-decoration-none fw-bold text-primary">Manage Inventory &rarr;</Link>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>

    </AdminLayout>
  );
};

export default SystemAdminDashboard;