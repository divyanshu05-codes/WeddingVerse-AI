const Wedding = require("../models/wedding.model");


// ======================================================
// CREATE WEDDING
// ======================================================

const create = async (data) => {
  return await Wedding.create(data);
};


// ======================================================
// GET ALL WEDDINGS OF OWNER
// ======================================================

const findAllByOwner = async (ownerId) => {
  return await Wedding.find({
    owner: ownerId,
  }).sort({
    createdAt: -1,
  });
};


// ======================================================
// GET WEDDING BY ID
// ======================================================

const findById = async (id) => {
  return await Wedding.findById(id);
};


// ======================================================
// GET WEDDING BY ID + OWNER
// ======================================================

const findByIdAndOwner = async (
  id,
  ownerId
) => {
  return await Wedding.findOne({
    _id: id,
    owner: ownerId,
  });
};


// ======================================================
// UPDATE WEDDING BY ID + OWNER
// ======================================================

const updateByIdAndOwner = async (
  id,
  ownerId,
  data
) => {
  return await Wedding.findOneAndUpdate(
    {
      _id: id,
      owner: ownerId,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};


// ======================================================
// DELETE WEDDING BY ID + OWNER
// ======================================================

const deleteByIdAndOwner = async (
  id,
  ownerId
) => {
  return await Wedding.findOneAndDelete({
    _id: id,
    owner: ownerId,
  });
};


module.exports = {
  create,
  findAllByOwner,
  findById,
  findByIdAndOwner,
  updateByIdAndOwner,
  deleteByIdAndOwner,
};