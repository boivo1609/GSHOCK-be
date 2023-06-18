const httpStatus = require('http-status');
const Province = require('../models/province.model');

/**
 * Returns provinces
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const provinces = await Province.list(req.query);
    res.json(provinces);
  } catch (error) {
    next(error);
  }
};
exports.create = async (req, res, next) => {
  try {
    const province = new Province(req.body);
    const savedProvince = await province.save();
    res.status(httpStatus.CREATED);
    res.json(savedProvince);
  } catch (error) {
    next(error);
  }
};
