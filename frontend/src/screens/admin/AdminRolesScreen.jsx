import { useEffect, useState } from 'react';
import { Table, Button, Badge, Card, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout'; // ✅ Sidebar के लिए जरुरी
import { FaUserShield, FaEdit } from 'react-icons/fa';

const AdminRolesScreen = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const { data } = await axios.get('/api/users');
      // सिर्फ उन यूजर्स को फिल्टर करें जिनके पास कोई रोल है
      const adminUsers = data.filter(user => user.isAdmin || user.isDistrictAdmin || user.isShopOwner);
      setAdmins(adminUsers);
    } catch (error) {
      toast.error('Error fetching roles');
    }
  };

  return (
    <AdminLayout title="Admin Roles & Permissions">
      <Row className="justify-content-center">
        <Col md={10}>
            <Card className="shadow-sm border-0 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold m-0 text-primary"><FaUserShield className="me-2"/> Privileged Users</h4>
                    <LinkContainer to="/admin/users">
                        <Button variant="outline-dark" size="sm">Manage All Users</Button>
                    </LinkContainer>
                </div>

                <Table hover responsive className="align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Current Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map(user => (
                            <tr key={user._id}>
                                <td className="fw-bold">{user.name}</td>
                                <td className="text-muted">{user.email}</td>
                                <td>
                                    {user.isAdmin && <Badge bg="danger" className="me-1">System Admin</Badge>}
                                    {user.isDistrictAdmin && <Badge bg="info" className="me-1">District Admin</Badge>}
                                    {user.isShopOwner && <Badge bg="warning" text="dark">Shop Owner</Badge>}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant="light" size="sm" className="text-primary">
                                            <FaEdit/> Edit Role
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                        {admins.length === 0 && <tr><td colSpan="4" className="text-center">No admins found.</td></tr>}
                    </tbody>
                </Table>
            </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default AdminRolesScreen;