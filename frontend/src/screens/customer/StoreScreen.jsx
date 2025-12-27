import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Container, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaStore, FaStar, FaEnvelope } from 'react-icons/fa';

const StoreScreen = () => {
  const { id } = useParams(); // Shop Owner (User) ID
  const [products, setProducts] = useState([]);
  const [shopName, setShopName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        // 1. सारे प्रोडक्ट्स लाओ
        const { data } = await axios.get('/api/products');
        
        // 2. सिर्फ इस दुकानदार के प्रोडक्ट्स फिल्टर करो
        const shopProducts = data.filter(p => p.user._id === id);
        
        setProducts(shopProducts);

        // 3. दुकानदार का नाम सेट करो (पहले प्रोडक्ट से निकाल लो)
        if (shopProducts.length > 0) {
            setShopName(shopProducts[0].user.name);
            setEmail(shopProducts[0].user.email);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchShopData();
  }, [id]);

  return (
    <Container className="my-5">
        {/* --- Shop Header Banner --- */}
        <Card className="mb-4 bg-dark text-white border-0 shadow">
            <Card.Body className="p-5 text-center">
                <FaStore size={50} className="text-warning mb-3"/>
                <h1 className="fw-bold display-5">{shopName || 'Shop Profile'}</h1>
                <p className="text-white-50"><FaEnvelope className="me-2"/> {email}</p>
                <Badge bg="warning" text="dark" className="fs-6 px-3 py-2">Verified Seller</Badge>
            </Card.Body>
        </Card>

        <h3 className="mb-4">Products from this Seller ({products.length})</h3>

        {/* --- Product Grid --- */}
        <Row>
            {products.length === 0 ? (
                <div className="alert alert-info">No products found for this shop.</div>
            ) : (
                products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                        <Card className="h-100 border-0 shadow-sm">
                            <Link to={`/product/${product._id}`}>
                                <Card.Img variant="top" src={product.image} style={{height: '200px', objectFit: 'cover'}} />
                            </Link>
                            <Card.Body>
                                <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
                                    <Card.Title as="h6" className="text-truncate">{product.name}</Card.Title>
                                </Link>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <h5 className="mb-0">₹{product.price}</h5>
                                    <div className="text-warning small">
                                        {product.rating} <FaStar/>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            )}
        </Row>
    </Container>
  );
};

export default StoreScreen;