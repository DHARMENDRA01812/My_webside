import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Image, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout';
import { FaTrash, FaCloudUploadAlt, FaExternalLinkAlt } from 'react-icons/fa';

const BannerManagerScreen = () => {
    const [banners, setBanners] = useState([]);
    
    // Form States
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const { data } = await axios.get('/api/marketing/banners');
            setBanners(data);
        } catch (error) { console.error(error); }
    };

    // 1. Upload Image First
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const { data } = await axios.post('/api/upload', formData, config);
            setImage(data); // Path set karein
            setUploading(false);
            toast.success('Image Uploaded');
        } catch (error) {
            toast.error('Image Upload Failed');
            setUploading(false);
        }
    };

    // 2. Save Banner to DB
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/marketing/banners', { title, image, link });
            toast.success('Banner Added to Homepage');
            setTitle(''); setImage(''); setLink(''); // Reset
            fetchBanners();
        } catch (error) {
            toast.error('Failed to add banner');
        }
    };

    const deleteHandler = async (id) => {
        if(window.confirm('Remove this banner?')) {
            await axios.delete(`/api/marketing/banners/${id}`);
            toast.success('Banner Removed');
            fetchBanners();
        }
    };

    return (
        <AdminLayout title="Homepage Banners">
            <Row>
                <Col md={4}>
                    <Card className="p-4 shadow-sm border-0 mb-4">
                        <h5 className="mb-3">Add New Slider</h5>
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-3">
                                <Form.Label>Banner Title (Optional)</Form.Label>
                                <Form.Control value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="e.g. Diwali Sale" />
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control type="file" onChange={uploadFileHandler} />
                                {uploading && <div className="text-muted mt-1"><Spinner size="sm"/> Uploading...</div>}
                                {image && <div className="text-success small mt-1">Image selected!</div>}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Redirect Link</Form.Label>
                                <Form.Control value={link} onChange={(e)=>setLink(e.target.value)} placeholder="/category/mobile" />
                            </Form.Group>

                            <Button type="submit" variant="primary" className="w-100" disabled={!image || uploading}>
                                <FaCloudUploadAlt className="me-2"/> Publish Banner
                            </Button>
                        </Form>
                    </Card>
                </Col>

                <Col md={8}>
                    <h5 className="mb-3">Active Banners ({banners.length})</h5>
                    <div className="d-flex flex-column gap-3">
                        {banners.map(b => (
                            <Card key={b._id} className="p-2 shadow-sm border-0 overflow-hidden">
                                <div className="position-relative">
                                    <Image src={b.image} fluid rounded style={{maxHeight:'200px', width:'100%', objectFit:'cover'}} />
                                    <div className="position-absolute top-0 end-0 m-2">
                                        <Button variant="danger" size="sm" onClick={() => deleteHandler(b._id)}>
                                            <FaTrash/>
                                        </Button>
                                    </div>
                                    <div className="position-absolute bottom-0 start-0 bg-dark bg-opacity-75 text-white p-2 w-100">
                                        <strong>{b.title || 'No Title'}</strong> 
                                        {b.link && <small className="ms-2 opacity-75"><FaExternalLinkAlt/> {b.link}</small>}
                                    </div>
                                </div>
                            </Card>
                        ))}
                        {banners.length === 0 && <div className="alert alert-info">No banners active. Upload one to start.</div>}
                    </div>
                </Col>
            </Row>
        </AdminLayout>
    );
};

export default BannerManagerScreen;