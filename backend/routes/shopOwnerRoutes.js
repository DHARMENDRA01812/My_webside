const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const { 
    registerShopOwner, 
    getAllApplications, 
    forwardApplication, 
    rejectApplication, 
    approveApplication,
    getActiveShops,
    updateShopProfile,
    createShopOwnerByAdmin 
} = require('../controllers/shopOwnerController');

// Multer Setup
const upload = multer({ dest: 'uploads/' });
const uploadFields = upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'aadhaarImage', maxCount: 1 },
    { name: 'panImage', maxCount: 1 },
    { name: 'shopImageInside', maxCount: 1 },
    { name: 'shopImageOutside', maxCount: 1 },
    { name: 'passbookImage', maxCount: 1 }
]);

// Routes
router.post('/register', uploadFields, registerShopOwner);
router.get('/all', protect, getAllApplications);
router.put('/forward/:id', protect, forwardApplication);
router.put('/reject/:id', protect, rejectApplication);
router.put('/approve/:id', protect, approveApplication);
router.get('/active', protect, getActiveShops);
router.put('/profile', protect, updateShopProfile);
router.post('/create-admin', protect, createShopOwnerByAdmin);

module.exports = router;