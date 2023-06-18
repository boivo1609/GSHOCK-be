const Joi = require('joi');

module.exports = {
  // POST /v1/amenities
  createAmenityType: {
    body: {
      amenityTypeName: Joi.string()
        .required(),
    },
  },
};
