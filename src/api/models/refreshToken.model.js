const mongoose = require('mongoose');
const crypto = require('crypto');
const moment = require('moment-timezone');
const { MODEL } = require('../../constants/commons');

/**
 * Refresh Token Schema
 * @private
 */
const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL.USER,
    required: true,
  },
  userEmail: {
    type: 'String',
    ref: MODEL.USER,
    required: true,
  },
  expires: { type: Date },
});

refreshTokenSchema.statics = {
  /**
   * Generate a refresh token object and saves it into the database
   *
   * @param {User} user
   * @returns {RefreshToken}
   */
  generate(user) {
    const userId = user._id;
    const userEmail = user.email;
    const token = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
    const expires = moment().add(30, 'month').toDate();
    const tokenObject = new RefreshToken({
      token,
      userId,
      userEmail,
      expires,
    });
    tokenObject.save();
    return tokenObject;
  },
};

/**
 * @typedef RefreshToken
 */
const RefreshToken = mongoose.model(MODEL.REFRESH_TOKEN, refreshTokenSchema);
module.exports = RefreshToken;
