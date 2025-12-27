import { useEffect, useState } from 'react';
import { Table, Badge, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';

const ManageComplaintsScreen = () => {
    const [complaints, setComplaints] = useState([]);
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState(null);
    const [notes, setNotes] = useState('');

    useEffect(() => { fetchComplaints(); }, []);

    const fetchComplaints = async () => {
        const { data } = await axios.get('/api/complaints');
        setComplaints(data);
    };

    const handleResolve = async () => {
        await axios.put(`/api/complaints/${selected._id}/resolve`, { notes, status: 'Resolved' });
        setShow(false);
        fetchComplaints();
    };

    return (
        <AdminLayout title="Complaints Management">
            <Table hover responsive className="bg-white shadow-sm">
                <thead>
                    <tr>
                        <th>User</th><th>Type</th><th>Subject</th><th>District</th><th>Status</th><th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {complaints.map(c => (
                        <tr key={c._id}>
                            <td>{c.user?.name}</td>
                            <td>{c.complaintType}</td>
                            <td>{c.subject}</td>
                            <td>{c.district}</td>
                            <td><Badge bg={c.status === 'Open' ? 'danger' : 'success'}>{c.status}</Badge></td>
                            <td>
                                <Button size="sm" variant="outline-primary" onClick={() => { setSelected(c); setShow(true); }}>Solve</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton><Modal.Title>Resolve Complaint</Modal.Title></Modal.Header>
                <Modal.Body>
                    <p><strong>Description:</strong> {selected?.description}</p>
                    <Form.Group><Form.Label>Resolution Notes</Form.Label><Form.Control as="textarea" onChange={(e) => setNotes(e.target.value)} /></Form.Group>
                </Modal.Body>
                <Modal.Footer><Button onClick={handleResolve} variant="success">Mark as Resolved</Button></Modal.Footer>
            </Modal>
        </AdminLayout>
    );
};
export default ManageComplaintsScreen;