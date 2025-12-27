import { useEffect, useState } from 'react';
import { Table, Badge, Card, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { FaSearch, FaStore, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import AdminLayout from '../../components/AdminLayout'; // ✅ Layout इम्पोर्ट करें

const DistrictActiveShops = () => {
  const [shops, setShops] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchActiveShops();
  }, []);

  const fetchActiveShops = async () => {
    try {
      const { data } = await axios.get('/api/shop-owner/active');
      setShops(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredShops = shops.filter(shop => 
    shop.fullName.toLowerCase().includes(search.toLowerCase()) ||
    shop.permanentAddress?.district?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    // ✅ इसे AdminLayout के अंदर रखें
    <AdminLayout title="Active Shops Management">
      <Card className="shadow-sm border-0 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h4 className="fw-bold text-success m-0"><FaStore className="me-2"/>Verified Active Shops</h4>
                <p className="text-muted small mb-0">List of running shops in the system.</p>
            </div>
            <div style={{width: '300px'}}>
                <InputGroup size="sm">
                    <InputGroup.Text><FaSearch/></InputGroup.Text>
                    <Form.Control 
                        placeholder="Search by name or district..." 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </InputGroup>
            </div>
        </div>

        <Table hover responsive className="align-middle mb-0">
            <thead className="bg-light text-uppercase small fw-bold">
                <tr>
                    <th>Shop Owner</th>
                    <th>Contact</th>
                    <th>Location</th>
                    <th>Shop Type</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {filteredShops.map((shop) => (
                    <tr key={shop._id}>
                        <td>
                            <div className="fw-bold">{shop.fullName}</div>
                            <small className="text-muted">ID: {shop._id.substring(0, 8)}...</small>
                        </td>
                        <td>
                            <div className="small"><FaPhone className="me-1 text-muted"/> {shop.mobile}</div>
                            <div className="small text-primary">{shop.email}</div>
                        </td>
                        <td>
                            <div className="small text-truncate" style={{maxWidth: '200px'}}>
                                <FaMapMarkerAlt className="text-danger me-1"/>
                                {shop.shopAddress?.fullAddress}, {shop.shopAddress?.district}
                            </div>
                        </td>
                        <td><Badge bg="info" className="fw-normal">{shop.shopType || 'General Store'}</Badge></td>
                        <td><Badge bg="success">Active</Badge></td>
                    </tr>
                ))}
                {filteredShops.length === 0 && (
                    <tr><td colSpan="5" className="text-center py-4 text-muted">No active shops found.</td></tr>
                )}
            </tbody>
        </Table>
      </Card>
    </AdminLayout>
  );
};

export default DistrictActiveShops;