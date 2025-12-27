import { useEffect, useState } from 'react';
import { Table, Button, Form, Card, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const CategoryScreen = () => {
    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => { fetchCategories(); }, []);

    const fetchCategories = async () => {
        const { data } = await axios.get('/api/categories');
        setCategories(data);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/categories', { name, description });
            toast.success('Category Added');
            setShow(false);
            fetchCategories();
        } catch (err) { toast.error('Failed to add category'); }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            await axios.delete(`/api/categories/${id}`);
            fetchCategories();
        }
    };

    return (
        <AdminLayout title="Manage Categories">
            <Card className="border-0 shadow-sm p-4">
                <div className="d-flex justify-content-between mb-4">
                    <h5 className="fw-bold">Product Categories</h5>
                    <Button variant="primary" onClick={() => setShow(true)}><FaPlus/> Add Category</Button>
                </div>
                <Table hover responsive>
                    <thead className="bg-light">
                        <tr><th>Category Name</th><th>Description</th><th>Created At</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                        {categories.map(c => (
                            <tr key={c._id}>
                                <td className="fw-bold">{c.name}</td>
                                <td>{c.description}</td>
                                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <Button variant="light" className="text-danger btn-sm" onClick={() => deleteHandler(c._id)}><FaTrash/></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton><Modal.Title>New Category</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3"><Form.Label>Name</Form.Label>
                            <Form.Control required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3"><Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Button type="submit" variant="dark" className="w-100">Save Category</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </AdminLayout>
    );
};
export default CategoryScreen;