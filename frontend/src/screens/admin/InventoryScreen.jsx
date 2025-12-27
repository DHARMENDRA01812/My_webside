import { useEffect, useState } from 'react';
import { Table, Badge, Button, Form, InputGroup, Card } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout';
import { FaSearch, FaSave, FaExclamationTriangle } from 'react-icons/fa';

const InventoryScreen = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => { fetchProducts(); }, []);

    const fetchProducts = async () => {
        const { data } = await axios.get('/api/products');
        setProducts(data);
    };

    // Quick Stock Update (Mock Logic - needs backend endpoint)
    const handleStockUpdate = (id, newStock) => {
        // In real app: await axios.put(`/api/products/${id}`, { countInStock: newStock });
        const updated = products.map(p => p._id === id ? { ...p, countInStock: newStock } : p);
        setProducts(updated);
        toast.success('Stock Updated Locally');
    };

    const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <AdminLayout title="Inventory Management">
            <Card className="shadow-sm border-0 p-4">
                <div className="d-flex justify-content-between mb-4">
                    <InputGroup style={{ maxWidth: '300px' }}>
                        <InputGroup.Text><FaSearch/></InputGroup.Text>
                        <Form.Control placeholder="Search Product..." onChange={e => setSearch(e.target.value)}/>
                    </InputGroup>
                    <Button variant="outline-dark">Export CSV</Button>
                </div>
                <Table hover responsive className="align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Current Stock</th>
                            <th>Status</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(p => (
                            <tr key={p._id}>
                                <td>
                                    <div className="fw-bold">{p.name}</div>
                                    <small className="text-muted">ID: {p._id.substring(0,6)}</small>
                                </td>
                                <td>{p.category}</td>
                                <td>
                                    <Form.Control 
                                        type="number" 
                                        defaultValue={p.countInStock} 
                                        style={{width: '80px'}}
                                        onBlur={(e) => handleStockUpdate(p._id, e.target.value)}
                                    />
                                </td>
                                <td>
                                    {p.countInStock === 0 ? <Badge bg="danger">Out of Stock</Badge> : 
                                     p.countInStock < 5 ? <Badge bg="warning" text="dark"><FaExclamationTriangle/> Low</Badge> : 
                                     <Badge bg="success">Good</Badge>}
                                </td>
                                <td>
                                    <Button size="sm" variant="primary"><FaSave/></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </AdminLayout>
    );
};
export default InventoryScreen;