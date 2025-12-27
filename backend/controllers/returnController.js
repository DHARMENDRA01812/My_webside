const ReturnRequest = require('../models/ReturnRequest');
const Order = require('../models/Order');

// ग्राहक द्वारा रिटर्न रिक्वेस्ट डालना
const createReturnRequest = async (req, res) => {
    const { orderId, productId, reason } = req.body;
    try {
        const returnReq = await ReturnRequest.create({
            user: req.user._id,
            order: orderId,
            product: productId,
            reason
        });
        res.status(201).json(returnReq);
    } catch (error) { res.status(500).json({ message: 'Request Failed' }); }
};

// एडमिन द्वारा सभी रिक्वेस्ट देखना
const getReturnRequests = async (req, res) => {
    const requests = await ReturnRequest.find({})
        .populate('user', 'name email')
        .populate('product', 'name price');
    res.json(requests);
};

// एडमिन द्वारा स्टेटस अपडेट करना (Approve/Reject)
const updateReturnStatus = async (req, res) => {
    const { status, adminComment } = req.body;
    try {
        const request = await ReturnRequest.findById(req.params.id);
        if (request) {
            request.status = status;
            request.adminComment = adminComment;
            await request.save();
            res.json({ message: `Return request ${status}` });
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { createReturnRequest, getReturnRequests, updateReturnStatus };