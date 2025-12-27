import { useEffect, useState } from 'react';
import { Table, Button, Badge, Card, Modal, Form, InputGroup, Row, Col, Tab, Nav } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout';
import { 
    FaTrash, FaKey, FaSearch, FaUserShield, FaStore, 
    FaUser, FaUserTie, FaCheckCircle, FaBan, FaCog, 
    FaMapMarkerAlt, FaUniversity, FaInfoCircle, FaPhoneAlt, FaCalendarAlt
} from 'react-icons/fa';

const UserListScreen = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    
    // --- MANAGE MODAL STATES ---
    const [showManageModal, setShowManageModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [activeTab, setActiveTab] = useState('basic'); 
    
    const [formData, setFormData] = useState({
        name: '', email: '', mobile: '', fatherName: '', dob: '', gender: '',
        aadhaarNumber: '', panNumber: '',
        permanentAddress: { fullAddress: '', district: '', state: '', pinCode: '' },
        shopAddress: { fullAddress: '', district: '', pinCode: '' },
        bankDetails: { bankName: '', accountNumber: '', ifscCode: '' },
        accountStatus: 'Active',
        shopType: '', managedDistrict: ''
    });

    const [newPassword, setNewPassword] = useState('');

    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('/api/users');
            setUsers(data);
        } catch (error) { toast.error("Error fetching users"); }
    };

    // --- HANDLERS ---
    const openManageModal = (user) => {
        setSelectedUser(user);
        setNewPassword('');
        setActiveTab('basic');
        
        setFormData({
            name: user.name || '',
            email: user.email || '',
            mobile: user.mobile || '',
            fatherName: user.fatherName || '',
            dob: user.dob ? user.dob.substring(0, 10) : '',
            gender: user.gender || 'Male',
            aadhaarNumber: user.aadhaarNumber || '',
            panNumber: user.panNumber || '',
            accountStatus: user.accountStatus || 'Active',
            shopType: user.shopType || '',
            managedDistrict: user.managedDistrict || '',
            permanentAddress: { 
                fullAddress: user.permanentAddress?.fullAddress || '',
                district: user.permanentAddress?.district || '',
                state: user.permanentAddress?.state || '',
                pinCode: user.permanentAddress?.pinCode || ''
            },
            shopAddress: {
                fullAddress: user.shopAddress?.fullAddress || '',
                district: user.shopAddress?.district || '',
                pinCode: user.shopAddress?.pinCode || ''
            },
            bankDetails: {
                bankName: user.bankDetails?.bankName || '',
                accountNumber: user.bankDetails?.accountNumber || '',
                ifscCode: user.bankDetails?.ifscCode || ''
            }
        });
        
        setShowManageModal(true);
    };

    const handleUpdateProfile = async () => {
        try {
            await axios.put(`/api/users/${selectedUser._id}`, formData);
            toast.success("User Profile Updated Successfully!");
            fetchUsers();
            setShowManageModal(false);
        } catch (err) { toast.error("Update failed"); }
    };

    const handleResetPassword = async () => {
        try {
            await axios.put(`/api/users/${selectedUser._id}/reset-password`, { newPassword });
            toast.success(`Password changed for ${selectedUser.name}`);
            setNewPassword('');
        } catch (err) { toast.error("Reset failed"); }
    };

    const handleDeleteUser = async () => {
        if(window.confirm(`PERMANENTLY DELETE ${selectedUser.name}? This cannot be undone.`)) {
            try {
                await axios.delete(`/api/users/${selectedUser._id}`);
                toast.success('User deleted successfully');
                setShowManageModal(false);
                fetchUsers();
            } catch (error) { toast.error("Delete failed"); }
        }
    };

    const handleNestedChange = (parent, field, value) => {
        setFormData(prev => ({
            ...prev,
            [parent]: { ...prev[parent], [field]: value }
        }));
    };

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || (u.mobile && u.mobile.includes(search));
        const matchesRole = roleFilter === 'All' || 
            (roleFilter === 'Admin' && u.isAdmin) ||
            (roleFilter === 'Shop' && u.isShopOwner) ||
            (roleFilter === 'District' && u.isDistrictAdmin) ||
            (roleFilter === 'Customer' && !u.isAdmin && !u.isShopOwner && !u.isDistrictAdmin);
        return matchesSearch && matchesRole;
    });

    const getRoleBadge = (user) => {
        if (user.isAdmin) return <Badge bg="danger">System Admin</Badge>;
        if (user.isDistrictAdmin) return <Badge bg="info">District Admin</Badge>;
        if (user.isShopOwner) return <Badge bg="warning" text="dark">Shop Owner</Badge>;
        return <Badge bg="light" text="secondary" className="border">Customer</Badge>;
    };

    const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
    const colors = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#6f42c1'];
    const getColor = (name) => colors[name.length % colors.length];

    return (
        <AdminLayout title="User Management">
            
            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                <Card.Header className="bg-white py-3 px-4 border-bottom">
                    <Row className="align-items-center">
                        <Col md={5}>
                            <InputGroup className="shadow-sm rounded-pill overflow-hidden border">
                                <InputGroup.Text className="bg-white border-0 ps-3"><FaSearch className="text-muted"/></InputGroup.Text>
                                <Form.Control placeholder="Search by name, email or mobile..." className="border-0 shadow-none" onChange={(e) => setSearch(e.target.value)} />
                            </InputGroup>
                        </Col>
                        <Col md={7} className="text-md-end mt-3 mt-md-0 d-flex justify-content-md-end gap-2">
                            <Form.Select className="shadow-sm border-0 bg-light rounded-pill w-auto px-4 fw-bold text-secondary" onChange={(e) => setRoleFilter(e.target.value)}>
                                <option value="All">All Roles</option>
                                <option value="Admin">Admins</option>
                                <option value="District">District Admins</option>
                                <option value="Shop">Shop Owners</option>
                                <option value="Customer">Customers</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Card.Header>

                <div className="table-responsive">
                    <Table hover className="align-middle mb-0 custom-table-static">
                        <thead className="bg-light text-secondary text-uppercase small">
                            <tr>
                                <th className="px-4 py-3">User Profile</th>
                                <th className="py-3">Contact Info</th> {/* ✅ Added */}
                                <th className="py-3">Role</th>
                                <th className="py-3">Location (State)</th> {/* ✅ Updated */}
                                <th className="py-3">Joined On</th> {/* ✅ Added */}
                                <th className="py-3">Status</th>
                                <th className="py-3 text-end px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user._id} style={{borderBottom: '1px solid #f0f0f0'}}>
                                    {/* 1. Profile */}
                                    <td className="px-4 py-3">
                                        <div className="d-flex align-items-center">
                                            <div className="rounded-circle text-white d-flex align-items-center justify-content-center shadow-sm me-3 fw-bold" style={{width:'40px', height:'40px', backgroundColor: getColor(user.name), fontSize:'1rem'}}>
                                                {getInitials(user.name)}
                                            </div>
                                            <div>
                                                <div className="fw-bold text-dark">{user.name}</div>
                                                <div className="text-muted small" style={{fontSize: '0.75rem'}}>{user.email}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* 2. Contact (New) */}
                                    <td>
                                        <div className="fw-bold text-dark"><FaPhoneAlt className="me-1 text-muted" size={10}/> {user.mobile || 'N/A'}</div>
                                    </td>

                                    {/* 3. Role */}
                                    <td>{getRoleBadge(user)}</td>

                                    {/* 4. Location (Updated with State) */}
                                    <td>
                                        <div className="text-dark fw-medium">
                                            {user.permanentAddress?.district || user.managedDistrict || '-'}
                                        </div>
                                        <small className="text-muted">
                                            {user.permanentAddress?.state ? user.permanentAddress.state : ''}
                                        </small>
                                    </td>

                                    {/* 5. Joined Date (New) */}
                                    <td>
                                        <small className="text-muted">
                                            <FaCalendarAlt className="me-1"/>
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </small>
                                    </td>

                                    {/* 6. Status */}
                                    <td>
                                        <Badge bg={user.accountStatus === 'Active' ? 'success' : 'danger'} className="rounded-pill px-3 bg-opacity-10 text-success border border-success">
                                            {user.accountStatus || 'Active'}
                                        </Badge>
                                    </td>

                                    {/* 7. Action */}
                                    <td className="text-end px-4">
                                        <Button variant="outline-primary" size="sm" className="rounded-pill px-3 fw-bold" onClick={() => openManageModal(user)}>
                                            <FaCog className="me-1"/> Manage
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Card>

            {/* --- DETAILED MANAGE MODAL (Same as previous step) --- */}
            <Modal show={showManageModal} onHide={() => setShowManageModal(false)} centered size="xl" backdrop="static">
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title className="fw-bold">
                        Editing: <span className="text-primary">{selectedUser?.name}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                        <Row className="g-0">
                            {/* Left Sidebar Navigation */}
                            <Col sm={3} className="bg-light border-end">
                                <Nav variant="pills" className="flex-column p-3 gap-2">
                                    <Nav.Item>
                                        <Nav.Link eventKey="basic" className="text-start"><FaInfoCircle className="me-2"/> Basic Info</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="address" className="text-start"><FaMapMarkerAlt className="me-2"/> Locations</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="bank" className="text-start"><FaUniversity className="me-2"/> Bank & Docs</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="security" className="text-start"><FaKey className="me-2"/> Security</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="danger" className="text-start text-danger"><FaBan className="me-2"/> Danger Zone</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>

                            {/* Right Content Area */}
                            <Col sm={9}>
                                <Tab.Content className="p-4" style={{height: '600px', overflowY: 'auto'}}>
                                    
                                    {/* 1. BASIC INFO TAB */}
                                    <Tab.Pane eventKey="basic">
                                        <h5 className="fw-bold mb-4 text-secondary border-bottom pb-2">Personal Information</h5>
                                        <Row className="g-3">
                                            <Col md={6}>
                                                <Form.Group><Form.Label>Full Name</Form.Label>
                                                <Form.Control value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} /></Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group><Form.Label>Father Name</Form.Label>
                                                <Form.Control value={formData.fatherName} onChange={(e)=>setFormData({...formData, fatherName: e.target.value})} /></Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group><Form.Label>Login ID / Email</Form.Label>
                                                <Form.Control value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} /></Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group><Form.Label>Mobile Number</Form.Label>
                                                <Form.Control value={formData.mobile} onChange={(e)=>setFormData({...formData, mobile: e.target.value})} /></Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group><Form.Label>Date of Birth</Form.Label>
                                                <Form.Control type="date" value={formData.dob} onChange={(e)=>setFormData({...formData, dob: e.target.value})} /></Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group><Form.Label>Gender</Form.Label>
                                                <Form.Select value={formData.gender} onChange={(e)=>setFormData({...formData, gender: e.target.value})}>
                                                    <option>Male</option><option>Female</option><option>Transgender</option>
                                                </Form.Select></Form.Group>
                                            </Col>
                                            <Col md={4}>
                                                <Form.Group><Form.Label>Account Status</Form.Label>
                                                <Form.Select value={formData.accountStatus} onChange={(e)=>setFormData({...formData, accountStatus: e.target.value})} className={formData.accountStatus === 'Active' ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                                                    <option value="Active">Active</option><option value="Suspended">Suspended</option>
                                                </Form.Select></Form.Group>
                                            </Col>
                                        </Row>

                                        {selectedUser?.isShopOwner && (
                                            <>
                                                <h5 className="fw-bold mt-5 mb-3 text-secondary border-bottom pb-2">Shop Details</h5>
                                                <Row className="g-3">
                                                    <Col md={6}><Form.Group><Form.Label>Shop Type</Form.Label><Form.Control value={formData.shopType} onChange={(e)=>setFormData({...formData, shopType: e.target.value})} /></Form.Group></Col>
                                                </Row>
                                            </>
                                        )}
                                        {selectedUser?.isDistrictAdmin && (
                                            <>
                                                <h5 className="fw-bold mt-5 mb-3 text-secondary border-bottom pb-2">Admin Zone</h5>
                                                <Row className="g-3">
                                                    <Col md={6}><Form.Group><Form.Label>Managed District</Form.Label><Form.Control value={formData.managedDistrict} onChange={(e)=>setFormData({...formData, managedDistrict: e.target.value})} /></Form.Group></Col>
                                                </Row>
                                            </>
                                        )}
                                    </Tab.Pane>

                                    {/* 2. LOCATIONS TAB */}
                                    <Tab.Pane eventKey="address">
                                        <h5 className="fw-bold mb-3 text-secondary">Permanent Address</h5>
                                        <Row className="g-3 mb-4">
                                            <Col md={12}><Form.Control placeholder="Full Address" value={formData.permanentAddress.fullAddress} onChange={(e)=>handleNestedChange('permanentAddress', 'fullAddress', e.target.value)} /></Col>
                                            <Col md={4}><Form.Control placeholder="District" value={formData.permanentAddress.district} onChange={(e)=>handleNestedChange('permanentAddress', 'district', e.target.value)} /></Col>
                                            <Col md={4}><Form.Control placeholder="State" value={formData.permanentAddress.state} onChange={(e)=>handleNestedChange('permanentAddress', 'state', e.target.value)} /></Col>
                                            <Col md={4}><Form.Control placeholder="Pin Code" value={formData.permanentAddress.pinCode} onChange={(e)=>handleNestedChange('permanentAddress', 'pinCode', e.target.value)} /></Col>
                                        </Row>

                                        {selectedUser?.isShopOwner && (
                                            <>
                                                <h5 className="fw-bold mb-3 text-secondary">Shop Address</h5>
                                                <Row className="g-3">
                                                    <Col md={12}><Form.Control placeholder="Full Shop Address" value={formData.shopAddress.fullAddress} onChange={(e)=>handleNestedChange('shopAddress', 'fullAddress', e.target.value)} /></Col>
                                                    <Col md={6}><Form.Control placeholder="District" value={formData.shopAddress.district} onChange={(e)=>handleNestedChange('shopAddress', 'district', e.target.value)} /></Col>
                                                    <Col md={6}><Form.Control placeholder="Pin Code" value={formData.shopAddress.pinCode} onChange={(e)=>handleNestedChange('shopAddress', 'pinCode', e.target.value)} /></Col>
                                                </Row>
                                            </>
                                        )}
                                    </Tab.Pane>

                                    {/* 3. BANK & DOCS TAB */}
                                    <Tab.Pane eventKey="bank">
                                        <h5 className="fw-bold mb-3 text-secondary">Bank Details</h5>
                                        <Row className="g-3 mb-4">
                                            <Col md={4}><Form.Label>Bank Name</Form.Label><Form.Control value={formData.bankDetails.bankName} onChange={(e)=>handleNestedChange('bankDetails', 'bankName', e.target.value)} /></Col>
                                            <Col md={4}><Form.Label>Account No.</Form.Label><Form.Control value={formData.bankDetails.accountNumber} onChange={(e)=>handleNestedChange('bankDetails', 'accountNumber', e.target.value)} /></Col>
                                            <Col md={4}><Form.Label>IFSC Code</Form.Label><Form.Control value={formData.bankDetails.ifscCode} onChange={(e)=>handleNestedChange('bankDetails', 'ifscCode', e.target.value)} /></Col>
                                        </Row>

                                        <h5 className="fw-bold mb-3 text-secondary">Identity Numbers</h5>
                                        <Row className="g-3 mb-4">
                                            <Col md={6}><Form.Label>Aadhaar Number</Form.Label><Form.Control value={formData.aadhaarNumber} onChange={(e)=>setFormData({...formData, aadhaarNumber: e.target.value})} /></Col>
                                            <Col md={6}><Form.Label>PAN Number</Form.Label><Form.Control value={formData.panNumber} onChange={(e)=>setFormData({...formData, panNumber: e.target.value})} /></Col>
                                        </Row>

                                        <h5 className="fw-bold mb-3 text-secondary">Uploaded Documents</h5>
                                        <Row className="g-3">
                                            {[
                                                { label: 'Photo', src: selectedUser?.photo },
                                                { label: 'Aadhaar', src: selectedUser?.aadhaarImage },
                                                { label: 'PAN', src: selectedUser?.panImage },
                                                { label: 'Passbook', src: selectedUser?.bankDetails?.passbookImage }
                                            ].map((doc, i) => (
                                                <Col xs={6} md={3} key={i}>
                                                    <Card className="text-center h-100 p-2">
                                                        <small className="fw-bold d-block mb-2">{doc.label}</small>
                                                        {doc.src ? (
                                                            <a href={`http://localhost:5000/${doc.src.replace(/\\/g, "/")}`} target="_blank" rel="noreferrer">
                                                                <Image src={`http://localhost:5000/${doc.src.replace(/\\/g, "/")}`} fluid thumbnail style={{height: '80px', objectFit: 'contain'}} />
                                                            </a>
                                                        ) : <span className="text-muted small">Not Uploaded</span>}
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Tab.Pane>

                                    {/* 4. SECURITY TAB */}
                                    <Tab.Pane eventKey="security">
                                        <h5 className="fw-bold mb-3">Password Management</h5>
                                        <div className="alert alert-warning small border-0">Admin can force reset the user's password here.</div>
                                        <Form.Group className="mb-3">
                                            <Form.Label>New Password</Form.Label>
                                            <Form.Control type="text" placeholder="Enter new password..." value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
                                        </Form.Group>
                                        <Button variant="dark" size="sm" disabled={!newPassword} onClick={handleResetPassword}>Update Password</Button>
                                    </Tab.Pane>

                                    {/* 5. DANGER ZONE TAB */}
                                    <Tab.Pane eventKey="danger">
                                        <h5 className="fw-bold text-danger mb-3">Critical Actions</h5>
                                        <div className="d-flex justify-content-between align-items-center p-3 bg-white rounded border border-danger">
                                            <div>
                                                <strong className="text-danger">Delete User Permanently</strong>
                                                <div className="text-muted small">This action cannot be undone. User data will be lost.</div>
                                            </div>
                                            <Button variant="danger" size="sm" onClick={handleDeleteUser}><FaTrash className="me-1"/> Delete</Button>
                                        </div>
                                    </Tab.Pane>

                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Modal.Body>
                <Modal.Footer className="bg-light">
                    <Button variant="secondary" onClick={() => setShowManageModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleUpdateProfile}>Save All Changes</Button>
                </Modal.Footer>
            </Modal>

            <style>{`
                .custom-table-static tbody tr { 
                    transition: background-color 0.2s ease-in-out; 
                }
                .custom-table-static tbody tr:hover { 
                    background-color: #f8f9fa !important; 
                    transform: none !important; 
                    box-shadow: none !important;
                }
            `}</style>
        </AdminLayout>
    );
};

export default UserListScreen;