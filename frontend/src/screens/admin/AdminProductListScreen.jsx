import { useEffect, useState } from 'react';
import { Table, Button, Badge, Card, Form, InputGroup, Modal, Row, Col, Tab, Nav, Image, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout';
import { 
    FaTrash, FaSearch, FaStore, FaCog, FaBox, 
    FaImage, FaAlignLeft, FaSave, FaExclamationTriangle 
} from 'react-icons/fa';

const AdminProductListScreen = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    
    // --- MANAGE MODAL STATES ---
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('basic');
    const [uploading, setUploading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '', price: 0, image: '', brand: '', 
        category: '', countInStock: 0, description: ''
    });

    useEffect(() => { fetchProducts(); }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        } catch (error) { toast.error('Error loading products'); }
    };

    // --- HANDLERS ---
    const openManageModal = (product) => {
        setSelectedProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            image: product.image,
            brand: product.brand,
            category: product.category,
            countInStock: product.countInStock,
            description: product.description
        });
        setActiveTab('basic');
        setShowModal(true);
    };

    const handleUploadFile = async (e) => {
        const file = e.target.files[0];
        const formDataPayload = new FormData();
        formDataPayload.append('image', file);
        setUploading(true);

        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const { data } = await axios.post('/api/upload', formDataPayload, config);
            setFormData(prev => ({ ...prev, image: data }));
            setUploading(false);
            toast.success('Image Uploaded!');
        } catch (error) {
            toast.error('Image upload failed');
            setUploading(false);
        }
    };

    const handleUpdateProduct = async () => {
        try {
            await axios.put(`/api/products/${selectedProduct._id}`, formData);
            toast.success('Product Updated Successfully');
            setShowModal(false);
            fetchProducts();
        } catch (error) {
            toast.error('Update failed');
        }
    };

    const handleDeleteProduct = async () => {
        if (window.confirm('Are you sure you want to permanently delete this product?')) {
            try {
                await axios.delete(`/api/products/${selectedProduct._id}`);
                toast.success('Product Deleted');
                setShowModal(false);
                fetchProducts();
            } catch (error) {
                toast.error('Delete failed');
            }
        }
    };

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout title="Inventory Management">
            
            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                <Card.Header className="bg-white py-3 px-4 border-bottom">
                    <Row className="align-items-center">
                        <Col md={6}>
                            <InputGroup className="shadow-sm rounded-pill overflow-hidden border">
                                <InputGroup.Text className="bg-white border-0 ps-3"><FaSearch className="text-muted"/></InputGroup.Text>
                                <Form.Control 
                                    placeholder="Search by product name, category..." 
                                    className="border-0 shadow-none"
                                    onChange={(e) => setSearch(e.target.value)} 
                                />
                            </InputGroup>
                        </Col>
                        <Col md={6} className="text-md-end mt-3 mt-md-0">
                            <Badge bg="dark" className="px-3 py-2 fs-6 rounded-pill">Total Products: {products.length}</Badge>
                        </Col>
                    </Row>
                </Card.Header>

                <div className="table-responsive">
                    <Table hover className="align-middle mb-0 custom-hover-table">
                        <thead className="bg-light text-secondary text-uppercase small">
                            <tr>
                                <th className="px-4 py-3">Product</th>
                                <th className="py-3">Category & Brand</th>
                                <th className="py-3">Price</th>
                                <th className="py-3">Stock Status</th>
                                <th className="py-3">Seller</th>
                                <th className="py-3 text-end px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map(p => (
                                <tr key={p._id} style={{borderBottom: '1px solid #f0f0f0'}}>
                                    <td className="px-4 py-3">
                                        <div className="d-flex align-items-center">
                                            <div className="border rounded p-1 me-3 bg-white" style={{width:'50px', height:'50px'}}>
                                                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                            </div>
                                            <div>
                                                <div className="fw-bold text-dark text-truncate" style={{maxWidth: '200px'}}>{p.name}</div>
                                                <small className="text-muted">ID: {p._id.substring(0, 6)}...</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Badge bg="light" text="dark" className="border me-1">{p.category}</Badge>
                                        <small className="text-muted">{p.brand}</small>
                                    </td>
                                    <td className="fw-bold text-success">₹{p.price}</td>
                                    <td>
                                        {p.countInStock === 0 ? <Badge bg="danger">Out of Stock</Badge> : 
                                         p.countInStock < 10 ? <Badge bg="warning" text="dark">Low ({p.countInStock})</Badge> : 
                                         <Badge bg="success" className="bg-opacity-10 text-success border border-success">In Stock ({p.countInStock})</Badge>}
                                    </td>
                                    <td>
                                        <div className="small fw-bold"><FaStore className="me-1 text-muted" /> {p.user?.name || 'Admin'}</div>
                                    </td>
                                    <td className="text-end px-4">
                                        <Button 
                                            variant="outline-primary" 
                                            size="sm" 
                                            className="rounded-pill px-3 fw-bold btn-hover-effect" 
                                            onClick={() => openManageModal(p)}
                                        >
                                            <FaCog className="me-1"/> Manage
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {filteredProducts.length === 0 && <tr><td colSpan="6" className="text-center py-5 text-muted">No products found.</td></tr>}
                        </tbody>
                    </Table>
                </div>
            </Card>

            {/* --- MANAGE PRODUCT MODAL --- */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg" backdrop="static">
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title className="fw-bold">
                        Manage Product: <span className="text-primary fs-6">{selectedProduct?.name}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                        <Row className="g-0">
                            {/* Sidebar */}
                            <Col sm={3} className="bg-light border-end">
                                <Nav variant="pills" className="flex-column p-3 gap-2">
                                    <Nav.Item>
                                        <Nav.Link eventKey="basic" className="text-start"><FaBox className="me-2"/> Basic Info</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="media" className="text-start"><FaImage className="me-2"/> Media & Desc</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="danger" className="text-start text-danger"><FaExclamationTriangle className="me-2"/> Danger Zone</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>

                            {/* Content */}
                            <Col sm={9}>
                                <Tab.Content className="p-4" style={{height: '450px', overflowY: 'auto'}}>
                                    
                                    {/* 1. BASIC INFO */}
                                    <Tab.Pane eventKey="basic">
                                        <h6 className="fw-bold mb-3 text-secondary border-bottom pb-2">Product Specifications</h6>
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Product Name</Form.Label>
                                                <Form.Control value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                                            </Form.Group>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Category</Form.Label>
                                                        <Form.Control value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Brand</Form.Label>
                                                        <Form.Control value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Price (₹)</Form.Label>
                                                        <InputGroup>
                                                            {/* ✅ यहाँ बदल दिया गया है */}
                                                            <InputGroup.Text className="fw-bold text-muted">Rs.</InputGroup.Text>
                                                            <Form.Control type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Count In Stock</Form.Label>
                                                        <Form.Control type="number" value={formData.countInStock} onChange={(e) => setFormData({...formData, countInStock: e.target.value})} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Tab.Pane>

                                    {/* 2. MEDIA & DESCRIPTION */}
                                    <Tab.Pane eventKey="media">
                                        <h6 className="fw-bold mb-3 text-secondary border-bottom pb-2">Images & Details</h6>
                                        <Row className="mb-3">
                                            <Col md={4} className="text-center">
                                                <div className="border p-2 rounded mb-2">
                                                    <Image src={formData.image || '/placeholder.jpg'} fluid style={{maxHeight:'100px'}} />
                                                </div>
                                            </Col>
                                            <Col md={8}>
                                                <Form.Group>
                                                    <Form.Label>Update Image</Form.Label>
                                                    <Form.Control type="file" onChange={handleUploadFile} />
                                                    {uploading && <div className="text-muted mt-1"><Spinner size="sm"/> Uploading...</div>}
                                                </Form.Group>
                                                <Form.Control type="text" className="mt-2" placeholder="Or enter Image URL" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
                                            </Col>
                                        </Row>
                                        <Form.Group>
                                            <Form.Label><FaAlignLeft className="me-2"/> Description</Form.Label>
                                            <Form.Control as="textarea" rows={5} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                                        </Form.Group>
                                    </Tab.Pane>

                                    {/* 3. DANGER ZONE */}
                                    <Tab.Pane eventKey="danger">
                                        <h6 className="fw-bold text-danger mb-3">Critical Actions</h6>
                                        <div className="alert alert-danger d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>Delete this Product</strong>
                                                <div className="small">Once deleted, it cannot be recovered.</div>
                                            </div>
                                            <Button variant="danger" size="sm" onClick={handleDeleteProduct}><FaTrash className="me-1"/> Delete Permanently</Button>
                                        </div>
                                    </Tab.Pane>

                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Modal.Body>
                <Modal.Footer className="bg-light">
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleUpdateProduct}><FaSave className="me-2"/> Save Changes</Button>
                </Modal.Footer>
            </Modal>

            <style>{`
                .custom-hover-table tbody tr { transition: background-color 0.2s; }
                .custom-hover-table tbody tr:hover { background-color: #f8f9fa !important; }
                .btn-hover-effect:hover { transform: translateY(-1px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            `}</style>
        </AdminLayout>
    );
};

export default AdminProductListScreen;