const mongoose = require('mongoose');

const shopOwnerAppSchema = mongoose.Schema({
    fullName: { type: String, required: true },
    fatherName: { type: String, required: true },
    dob: { type: Date, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    photo: { type: String, required: true }, // Photo URL

    // Identity
    aadhaarNumber: { type: String, required: true },
    aadhaarImage: { type: String, required: true },
    panNumber: { type: String, required: true },
    panImage: { type: String, required: true },
    gstNumber: { type: String },

    // Addresses
    permanentAddress: {
        state: { type: String }, district: { type: String }, block: { type: String },
        blockCode: { type: String }, fullAddress: { type: String }, pinCode: { type: String }
    },
    currentAddress: {
        state: { type: String }, district: { type: String }, block: { type: String },
        fullAddress: { type: String }, pinCode: { type: String }
    },
    
    // Shop
    shopAddress: {
        state: { type: String }, district: { type: String }, block: { type: String },
        fullAddress: { type: String }, pinCode: { type: String }
    },
    shopImageInside: { type: String, required: true },
    shopImageOutside: { type: String, required: true },

    // Bank
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    passbookImage: { type: String, required: true },

    status: {
        type: String,
        enum: ['Pending District', 'Pending System', 'Approved', 'Rejected'],
        default: 'Pending District'
    },
    
    linkedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('ShopOwnerApplication', shopOwnerAppSchema);