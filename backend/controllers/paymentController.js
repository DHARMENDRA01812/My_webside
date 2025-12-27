// backend/controllers/paymentController.js (नया फाइल)
const Razorpay = require('razorpay');
const crypto = require('crypto');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1. ऑर्डर बनाएँ (Initiate Payment)
const createPaymentOrder = async (req, res) => {
    const options = {
        amount: req.body.amount * 100, // राशि पैसे में (Ex: 500 INR = 50000 paise)
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    try {
        const order = await instance.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
};

// 2. पेमेंट वेरीफाई करें (Verify Payment)
const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        // यहाँ Database में Order को 'Paid' अपडेट करें
        res.json({ status: "success", message: "Payment Verified" });
    } else {
        res.status(400).json({ status: "failure", message: "Invalid Signature" });
    }
};

module.exports = { createPaymentOrder, verifyPayment };