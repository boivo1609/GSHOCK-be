const mongoose = require('mongoose');
const { MODEL, RULES, RULE } = require('../../constants/commons');

/**
 * Home Fee Schema
 * @private
 */
const homeFeeSchema = new mongoose.Schema(
  {
    customDate: {
      type: Date,
    },
    rules: [{
      type: Number,
      enum: RULES,
      default: RULE.ALL_DAYS,
    }],
    price:[{
      type:Number,
    }],
  },
  {
    timestamps: true,
  },
);

/**
 * @typedef Home
 */
module.exports = mongoose.model(MODEL.HOME_FEE, homeFeeSchema);
