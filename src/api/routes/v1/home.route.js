const express = require('express');
const validate = require('express-validation');
const { ROLE } = require('../../../constants/commons');
const controller = require('../../controllers/home.controller');
const { authorize, LOGGED_USER } = require('../../middlewares/auth');
const {
  createHome,
} = require('../../validations/home.validation');

const router = express.Router();

router.param('homeId', controller.load);


router.route('/')
  .get(controller.list)
  .post(authorize(), validate(createHome), controller.create);

router.route('/owner').get(authorize(), controller.listOwnerHomes)

router.route('/provinces').get(controller.getHomeProvinces)

router.route('/:homeId')
  .delete(authorize([ROLE.ADMIN, ROLE.HOST]), controller.delete)
  .get(controller.get)
  .put(authorize([ROLE.ADMIN, ROLE.HOST]), controller.replace)




module.exports = router;
