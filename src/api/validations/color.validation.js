const Joi = require('joi');

module.exports = {
  // POST /v1/color
  createCoLor: {
    body: {
      name: Joi.string().required(),
    },
  },
};
