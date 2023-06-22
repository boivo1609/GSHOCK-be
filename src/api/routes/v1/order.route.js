const express = require('express');

const { ROLE } = require('../../../constants/commons');
const controller = require('../../controllers/order.controller');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  // .get(controller.listPanigate)
  .post(authorize([ROLE.USER]), controller.create);

module.exports = router;
