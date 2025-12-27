const express = require('express');
const router = express.Router();
const { 
    getProducts, 
    getProductById, 
    deleteProduct, 
    updateProduct, 
    createProduct,
    getMyProducts,
    createProductReview 
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(getProducts)
    .post(protect, createProduct);

router.route('/myproducts').get(protect, getMyProducts);
router.route('/:id/reviews').post(protect, createProductReview);

router.route('/:id')
    .get(getProductById)
    .delete(protect, deleteProduct)
    .put(protect, updateProduct);

module.exports = router;