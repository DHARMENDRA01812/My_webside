const ServiceArea = require('../models/ServiceArea');

// @desc    Get all service areas
// @route   GET /api/service-areas
const getServiceAreas = async (req, res) => {
    const areas = await ServiceArea.find({});
    res.json(areas);
};

// @desc    Add new service area
// @route   POST /api/service-areas
const addServiceArea = async (req, res) => {
    const { pincode, district, state } = req.body;
    const areaExists = await ServiceArea.findOne({ pincode });

    if (areaExists) {
        res.status(400).json({ message: 'Pincode already exists' });
        return;
    }

    const area = await ServiceArea.create({
        pincode, district, state, createdBy: req.user._id
    });
    res.status(201).json(area);
};

// @desc    Toggle Active Status
// @route   PUT /api/service-areas/:id
const toggleServiceArea = async (req, res) => {
    const area = await ServiceArea.findById(req.params.id);
    if (area) {
        area.isActive = !area.isActive;
        await area.save();
        res.json({ message: 'Status Updated' });
    } else {
        res.status(404).json({ message: 'Area not found' });
    }
};

// @desc    Delete Service Area
// @route   DELETE /api/service-areas/:id
const deleteServiceArea = async (req, res) => {
    const area = await ServiceArea.findById(req.params.id);
    if (area) {
        await area.deleteOne();
        res.json({ message: 'Area Removed' });
    } else {
        res.status(404).json({ message: 'Area not found' });
    }
};

module.exports = { getServiceAreas, addServiceArea, toggleServiceArea, deleteServiceArea };