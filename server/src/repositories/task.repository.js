const Task = require("../models/task.model");


// ======================================================
// GET ALL TASKS BY WEDDING
// ======================================================

const findAllByWedding = async (
  weddingId
) => {
  return Task.find({
    wedding: weddingId,
  }).sort({
    completed: 1,
    dueDate: 1,
    createdAt: -1,
  });
};


// ======================================================
// GET TASK BY ID
// ======================================================

const findById = async (
  taskId
) => {
  return Task.findById(taskId);
};


// ======================================================
// GET TASK BY ID + WEDDING
// ======================================================

const findByIdAndWedding = async (
  taskId,
  weddingId
) => {
  return Task.findOne({
    _id: taskId,
    wedding: weddingId,
  });
};


// ======================================================
// CREATE TASK
// ======================================================

const create = async (data) => {
  return Task.create(data);
};


// ======================================================
// UPDATE TASK BY ID + WEDDING
// ======================================================

const updateByIdAndWedding = async (
  taskId,
  weddingId,
  data
) => {
  return Task.findOneAndUpdate(
    {
      _id: taskId,
      wedding: weddingId,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};


// ======================================================
// DELETE TASK BY ID + WEDDING
// ======================================================

const deleteByIdAndWedding = async (
  taskId,
  weddingId
) => {
  return Task.findOneAndDelete({
    _id: taskId,
    wedding: weddingId,
  });
};


module.exports = {
  findAllByWedding,
  findById,
  findByIdAndWedding,
  create,
  updateByIdAndWedding,
  deleteByIdAndWedding,
};