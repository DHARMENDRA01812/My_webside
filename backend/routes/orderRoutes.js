const express = require('express');
const router = express.Router();
const { 
    addOrderItems, 
    getOrderById,
    getMyOrders, 
    getShopOrders, 
    updateOrderToDelivered,
    getOrders // ✅ New Import
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// 1. Create Order & Get All Orders (Admin)
router.route('/')
    .post(protect, addOrderItems)
    .get(protect, getOrders); // ✅ getOrders Added

// 2. Get Logged In User Orders
router.route('/myorders').get(protect, getMyOrders);

// 3. Get Shop Owner Orders
router.route('/shoporders').get(protect, getShopOrders);

// 4. Update Order to Delivered
router.route('/:id/deliver').put(protect, updateOrderToDelivered);

// 5. Get Order By ID (✅ यह रूट हमेशा अंत में रखें)
router.route('/:id').get(protect, getOrderById);

module.exports = router;