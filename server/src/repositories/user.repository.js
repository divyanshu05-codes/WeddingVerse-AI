const User = require("../models/user.model");

const create = (data) => User.create(data);

const findById = (id) => User.findById(id);

const findByEmail = (email) =>
  User.findOne({ email });

const findByPhone = (phone) =>
  User.findOne({ phone });

const findByEmailWithPassword = (email) =>
  User.findOne({ email }).select("+password");

const updateById = (id, data) =>
  User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

module.exports = {
  create,
  findById,
  findByEmail,
  findByPhone,
  findByEmailWithPassword,
  updateById,
};