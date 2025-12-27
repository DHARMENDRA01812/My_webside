const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// 1. @desc    Auth user & get token (LOGIN)
//    @route   POST /api/users/login
const authUser = async (req, res) => {
    const { email, password } = req.body; // यहाँ email का मतलब Login ID (e.g. SHOP..., DIST...) है

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email, // Login ID
                isAdmin: user.isAdmin,
                isDistrictAdmin: user.isDistrictAdmin,
                isShopOwner: user.isShopOwner,
                isStaff: user.isStaff,
                status: user.accountStatus,
            });
        } else {
            res.status(401).json({ message: 'Invalid ID or Password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. @desc    Register a new user (CUSTOMER SIGNUP)
//    @route   POST /api/users
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email, // ग्राहक के लिए यह उसका असली ईमेल होगा
            password,
            isAdmin: false,
            isDistrictAdmin: false,
            isShopOwner: false,
            isStaff: false
        });

        if (user) {
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. @desc    Logout user / clear cookie
//    @route   POST /api/users/logout
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// 4. @desc    Get all users (ADMIN ONLY)
//    @route   GET /api/users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// 5. @desc    Get user by ID (ADMIN ONLY)
//    @route   GET /api/users/:id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Invalid User ID' });
    }
};

// 6. @desc    Update user (ADMIN ONLY - Full Profile Edit)
//    @route   PUT /api/users/:id
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            // --- Basic Info ---
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.mobile = req.body.mobile || user.mobile;
            user.fatherName = req.body.fatherName || user.fatherName;
            user.dob = req.body.dob || user.dob;
            user.gender = req.body.gender || user.gender;
            
            // --- Status & Roles ---
            user.accountStatus = req.body.accountStatus || user.accountStatus;
            if (req.body.isAdmin !== undefined) user.isAdmin = req.body.isAdmin;
            if (req.body.isDistrictAdmin !== undefined) user.isDistrictAdmin = req.body.isDistrictAdmin;
            if (req.body.isShopOwner !== undefined) user.isShopOwner = req.body.isShopOwner;

            // --- District Admin Specific ---
            if (req.body.managedDistrict) user.managedDistrict = req.body.managedDistrict;

            // --- Shop Owner Specific ---
            if (req.body.shopType) user.shopType = req.body.shopType;
            if (req.body.shopName) user.shopName = req.body.shopName; // अगर स्कीमा में है

            // --- Addresses (Nested Objects) ---
            if (req.body.permanentAddress) {
                user.permanentAddress = { ...user.permanentAddress, ...req.body.permanentAddress };
            }
            if (req.body.shopAddress) {
                user.shopAddress = { ...user.shopAddress, ...req.body.shopAddress };
            }
            if (req.body.officeAddress) {
                user.officeAddress = { ...user.officeAddress, ...req.body.officeAddress };
            }

            // --- Bank Details ---
            if (req.body.bankDetails) {
                user.bankDetails = { ...user.bankDetails, ...req.body.bankDetails };
            }

            // --- Identity Numbers ---
            if (req.body.aadhaarNumber) user.aadhaarNumber = req.body.aadhaarNumber;
            if (req.body.panNumber) user.panNumber = req.body.panNumber;

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                message: "User details updated successfully"
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 7. @desc    Delete user (ADMIN ONLY)
//    @route   DELETE /api/users/:id
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            if (user.isAdmin) {
                return res.status(400).json({ message: 'Cannot delete an Admin user' });
            }
            await User.deleteOne({ _id: user._id });
            res.json({ message: 'User removed from system' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Deletion failed' });
    }
};

// 8. @desc    Admin: Force Reset Password
//    @route   PUT /api/users/:id/reset-password
const resetUserPassword = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.password = req.body.newPassword; // Pre-save hook will hash this automatically
            await user.save();
            res.json({ message: `Password reset successfully for ${user.name}` });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Password reset failed' });
    }
};

// --- Exports ---
module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    resetUserPassword // ✅ New functionality for Admin Dashboard
};