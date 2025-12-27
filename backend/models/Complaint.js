const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    district: { type: String, required: true }, // किस क्षेत्र की शिकायत है
    complaintType: { type: String, enum: ['Service', 'Product', 'Payment', 'Staff', 'Other'], default: 'Service' },
    status: { type: String, enum: ['Open', 'In-Progress', 'Resolved', 'Closed'], default: 'Open' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    resolutionNotes: { type: String }, // समाधान के बाद एडमिन द्वारा लिखा गया नोट
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // किस एडमिन को सौंपा गया
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);