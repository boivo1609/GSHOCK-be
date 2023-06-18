const httpStatus = require('http-status');
const Amenity = require('../models/amenity.model');
const AmenityType = require('../models/amenityType.model');

/**
 * Returns amenities
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const amenities = await Amenity.list(req.query);
    res.json(amenities);
  } catch (error) {
    next(error);
  }
};
exports.create = async (req, res, next) => {
  try {
    const amenity = new Amenity(req.body);
    const savedAmenity = await amenity.save();
    const amenityType = await AmenityType.findById(req.body.amenityType);
    amenityType.amenities.push(amenity);
    amenityType.save();
    res.status(httpStatus.CREATED);
    res.json(savedAmenity);
  } catch (error) {
    next(error);
  }
};
