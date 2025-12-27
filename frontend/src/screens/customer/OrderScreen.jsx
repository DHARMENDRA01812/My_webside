import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button, Badge } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${orderId}`);
        setOrder(data);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching order');
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <h2 className='text-center my-5'>Loading Order...</h2>;
  if (!order) return <h2 className='text-center my-5 text-danger'>Order Not Found</h2>;

  return (
    <div className='my-4'>
      <h2 className='mb-4'>Order ID: {order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>Shipping</h3>
              <p><strong>Name: </strong> {order.user.name}</p>
              <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Badge bg="success" className='p-2'>Delivered on {order.deliveredAt.substring(0, 10)}</Badge>
              ) : (
                <Badge bg="warning" text="dark" className='p-2'>Not Delivered</Badge>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Payment Method</h3>
              <p><strong>Method: </strong> {order.paymentMethod}</p>
              {order.isPaid ? (
                <Badge bg="success" className='p-2'>Paid on {order.paidAt.substring(0, 10)}</Badge>
              ) : (
                <Badge bg="danger" className='p-2'>Not Paid</Badge>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Order Items</h3>
              {order.orderItems.length === 0 ? (
                <div className='alert alert-info'>Order is empty</div>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`} className='text-decoration-none text-dark fw-bold'>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>Items</Col><Col>₹{order.itemsPrice}</Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>Shipping</Col><Col>₹{order.shippingPrice}</Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>Tax</Col><Col>₹{order.taxPrice}</Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col><strong>Total</strong></Col><Col><strong>₹{order.totalPrice}</strong></Col></Row>
              </ListGroup.Item>
              
              {!order.isPaid && (
                  <ListGroup.Item>
                      {/* यहाँ PayPal बटन आएगा भविष्य में */}
                      <Button className='w-100 btn-dark' onClick={() => toast.info('Payment Gateway Integrated Soon!')}>
                          Pay Now (Simulated)
                      </Button>
                  </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;