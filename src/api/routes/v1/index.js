const express = require('express');

const userRoutes = require('./user.route');
const user1Routes = require('./user1.route');
const authRoutes = require('./auth.route');
const homeRoutes = require('./home.route');
const homeTypeRoutes = require('./homeType.route');
const provinceRoutes = require('./province.route');
const amenityRoutes = require('./amenity.route');
const amenityTypeRoutes = require('./amenityType.route');
const settingRoutes = require('./setting.route');
const danhmucRoutes = require('./danhmuc.route');
const bannerRoutes = require('./banner.route');
const colorRoutes = require('./color.route');
const productRoutes = require('./product.route');
const orderRoutes = require('./order.route');
const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));
router.use('/users1', user1Routes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/homes', homeRoutes);
router.use('/danhmuc', danhmucRoutes);
router.use('/color', colorRoutes);
router.use('/product', productRoutes);
router.use('/banner', bannerRoutes);
router.use('/homeTypes', homeTypeRoutes);
router.use('/provinces', provinceRoutes);
router.use('/amenities', amenityRoutes);
router.use('/amenityTypes', amenityTypeRoutes);
router.use('/settings', settingRoutes);
router.use('/order', orderRoutes);

module.exports = router;
