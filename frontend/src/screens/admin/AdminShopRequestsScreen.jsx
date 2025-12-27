import { useState, useEffect } from 'react';
import { Table, Button, Badge, Modal, Card, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaTimes, FaEye, FaArrowRight } from 'react-icons/fa';
import AdminLayout from '../../components/AdminLayout'; // ✅ AdminLayout Import

const AdminShopRequestsScreen = () => {
  const [applications, setApplications] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    if (userInfo && (userInfo.isAdmin || userInfo.isDistrictAdmin)) {
      fetchApplications();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get('/api/shop-owner/all');
      setApplications(data);
    } catch (error) {
      toast.error('Error fetching data');
    }
  };

  // --- ACTIONS ---
  const handleForward = async () => {
    if(!selectedApp) return;
    try {
        await axios.put(`/api/shop-owner/forward/${selectedApp._id}`);
        toast.success('Successfully Forwarded to System Admin');
        setShowModal(false);
        fetchApplications();
    } catch (error) { toast.error('Error forwarding application'); }
  };

  const handleReject = async () => {
    if(!selectedApp) return;
    if(window.confirm('Are you sure you want to REJECT this application?')) {
        try {
            await axios.put(`/api/shop-owner/reject/${selectedApp._id}`);
            toast.error('Application Rejected');
            setShowModal(false);
            fetchApplications();
        } catch (error) { toast.error('Error rejecting application'); }
    }
  };

  const handleApprove = async () => {
    if(!selectedApp) return;
    if(window.confirm('Approve and Generate ID/Password?')) {
        try {
            await axios.put(`/api/shop-owner/approve/${selectedApp._id}`);
            toast.success('Approved! Credentials Sent.');
            setShowModal(false);
            fetchApplications();
        } catch (error) { toast.error('Error approving'); }
    }
  };

  // --- Image Helper ---
  const DocumentPreview = ({ label, src }) => (
      <div className="mb-3">
          <strong>{label}</strong>
          <div className="mt-1 border rounded p-1 bg-light text-center">
             {src ? (
                 <a href={`http://localhost:5000/${src.replace(/\\/g, "/")}`} target="_blank" rel="noreferrer">
                    <img src={`http://localhost:5000/${src.replace(/\\/g, "/")}`} alt={label} style={{maxHeight:'150px', maxWidth:'100%'}} />
                 </a>
             ) : <span className="text-danger">Not Uploaded</span>}
          </div>
      </div>
  );

  return (
    // ✅ Wrappad in AdminLayout
    <AdminLayout title="Manage Applications">
      <Card className="shadow-sm border-0 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold m-0">Shop Applications</h3>
            <Badge bg="secondary">Total: {applications.length}</Badge>
        </div>

        <Table striped hover responsive className="align-middle mb-0">
            <thead className="bg-dark text-white">
                <tr>
                    <th>Applicant Name</th>
                    <th>Zone/District</th>
                    <th>Applied Date</th>
                    <th>Current Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {applications.map((app) => (
                    <tr key={app._id}>
                        <td>
                            <div className="fw-bold">{app.fullName}</div>
                            <small className="text-muted">{app.mobile}</small>
                        </td>
                        <td>{app.permanentAddress?.district}</td>
                        <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                        <td>
                            <Badge bg={
                                app.status === 'Approved' ? 'success' : 
                                app.status === 'Rejected' ? 'danger' : 
                                app.status === 'Pending District' ? 'warning' : 'info'
                            }>
                                {app.status}
                            </Badge>
                        </td>
                        <td>
                            <Button variant="primary" size="sm" onClick={() => { setSelectedApp(app); setShowModal(true); }}>
                                <FaEye className="me-1"/> View & Action
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
      </Card>

      {/* --- DETAIL MODAL --- */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" centered backdrop="static">
        <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title>Application Details: {selectedApp?.fullName}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor: '#f8f9fa'}}>
            {selectedApp && (
                <Row>
                    {/* Left: Info */}
                    <Col md={4}>
                        <Card className="p-3 mb-3 h-100 border-0 shadow-sm">
                            <h5 className="border-bottom pb-2">Applicant Info</h5>
                            <p><strong>Father:</strong> {selectedApp.fatherName}</p>
                            <p><strong>Email:</strong> {selectedApp.email}</p>
                            <p><strong>Aadhaar:</strong> {selectedApp.aadhaarNumber}</p>
                            <p><strong>PAN:</strong> {selectedApp.panNumber}</p>
                            <p><strong>Address:</strong> {selectedApp.permanentAddress?.fullAddress}, {selectedApp.permanentAddress?.district}</p>
                            <Alert variant="info" className="mt-3">
                                <strong>Current Status:</strong> {selectedApp.status}
                            </Alert>
                        </Card>
                    </Col>

                    {/* Middle: Documents */}
                    <Col md={4}>
                        <Card className="p-3 mb-3 h-100 border-0 shadow-sm">
                            <h5 className="border-bottom pb-2">Documents Verification</h5>
                            <div style={{maxHeight: '400px', overflowY: 'auto'}}>
                                <DocumentPreview label="Applicant Photo" src={selectedApp.photo} />
                                <DocumentPreview label="Aadhaar Card" src={selectedApp.aadhaarImage} />
                                <DocumentPreview label="PAN Card" src={selectedApp.panImage} />
                            </div>
                        </Card>
                    </Col>

                    {/* Right: Shop & Bank */}
                    <Col md={4}>
                        <Card className="p-3 mb-3 h-100 border-0 shadow-sm">
                            <h5 className="border-bottom pb-2">Shop & Bank Details</h5>
                            <DocumentPreview label="Shop Inside" src={selectedApp.shopImageInside} />
                            <DocumentPreview label="Passbook/Cheque" src={selectedApp.passbookImage} />
                            <div className="mt-3 bg-light p-2 rounded">
                                <p className="mb-1"><strong>Bank:</strong> {selectedApp.bankName}</p>
                                <p className="mb-1"><strong>Account:</strong> {selectedApp.accountNumber}</p>
                                <p className="mb-0"><strong>IFSC:</strong> {selectedApp.ifscCode}</p>
                            </div>
                        </Card>
                    </Col>
                </Row>
            )}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            
            {/* Action Buttons Based on Role & Status */}
            {selectedApp?.status === 'Pending District' && userInfo.isDistrictAdmin && (
                <>
                    <Button variant="danger" onClick={handleReject}><FaTimes/> Reject</Button>
                    <Button variant="success" onClick={handleForward}><FaArrowRight/> Verify & Forward</Button>
                </>
            )}

            {selectedApp?.status === 'Pending System' && userInfo.isAdmin && (
                <>
                    <Button variant="danger" onClick={handleReject}><FaTimes/> Reject</Button>
                    <Button variant="success" onClick={handleApprove}><FaCheck/> Final Approve</Button>
                </>
            )}
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
};

export default AdminShopRequestsScreen;