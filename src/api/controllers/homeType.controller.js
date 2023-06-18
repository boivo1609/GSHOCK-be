const httpStatus = require('http-status');
const HomeType = require('../models/homeType.model');


exports.load = async (req, res, next, id) => {
  try {
    const homeType = await HomeType.get(id);
    req.locals = { homeType };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Returns homeTypes
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const homeTypes = await HomeType.list(req.query);
    res.json(homeTypes);
  } catch (error) {
    next(error);
  }
};
exports.create = async (req, res, next) => {
  try {
    const homeType = new HomeType(req.body);
    const savedHomeType = await homeType.save();
    res.status(httpStatus.CREATED);
    res.json(savedHomeType);
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res) => res.json(req.locals.homeType)

exports.update = async (req, res, next) => {
  const homeType = Object.assign(req.locals.homeType, req.body);

  homeType.save()
    .then((savedHomeType) => res.json(savedHomeType))
    .catch((e) => next(e));
};



exports.delete = async (req, res, next) => {
  try {
    const { homeType } = req.locals;
    const deletedHomeType = await HomeType.deleteOne(homeType);
    res.json(deletedHomeType)
  } catch (error) {
    next(error);
  }
}
