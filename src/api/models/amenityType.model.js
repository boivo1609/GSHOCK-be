const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');
const { MODEL } = require('../../constants/commons');

/**
 * AmenityType Schema
 * @private
 */
const amenityTypeSchema = new mongoose.Schema(
  {
    amenityTypeName: {
      type: String,
      required: true,
      unique: true,
    },
    amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: MODEL.AMENITY }],
  },
  {
    timestamps: true,
  },
);

amenityTypeSchema.statics = {
  /**
     * List amenities in descending order of 'createdAt' timestamp.
     *
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<AmenityType[]>}
     */
  list({
    page = 1, perPage = 30, amenityTypeName,
  }) {
    const options = omitBy({ amenityTypeName }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .populate('amenities')
      .exec();
  },
};

/**
 * @typedef AmenityType
 */
module.exports = mongoose.model(MODEL.AMENITY_TYPE, amenityTypeSchema);
