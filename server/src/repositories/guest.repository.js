const Guest = require("../models/guest.model");

// ======================================================
// CREATE GUEST
// ======================================================

const create = async (guestData) => {
  return await Guest.create(guestData);
};


// ======================================================
// GET ALL GUESTS OF A WEDDING
// ======================================================

const findAllByWedding = async (weddingId) => {
  return await Guest.find({
    wedding: weddingId,
  }).sort({
    createdAt: -1,
  });
};


// ======================================================
// GET GUEST BY ID
// ======================================================

const findById = async (guestId) => {
  return await Guest.findById(guestId);
};


// ======================================================
// GET GUEST BY ID + WEDDING
// ======================================================

const findByIdAndWedding = async (
  guestId,
  weddingId
) => {
  return await Guest.findOne({
    _id: guestId,
    wedding: weddingId,
  });
};


// ======================================================
// UPDATE GUEST BY ID + WEDDING
// ======================================================

const updateByIdAndWedding = async (
  guestId,
  weddingId,
  updateData
) => {
  return await Guest.findOneAndUpdate(
    {
      _id: guestId,
      wedding: weddingId,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};


// ======================================================
// DELETE GUEST BY ID + WEDDING
// ======================================================

const deleteByIdAndWedding = async (
  guestId,
  weddingId
) => {
  return await Guest.findOneAndDelete({
    _id: guestId,
    wedding: weddingId,
  });
};


module.exports = {
  create,
  findAllByWedding,
  findById,
  findByIdAndWedding,
  updateByIdAndWedding,
  deleteByIdAndWedding,
};