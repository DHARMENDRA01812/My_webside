const express = require('express');
const router = express.Router();
const { getStates, getDistricts, getBlocks } = require('../controllers/locationController');

// ये रूट्स अब सही से काम करेंगे
router.get('/states', getStates);
router.get('/districts/:state', getDistricts);
router.get('/blocks/:district', getBlocks);

module.exports = router;