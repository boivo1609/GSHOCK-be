const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');
const { MODEL } = require('../../constants/commons');

/**
 * Home Type Schema
 * @private
 */
const homeTypeSchema = new mongoose.Schema(
  {
    homeTypeName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    homes: [{ type: mongoose.Schema.Types.ObjectId, ref: MODEL.HOME }],
  },
  {
    timestamps: true,
  },
);

homeTypeSchema.statics = {
  async get(id) {
    let homeType;

    if (mongoose.Types.ObjectId.isValid(id)) {
      homeType = await this.findById(id).exec();
    }
    if (homeType) {
      return homeType;
    }

    throw new APIError({
      message: 'Home Type does not exist',
      status: httpStatus.NOT_FOUND,
    });
  },
  /**
     * List users in descending order of 'createdAt' timestamp.
     *
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<HomeType[]>}
     */
  list({
    page = 1, perPage = 30, homeTypeName,
  }) {
    const options = omitBy({ homeTypeName }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
};

/**
 * @typedef HomeType
 */
module.exports = mongoose.model(MODEL.HOME_TYPE, homeTypeSchema);
