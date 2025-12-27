import { useEffect, useState } from 'react';
import { Table, Button, Row, Col, Container, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaBoxOpen } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout'; // ✅ Admin Layout का उपयोग

const ShopProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.isShopOwner) {
      fetchMyProducts();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const fetchMyProducts = async () => {
    try {
        const { data } = await axios.get('/api/products/myproducts');
        setProducts(data);
    } catch (error) {
        toast.error('Error loading products');
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
          await axios.delete(`/api/products/${id}`);
          toast.success('Product Deleted');
          fetchMyProducts();
      } catch (error) {
          toast.error('Could not delete product');
      }
    }
  };

  const createProductHandler = async () => {
    try {
        const { data } = await axios.post('/api/products', {}); 
        toast.success('Product Created');
        navigate(`/shop/product/${data._id}/edit`);
    } catch (error) {
        toast.error('Could not create product');
    }
  };

  return (
    <AdminLayout title="My Products">
      <Row className='align-items-center mb-4'>
        <Col>
          <h3 className="fw-bold"><FaBoxOpen className="me-2"/> My Products</h3>
        </Col>
        <Col className='text-end'>
          <Button className='btn-dark' onClick={createProductHandler}>
            <FaPlus className="me-2"/> Create Product
          </Button>
        </Col>
      </Row>

      <div className="bg-white p-4 rounded shadow-sm">
        <Table striped hover responsive className='align-middle mb-0'>
            <thead className="bg-light">
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>STOCK</th>
                <th>ACTIONS</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product) => (
                <tr key={product._id}>
                <td><small className="text-muted">{product._id.substring(0,8)}...</small></td>
                <td className="fw-bold">{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                    {product.countInStock > 0 ? (
                        <Badge bg="success">{product.countInStock} In Stock</Badge>
                    ) : (
                        <Badge bg="danger">Out of Stock</Badge>
                    )}
                </td>
                <td>
                    <LinkContainer to={`/shop/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm me-2'>
                        <FaEdit className="text-primary"/>
                    </Button>
                    </LinkContainer>
                    <Button
                    variant='light'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                    >
                    <FaTrash className="text-danger"/>
                    </Button>
                </td>
                </tr>
            ))}
            {products.length === 0 && (
                <tr><td colSpan="7" className="text-center py-4">No products found. Add one now!</td></tr>
            )}
            </tbody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default ShopProductListScreen;