import { useState, useEffect } from 'react';
import { Form, Button, Col, Container, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../../slices/cartSlice';
import CheckoutSteps from '../../components/CheckoutSteps';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card className="p-5 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
        <CheckoutSteps step1 step2 step3 />
        <h2 className="text-center mb-4 fw-bold">Payment Method</h2>
        
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend" className="mb-3">Select Method</Form.Label>
            <Col>
              <div className="border p-3 rounded mb-2">
                  <Form.Check type="radio" label="PayPal or Credit Card" id="PayPal" name="paymentMethod" value="PayPal" checked onChange={(e) => setPaymentMethod(e.target.value)} />
              </div>
              <div className="border p-3 rounded mb-2">
                  <Form.Check type="radio" label="Cash on Delivery (COD)" id="COD" name="paymentMethod" value="COD" onChange={(e) => setPaymentMethod(e.target.value)} />
              </div>
            </Col>
          </Form.Group>

          <Button type="submit" variant="dark" className="w-100 py-2 mt-4">Continue</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default PaymentScreen;