import { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Table, Badge, Form, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import { logout } from '../../slices/authSlice'; // ✅ Path corrected based on folder structure
import { 
  FaUserPlus, FaStore, FaCheckCircle, FaTimesCircle, 
  FaSearch, FaSignOutAlt, FaChartPie, FaBell, FaFileAlt, FaTachometerAlt, FaLayerGroup, FaArrowRight 
} from 'react-icons/fa';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS Components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

const DistrictAdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [shops, setShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0, total: 0 });
  const [monthlyData, setMonthlyData] = useState(new Array(6).fill(0));

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    if (!userInfo || !userInfo.isDistrictAdmin) {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [userInfo, navigate]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get('/api/shop-owner/all');
      setShops(data);
      
      // 1. Stats Calculation
      const pending = data.filter(app => app.status === 'Pending District').length;
      const approved = data.filter(app => app.status === 'Approved').length;
      const rejected = data.filter(app => app.status === 'Rejected').length;
      
      setStats({ pending, approved, rejected, total: data.length });

      // 2. Chart Logic (Last 6 Months)
      const counts = new Array(12).fill(0);
      data.forEach(shop => {
          if (shop.createdAt) {
            const monthIndex = new Date(shop.createdAt).getMonth();
            counts[monthIndex] += 1;
          }
      });
      setMonthlyData(counts.slice(0, 6)); 

    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // Search Filter
  const filteredShops = shops.filter(shop => 
    (shop.fullName && shop.fullName.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (shop.email && shop.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (shop.permanentAddress?.district && shop.permanentAddress.district.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // --- Charts Configuration ---
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ 
      label: 'New Applications', 
      data: monthlyData, 
      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
      borderRadius: 4, 
      barThickness: 25 
    }],
  };
  
  const barOptions = {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { 
        x: { grid: { display: false }, ticks: { color: '#ddd' } }, 
        y: { ticks: { color: '#ddd' }, grid: { color: 'rgba(255,255,255,0.1)' } } 
      },
      maintainAspectRatio: false
  };

  const doughnutData = {
    labels: ['Pending', 'Approved', 'Rejected'],
    datasets: [{ 
      data: [stats.pending, stats.approved, stats.rejected], 
      backgroundColor: ['#ffc107', '#198754', '#dc3545'], 
      borderWidth: 0 
    }],
  };

  return (
    <div className="admin-fixed-wrapper">
      
      {/* --- SIDEBAR --- */}
      <div className="sidebar d-none d-lg-flex">
        <div className="sidebar-header">
            <h4 className="fw-bold m-0 text-info">District Panel</h4>
            <span className="badge bg-primary mt-1">ZONE: PATNA</span>
        </div>
        
        <div className="sidebar-menu">
            {/* Dashboard Link */}
            <Link to="/district-dashboard" className="sidebar-link active">
                <FaTachometerAlt className="me-3"/> Dashboard
            </Link>

            {/* Applications Link */}
            <Link to="/admin/shop-requests" className="sidebar-link">
                <FaUserPlus className="me-3"/> Applications 
                {stats.pending > 0 && <Badge bg="danger" className="ms-auto shadow-sm">{stats.pending}</Badge>}
            </Link>

            {/* ✅ Fixed: Active Shops Link (Correctly Placed) */}
            <Link to="/admin/active-shops" className="sidebar-link">
                <FaStore className="me-3"/> Active Shops
            </Link>

            {/* Placeholder Links for Future Features */}
            <Link to="#" className="sidebar-link"><FaChartPie className="me-3"/> Analytics</Link>
            <Link to="#" className="sidebar-link"><FaFileAlt className="me-3"/> Reports</Link>
            <Link to="#" className="sidebar-link"><FaLayerGroup className="me-3"/> Settings</Link>
        </div>

        <div className="sidebar-footer">
            <Button variant="danger" className="w-100" onClick={logoutHandler}>
                <FaSignOutAlt className="me-2"/> Logout
            </Button>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="main-content">
        
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h3 className="fw-bold text-dark mb-0">Overview</h3>
                <p className="text-muted mb-0">Here's what's happening in your district.</p>
            </div>
            <div className="d-flex gap-3">
                <div className="bg-white p-2 rounded-pill shadow-sm px-3" style={{width: '300px'}}>
                    <InputGroup size="sm">
                        <InputGroup.Text className="bg-transparent border-0"><FaSearch className="text-muted"/></InputGroup.Text>
                        <Form.Control 
                            placeholder="Search applicant..." 
                            className="border-0 shadow-none bg-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </InputGroup>
                </div>
                <Button variant="white" className="bg-white shadow-sm rounded-circle p-2 text-primary position-relative">
                    <FaBell size={20}/>
                    {stats.pending > 0 && <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>}
                </Button>
            </div>
        </div>

        {/* Stats Cards */}
        <Row className="g-4 mb-4">
            {[
                { title: 'Pending Verification', count: stats.pending, icon: <FaUserPlus/>, style: 'gradient-1' },
                { title: 'Approved Shops', count: stats.approved, icon: <FaCheckCircle/>, style: 'gradient-2' },
                { title: 'Rejected', count: stats.rejected, icon: <FaTimesCircle/>, style: 'gradient-3' },
                { title: 'Total Applications', count: stats.total, icon: <FaStore/>, style: 'gradient-4' }
            ].map((item, index) => (
                <Col md={3} key={index}>
                    <Card className={`stat-card p-4 h-100 ${item.style} text-white`}>
                        <div className="d-flex flex-column position-relative z-1">
                            <h2 className="fw-bold mb-1">{item.count}</h2>
                            <span className="opacity-75 fw-medium">{item.title}</span>
                        </div>
                        <div className="stat-icon-bg">{item.icon}</div>
                    </Card>
                </Col>
            ))}
        </Row>

        {/* Charts Section */}
        <Row className="g-4 mb-4">
            <Col md={8}>
                <Card className="table-card p-4 h-100 bg-dark border-0">
                    <h5 className="fw-bold mb-4 text-white">Registration Analytics</h5>
                    <div style={{ height: '300px' }}>
                        <Bar data={barData} options={barOptions} />
                    </div>
                </Card>
            </Col>
            <Col md={4}>
                <Card className="table-card p-4 h-100">
                    <h5 className="fw-bold mb-4 text-dark">Status Distribution</h5>
                    <div style={{ height: '250px', display:'flex', justifyContent:'center' }}>
                        <Doughnut data={doughnutData} options={{plugins:{legend:{position:'bottom'}}}} />
                    </div>
                </Card>
            </Col>
        </Row>

        {/* Recent Registrations Table */}
        <Card className="table-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold m-0">Recent Registrations</h5>
                <LinkContainer to="/admin/shop-requests">
                    <Button variant="outline-primary" size="sm" className="rounded-pill">View All <FaArrowRight className="ms-1"/></Button>
                </LinkContainer>
            </div>
            
            <Table hover responsive className="align-middle mb-0">
                <thead className="bg-light text-muted small text-uppercase">
                    <tr><th>Applicant</th><th>Location</th><th>Date</th><th>Status</th><th className="text-end">Action</th></tr>
                </thead>
                <tbody>
                    {filteredShops.length > 0 ? (
                        filteredShops.slice(0, 5).map(shop => (
                            <tr key={shop._id} style={{borderBottom: '1px solid #f0f0f0'}}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <div className="bg-primary bg-opacity-10 rounded-circle fw-bold text-primary d-flex align-items-center justify-content-center me-3" style={{width:'40px', height:'40px'}}>
                                            {shop.fullName.charAt(0)}
                                        </div>
                                        <div>
                                            <span className="d-block fw-bold text-dark">{shop.fullName}</span>
                                            <small className="text-muted" style={{fontSize:'0.8rem'}}>{shop.email}</small>
                                        </div>
                                    </div>
                                </td>
                                <td>{shop.permanentAddress?.district || 'N/A'}</td>
                                <td>{new Date(shop.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <Badge bg={
                                        shop.status === 'Pending District' ? 'warning' : 
                                        shop.status === 'Approved' ? 'success' : 
                                        shop.status === 'Rejected' ? 'danger' : 'info'
                                    } className="px-3 py-2">
                                        {shop.status}
                                    </Badge>
                                </td>
                                <td className="text-end">
                                    <LinkContainer to="/admin/shop-requests">
                                        <Button variant="light" size="sm" className="rounded-pill px-3 fw-bold text-primary">Review</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="5" className="text-center py-4 text-muted">No applications found.</td></tr>
                    )}
                </tbody>
            </Table>
        </Card>

      </div>
    </div>
  );
};

export default DistrictAdminDashboard;