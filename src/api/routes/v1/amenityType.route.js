const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/amenityType.controller');
const { createAmenityType } = require('../../validations/amenityType.validation');

const router = express.Router();

router.route('/')
  .get(controller.list)
  .post(validate(createAmenityType), controller.create);

module.exports = router;
