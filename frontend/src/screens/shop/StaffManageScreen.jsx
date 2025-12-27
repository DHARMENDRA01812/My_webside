import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout';

const StaffManageScreen = () => {
    const [staffs, setStaffs] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fetchStaff = async () => {
        const { data } = await axios.get('/api/staff/myshop');
        setStaffs(data);
    };

    return (
        <AdminLayout title="Staff Management">
            <Button onClick={() => setShowModal(true)} className="mb-3">Add New Staff</Button>
            <Table striped hover responsive>
                <thead>
                    <tr>
                        <th>ID Card</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Mobile</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {staffs.map(s => (
                        <tr key={s._id}>
                            <td>{s.staffID}</td>
                            <td>{s.fullName}</td>
                            <td>{s.role}</td>
                            <td>{s.mobile}</td>
                            <td>
                                <Button variant="info" size="sm">Download ID</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </AdminLayout>
    );
};
export default StaffManageScreen;