const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/province.controller');
const { createProvince } = require('../../validations/province.validation');

const router = express.Router();

router.route('/')
  .get(controller.list)
  .post(validate(createProvince), controller.create);

module.exports = router;
