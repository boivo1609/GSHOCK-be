const express = require('express');
const validate = require('express-validation');
const { ROLE } = require('../../../constants/commons');
const controller = require('../../controllers/homeType.controller');
const { authorize } = require('../../middlewares/auth');
const { createHomeType } = require('../../validations/homeType.validation');

const router = express.Router();

router.param('homeTypeId', controller.load);


router.route('/')
  .get(controller.list)
  .post(validate(createHomeType), controller.create);

router.route('/:homeTypeId')
  .delete(authorize([ROLE.ADMIN, ROLE.HOST]), controller.delete)
  .get(controller.get)
  .put(authorize([ROLE.ADMIN, ROLE.HOST]), controller.update)



module.exports = router;
