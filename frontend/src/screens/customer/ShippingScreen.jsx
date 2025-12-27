import { useState } from 'react';
import { Form, Button, Container, Card, ProgressBar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../../slices/cartSlice';
import CheckoutSteps from '../../components/CheckoutSteps';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card className="p-4 shadow-sm" style={{ maxWidth: '600px', width: '100%' }}>
        <CheckoutSteps step1 step2 />
        <h2 className="text-center mb-4 fw-bold">Shipping Address</h2>
        
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter address" value={address} required onChange={(e) => setAddress(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter city" value={city} required onChange={(e) => setCity(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control type="text" placeholder="Enter postal code" value={postalCode} required onChange={(e) => setPostalCode(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder="Enter country" value={country} required onChange={(e) => setCountry(e.target.value)} />
          </Form.Group>

          <Button type="submit" variant="dark" className="w-100 py-2 mt-3">Continue to Payment</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ShippingScreen;