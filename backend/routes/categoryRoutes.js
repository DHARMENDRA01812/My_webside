const express = require('express');
const router = express.Router();
const { getCategories, addCategory, deleteCategory } = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');

// एडमिन चेक करने के लिए छोटा मिडलवेयर
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

router.route('/')
    .get(getCategories)
    .post(protect, admin, addCategory);

router.route('/:id')
    .delete(protect, admin, deleteCategory);

module.exports = router;