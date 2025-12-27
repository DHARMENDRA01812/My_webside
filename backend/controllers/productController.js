const Product = require('../models/Product');
const User = require('../models/User');

/**
 * @desc    Fetch all products (Filtered by Pincode for customers, or all for Admin)
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = async (req, res) => {
    const { pincode, category, keyword } = req.query;
    let query = {};

    try {
        // 1. यदि पिनकोड दिया गया है (ग्राहक के लिए फ़िल्टरिंग)
        if (pincode && pincode !== '') {
            const shopsInArea = await User.find({ 
                isShopOwner: true, 
                "shopAddress.pinCode": pincode 
            }).select('_id');

            const shopIds = shopsInArea.map(shop => shop._id);
            query.user = { $in: shopIds };
        }

        // 2. कीवर्ड सर्च (कीवर्ड के आधार पर नाम या विवरण में खोजना)
        if (keyword) {
            query.name = { $regex: keyword, $options: 'i' };
        }

        // 3. कैटेगरी फ़िल्टर
        if (category && category !== 'All') {
            query.category = category;
        }

        // प्रोडक्ट प्राप्त करें और दुकानदार का विवरण (नाम, ईमेल, पता) भी साथ लाएं
        const products = await Product.find(query)
            .populate('user', 'name email shopAddress shopType')
            .sort({ createdAt: -1 });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

/**
 * @desc    Fetch single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('user', 'name email shopAddress shopType mobile photo');

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Invalid Product ID' });
    }
};

/**
 * @desc    Get Shop Owner's own products
 * @route   GET /api/products/myproducts
 * @access  Private/ShopOwner
 */
const getMyProducts = async (req, res) => {
    try {
        const products = await Product.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch your products' });
    }
};

/**
 * @desc    Create a sample product (To be updated later by Shop Owner)
 * @route   POST /api/products
 * @access  Private/ShopOwner
 */
const createProduct = async (req, res) => {
    try {
        const product = new Product({
            name: 'New Product Name',
            price: 0,
            user: req.user._id, // लॉग इन यूजर को मालिक बनाएं
            image: '/images/sample.jpg',
            brand: 'Brand Name',
            category: 'Category',
            countInStock: 0,
            numReviews: 0,
            description: 'Enter product description here...',
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Product creation failed' });
    }
};

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Private/ShopOwner/Admin
 */
const updateProduct = async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            // सुरक्षा जांच: क्या यूजर स्वयं मालिक है या सिस्टम एडमिन है?
            if (product.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
                return res.status(401).json({ message: 'Not authorized to edit this product' });
            }

            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.image = image || product.image;
            product.brand = brand || product.brand;
            product.category = category || product.category;
            product.countInStock = countInStock || product.countInStock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Update failed: ' + error.message });
    }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private/ShopOwner/Admin
 */
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            // सुरक्षा जांच: क्या यूजर स्वयं मालिक है या सिस्टम एडमिन है?
            if (product.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
                return res.status(401).json({ message: 'Not authorized to delete this product' });
            }

            await Product.deleteOne({ _id: product._id });
            res.json({ message: 'Product removed from system' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Deletion failed' });
    }
};

/**
 * @desc    Create new product review
 * @route   POST /api/products/:id/reviews
 * @access  Private/Customer
 */
const createProductReview = async (req, res) => {
    const { rating, comment } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
                return res.status(400).json({ message: 'You have already reviewed this product' });
            }

            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };

            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length;

            await product.save();
            res.status(201).json({ message: 'Review added successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Review submission failed' });
    }
};

// --- Exports ---
module.exports = {
    getProducts,
    getProductById,
    getMyProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
};