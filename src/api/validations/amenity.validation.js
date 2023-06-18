const Joi = require('joi');

module.exports = {
  // POST /v1/amenities
  createAmenity: {
    body: {
      amenityName: Joi.string()
        .required(),
    },
  },
};
