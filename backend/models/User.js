const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    // --- बुनियादी जानकारी (Basic Info) ---
    name: { type: String, required: true }, // पूरा नाम
    fatherName: { type: String }, // पिता का नाम
    dob: { type: Date }, // जन्मतिथि
    gender: { type: String, enum: ['Male', 'Female', 'Transgender'] }, // लिंग
    
    // --- लॉगिन और संपर्क (Login & Contact) ---
    email: { type: String, required: true, unique: true }, // यहाँ जनरेट की गई Login ID (SHOP..., STAF..., DIST...) रहेगी
    personalEmail: { type: String }, // सूचना भेजने के लिए असली ईमेल आईडी
    password: { type: String, required: true },
    mobile: { type: String }, // मोबाइल नंबर
    whatsapp: { type: String }, // व्हाट्सएप नंबर
    alternateMobile: { type: String }, // वैकल्पिक मोबाइल नंबर
    
    // --- पहचान और दस्तावेज (Identity & Documents) ---
    photo: { type: String }, // प्रोफाइल फोटो का URL
    aadhaarNumber: { type: String }, // आधार नंबर
    aadhaarImage: { type: String }, // अपलोड आधार इमेज URL
    panNumber: { type: String }, // पैन नंबर
    panImage: { type: String }, // अपलोड पैन इमेज URL
    gstNumber: { type: String }, // GST नंबर (ऑप्शनल)
    
    // --- भूमिकाएं (Roles) ---
    isAdmin: { type: Boolean, required: true, default: false }, // System Admin
    isDistrictAdmin: { type: Boolean, required: true, default: false }, // District Admin
    isShopOwner: { type: Boolean, required: true, default: false }, // Shop Owner
    isStaff: { type: Boolean, required: true, default: false }, // Staff member
    
    // --- पते का विवरण (Address Details) ---
    permanentAddress: {
        state: String, district: String, block: String, 
        fullAddress: String, pinCode: String
    },
    temporaryAddress: {
        state: String, district: String, block: String, 
        fullAddress: String, pinCode: String
    },
    
    // --- शॉप ओनर के लिए विशिष्ट (Shop Owner Specific) ---
    shopType: { type: String }, // इलेक्ट्रिकल, किराना, फल, आदि
    shopAddress: {
        state: String, district: String, block: String, 
        fullAddress: String, pinCode: String
    },
    shopPhoto: { type: String }, // दुकान की फोटो URL
    
    // --- स्टाफ के लिए विशिष्ट (Staff Specific) ---
    staffRole: { type: String }, // पद: पैकिंग स्टाफ, कैशियर, डिलेवरी बॉय, आदि
    staffJoiningDate: { type: Date }, // स्टाफ ज्वाइनिंग तिथि
    educationalQualification: { type: String }, // शैक्षणिक योग्यता
    eduCertificate: { type: String }, // योग्यता प्रमाण पत्र URL
    parentShopOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // किस दुकानदार का स्टाफ है
    
    // --- जिला एडमिन के लिए विशिष्ट (District Admin Specific) ---
    managedDistrict: { type: String, default: '' }, // कार्यक्षेत्र (जिला)
    officeAddress: {
        state: String, district: String, block: String, 
        fullAddress: String, pinCode: String
    },

    // --- बैंक विवरण (Bank Details) ---
    bankDetails: {
        bankName: String,
        accountNumber: String,
        ifscCode: String,
        passbookImage: String // पासबुक या चेक बुक की फोटो URL
    },

    // --- सिस्टम एडमिन कंट्रोल (System Admin Controls) ---
    accountStatus: { type: String, enum: ['Active', 'Inactive', 'Suspended'], default: 'Active' },
    certificateIssuedAt: { type: Date }, // सर्टिफिकेट जारी करने की तिथि
    
}, { timestamps: true });

// पासवर्ड मैच करने का मेथड
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// पासवर्ड सेव करने से पहले उसे हैश (Encrypt) करना
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;