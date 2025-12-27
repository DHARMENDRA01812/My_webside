const mongoose = require('mongoose');

const couponSchema = mongoose.Schema({
    code: { type: String, required: true, unique: true, uppercase: true },
    discountType: { type: String, enum: ['Percentage', 'Fixed'], required: true },
    value: { type: Number, required: true }, // जैसे 10% या ₹100
    expiryDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);