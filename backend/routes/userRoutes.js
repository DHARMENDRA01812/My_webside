const express = require('express');
const router = express.Router();
const {
    authUser,
    registerUser,
    logoutUser,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    resetUserPassword // ✅ नया कंट्रोलर फंक्शन
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

/**
 * --- मिडिलवेयर (Middleware) ---
 * 'protect' यह सुनिश्चित करता है कि यूजर लॉग-इन है।
 * 'admin' यह सुनिश्चित करता है कि यूजर सिस्टम एडमिन है।
 */
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as a system admin' });
    }
};

// --- सार्वजनिक रूट्स (PUBLIC ROUTES) ---
router.post('/', registerUser); // ग्राहक साइन-अप
router.post('/login', authUser); // यूजर लॉग-इन (Email/Login ID और Password द्वारा)
router.post('/logout', logoutUser); // यूजर लॉग-आउट

// --- सिस्टम एडमिन रूट्स (ADMIN ONLY ROUTES) ---

// 1. सभी यूजर्स की लिस्ट प्राप्त करें
router.route('/')
    .get(protect, admin, getUsers);

// 2. एडमिन द्वारा पासवर्ड रीसेट करना (सिस्टम एडमिन डैशबोर्ड के लिए)
router.route('/:id/reset-password')
    .put(protect, admin, resetUserPassword);

// 3. विशिष्ट यूजर को मैनेज करना (देखना, अपडेट करना, या डिलीट करना)
router.route('/:id')
    .get(protect, admin, getUserById)   // यूजर का विवरण देखें
    .put(protect, admin, updateUser)     // यूजर की प्रोफाइल या रोल बदलें
    .delete(protect, admin, deleteUser); // यूजर को सिस्टम से हटाएं

module.exports = router;