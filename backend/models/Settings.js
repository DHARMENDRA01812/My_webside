const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema({
    // --- वेबसाइट की पहचान ---
    siteName: { type: String, default: 'MyShop India' },
    siteLogo: { type: String },
    siteBanner: { type: String },
    favicon: { type: String },
    
    // --- आधिकारिक दस्तावेज ---
    adminSignature: { type: String },
    adminStamp: { type: String },
    
    // --- बिजनेस रूल्स ---
    minOrderAmount: { type: Number, default: 0 },
    maintenanceMode: { type: Boolean, default: false },

    // ✅ NEW: कमीशन सेटिंग्स (Commission Structure)
    commission: {
        systemAdminRate: { type: Number, default: 2.0 },   // e.g., 2%
        districtAdminRate: { type: Number, default: 1.0 }, // e.g., 1%
        taxRate: { type: Number, default: 18.0 }           // e.g., 18% GST
    },
    
    // --- हेल्प और सपोर्ट ---
    globalSupportNumber: { type: String, default: '1800-XXX-XXXX' },
    supportEmail: { type: String, default: 'support@myshop.com' },
    districtSupport: [{
        districtName: String,
        number: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);