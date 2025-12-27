const express = require('express');
const router = express.Router();
const { getSettings, updateSettings, getSupportByDistrict } = require('../controllers/settingsController');
const { protect } = require('../middleware/authMiddleware');

// एडमिन चेक करने के लिए मिडलवेयर
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) next();
    else res.status(401).json({ message: 'Not authorized as an admin' });
};

router.route('/')
    .get(getSettings)
    .put(protect, admin, updateSettings);

router.get('/support/:district', getSupportByDistrict);

module.exports = router;