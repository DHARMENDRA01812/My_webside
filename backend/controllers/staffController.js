const User = require('../models/User');
const nodemailer = require('nodemailer');

// @desc    Register new staff (By Shop Owner)
// @route   POST /api/staff/register
const registerStaff = async (req, res) => {
    try {
        const data = req.body; // फ्रंटएंड से आया हुआ डेटा
        const shopOwner = await User.findById(req.user._id);

        if (!shopOwner.isShopOwner) {
            return res.status(401).json({ message: 'केवल दुकान मालिक ही स्टाफ जोड़ सकते हैं।' });
        }

        // --- ID जनरेशन लॉजिक: STAF + ShopOwnerID_Last4 + Random4 ---
        const ownerIDStr = shopOwner.email; // e.g., SHOP01237584
        const lastFour = ownerIDStr.substring(ownerIDStr.length - 4);
        const randomFour = Math.floor(1000 + Math.random() * 9000);
        const staffLoginID = `STAF${lastFour}${randomFour}`;

        const randomPassword = Math.random().toString(36).slice(-8).toUpperCase();

        const newStaff = await User.create({
            name: data.fullName,
            fatherName: data.fatherName,
            dob: data.dob,
            gender: data.gender,
            mobile: data.mobile,
            whatsapp: data.whatsapp,
            alternateMobile: data.alternateMobile,
            email: staffLoginID, // लॉगिन आईडी
            personalEmail: data.email, // असली ईमेल
            password: randomPassword,
            photo: data.photo,
            aadhaarNumber: data.aadhaarNumber,
            aadhaarImage: data.aadhaarImage,
            panNumber: data.panNumber,
            panImage: data.panImage,
            educationalQualification: data.qualification,
            eduCertificate: data.eduCertificate,
            staffRole: data.role,
            staffJoiningDate: data.joiningDate,
            isStaff: true,
            parentShopOwner: req.user._id,
            permanentAddress: data.permanentAddress,
            temporaryAddress: data.temporaryAddress,
            bankDetails: data.bankDetails
        });

        // ईमेल भेजें
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: data.email,
            subject: 'Staff Login Credentials - MyShop India',
            html: `<h2>Welcome to ${shopOwner.name}'s Shop!</h2>
                   <p>Your staff account is ready.</p>
                   <p><strong>Login ID:</strong> ${staffLoginID}</p>
                   <p><strong>Password:</strong> ${randomPassword}</p>`
        });

        res.status(201).json({ message: 'स्टाफ सफलतापूर्वक रजिस्टर हुआ', staffID: staffLoginID });
    } catch (error) {
        res.status(500).json({ message: 'सर्वर एरर: ' + error.message });
    }
};

// @desc    Get all staff of logged in shop owner
const getMyStaff = async (req, res) => {
    const staffs = await User.find({ parentShopOwner: req.user._id, isStaff: true });
    res.json(staffs);
};

// @desc    Delete/Remove staff
const deleteStaff = async (req, res) => {
    const staff = await User.findById(req.params.id);
    if (staff && staff.parentShopOwner.toString() === req.user._id.toString()) {
        await User.deleteOne({ _id: staff._id });
        res.json({ message: 'स्टाफ को हटा दिया गया है' });
    } else {
        res.status(404).json({ message: 'स्टाफ नहीं मिला' });
    }
};

module.exports = { registerStaff, getMyStaff, deleteStaff };