const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');
const { MODEL, RULES, RULE, STATUSES, STATUS } = require('../../constants/commons');

const homeFeeSchema = new mongoose.Schema(
  {
    customDate: {
      type: Date,
    },
    rule: {
      type: Number,
      enum: RULES,
      default: RULE.ALL_DAYS,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);


/**
 * Home Schema
 * @private
 */
const homeSchema = new mongoose.Schema(
  {
    homeName: {
      type: String,
      required: true,
      index: true,
    },
    homeDescription: {
      type: String,
      required: true,
    },
    homeIntro: {
      type: String,
      required: true,
    },
    homeSize: {
      type: Number,
      required: true,
    },
    homeImages: [{ type: String, require: true }],
    district: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    apartmentNumber: {
      type: String,
      required: true,
    },
    homeRule: {
      type: String,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    kitchens: {
      type: Number,
    },
    province: {
      type: String,
      required: true,
    },
    amenities: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL.AMENITY,
    }],
    homeType: {
      type: mongoose.Schema.Types.ObjectId, ref: MODEL.HOME_TYPE,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId, ref: MODEL.USER,
    },
    status: {
      type: String,
      enum: STATUSES,
      default: STATUS.PENDING,
    },
    homeFees: [homeFeeSchema]
  },
  {
    timestamps: true,
  },
);
/**
 * Statics
 */
homeSchema.statics = {
  async get(id) {
    let home;

    if (mongoose.Types.ObjectId.isValid(id)) {
      home = await this.findById(id).exec();
    }
    if (home) {
      return home;
    }

    throw new APIError({
      message: 'Home does not exist',
      status: httpStatus.NOT_FOUND,
    });
  },  /**
   * List users in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<Home[]>}
   */
  list({
    page = 1, perPage = 30, homeName, ...ops
  }) {
    const options = omitBy({ homeName, ...ops }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .populate('owner')
      .populate('homeType')
      .exec();
  },

  listOwnerHomes(owner, {
    page = 1, perPage = 30, homeName,
  }) {
    const options = omitBy({ homeName }, isNil);
    options.owner = owner._id;
    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
};

/**
 * @typedef Home
 */
module.exports = mongoose.model(MODEL.HOME, homeSchema);
