const express = require('express');
const router = express.Router();
const { createComplaint, getComplaints, resolveComplaint } = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createComplaint).get(protect, getComplaints);
router.route('/:id/resolve').put(protect, resolveComplaint);
module.exports = router;