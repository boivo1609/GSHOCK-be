const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/amenity.controller');
const { createAmenity } = require('../../validations/amenity.validation');

const router = express.Router();

router.route('/')
  .get(controller.list)
  .post(validate(createAmenity), controller.create);

module.exports = router;
