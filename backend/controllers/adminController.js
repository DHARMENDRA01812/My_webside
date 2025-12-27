const User = require('../models/User');

const generateRandomEightDigits = () => Math.floor(10000000 + Math.random() * 90000000);

// @desc    Register New District Admin
// @route   POST /api/admin-custom/district-admin
const registerDistrictAdmin = async (req, res) => {
    const data = req.body;

    try {
        // --- ID LOGIC: DIST + 8 Random Digits ---
        const distLoginID = `DIST${generateRandomEightDigits()}`;

        const userExists = await User.findOne({ email: distLoginID });
        if (userExists) return res.status(400).json({ message: 'ID Conflict, please try again.' });

        const newAdmin = await User.create({
            name: data.fullName,
            fatherName: data.fatherName,
            dob: data.dob,
            gender: data.gender,
            mobile: data.mobile,
            whatsapp: data.whatsapp,
            alternateMobile: data.alternateMobile,
            email: distLoginID, // Unique Login ID
            personalEmail: data.email, // Actual Email for communication
            password: data.password || "admin123",
            photo: data.photo,
            aadhaarNumber: data.aadhaarNumber,
            aadhaarImage: data.aadhaarImage,
            panNumber: data.panNumber,
            panImage: data.panImage,
            isDistrictAdmin: true,
            managedDistrict: data.managedDistrict,
            permanentAddress: data.permAddress,
            temporaryAddress: data.tempAddress,
            officeAddress: data.officeAddress,
            bankDetails: {
                bankName: data.bankName,
                accountNumber: data.accountNumber,
                ifscCode: data.ifscCode,
                passbookImage: data.passbookImage
            }
        });

        res.status(201).json({ 
            message: 'District Admin Registered Successfully!', 
            id: distLoginID 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

module.exports = { registerDistrictAdmin };