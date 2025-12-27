const Order = require('../models/Order');
const Product = require('../models/Product');
const Settings = require('../models/Settings'); // ✅ Settings Import
const { settleOrderCommission } = require('./walletController');

// 1. @desc    Create new order & Calculate Commission
//    @route   POST /api/orders
//    @access  Private
const addOrderItems = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    } 

    try {
        // --- 1. कमीशन रेट्स लाएं (Settings से) ---
        let settings = await Settings.findOne();
        
        // अगर सेटिंग्स नहीं मिलीं, तो डिफॉल्ट वैल्यूज का उपयोग करें
        const sysRate = settings?.commission?.systemAdminRate || 2;   // Default 2%
        const distRate = settings?.commission?.districtAdminRate || 1; // Default 1%

        // --- 2. कैलकुलेशन (Calculation) ---
        // नोट: हम कमीशन केवल 'Items Price' पर लगा रहे हैं (Tax/Shipping पर नहीं)
        const systemShare = Number(((itemsPrice * sysRate) / 100).toFixed(2));
        const districtShare = Number(((itemsPrice * distRate) / 100).toFixed(2));
        
        // दुकानदार का हिस्सा = (आइटम प्राइस + टैक्स) - (कमीशन)
        // नोट: टैक्स आमतौर पर सरकार का होता है, लेकिन यहाँ सरलता के लिए हम उसे दुकानदार को दे रहे हैं
        // जिसे बाद में दुकानदार भरेगा। या आप टैक्स को अलग रख सकते हैं।
        const shopShare = Number((itemsPrice + taxPrice - systemShare - districtShare).toFixed(2));

        // --- 3. ऑर्डर सेव करें ---
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                shopOwner: x.user, // यह फ्रंटएंड से आना चाहिए कि प्रोडक्ट किस दुकानदार का है
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            
            // ✅ कमीशन डेटा सेव करें
            commissionDistribution: {
                systemAdminAmount: systemShare,
                districtAdminAmount: districtShare,
                shopOwnerAmount: shopShare,
                isSettled: false // पैसा अभी वॉलेट में नहीं गया
            }
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);

    } catch (error) {
        res.status(500).json({ message: 'Order creation failed: ' + error.message });
    }
};

// 2. @desc    Get order by ID
//    @route   GET /api/orders/:id
//    @access  Private
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('orderItems.product', 'name image'); // Populate product details

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// 3. @desc    Get logged in user orders
//    @route   GET /api/orders/myorders
//    @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. @desc    Get orders for Shop Owner
//    @route   GET /api/orders/shoporders
//    @access  Private/ShopOwner
const getShopOrders = async (req, res) => {
    try {
        // पहले उन प्रोडक्ट्स को ढूंढें जो इस दुकानदार के हैं
        const myProducts = await Product.find({ user: req.user._id }).select('_id');
        const myProductIds = myProducts.map(p => p._id);

        // उन ऑर्डर्स को खोजें जिनमें ये प्रोडक्ट्स हैं
        const orders = await Order.find({
            'orderItems.product': { $in: myProductIds }
        })
        .populate('user', 'id name email')
        .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 5. @desc    Update order to delivered & Settle Wallet
//    @route   PUT /api/orders/:id/deliver
const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            order.orderStatus = 'Delivered';

            // अगर COD है, तो डिलीवर होते ही पेमेंट भी मान ली जाती है
            if (order.paymentMethod === 'COD' && !order.isPaid) {
                order.isPaid = true;
                order.paidAt = Date.now();
            }

            const updatedOrder = await order.save();
            
            // ✅ NEW: वॉलेट में पैसा भेजें (Settlement)
            if (order.isPaid) {
                console.log(`Settling commission for Order ${order._id}...`);
                await settleOrderCommission(order._id);
            }
            
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 6. @desc    Get all orders (System Admin)
//    @route   GET /api/orders
//    @access  Private/Admin
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user', 'id name')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    addOrderItems, 
    getOrderById,
    getMyOrders, 
    getShopOrders, 
    updateOrderToDelivered,
    getOrders
};