const Coupon = require('../models/Coupon');
const Banner = require('../models/Banner');

// --- COUPONS ---
const createCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.create(req.body);
        res.status(201).json(coupon);
    } catch (error) { res.status(400).json({ message: 'Error creating coupon' }); }
};

const getCoupons = async (req, res) => {
    const coupons = await Coupon.find({});
    res.json(coupons);
};

const deleteCoupon = async (req, res) => {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: 'Coupon Deleted' });
};

// --- BANNERS ---
const addBanner = async (req, res) => {
    try {
        const banner = await Banner.create(req.body);
        res.status(201).json(banner);
    } catch (error) { res.status(400).json({ message: 'Error adding banner' }); }
};

const getBanners = async (req, res) => {
    const banners = await Banner.find({ isActive: true });
    res.json(banners);
};

const deleteBanner = async (req, res) => {
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Banner Deleted' });
};

module.exports = { createCoupon, getCoupons, deleteCoupon, addBanner, getBanners, deleteBanner };