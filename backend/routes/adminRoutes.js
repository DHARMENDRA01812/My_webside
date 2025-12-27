const express = require('express');
const router = express.Router();
const { registerDistrictAdmin } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) next();
    else res.status(401).json({ message: 'केवल सिस्टम एडमिन के लिए' });
};

router.post('/district-admin', protect, admin, registerDistrictAdmin);
module.exports = router;