const Budget = require("../models/budget.model");

// ======================================================
// CREATE EXPENSE
// ======================================================

const create = async (data) => {
  return await Budget.create(data);
};


// ======================================================
// GET ALL EXPENSES BY WEDDING
// ======================================================

const findAllByWedding = async (weddingId) => {
  return await Budget.find({
    wedding: weddingId,
  }).sort({
    expenseDate: -1,
  });
};


// ======================================================
// GET EXPENSE BY ID
// ======================================================

const findById = async (expenseId) => {
  return await Budget.findById(expenseId);
};


// ======================================================
// GET EXPENSE BY ID + WEDDING
// ======================================================

const findByIdAndWedding = async (
  expenseId,
  weddingId
) => {
  return await Budget.findOne({
    _id: expenseId,
    wedding: weddingId,
  });
};


// ======================================================
// UPDATE EXPENSE BY ID + WEDDING
// ======================================================

const updateByIdAndWedding = async (
  expenseId,
  weddingId,
  updateData
) => {
  return await Budget.findOneAndUpdate(
    {
      _id: expenseId,
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
// DELETE EXPENSE BY ID + WEDDING
// ======================================================

const deleteByIdAndWedding = async (
  expenseId,
  weddingId
) => {
  return await Budget.findOneAndDelete({
    _id: expenseId,
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