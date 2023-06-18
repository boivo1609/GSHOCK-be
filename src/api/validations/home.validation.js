const Joi = require('joi');

module.exports = {
  // POST /v1/homes
  createHome: {
    body: {
      homeName: Joi.string()
        .required(),
      homeDescription: Joi.string()
        .required(),
      homeIntro: Joi.string()
        .required(),
      homeSize: Joi.number()
        .required(),
      province: Joi.string()
        .required(),
      homeType: Joi.string()
        .required(),

    },
  },
};
