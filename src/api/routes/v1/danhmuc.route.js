const express = require('express');
const validate = require('express-validation');
const { ROLE } = require('../../../constants/commons');
const controller = require('../../controllers/danhmuc.controller');
const { authorize } = require('../../middlewares/auth');
const { createDanhMuc } = require('../../validations/danhmuc.validation');

const router = express.Router();

router
  .route('/')
  // .get(controller.listPanigate)
  .post(authorize([ROLE.ADMIN]), validate(createDanhMuc), controller.create);

router
  .route('/:id')
  .delete(authorize([ROLE.ADMIN]), controller.delete)
  .put(authorize([ROLE.ADMIN]), controller.update);

router.route('/search').get(controller.listPaginate);
router.route('/all').get(controller.getAllCategories);
module.exports = router;
