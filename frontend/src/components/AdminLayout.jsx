import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Collapse } from 'react-bootstrap';
import { logout } from '../slices/authSlice';
import { 
  FaTachometerAlt, FaBoxOpen, FaClipboardList, FaUsers, FaBullhorn, 
  FaFileAlt, FaTruck, FaCogs, FaHeadset, FaChartBar, FaSignOutAlt,
  FaAngleDown, FaAngleRight, FaLayerGroup, FaUserShield, FaStore,
  FaMoneyBillWave, // ✅ FIX: Added missing import
  FaWallet, FaExchangeAlt, FaHandHoldingUsd // Added other useful icons
} from 'react-icons/fa';

const AdminLayout = ({ children, title }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- Toggle States for Sidebar Sections ---
  const [menuState, setMenuState] = useState({
    catalog: false,
    sales: false,
    users: false,
    marketing: false,
    cms: false,
    config: false,
    support: false,
    finance: false // ✅ Added finance state
  });

  const toggleMenu = (menu) => {
    setMenuState(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="admin-fixed-wrapper">
      {/* --- SIDEBAR --- */}
      <aside className="sidebar shadow-lg custom-scroll">
        <div className="sidebar-header">
          <h4 className="m-0 text-white fw-bold">MYSHOP <span className="text-info">ADMIN</span></h4>
          <span className="badge bg-danger mt-2">SUPER PANEL</span>
        </div>

        <div className="sidebar-menu">
          
          {/* 1. DASHBOARD */}
          <Link to="/admin/dashboard" className={`sidebar-link ${isActive('/admin/dashboard')}`}>
            <FaTachometerAlt /> Dashboard
          </Link>

          {/* 2. CATALOG (Product Management) */}
          <div className={`sidebar-link cursor-pointer d-flex justify-content-between ${menuState.catalog ? 'bg-dark' : ''}`} onClick={() => toggleMenu('catalog')}>
            <span><FaBoxOpen className="me-3"/> Catalog</span>
            {menuState.catalog ? <FaAngleDown /> : <FaAngleRight />}
          </div>
          <Collapse in={menuState.catalog}>
            <div className="sidebar-dropdown">
              <Link to="/admin/products" className="sidebar-link ps-5">All Products</Link>
              <Link to="/admin/product/add" className="sidebar-link ps-5">Add Product</Link>
              <Link to="/admin/categories" className="sidebar-link ps-5">Categories & Tags</Link>
              <Link to="/admin/inventory" className="sidebar-link ps-5">Inventory Tracking</Link>
              <Link to="/admin/bulk-upload" className="sidebar-link ps-5">Bulk Upload (CSV)</Link>
            </div>
          </Collapse>

          {/* 3. SALES & ORDERS */}
          <div className={`sidebar-link cursor-pointer d-flex justify-content-between ${menuState.sales ? 'bg-dark' : ''}`} onClick={() => toggleMenu('sales')}>
            <span><FaClipboardList className="me-3"/> Sales & Orders</span>
            {menuState.sales ? <FaAngleDown /> : <FaAngleRight />}
          </div>
          <Collapse in={menuState.sales}>
            <div className="sidebar-dropdown">
              <Link to="/admin/orderlist" className="sidebar-link ps-5">All Orders</Link>
              <Link to="/admin/invoices" className="sidebar-link ps-5">Invoices</Link>
              <Link to="/admin/returns" className="sidebar-link ps-5">Refunds & Returns</Link>
              <Link to="/admin/transactions" className="sidebar-link ps-5">Payment History</Link>
            </div>
          </Collapse>

          {/* 4. USERS & VENDORS */}
          <div className={`sidebar-link cursor-pointer d-flex justify-content-between ${menuState.users ? 'bg-dark' : ''}`} onClick={() => toggleMenu('users')}>
            <span><FaUsers className="me-3"/> Users & Roles</span>
            {menuState.users ? <FaAngleDown /> : <FaAngleRight />}
          </div>
          <Collapse in={menuState.users}>
            <div className="sidebar-dropdown">
              <Link to="/admin/users" className="sidebar-link ps-5">Customer List</Link>
              <Link to="/admin/shop-requests" className="sidebar-link ps-5">Vendor Approvals</Link>
              <Link to="/admin/vendors" className="sidebar-link ps-5">Vendor Payouts</Link>
              <Link to="/admin/roles" className="sidebar-link ps-5">Role Management</Link>
              <Link to="/admin/create-district-admin" className="sidebar-link ps-5">Add Staff/Admin</Link>
            </div>
          </Collapse>

          {/* 5. FINANCE (New Section) */}
          <div className={`sidebar-link cursor-pointer d-flex justify-content-between ${menuState.finance ? 'bg-dark' : ''}`} onClick={() => toggleMenu('finance')}>
            <span><FaMoneyBillWave className="me-3"/> Finance</span>
            {menuState.finance ? <FaAngleDown /> : <FaAngleRight />}
          </div>
          <Collapse in={menuState.finance}>
            <div className="sidebar-dropdown">
              <Link to="/admin/wallet" className="sidebar-link ps-5"><FaWallet className="me-2"/> My Wallet</Link>
              <Link to="/admin/transactions" className="sidebar-link ps-5"><FaExchangeAlt className="me-2"/> Transactions</Link>
              <Link to="/admin/vendors" className="sidebar-link ps-5"><FaHandHoldingUsd className="me-2"/> Payouts</Link>
              <Link to="/admin/revenue" className="sidebar-link ps-5">Revenue Reports</Link>
            </div>
          </Collapse>

          {/* 6. MARKETING */}
          <div className={`sidebar-link cursor-pointer d-flex justify-content-between ${menuState.marketing ? 'bg-dark' : ''}`} onClick={() => toggleMenu('marketing')}>
            <span><FaBullhorn className="me-3"/> Marketing</span>
            {menuState.marketing ? <FaAngleDown /> : <FaAngleRight />}
          </div>
          <Collapse in={menuState.marketing}>
            <div className="sidebar-dropdown">
              <Link to="/admin/coupons" className="sidebar-link ps-5">Coupon Codes</Link>
              <Link to="/admin/banners" className="sidebar-link ps-5">Banners & Sliders</Link>
              <Link to="/admin/notifications" className="sidebar-link ps-5">Push & Email</Link>
            </div>
          </Collapse>

          {/* 7. CMS (Content) */}
          <div className={`sidebar-link cursor-pointer d-flex justify-content-between ${menuState.cms ? 'bg-dark' : ''}`} onClick={() => toggleMenu('cms')}>
            <span><FaFileAlt className="me-3"/> CMS</span>
            {menuState.cms ? <FaAngleDown /> : <FaAngleRight />}
          </div>
          <Collapse in={menuState.cms}>
            <div className="sidebar-dropdown">
              <Link to="/admin/pages" className="sidebar-link ps-5">Pages (About/Contact)</Link>
              <Link to="/admin/blogs" className="sidebar-link ps-5">Blog Management</Link>
              <Link to="/admin/faqs" className="sidebar-link ps-5">FAQ Manager</Link>
            </div>
          </Collapse>

          {/* 8. CONFIGURATION (Shipping, Tax, Settings) */}
          <div className={`sidebar-link cursor-pointer d-flex justify-content-between ${menuState.config ? 'bg-dark' : ''}`} onClick={() => toggleMenu('config')}>
            <span><FaCogs className="me-3"/> Configuration</span>
            {menuState.config ? <FaAngleDown /> : <FaAngleRight />}
          </div>
          <Collapse in={menuState.config}>
            <div className="sidebar-dropdown">
              <Link to="/admin/settings/general" className="sidebar-link ps-5">System Settings</Link>
              <Link to="/admin/commission" className="sidebar-link ps-5">Commission Rules</Link>
              <Link to="/admin/service-areas" className="sidebar-link ps-5">Shipping & Logistics</Link>
              <Link to="/admin/tax" className="sidebar-link ps-5">Tax (GST) Rules</Link>
              <Link to="/admin/payment-gateways" className="sidebar-link ps-5">Payment Gateways</Link>
              <Link to="/admin/backups" className="sidebar-link ps-5">Backup & Security</Link>
            </div>
          </Collapse>

          {/* 9. SUPPORT & FEEDBACK */}
          <div className={`sidebar-link cursor-pointer d-flex justify-content-between ${menuState.support ? 'bg-dark' : ''}`} onClick={() => toggleMenu('support')}>
            <span><FaHeadset className="me-3"/> Support</span>
            {menuState.support ? <FaAngleDown /> : <FaAngleRight />}
          </div>
          <Collapse in={menuState.support}>
            <div className="sidebar-dropdown">
              <Link to="/admin/reviews" className="sidebar-link ps-5">Review Moderation</Link>
              <Link to="/admin/complaints" className="sidebar-link ps-5">Support Tickets</Link>
              <Link to="/admin/chat" className="sidebar-link ps-5">Live Chat</Link>
            </div>
          </Collapse>

          {/* 10. REPORTS */}
          <Link to="/admin/reports" className={`sidebar-link ${isActive('/admin/reports')}`}>
            <FaChartBar /> Reports & Analytics
          </Link>

        </div>

        {/* LOGOUT */}
        <div className="p-3 border-top border-secondary">
          <Button variant="danger" className="w-100 fw-bold shadow-sm" onClick={logoutHandler}>
            <FaSignOutAlt className="me-2"/> LOGOUT
          </Button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="main-content">
        <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded shadow-sm">
            <div>
                <h4 className="fw-bold text-dark m-0">{title}</h4>
                <small className="text-muted">Admin Control Center</small>
            </div>
            <div className="text-end d-none d-md-block">
                <span className="badge bg-light text-dark border p-2">
                    Logged in as: <strong>{userInfo?.name}</strong>
                </span>
            </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;