import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container, Card, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaLock, FaStore } from 'react-icons/fa';
import axios from 'axios';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      // ✅ लॉजिक: कौन कहाँ जाएगा
      if (userInfo.isShopOwner) {
          navigate('/shop-dashboard');
      } 
      else if (userInfo.isDistrictAdmin) {
          navigate('/district-dashboard'); // डिस्ट्रिक्ट एडमिन यहाँ जाएगा
      }
      else if (userInfo.isAdmin) {
          navigate('/admin/dashboard');
      }
      else {
          navigate(redirect);
      }
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('/api/users/login', { email, password });
      dispatch(setCredentials({ ...res.data }));
      toast.success("Welcome back!");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <Card className="p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
        <Card.Body>
          <div className="text-center mb-4">
            <h2 className="fw-bold">Sign In</h2>
            <p className="text-muted">Access your account</p>
          </div>
          
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label><FaUser className="me-2"/>Email / Login ID</Form.Label>
              <Form.Control type="text" placeholder="Email or ID" value={email} onChange={(e) => setEmail(e.target.value)} style={{ borderRadius: '10px', padding: '10px' }} required />
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Label><FaLock className="me-2"/>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ borderRadius: '10px', padding: '10px' }} required />
            </Form.Group>

            <Button type="submit" variant="dark" className="w-100 py-2" style={{ borderRadius: '10px' }} disabled={isLoading}>
              {isLoading ? <Spinner size="sm" animation="border"/> : 'Sign In'}
            </Button>
          </Form>

          <Row className="py-3 text-center"><Col>New Customer? <Link to={`/register?redirect=${redirect}`} className="text-primary fw-bold">Create Account</Link></Col></Row>
          <hr />
          <Row className="text-center pb-2"><Col>Want to sell? <br/><Link to="/shop-register" className="text-success fw-bold text-decoration-none"><FaStore className="mb-1 me-1"/> Register as Shop Owner</Link></Col></Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginScreen;