const express = require('express');
const validate = require('express-validation');
const { ROLE } = require('../../../constants/commons');
const controller = require('../../controllers/color.controller');
const { authorize } = require('../../middlewares/auth');
const { createCoLor } = require('../../validations/color.validation');

const router = express.Router();

router
  .route('/')
  // .get(controller.listPanigate)
  .post(authorize([ROLE.ADMIN]), validate(createCoLor), controller.create);

router
  .route('/:id')
  .delete(authorize([ROLE.ADMIN]), controller.delete)
  .put(authorize([ROLE.ADMIN]), controller.update);

router.route('/search').get(controller.listPaginate);
router.route('/all').get(controller.getAllColor);
module.exports = router;
