const mongoose = require('mongoose');

const serviceAreaSchema = mongoose.Schema({
    pincode: { type: String, required: true, unique: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    isActive: { type: Boolean, default: true }, // सर्विस चालू/बंद
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('ServiceArea', serviceAreaSchema);