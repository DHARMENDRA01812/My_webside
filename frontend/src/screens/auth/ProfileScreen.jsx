import { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, Container, Card, Nav, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaCheck, FaUserCircle, FaShoppingBag } from 'react-icons/fa';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('orders'); // डिफ़ॉल्ट टैब 'orders'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      fetchMyOrders();
    }
  }, [navigate, userInfo]);

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders/myorders');
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    toast.success('Profile Updated (Local)');
  };

  return (
    <Container>
      <Row className="my-4">
        {/* साइडबार मेनू */}
        <Col md={3} className="mb-4">
          <Card className="shadow-sm border-0">
            <Card.Body className="text-center">
              <FaUserCircle size={80} className="text-secondary mb-3" />
              <h4>{userInfo?.name}</h4>
              <p className="text-muted">{userInfo?.email}</p>
              <hr />
              <Nav variant="pills" className="flex-column text-start" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                <Nav.Link eventKey="orders" className="mb-2"><FaShoppingBag className="me-2"/> My Orders</Nav.Link>
                <Nav.Link eventKey="settings"><FaUserCircle className="me-2"/> Account Settings</Nav.Link>
              </Nav>
            </Card.Body>
          </Card>
        </Col>

        {/* कंटेंट एरिया */}
        <Col md={9}>
          {activeTab === 'orders' ? (
            <Card className="shadow-sm border-0 p-3">
              <h3 className="mb-3">Order History</h3>
              {orders.length === 0 ? (
                <div className="alert alert-info">You haven't placed any orders yet.</div>
              ) : (
                <Table hover responsive className='table-borderless align-middle'>
                  <thead className="bg-light">
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} style={{borderBottom: '1px solid #eee'}}>
                        <td><Badge bg="dark">{order._id.substring(0, 8)}...</Badge></td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td><strong>₹{order.totalPrice}</strong></td>
                        <td>
                          {order.isPaid ? <Badge bg="success">Paid</Badge> : <Badge bg="danger">Not Paid</Badge>}
                        </td>
                        <td>
                          {order.isDelivered ? <Badge bg="success">Delivered</Badge> : <Badge bg="warning" text="dark">Processing</Badge>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card>
          ) : (
            <Card className="shadow-sm border-0 p-4">
              <h3 className="mb-3">Edit Profile</h3>
              <Form onSubmit={submitHandler}>
                <Form.Group className='my-3'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className='my-3'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email' value={email} disabled className="bg-light" />
                </Form.Group>
                <Button type='submit' variant='dark'>Update Profile</Button>
              </Form>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;