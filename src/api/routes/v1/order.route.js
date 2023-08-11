const express = require('express');

const { ROLE } = require('../../../constants/commons');
const controller = require('../../controllers/order.controller');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  // .get(controller.listPanigate)
  .post(authorize([ROLE.USER]), controller.create);
router.route('/search').get(controller.listPaginate);
router.route('/orderhistory').get(controller.getAllOrderByUser);
router
  .route('/duyetDonHang/:id')
  .put(authorize([ROLE.ADMIN]), controller.duyetDonHang);
router.route('/deleteorder/:id').put(controller.xoaDonHangUser);
module.exports = router;
