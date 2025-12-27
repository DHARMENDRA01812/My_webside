const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    // --- ग्राहक की जानकारी ---
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    
    // --- ऑर्डर के सामान ---
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                required: true, 
                ref: 'Product' 
            },
            // ✅ हर आइटम का दुकानदार कौन है (Multi-vendor support)
            shopOwner: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],

    // --- शिपिंग पता ---
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        district: { type: String } // ✅ जिला जरुरी है डिस्ट्रिक्ट एडमिन को पहचानने के लिए
    },

    // --- पेमेंट डिटेल्स ---
    paymentMethod: { type: String, required: true },
    paymentResult: {
        id: { type: String },              // Razorpay Payment ID
        order_id: { type: String },        // Razorpay Order ID
        status: { type: String },
        email_address: { type: String },
        signature: { type: String }        // Razorpay Signature
    },

    // --- प्राइस ब्रेकडाउन ---
    itemsPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },

    // --- स्टेटस ---
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
    orderStatus: { type: String, default: 'Processing' }, // Processing, Shipped, Delivered, Cancelled

    // ✅ NEW: कमीशन बंटवारा (Commission Split)
    // यह बताएगा कि इस ऑर्डर से किसने कितना कमाया
    commissionDistribution: {
        systemAdminAmount: { type: Number, default: 0 }, // प्लेटफ़ॉर्म फीस
        districtAdminAmount: { type: Number, default: 0 }, // डिस्ट्रिक्ट एडमिन का हिस्सा
        shopOwnerAmount: { type: Number, default: 0 }, // दुकानदार का हिस्सा (काटने के बाद)
        isSettled: { type: Boolean, default: false } // क्या पैसा वॉलेट में गया?
    }

}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;