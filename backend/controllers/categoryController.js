const Category = require('../models/Category');

// @desc    Get all categories
// @route   GET /api/categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add new category
// @route   POST /api/categories
const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const exists = await Category.findOne({ name });

        if (exists) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const category = await Category.create({ name, description });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            await Category.deleteOne({ _id: category._id });
            res.json({ message: 'Category removed' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCategories, addCategory, deleteCategory };