const express = require('express');
const router = express.Router();
const { registerStaff, getMyStaff, deleteStaff } = require('../controllers/staffController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, registerStaff).get(protect, getMyStaff);
router.route('/:id').delete(protect, deleteStaff);

module.exports = router;