const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    // ✅ यह लाइन सबसे महत्वपूर्ण है, इसे ध्यान से देखें
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' // <--- अगर यह नहीं होगा तो Populate काम नहीं करेगा और 500 Error आएगा
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    
    // Reviews Array
    reviews: [
        {
            name: { type: String, required: true },
            rating: { type: Number, required: true },
            comment: { type: String, required: true },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User', // <--- रिव्यु के लिए भी जरुरी है
            },
        },
    ],
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;