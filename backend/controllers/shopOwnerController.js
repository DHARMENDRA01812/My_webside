const ShopOwnerApplication = require('../models/ShopOwnerApplication');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// सहायक फंक्शन: रैंडम पासवर्ड और 8 अंकों की रैंडम आईडी
const generateRandomPassword = () => Math.random().toString(36).slice(-8).toUpperCase();
const generateRandomEightDigits = () => Math.floor(10000000 + Math.random() * 90000000);

// 1. नई दुकान का रजिस्ट्रेशन (Public Form Submission)
const registerShopOwner = async (req, res) => {
    try {
        const files = req.files;
        const data = JSON.parse(req.body.data);

        const appExists = await ShopOwnerApplication.findOne({ email: data.email });
        if (appExists) return res.status(400).json({ message: 'इस ईमेल से आवेदन पहले ही मौजूद है।' });

        const getPath = (fieldName) => files[fieldName] ? files[fieldName][0].path : '';

        const application = new ShopOwnerApplication({
            ...data,
            photo: getPath('photo'),
            aadhaarImage: getPath('aadhaarImage'),
            panImage: getPath('panImage'),
            shopImageInside: getPath('shopImageInside'),
            shopImageOutside: getPath('shopImageOutside'),
            passbookImage: getPath('passbookImage'),
            status: 'Pending District'
        });

        await application.save();
        res.status(201).json({ message: 'आवेदन सफलतापूर्वक जमा हो गया है।' });
    } catch (error) {
        res.status(500).json({ message: 'सर्वर एरर: ' + error.message });
    }
};

// 2. सभी आवेदन देखना (Admin View)
const getAllApplications = async (req, res) => {
    try {
        const applications = await ShopOwnerApplication.find({}).sort({ createdAt: -1 });
        res.json(applications);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

// 3. फॉरवर्ड करना (District Admin Action)
const forwardApplication = async (req, res) => {
    const app = await ShopOwnerApplication.findById(req.params.id);
    if(app) {
        app.status = 'Pending System';
        await app.save();
        res.json({ message: 'सिस्टम एडमिन को भेज दिया गया है।' });
    } else { res.status(404).json({ message: 'आवेदन नहीं मिला' }); }
};

// 4. रिजेक्ट करना
const rejectApplication = async (req, res) => {
    const app = await ShopOwnerApplication.findById(req.params.id);
    if(app) {
        app.status = 'Rejected';
        await app.save();
        res.json({ message: 'आवेदन अस्वीकार कर दिया गया।' });
    } else { res.status(404).json({ message: 'आवेदन नहीं मिला' }); }
};

// 5. फाइनल अप्रूव और 8 अंकों की ID जनरेशन (System Admin Action)
const approveApplication = async (req, res) => {
    const app = await ShopOwnerApplication.findById(req.params.id);

    if (app && app.status === 'Pending System') {
        try {
            // --- ID LOGIC: SHOP + 8 Random Digits ---
            const shopLoginID = `SHOP${generateRandomEightDigits()}`;
            const randomPassword = generateRandomPassword();

            // यूजर अकाउंट बनाएं
            const newUser = await User.create({
                name: app.fullName,
                fatherName: app.fatherName,
                dob: app.dob,
                gender: app.gender,
                email: shopLoginID, // यह लॉगिन आईडी है
                personalEmail: app.email, // असली ईमेल
                password: randomPassword,
                mobile: app.mobile,
                whatsapp: app.whatsapp,
                photo: app.photo,
                aadhaarNumber: app.aadhaarNumber,
                aadhaarImage: app.aadhaarImage,
                panNumber: app.panNumber,
                panImage: app.panImage,
                isShopOwner: true,
                shopType: app.shopType,
                permanentAddress: app.permanentAddress,
                shopAddress: app.shopAddress,
                bankDetails: {
                    bankName: app.bankName,
                    accountNumber: app.accountNumber,
                    ifscCode: app.ifscCode,
                    passbookImage: app.passbookImage
                }
            });

            app.status = 'Approved';
            app.linkedUser = newUser._id;
            await app.save();

            // ईमेल भेजें
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: app.email,
                subject: 'Shop Approved - Credentials Inside',
                html: `<h3>Congratulations! Your shop is approved.</h3>
                       <p>Login ID: <b>${shopLoginID}</b></p>
                       <p>Password: <b>${randomPassword}</b></p>`
            });

            res.json({ message: `Approved! ID: ${shopLoginID}` });
        } catch (error) { res.status(500).json({ message: error.message }); }
    } else {
        res.status(400).json({ message: 'Invalid status for approval' });
    }
};

// 6. एक्टिव शॉप्स
const getActiveShops = async (req, res) => {
    try {
        const shops = await User.find({ isShopOwner: true }).select('-password');
        res.json(shops);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

// 7. प्रोफाइल अपडेट
const updateShopProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            const updated = await user.save();
            res.json(updated);
        }
    } catch (error) { res.status(500).json({ message: error.message }); }
};

// 8. सीधी शॉप बनाना (By Admin)
const createShopOwnerByAdmin = async (req, res) => {
    try {
        const shopLoginID = `SHOP${generateRandomEightDigits()}`;
        const newUser = await User.create({
            ...req.body,
            email: shopLoginID,
            isShopOwner: true
        });
        res.status(201).json({ message: 'Created', id: shopLoginID });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { 
    registerShopOwner, getAllApplications, forwardApplication, 
    rejectApplication, approveApplication, getActiveShops, 
    updateShopProfile, createShopOwnerByAdmin 
};