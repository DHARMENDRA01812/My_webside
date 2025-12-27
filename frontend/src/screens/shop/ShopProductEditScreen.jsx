import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Card, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

const ShopProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  // ✅ FIX: केवल तभी फेच करें जब productId मौजूद हो (Edit Mode)
  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const { data } = await axios.get(`/api/products/${productId}`);
          setName(data.name);
          setPrice(data.price);
          setImage(data.image);
          setBrand(data.brand);
          setCategory(data.category);
          setCountInStock(data.countInStock);
          setDescription(data.description);
        } catch (error) {
          toast.error('Error fetching product details');
        }
      };
      fetchProduct();
    } else {
        // ✅ Add Mode: फॉर्म को खाली रखें
        setName('');
        setPrice(0);
        setImage('');
        setBrand('');
        setCategory('');
        setCountInStock(0);
        setDescription('');
    }
  }, [productId]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
      toast.success('Image Uploaded!');
    } catch (error) {
      console.error(error);
      setUploading(false);
      toast.error('Image Upload Failed');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (productId) {
        // --- UPDATE EXISTING PRODUCT ---
        await axios.put(`/api/products/${productId}`, {
          name, price, image, brand, category, countInStock, description
        });
        toast.success('Product Updated Successfully');
      } else {
        // --- CREATE NEW PRODUCT ---
        await axios.post('/api/products', {
            name, price, image, brand, category, countInStock, description
        });
        toast.success('Product Created Successfully');
      }
      navigate('/admin/products'); // या /shop/productlist रोल के आधार पर
    } catch (error) {
      toast.error('Operation Failed');
    }
  };

  return (
    <AdminLayout title={productId ? "Edit Product" : "Add New Product"}>
      <Link to='/admin/products' className='btn btn-outline-secondary mb-3'>
        <FaArrowLeft className="me-2"/> Back to List
      </Link>
      
      <Row className="justify-content-center">
          <Col md={10}>
            <Card className='shadow-sm border-0 p-4'>
                <h3 className="mb-4 text-primary">{productId ? "Edit Product Details" : "Create New Product"}</h3>
                <Form onSubmit={submitHandler}>
                    
                    <Row>
                        <Col md={8}>
                            <Form.Group controlId='name' className='mb-3'>
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId='price' className='mb-3'>
                                <Form.Label>Price (Rs.)</Form.Label>
                                <Form.Control type='number' value={price} onChange={(e) => setPrice(e.target.value)} required />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId='image' className='mb-3'>
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control type='text' value={image} onChange={(e) => setImage(e.target.value)} className="mb-2" placeholder="Image URL" />
                        <div className="d-flex align-items-center">
                            <Form.Control type='file' onChange={uploadFileHandler} />
                            {uploading && <span className="ms-2 text-muted"><Spinner size="sm"/> Uploading...</span>}
                        </div>
                    </Form.Group>

                    <Row>
                        <Col md={4}>
                            <Form.Group controlId='brand' className='mb-3'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control type='text' value={brand} onChange={(e) => setBrand(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId='category' className='mb-3'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control type='text' value={category} onChange={(e) => setCategory(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId='countInStock' className='mb-3'>
                                <Form.Label>Stock Quantity</Form.Label>
                                <Form.Control type='number' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId='description' className='mb-3'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as='textarea' rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </Form.Group>

                    <Button type='submit' variant='primary' className='w-100 py-2 fw-bold'>
                        <FaSave className="me-2"/> {productId ? "Update Product" : "Create Product"}
                    </Button>
                </Form>
            </Card>
          </Col>
      </Row>
    </AdminLayout>
  );
};

export default ShopProductEditScreen;