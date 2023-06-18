const express = require('express');
const controller = require('../../controllers/setting.controller');

const router = express.Router();

router.route('/getSecureS3Url')
  .get(controller.getSecureS3Url)

router.route('/stripe-session').post(controller.createStripeSession)

module.exports = router;
