const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');
const { MODEL } = require('../../constants/commons');

/**
 * Province Schema
 * @private
 */
const provinceSchema = new mongoose.Schema(
  {
    provinceName: {
      type: String,
      required: true,
      unique: true,

    },
    image: {
      type: String,
      required: true,
    },
    homes: [{ type: mongoose.Schema.Types.ObjectId, ref: MODEL.HOME }],
  },
  {
    timestamps: true,
  },
);

provinceSchema.statics = {
  /**
     * List users in descending order of 'createdAt' timestamp.
     *
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<Province[]>}
     */
  list({
    page = 1, perPage = 30, provinceName,
  }) {
    const options = omitBy({ provinceName }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
};

/**
 * @typedef Province
 */
module.exports = mongoose.model(MODEL.PROVINCE, provinceSchema);
