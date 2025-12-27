const mongoose = require('mongoose');

const bannerSchema = mongoose.Schema({
    title: { type: String },
    image: { type: String, required: true }, // Image URL
    link: { type: String }, // क्लिक करने पर कहाँ जाएगा
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Banner', bannerSchema);