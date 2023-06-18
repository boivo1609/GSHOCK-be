const Joi = require('joi');

module.exports = {
  // POST /v1/provinces
  createProvince: {
    body: {
      provinceName: Joi.string()
        .required(),
      image: Joi.string()
        .required(),
    },
  },
};
