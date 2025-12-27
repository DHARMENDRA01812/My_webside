import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card, Container, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import CheckoutSteps from '../../components/CheckoutSteps';
import { clearCartItems } from '../../slices/cartSlice';
import { FaTruck, FaClock } from 'react-icons/fa';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [estTime, setEstTime] = useState('');

  // Calculate Prices
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  const itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  const shippingPrice = addDecimals(itemsPrice > 500 ? 0 : 50);
  const taxPrice = addDecimals(Number((0.18 * itemsPrice).toFixed(2))); // 18% GST
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

  useEffect(() => {
    if (!cart.shippingAddress.address) navigate('/shipping');
    else if (!cart.paymentMethod) navigate('/payment');

    // Calculate Estimated Delivery Time (Standard 30 min delay)
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    setEstTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await axios.post('/api/orders', {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        deliveryTime: estTime // Send delivery time to backend
      });
      dispatch(clearCartItems());
      toast.success('Order Placed Successfully!');
      navigate(`/order/${res.data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <Container>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush" className="shadow-sm rounded bg-white p-3">
            <ListGroup.Item>
              <h4 className="fw-bold"><FaTruck className="me-2"/>Shipping Details</h4>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
              </p>
              <div className="bg-light p-2 rounded text-success fw-bold d-inline-block">
                <FaClock className="me-2"/> Expected Delivery by {estTime} Today
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="mt-3">
              <h4 className="fw-bold">Payment Method</h4>
              <strong>Method: </strong> {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item className="mt-3 border-0">
              <h4 className="fw-bold">Review Items</h4>
              {cart.cartItems.map((item, index) => (
                <Row key={index} className="align-items-center mb-2 border-bottom pb-2">
                  <Col md={2} xs={3}><Image src={item.image} alt={item.name} fluid rounded /></Col>
                  <Col><Link to={`/product/${item._id}`} className="text-decoration-none text-dark">{item.name}</Link></Col>
                  <Col md={4} xs={12} className="text-end fw-bold">{item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}</Col>
                </Row>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0 rounded-4">
            <ListGroup variant="flush">
              <ListGroup.Item><h3 className="fw-bold">Order Summary</h3></ListGroup.Item>
              <ListGroup.Item><Row><Col>Items</Col><Col>₹{itemsPrice}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col>Shipping</Col><Col>₹{shippingPrice}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col>Tax (GST)</Col><Col>₹{taxPrice}</Col></Row></ListGroup.Item>
              <ListGroup.Item><Row><Col className="fw-bold fs-4">Total</Col><Col className="fw-bold fs-4 text-primary">₹{totalPrice}</Col></Row></ListGroup.Item>
              <ListGroup.Item>
                <Button type="button" className="w-100 btn-dark py-3 fw-bold rounded-pill" onClick={placeOrderHandler}>
                  Confirm Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderScreen;