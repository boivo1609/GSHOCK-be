const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');
const { MODEL } = require('../../constants/commons');

/**
 * Amenity Schema
 * @private
 */
const amenitySchema = new mongoose.Schema(
  {
    amenityName: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    amenityType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL.AMENITY_TYPE,
    },
  },
  {
    timestamps: true,
  },
);

amenitySchema.statics = {
  /**
     * List amenities in descending order of 'createdAt' timestamp.
     *
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<Amenity[]>}
     */
  list({
    page = 1, perPage = 30, amenityName,
  }) {
    const options = omitBy({ amenityName }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .populate('amenity')
      .exec();
  },
};

/**
 * @typedef Amenity
 */
module.exports = mongoose.model(MODEL.AMENITY, amenitySchema);
