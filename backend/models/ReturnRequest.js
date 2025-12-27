const mongoose = require('mongoose');

const returnSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Refunded'], default: 'Pending' },
    refundAmount: { type: Number },
    adminComment: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ReturnRequest', returnSchema);