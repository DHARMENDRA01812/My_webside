const express = require('express');
const router = express.Router();
const { createReturnRequest, getReturnRequests, updateReturnStatus } = require('../controllers/returnController');
const { protect } = require('../middleware/authMiddleware');

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) next();
    else res.status(401).json({ message: 'Admin only' });
};

router.route('/').post(protect, createReturnRequest).get(protect, admin, getReturnRequests);
router.route('/:id').put(protect, admin, updateReturnStatus);

module.exports = router;