const express = require('express');
const router = express.Router();
const { getMyWallet } = require('../controllers/walletController');
const { protect } = require('../middleware/authMiddleware');

router.route('/my').get(protect, getMyWallet);

module.exports = router;