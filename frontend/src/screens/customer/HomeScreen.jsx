import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Badge, Button, Carousel, Form, InputGroup, Modal, Container } from 'react-bootstrap';
import axios from 'axios';
import { FaSearch, FaMapMarkerAlt, FaClinicMedical, FaShoppingBasket, FaLightbulb, FaTshirt } from 'react-icons/fa';

const HomeScreen = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pincode, setPincode] = useState(localStorage.getItem('userPincode') || '');
  const [showPinModal, setShowPinModal] = useState(!localStorage.getItem('userPincode'));
  const [tempPin, setTempPin] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (pincode) {
      fetchProductsByArea();
    }
  }, [pincode]);

  const fetchProductsByArea = async () => {
    try {
      const { data } = await axios.get(`/api/products?pincode=${pincode}`);
      setAllProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    let result = allProducts;
    if (searchKey) {
      result = result.filter(p => p.name.toLowerCase().includes(searchKey.toLowerCase()));
    }
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    setFilteredProducts(result);
  }, [searchKey, selectedCategory, allProducts]);

  const handlePinSubmit = () => {
    if (tempPin.length === 6) {
      localStorage.setItem('userPincode', tempPin);
      setPincode(tempPin);
      setShowPinModal(false);
    } else {
      alert("Please enter a valid 6-digit Pincode");
    }
  };

  const categories = [
    { name: 'All', icon: <FaShoppingBasket /> },
    { name: 'Grocery', icon: <FaShoppingBasket /> },
    { name: 'Electrical', icon: <FaLightbulb /> },
    { name: 'Medicine', icon: <FaClinicMedical /> },
    { name: 'Vegetables', icon: <FaShoppingBasket /> },
    { name: 'Fruits', icon: <FaShoppingBasket /> },
    { name: 'Clothes', icon: <FaTshirt /> },
    { name: 'Makeup', icon: <FaShoppingBasket /> }
  ];

  return (
    <Container fluid className="px-md-5">
      {/* --- Location Header --- */}
      <div className="d-flex justify-content-between align-items-center mb-3 bg-white p-3 shadow-sm rounded-3">
        <div className="d-flex align-items-center text-danger">
          <FaMapMarkerAlt className="me-2" />
          <span className="fw-bold text-dark">Delivering to: {pincode || 'Select Location'}</span>
        </div>
        <Button variant="outline-primary" size="sm" onClick={() => setShowPinModal(true)}>Change</Button>
      </div>

      <Carousel className="mb-4 shadow-sm rounded-4 overflow-hidden">
        <Carousel.Item style={{ height: '300px', background: '#222' }}>
          <div className="d-flex flex-column align-items-center justify-content-center h-100 text-white">
            <h1 className="fw-bold">Fresh Vegetables & Fruits</h1>
            <p>Directly from local stores to your doorstep</p>
          </div>
        </Carousel.Item>
        <Carousel.Item style={{ height: '300px', background: '#004d40' }}>
          <div className="d-flex flex-column align-items-center justify-content-center h-100 text-white">
            <h1 className="fw-bold">Electrical & Electronics</h1>
            <p>Reliable service and genuine products</p>
          </div>
        </Carousel.Item>
      </Carousel>

      {/* --- Search & Categories --- */}
      <Row className="mb-4 g-3">
        <Col md={12}>
          <InputGroup className="shadow-sm rounded-pill overflow-hidden border-0">
            <InputGroup.Text className="bg-white border-0"><FaSearch /></InputGroup.Text>
            <Form.Control 
              placeholder="Search for Grocery, Medicines, Clothes..." 
              className="border-0 py-3 shadow-none"
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={12}>
          <div className="d-flex gap-2 overflow-auto pb-2 no-scrollbar">
            {categories.map(cat => (
              <Button 
                key={cat.name} 
                variant={selectedCategory === cat.name ? "dark" : "outline-secondary"} 
                className="rounded-pill px-4 text-nowrap d-flex align-items-center"
                onClick={() => setSelectedCategory(cat.name)}
              >
                <span className="me-2">{cat.icon}</span> {cat.name}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

      {/* --- Product Grid --- */}
      <h4 className="fw-bold mb-4">Available Items In Your Area</h4>
      <Row className="g-3 g-md-4">
        {filteredProducts.length === 0 ? (
          <Col><div className="alert alert-warning text-center">No products found in this area. Try another pincode.</div></Col>
        ) : (
          filteredProducts.map((product) => (
            <Col key={product._id} xs={6} md={4} lg={3} xl={2}>
              <Card className="h-100 border-0 shadow-sm product-card rounded-4">
                <Link to={`/product/${product._id}`}>
                  <div className="p-3" style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Card.Img variant="top" src={product.image} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                  </div>
                </Link>
                <Card.Body className="p-2 pt-0">
                  <div className="text-muted small mb-1">{product.category}</div>
                  <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
                    <Card.Title as="div" className="fs-6 fw-bold mb-1 text-truncate">{product.name}</Card.Title>
                  </Link>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-success">₹{product.price}</span>
                    <Badge bg="light" text="dark" className="border small">{product.rating}★</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* --- Pincode Modal --- */}
      <Modal show={showPinModal} centered backdrop="static">
        <Modal.Body className="text-center p-5">
          <FaMapMarkerAlt size={50} className="text-danger mb-3" />
          <h3 className="fw-bold">Welcome to MyShop</h3>
          <p className="text-muted">Enter your pincode to explore materials available in your area.</p>
          <Form.Control 
            type="number" 
            placeholder="Enter 6-digit Pincode" 
            className="text-center fs-4 py-3 mb-4 rounded-4"
            onChange={(e) => setTempPin(e.target.value)}
          />
          <Button variant="primary" size="lg" className="w-100 rounded-pill py-3" onClick={handlePinSubmit}>
            See Materials
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default HomeScreen;