// frontend/src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

// --- COMPONENTS ---
import Header from './components/Header';
import Footer from './components/Footer';

// --- SCREENS IMPORT (CUSTOMER & PUBLIC) ---
import HomeScreen from './screens/customer/HomeScreen';
import ProductScreen from './screens/customer/ProductScreen';
import CartScreen from './screens/customer/CartScreen';
import ShippingScreen from './screens/customer/ShippingScreen';
import PaymentScreen from './screens/customer/PaymentScreen';
import PlaceOrderScreen from './screens/customer/PlaceOrderScreen';
import StoreScreen from './screens/customer/StoreScreen';
import OrderScreen from './screens/customer/OrderScreen';
import ComplaintScreen from './screens/customer/ComplaintScreen';

// --- AUTH SCREENS ---
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import ProfileScreen from './screens/auth/ProfileScreen';
import MyDocumentsScreen from './screens/auth/MyDocumentsScreen';

// --- SHOP OWNER SCREENS ---
import ShopRegisterScreen from './screens/shop/ShopRegisterScreen';
import ShopOwnerDashboard from './screens/shop/ShopOwnerDashboard';
import ShopProductListScreen from './screens/shop/ShopProductListScreen';
import ShopProductEditScreen from './screens/shop/ShopProductEditScreen';
import ShopOrderListScreen from './screens/shop/ShopOrderListScreen';
import ShopSettingsScreen from './screens/shop/ShopSettingsScreen';
import AddStaffScreen from './screens/shop/AddStaffScreen'; 
import StaffListScreen from './screens/shop/StaffRegisterScreen'; 

// --- DISTRICT ADMIN SCREENS ---
import DistrictAdminDashboard from './screens/admin/DistrictAdminDashboard';

// --- SYSTEM ADMIN SCREENS (Existing) ---
import SystemAdminDashboard from './screens/admin/SystemAdminDashboard';
import AdminShopRequestsScreen from './screens/admin/AdminShopRequestsScreen';
import DistrictActiveShops from './screens/admin/DistrictActiveShops';
import OrderListScreen from './screens/admin/OrderListScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import ServiceAreaScreen from './screens/admin/ServiceAreaScreen';
import AdminProductListScreen from './screens/admin/AdminProductListScreen';
import CategoryScreen from './screens/admin/CategoryScreen';
import RevenueScreen from './screens/admin/RevenueScreen';
import SystemReportScreen from './screens/admin/SystemReportScreen';
import GeneralSettingsScreen from './screens/admin/GeneralSettingsScreen';
import AdminRolesScreen from './screens/admin/AdminRolesScreen';
import CreateShopScreen from './screens/admin/CreateShopScreen';
import ManageComplaintsScreen from './screens/admin/ManageComplaintsScreen';
import AdminSettingsScreen from './screens/admin/AdminSettingsScreen';
import RegisterDistrictAdmin from './screens/admin/RegisterDistrictAdmin';

// --- ✅ NEW FEATURE SCREENS (Fully Linked Now) ---
import InventoryScreen from './screens/admin/InventoryScreen';
import CouponScreen from './screens/admin/CouponScreen';
import ReturnRequestsScreen from './screens/admin/ReturnRequestsScreen';
import TransactionScreen from './screens/admin/TransactionScreen';
import BulkUploadScreen from './screens/admin/BulkUploadScreen';
import InvoiceListScreen from './screens/admin/InvoiceListScreen';
import VendorPayoutScreen from './screens/admin/VendorPayoutScreen';
import BannerManagerScreen from './screens/admin/BannerManagerScreen';
import NotificationScreen from './screens/admin/NotificationScreen';
import ReviewModerationScreen from './screens/admin/ReviewModerationScreen';
import LiveChatScreen from './screens/admin/LiveChatScreen';
import TaxSettingsScreen from './screens/admin/TaxSettingsScreen';
import PlaceholderScreen from './screens/admin/PlaceholderScreen'; // बाकियों के लिए
import CommissionScreen from './screens/admin/CommissionScreen';
import WalletScreen from './screens/admin/WalletScreen';

function App() {
  return (
    <Router>
      <Header />
      <main style={{ minHeight: 'calc(100vh - 76px)', paddingTop: '76px', display: 'flex', flexDirection: 'column' }}>
          <Routes>
            {/* === PUBLIC & CUSTOMER === */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/store/:id" element={<StoreScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/support/complaint" element={<ComplaintScreen />} />
            
            {/* === AUTH === */}
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/my-documents" element={<MyDocumentsScreen />} />

            {/* === SHOP OWNER === */}
            <Route path="/shop-register" element={<ShopRegisterScreen />} />
            <Route path="/shop-dashboard" element={<ShopOwnerDashboard />} />
            <Route path="/shop/productlist" element={<ShopProductListScreen />} />
            <Route path="/shop/product/:id/edit" element={<ShopProductEditScreen />} />
            <Route path="/shop/orders" element={<ShopOrderListScreen />} />
            <Route path="/shop/settings" element={<ShopSettingsScreen />} />
            <Route path="/shop/add-staff" element={<AddStaffScreen />} />
            <Route path="/shop/staff-list" element={<StaffListScreen />} />
            
            {/* === DISTRICT ADMIN === */}
            <Route path="/district-dashboard" element={<DistrictAdminDashboard />} />

            {/* === SYSTEM ADMIN DASHBOARD ROUTES === */}
            <Route path="/admin/dashboard" element={<SystemAdminDashboard />} />
            
            {/* 1. Catalog Module */}
            <Route path="/admin/products" element={<AdminProductListScreen />} />
            <Route path="/admin/product/add" element={<ShopProductEditScreen />} /> {/* Reuse Edit Screen logic */}
            <Route path="/admin/categories" element={<CategoryScreen />} />
            <Route path="/admin/inventory" element={<InventoryScreen />} /> {/* ✅ Linked */}
            <Route path="/admin/bulk-upload" element={<BulkUploadScreen />} /> {/* ✅ Linked */}

            {/* 2. Sales & Orders Module */}
            <Route path="/admin/orderlist" element={<OrderListScreen />} />
            <Route path="/admin/returns" element={<ReturnRequestsScreen />} /> {/* ✅ Linked */}
            <Route path="/admin/transactions" element={<TransactionScreen />} /> {/* ✅ Linked */}
            <Route path="/admin/invoices" element={<InvoiceListScreen />} /> {/* ✅ Linked */}
            <Route path="/admin/commission" element={<CommissionScreen />} />

            {/* 3. Users & Vendors Module */}
            <Route path="/admin/users" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route path="/admin/shop-requests" element={<AdminShopRequestsScreen />} />
            <Route path="/admin/roles" element={<AdminRolesScreen />} />
            <Route path="/admin/create-shop" element={<CreateShopScreen />} />
            <Route path="/admin/create-district-admin" element={<RegisterDistrictAdmin />} />
            <Route path="/admin/active-shops" element={<DistrictActiveShops />} />
            <Route path="/admin/vendors" element={<VendorPayoutScreen />} /> {/* ✅ Linked */}

            {/* 4. Marketing Module */}
            <Route path="/admin/coupons" element={<CouponScreen />} /> {/* ✅ Linked */}
            <Route path="/admin/banners" element={<BannerManagerScreen />} /> {/* ✅ Linked */}
            <Route path="/admin/notifications" element={<NotificationScreen />} /> {/* ✅ Linked */}

            {/* 5. CMS & Support Module */}
            <Route path="/admin/complaints" element={<ManageComplaintsScreen />} />
            <Route path="/admin/reviews" element={<ReviewModerationScreen />} /> {/* ✅ Linked */}
            <Route path="/admin/chat" element={<LiveChatScreen />} /> {/* ✅ Linked */}
            
            {/* Placeholder CMS Pages (Until Logic is Built) */}
            <Route path="/admin/pages" element={<PlaceholderScreen title="Page CMS (About/Contact)" />} />
            <Route path="/admin/blogs" element={<PlaceholderScreen title="Blog Management" />} />
            <Route path="/admin/faqs" element={<PlaceholderScreen title="FAQ Manager" />} />

            {/* 6. Configuration & Reports Module */}
            <Route path="/admin/service-areas" element={<ServiceAreaScreen />} />
            <Route path="/admin/settings/system" element={<AdminSettingsScreen />} />
            <Route path="/admin/settings/general" element={<GeneralSettingsScreen />} />
            <Route path="/admin/revenue" element={<RevenueScreen />} />
            <Route path="/admin/reports" element={<SystemReportScreen />} />
            <Route path="/admin/tax" element={<TaxSettingsScreen />} /> {/* ✅ Linked */}
            <Route path="/admin/wallet" element={<WalletScreen />} />
            
            {/* Placeholder Configs */}
            <Route path="/admin/payment-gateways" element={<PlaceholderScreen title="Payment Gateway Settings" />} />
            <Route path="/admin/backups" element={<PlaceholderScreen title="Database Backups" />} />

          </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;