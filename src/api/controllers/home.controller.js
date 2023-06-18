const httpStatus = require('http-status');
const Home = require('../models/home.model');
const { omit } = require('lodash');
const { STATUS } = require('../../constants/commons');


exports.load = async (req, res, next, id) => {
  try {
    console.log("go load");
    const home = await Home.get(id);
    req.locals = { home };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Returns homes
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    console.log("query", req.query)
    const homes = await Home.list(req.query);
    res.json(homes);
  } catch (error) {
    next(error);
  }
};

exports.get = (req, res) => res.json(req.locals.home);


exports.create = async (req, res, next) => {
  try {
    req.body.owner = req.user._id;
    const home = new Home(req.body);
    const savedHome = await home.save();
    res.status(httpStatus.CREATED);
    res.json(savedHome);
  } catch (error) {
    next(error);
  }
};

exports.listOwnerHomes = async (req, res, next) => {
  try {
    const homes = await Home.listOwnerHomes(req.user, req.query);
    res.json(homes);
  } catch (error) {
    next(error);
  }
}

exports.replace = async (req, res, next) => {
  const home = Object.assign(req.locals.home, req.body);

  home.save()
    .then((savedHome) => res.json(savedHome))
    .catch((e) => next(e));
};

exports.getHomeProvinces = async (req, res, next) => {
  try {
    const provinces = await Home.find({ status: STATUS.ACTIVE }).distinct('province');
    res.json(provinces);
  } catch (error) {
    next(error);
  }
}

exports.delete = async (req, res, next) => {
  try {
    console.log("erererererere");
    const { home } = req.locals;
    const deletedHome = await Home.deleteOne(home);
    res.json(deletedHome)
  } catch (error) {
    next(error);
  }
}