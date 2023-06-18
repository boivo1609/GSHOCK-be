const httpStatus = require('http-status');
const AmenityType = require('../models/amenityType.model');

/**
 * Returns amenities
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const amenities = await AmenityType.list(req.query);
    res.json(amenities);
  } catch (error) {
    next(error);
  }
};
exports.create = async (req, res, next) => {
  try {
    const amenityType = new AmenityType(req.body);
    const savedAmenityType = await amenityType.save();
    res.status(httpStatus.CREATED);
    res.json(savedAmenityType);
  } catch (error) {
    next(error);
  }
};
