import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form, Badge } from 'react-bootstrap';
import axios from 'axios';
import { addToCart } from '../../slices/cartSlice';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';

const ProductScreen = () => {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { userInfo } = useSelector((state) => state.auth);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const addToCartHandler = () => {
    if (product) {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/products/${productId}/reviews`, { rating, comment });
      toast.success('Review Submitted');
      setRating(0);
      setComment('');
      fetchProduct(); // Refresh reviews
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  if (!product) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <>
      <Link className="btn btn-light my-3" to="/">Go Back</Link>
      <Row>
        <Col md={6}><Image src={product.image || ''} alt={product.name} fluid /></Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
            <ListGroup.Item>
                <div className="d-flex align-items-center mb-2">
                    <span className="text-warning me-2">{product.rating} <FaStar/></span>
                    <span className="text-muted">({product.numReviews} reviews)</span>
                </div>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row className="align-items-center">
                    <Col xs={3}>Sold By:</Col>
                    <Col>
                        {product.user ? (
                            <Link to={`/store/${product.user._id}`} className="fw-bold text-decoration-none text-primary">
                                {product.user.name} <Badge bg="success" style={{fontSize: '0.6rem'}}>Verified</Badge>
                            </Link>
                        ) : 'Unknown'}
                    </Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row><Col>Price:</Col><Col><strong>₹{product.price}</strong></Col></Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row><Col>Status:</Col><Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col></Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control as="select" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                        {[...Array(product.countInStock).keys()].map((x) => (<option key={x + 1} value={x + 1}>{x + 1}</option>))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button className="w-100 btn-block btn-dark" type="button" disabled={product.countInStock === 0} onClick={addToCartHandler}>
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      {/* --- Reviews Section --- */}
      <Row className='my-5'>
        <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews.length === 0 && <div className='alert alert-secondary'>No Reviews</div>}
          <ListGroup variant='flush'>
            {product.reviews.map((review) => (
              <ListGroup.Item key={review._id} className="bg-light mb-2 rounded">
                <strong>{review.name}</strong>
                <div className='text-warning my-1'>{review.rating} <FaStar/></div>
                <p>{new Date(review.createdAt).toLocaleDateString()}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            
            <ListGroup.Item className="mt-4 border-0">
              <h4>Write a Customer Review</h4>
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group className='my-2' controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                      <option value=''>Select...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className='my-2' controlId='comment'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                  </Form.Group>
                  <Button disabled={loading => loading} type='submit' variant='primary'>Submit</Button>
                </Form>
              ) : (
                <div className='alert alert-warning'>Please <Link to='/login'>sign in</Link> to write a review</div>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;