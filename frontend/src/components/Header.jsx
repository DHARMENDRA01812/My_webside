import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaHome, FaStore, FaUserShield, FaCogs } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isAdminUser = userInfo && (userInfo.isAdmin || userInfo.isDistrictAdmin);

  // Logo Link Logic
  const getHomeLink = () => {
    if (userInfo?.isDistrictAdmin) return '/district-dashboard';
    if (userInfo?.isAdmin) return '/admin/dashboard';
    if (userInfo?.isShopOwner) return '/shop-dashboard';
    return '/';
  };

  return (
    <header>
      {/* ✅ Fixed="top" हेडर को ऊपर चिपका कर रखेगा */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow-sm" style={{ height: '76px' }}>
        <Container fluid className="px-4">
          
          {/* --- 1. LEFT: LOGO & WEBSITE NAME --- */}
          <LinkContainer to={getHomeLink()}>
            <Navbar.Brand className="fw-bold d-flex align-items-center">
              <img src="/logo.png" alt="" width="35" height="35" className="me-2" />
              MyShop <span className="text-warning ms-1" style={{fontSize: '0.8rem'}}></span>
            </Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            
            {/* --- 2. CENTER: WELCOME MESSAGE (Only for Admins) --- */}
            {userInfo?.isDistrictAdmin && (
               <Nav className="mx-auto d-none d-lg-block">
                  <h5 className="text-white m-0">
                    Welcome, District Admin <Badge bg="info" text="dark" className="ms-2">Zone: Patna</Badge>
                  </h5>
               </Nav>
            )}
            
            {userInfo?.isAdmin && (
               <Nav className="mx-auto d-none d-lg-block">
                  <h5 className="text-white m-0">Welcome, System Admin</h5>
               </Nav>
            )}

            {/* --- 3. RIGHT: LINKS & PROFILE --- */}
            <Nav className={isAdminUser ? "ms-0" : "ms-auto"}> {/* अगर एडमिन है तो राईट अलाइन ऑटो न करें */}
              
              {!isAdminUser && (
                <>
                  <LinkContainer to="/"><Nav.Link><FaHome className="mb-1" /> Home</Nav.Link></LinkContainer>
                  <LinkContainer to="/cart">
                    <Nav.Link>
                      <FaShoppingCart className="mb-1" /> Cart
                      {cartItems.length > 0 && <Badge pill bg="success" style={{ marginLeft: '5px' }}>{cartItems.reduce((a, c) => a + c.qty, 0)}</Badge>}
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}

              {userInfo && userInfo.isShopOwner && (
                  <LinkContainer to="/shop-dashboard"><Nav.Link className="text-warning fw-bold">Shop Dashboard</Nav.Link></LinkContainer>
              )}

              {/* Mobile View Badge for District Admin */}
              {userInfo && userInfo.isDistrictAdmin && (
                  <div className="d-lg-none text-white my-2">Zone: Patna</div>
              )}

              {userInfo ? (
                <NavDropdown title={
                    <div className="d-inline-flex align-items-center text-white">
                        <div className="bg-secondary rounded-circle d-flex justify-content-center align-items-center me-2" style={{width:'35px', height:'35px'}}>
                            <FaUser/>
                        </div>
                        <span className="fw-bold">{userInfo.name}</span>
                    </div>
                } id="username" align="end">
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login"><Nav.Link><FaUser className="mb-1" /> Sign In</Nav.Link></LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;