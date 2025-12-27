const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// --- Routes Import ---
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes'); 
const shopOwnerRoutes = require('./routes/shopOwnerRoutes');
const productRoutes = require('./routes/productRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const serviceAreaRoutes = require('./routes/serviceAreaRoutes');
const staffRoutes = require('./routes/staffRoutes');
const adminRoutes = require('./routes/adminRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const locationRoutes = require('./routes/locationRoutes');
const walletRoutes = require('./routes/walletRoutes');

// ✅ New Routes for Completed Features
const marketingRoutes = require('./routes/marketingRoutes'); // Coupons & Banners
const returnRoutes = require('./routes/returnRoutes');       // Refunds & Returns

dotenv.config();
const app = express();

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully! 🚀'))
    .catch((err) => {
        console.error('Database Connection Error:', err);
        process.exit(1); // Exit if DB fails
    });

// --- Default Route ---
app.get('/', (req, res) => {
    res.send('API is running...');
});

// --- API Routes ---
app.use('/api/products', productRoutes);      // Product Management
app.use('/api/users', userRoutes);            // Auth & User Management
app.use('/api/orders', orderRoutes);          // Order Processing
app.use('/api/shop-owner', shopOwnerRoutes);  // Shop Onboarding & Management
app.use('/api/upload', uploadRoutes);         // Image Uploads (Local)
app.use('/api/service-areas', serviceAreaRoutes); // Serviceable Pincodes
app.use('/api/staff', staffRoutes);           // Shop Staff Management
app.use('/api/admin-custom', adminRoutes);    // Special Admin Actions
app.use('/api/complaints', complaintRoutes);  // Customer Support/Tickets
app.use('/api/settings', settingsRoutes);     // Global Settings (Logo, Tax, etc.)
app.use('/api/categories', categoryRoutes);   // Product Categories
app.use('/api/locations', locationRoutes);    // State/District/Block Data
app.use('/api/wallet', walletRoutes);

// ✅ Newly Added Features Routes
app.use('/api/marketing', marketingRoutes);   // Coupons & Homepage Banners
app.use('/api/returns', returnRoutes);        // Return Requests & Refunds management

// --- Static Uploads Folder ---
// 'uploads' फोल्डर को पब्लिक करें ताकि इमेज फ्रंटेंड पर दिखें
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// --- Server Start ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));