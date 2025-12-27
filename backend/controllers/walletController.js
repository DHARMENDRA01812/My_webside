const Wallet = require('../models/Wallet');
const User = require('../models/User');
const Order = require('../models/Order');

// Helper: वॉलेट में पैसा जमा करने का फंक्शन
const creditWallet = async (userId, amount, description, orderId) => {
    try {
        let wallet = await Wallet.findOne({ user: userId });
        
        // अगर वॉलेट नहीं है, तो नया बनाएं
        if (!wallet) {
            wallet = await Wallet.create({ user: userId });
        }

        // बैलेंस अपडेट करें
        wallet.balance += amount;
        wallet.totalEarned += amount;
        
        // ट्रांजेक्शन हिस्ट्री जोड़ें
        wallet.transactions.push({
            amount,
            type: 'Credit',
            description,
            orderId
        });

        await wallet.save();
        return true;
    } catch (error) {
        console.error(`Wallet Error for user ${userId}:`, error);
        return false;
    }
};

// 1. @desc   Settle Order Commission (Distribute Money)
//    @access Internal (Called by Order Controller)
const settleOrderCommission = async (orderId) => {
    try {
        const order = await Order.findById(orderId).populate('user');
        
        if (!order || order.commissionDistribution.isSettled) {
            return { success: false, message: 'Order already settled or not found' };
        }

        const { systemAdminAmount, districtAdminAmount, shopOwnerAmount } = order.commissionDistribution;

        // --- A. System Admin को पैसा दें ---
        const systemAdmin = await User.findOne({ isAdmin: true });
        if (systemAdmin && systemAdminAmount > 0) {
            await creditWallet(systemAdmin._id, systemAdminAmount, `Commission from Order #${order._id}`, order._id);
        }

        // --- B. District Admin को पैसा दें ---
        // (ऑर्डर के जिले के आधार पर डिस्ट्रिक्ट एडमिन ढूंढें)
        const districtName = order.shippingAddress.district; // सुनिश्चित करें कि ऑर्डर में जिला सेव हो रहा है
        const districtAdmin = await User.findOne({ isDistrictAdmin: true, managedDistrict: districtName });
        
        if (districtAdmin && districtAdminAmount > 0) {
            await creditWallet(districtAdmin._id, districtAdminAmount, `Commission from Order #${order._id} (${districtName})`, order._id);
        } else {
            // अगर डिस्ट्रिक्ट एडमिन नहीं मिला, तो यह पैसा सिस्टम एडमिन को दे दें (Fallback)
            if(systemAdmin) {
                await creditWallet(systemAdmin._id, districtAdminAmount, `Unclaimed District Commission #${order._id}`, order._id);
            }
        }

        // --- C. Shop Owner को पैसा दें ---
        // नोट: मल्टी-वेंडर के मामले में यह जटिल हो सकता है। 
        // अभी के लिए हम मान रहे हैं कि ऑर्डर के पहले आइटम का दुकानदार ही मुख्य है।
        // (बेहतर होगा कि हम items loop चलाएं, लेकिन अभी सरलता के लिए):
        if (order.orderItems.length > 0 && shopOwnerAmount > 0) {
            const shopOwnerId = order.orderItems[0].shopOwner; // हमने यह field Order Model में जोड़ा था
            if (shopOwnerId) {
                await creditWallet(shopOwnerId, shopOwnerAmount, `Sale Earnings from Order #${order._id}`, order._id);
            }
        }

        // --- D. ऑर्डर को Settled मार्क करें ---
        order.commissionDistribution.isSettled = true;
        await order.save();

        return { success: true };

    } catch (error) {
        console.error('Settlement Error:', error);
        return { success: false, error: error.message };
    }
};

// 2. @desc   Get My Wallet
//    @route  GET /api/wallet/my
const getMyWallet = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ user: req.user._id }).populate('transactions.orderId', 'totalPrice');
        if (!wallet) {
            return res.json({ balance: 0, totalEarned: 0, transactions: [] });
        }
        res.json(wallet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { settleOrderCommission, getMyWallet };