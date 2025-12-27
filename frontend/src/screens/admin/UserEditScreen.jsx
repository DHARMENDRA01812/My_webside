import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout';
import { FaUserEdit, FaSave, FaArrowLeft } from 'react-icons/fa';

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDistrictAdmin, setIsDistrictAdmin] = useState(false);
  
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
        navigate('/login');
    } else {
        fetchUser();
    }
  }, [userId, userInfo]);

  const fetchUser = async () => {
    try {
        // Backend में सिंगल यूजर गेट करने का रूट बनाना होगा (नीचे स्टेप 2 देखें)
        const { data } = await axios.get(`/api/users/${userId}`);
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
        setIsDistrictAdmin(data.isDistrictAdmin);
    } catch (error) {
        toast.error('Error fetching user details');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`/api/users/${userId}`, { name, email, isAdmin, isDistrictAdmin });
        toast.success('User updated successfully');
        navigate('/admin/users');
    } catch (error) {
        toast.error('Update failed');
    }
  };

  return (
    <AdminLayout title="Edit User">
        <Container style={{maxWidth: '600px'}}>
            <Link to='/admin/users' className='btn btn-light my-3'><FaArrowLeft/> Back</Link>
            
            <Card className="shadow-sm border-0 p-4">
                <h3 className="mb-4"><FaUserEdit className="me-2"/> Edit User Role</h3>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='mb-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId='email' className='mb-3'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <div className="bg-light p-3 rounded mb-3">
                        <h6 className="fw-bold mb-3">Permissions</h6>
                        <Form.Check type='checkbox' label='Is System Admin?' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} className='mb-2' />
                        <Form.Check type='checkbox' label='Is District Admin?' checked={isDistrictAdmin} onChange={(e) => setIsDistrictAdmin(e.target.checked)} />
                    </div>

                    <Button type='submit' variant='primary' className="w-100"><FaSave className="me-2"/> Update User</Button>
                </Form>
            </Card>
        </Container>
    </AdminLayout>
  );
};

export default UserEditScreen;