const express = require('express');
const router = express.Router();
const { getServiceAreas, addServiceArea, toggleServiceArea, deleteServiceArea } = require('../controllers/serviceAreaController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getServiceAreas)
    .post(protect, addServiceArea);

router.route('/:id')
    .put(protect, toggleServiceArea)
    .delete(protect, deleteServiceArea);

module.exports = router;