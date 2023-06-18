const Joi = require('joi');

module.exports = {
  // POST /v1/homeTypes
  createHomeType: {
    body: {
      homeTypeName: Joi.string()
        .required(),
    },
  },
};
