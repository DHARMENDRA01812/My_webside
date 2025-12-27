const Settings = require('../models/Settings');

/**
 * @desc    Get system settings
 * @route   GET /api/settings
 * @access  Public
 */
const getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();

        // If no settings exist (initial setup), create a default one
        if (!settings) {
            settings = await Settings.create({
                siteName: 'MyShop India',
                siteTagline: 'Quality Materials at Your Doorstep',
                globalSupportNumber: '1800-000-0000',
                supportEmail: 'support@myshopindia.com',
                minOrderAmount: 0,
                maintenanceMode: false,
                commission: {
                    systemAdminRate: 2.0,
                    districtAdminRate: 1.0,
                    taxRate: 18.0
                }
            });
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving system settings', error: error.message });
    }
};

/**
 * @desc    Update system settings
 * @route   PUT /api/settings
 * @access  Private/Admin
 */
const updateSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();

        if (settings) {
            // --- 1. Identity & Branding ---
            settings.siteName = req.body.siteName || settings.siteName;
            settings.siteTagline = req.body.siteTagline || settings.siteTagline;
            settings.siteLogo = req.body.siteLogo || settings.siteLogo;
            settings.favicon = req.body.favicon || settings.favicon;
            settings.siteBanner = req.body.siteBanner || settings.siteBanner;

            // --- 2. Verification Assets (Signature & Stamps) ---
            settings.adminSignature = req.body.adminSignature || settings.adminSignature;
            settings.adminStamp = req.body.adminStamp || settings.adminStamp;

            // --- 3. Business Rules ---
            if (req.body.minOrderAmount !== undefined) {
                settings.minOrderAmount = req.body.minOrderAmount;
            }
            if (req.body.maintenanceMode !== undefined) {
                settings.maintenanceMode = req.body.maintenanceMode;
            }

            // --- 4. Commission & Tax Rules (✅ NEW ADDITION) ---
            if (req.body.commission) {
                settings.commission.systemAdminRate = req.body.commission.systemAdminRate !== undefined 
                    ? req.body.commission.systemAdminRate 
                    : settings.commission.systemAdminRate;

                settings.commission.districtAdminRate = req.body.commission.districtAdminRate !== undefined 
                    ? req.body.commission.districtAdminRate 
                    : settings.commission.districtAdminRate;

                settings.commission.taxRate = req.body.commission.taxRate !== undefined 
                    ? req.body.commission.taxRate 
                    : settings.commission.taxRate;
            }

            // --- 5. Help & Support ---
            settings.globalSupportNumber = req.body.globalSupportNumber || settings.globalSupportNumber;
            settings.supportEmail = req.body.supportEmail || settings.supportEmail;
            
            // District specific support numbers update
            if (req.body.districtSupport) {
                settings.districtSupport = req.body.districtSupport;
            }

            const updatedSettings = await settings.save();
            res.json(updatedSettings);
        } else {
            // Create new if somehow not found
            const newSettings = await Settings.create(req.body);
            res.status(201).json(newSettings);
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update settings', error: error.message });
    }
};

/**
 * @desc    Get support number by specific district
 * @route   GET /api/settings/support/:district
 * @access  Public
 */
const getSupportByDistrict = async (req, res) => {
    try {
        const settings = await Settings.findOne();
        if (!settings) {
            return res.status(404).json({ message: 'Settings not configured' });
        }

        // Find the specific district number in the array
        const dist = settings.districtSupport.find(
            d => d.districtName.toLowerCase() === req.params.district.toLowerCase()
        );
        
        if (dist) {
            res.json({ district: dist.districtName, number: dist.number });
        } else {
            // Fallback to global number if district specific number not set
            res.json({ district: 'Global', number: settings.globalSupportNumber });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching support contact', error: error.message });
    }
};

module.exports = { 
    getSettings, 
    updateSettings, 
    getSupportByDistrict 
};