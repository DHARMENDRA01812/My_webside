const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    state: { type: String, required: true },
    district: { type: String, required: true },
    block: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Location', locationSchema);