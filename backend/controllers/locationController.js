const Location = require('../models/Location');

// 1. सभी राज्यों की लिस्ट प्राप्त करें
const getStates = async (req, res) => {
    try {
        const states = await Location.distinct('state');
        res.json(states);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching states' });
    }
};

// 2. राज्य के आधार पर जिले प्राप्त करें
const getDistricts = async (req, res) => {
    try {
        const districts = await Location.distinct('district', { state: req.params.state });
        res.json(districts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching districts' });
    }
};

// 3. जिले के आधार पर ब्लॉक और उनके कोड प्राप्त करें
const getBlocks = async (req, res) => {
    try {
        const blocks = await Location.find({ district: req.params.district }, 'block blockCode');
        res.json(blocks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blocks' });
    }
};

// निर्यात (Exports) - यह हिस्सा चेक करें, यही एरर दे रहा था
module.exports = { 
    getStates, 
    getDistricts, 
    getBlocks 
};