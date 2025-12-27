const mongoose = require('mongoose');

const staffSchema = mongoose.Schema({
    fullName: { type: String, required: true },
    shopOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    staffID: { type: String, unique: true }, // STAF + OwnerID(4) + Random(4)
    role: { 
        type: String, 
        enum: ['Packing Staff', 'Technical Staff', 'Cashier', 'Security Guard', 'Delivery Boy', 'Other'],
        required: true 
    },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    photo: { type: String },
    joiningDate: { type: Date, default: Date.now },
    status: { type: String, default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffSchema);