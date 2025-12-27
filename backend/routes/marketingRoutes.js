const express = require('express');
const router = express.Router();
const { createCoupon, getCoupons, deleteCoupon, addBanner, getBanners, deleteBanner } = require('../controllers/marketingController');
const { protect } = require('../middleware/authMiddleware');

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) next();
    else res.status(401).json({ message: 'Admin only' });
};

// Coupon Routes
router.route('/coupons').get(getCoupons).post(protect, admin, createCoupon);
router.route('/coupons/:id').delete(protect, admin, deleteCoupon);

// Banner Routes
router.route('/banners').get(getBanners).post(protect, admin, addBanner);
router.route('/banners/:id').delete(protect, admin, deleteBanner);

module.exports = router;