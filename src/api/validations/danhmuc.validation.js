const Joi = require('joi');

module.exports = {
  // POST /v1/danhmuc
  createDanhMuc: {
    body: {
      name: Joi.string().required(),
    },
  },
};
