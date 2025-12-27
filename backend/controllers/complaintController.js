const Complaint = require('../models/Complaint');

// @desc    Create new complaint
// @route   POST /api/complaints
const createComplaint = async (req, res) => {
    try {
        const { subject, description, district, complaintType } = req.body;
        const complaint = await Complaint.create({
            user: req.user._id,
            subject, description, district, complaintType
        });
        res.status(201).json(complaint);
    } catch (error) {
        res.status(500).json({ message: 'शिकायत दर्ज करने में विफल' });
    }
};

// @desc    Get complaints (Admin: All, District: Specific District, User: Their own)
// @route   GET /api/complaints
const getComplaints = async (req, res) => {
    try {
        let filter = {};
        if (req.user.isDistrictAdmin) {
            filter = { district: req.user.managedDistrict };
        } else if (!req.user.isAdmin) {
            filter = { user: req.user._id };
        }
        
        const complaints = await Complaint.find(filter).populate('user', 'name email mobile');
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Resolve complaint (Update Status)
// @route   PUT /api/complaints/:id/resolve
const resolveComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (complaint) {
            complaint.status = req.body.status || 'Resolved';
            complaint.resolutionNotes = req.body.notes;
            const updated = await complaint.save();
            res.json(updated);
        } else {
            res.status(404).json({ message: 'शिकायत नहीं मिली' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createComplaint, getComplaints, resolveComplaint };