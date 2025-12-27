import { useEffect, useState } from 'react';
import { Table, Button, Form, Card, Row, Col, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout';
import { FaTrash, FaToggleOn, FaToggleOff, FaMapMarkedAlt, FaPlus } from 'react-icons/fa';

const ServiceAreaScreen = () => {
  const [areas, setAreas] = useState([]);
  const [newArea, setNewArea] = useState({ pincode: '', district: '', state: '' });
  
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const { data } = await axios.get('/api/service-areas');
      setAreas(data);
    } catch (error) { toast.error('Error fetching areas'); }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/service-areas', newArea);
      toast.success('Service Area Added');
      setNewArea({ pincode: '', district: '', state: '' });
      fetchAreas();
    } catch (error) { toast.error(error.response?.data?.message || 'Error adding area'); }
  };

  const handleToggle = async (id) => {
    try {
      await axios.put(`/api/service-areas/${id}`);
      fetchAreas();
    } catch (error) { toast.error('Error updating status'); }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete this area?')) {
        try {
            await axios.delete(`/api/service-areas/${id}`);
            fetchAreas();
        } catch (error) { toast.error('Error deleting'); }
    }
  };

  return (
    <AdminLayout title="Service Areas">
        <Row>
            {/* Add New Area Form */}
            <Col md={4}>
                <Card className="shadow-sm border-0 p-4 mb-4">
                    <h5 className="mb-3"><FaPlus className="me-2"/> Add Service Area</h5>
                    <Form onSubmit={handleAdd}>
                        <Form.Group className="mb-3">
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control type="text" value={newArea.pincode} onChange={(e)=>setNewArea({...newArea, pincode:e.target.value})} required placeholder="e.g. 800001"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>District</Form.Label>
                            <Form.Control type="text" value={newArea.district} onChange={(e)=>setNewArea({...newArea, district:e.target.value})} required placeholder="e.g. Patna"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" value={newArea.state} onChange={(e)=>setNewArea({...newArea, state:e.target.value})} required placeholder="e.g. Bihar"/>
                        </Form.Group>
                        <Button type="submit" variant="primary" className="w-100">Add Area</Button>
                    </Form>
                </Card>
            </Col>

            {/* List Table */}
            <Col md={8}>
                <Card className="shadow-sm border-0 p-4">
                    <h5 className="mb-3"><FaMapMarkedAlt className="me-2"/> Manage Serviceable Locations</h5>
                    <Table hover responsive className="align-middle">
                        <thead className="bg-light">
                            <tr><th>Pincode</th><th>District</th><th>State</th><th>Status</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                            {areas.map(area => (
                                <tr key={area._id}>
                                    <td className="fw-bold">{area.pincode}</td>
                                    <td>{area.district}</td>
                                    <td>{area.state}</td>
                                    <td>
                                        <Badge bg={area.isActive ? 'success' : 'danger'} style={{cursor:'pointer'}} onClick={() => handleToggle(area._id)}>
                                            {area.isActive ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(area._id)}>
                                            <FaTrash/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {areas.length === 0 && <tr><td colSpan="5" className="text-center">No areas defined.</td></tr>}
                        </tbody>
                    </Table>
                </Card>
            </Col>
        </Row>
    </AdminLayout>
  );
};

export default ServiceAreaScreen;