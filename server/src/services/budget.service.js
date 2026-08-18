const budgetRepository =
  require("../repositories/budget.repository");

const weddingRepository =
  require("../repositories/wedding.repository");

const ApiError =
  require("../utils/ApiError");


// ======================================================
// CREATE EXPENSE
// ======================================================

const createExpense = async (
  userId,
  expenseData
) => {

  const wedding =
    await weddingRepository.findByIdAndOwner(
      expenseData.wedding,
      userId
    );

  if (!wedding) {
    throw new ApiError(
      404,
      "Wedding not found."
    );
  }

  return await budgetRepository.create(
    expenseData
  );
};


// ======================================================
// GET EXPENSES BY WEDDING
// ======================================================

const getExpensesByWedding = async (
  userId,
  weddingId
) => {

  const wedding =
    await weddingRepository.findByIdAndOwner(
      weddingId,
      userId
    );

  if (!wedding) {
    throw new ApiError(
      404,
      "Wedding not found."
    );
  }

  return await budgetRepository
    .findAllByWedding(weddingId);
};


// ======================================================
// GET EXPENSE BY ID
// ======================================================

const getExpenseById = async (
  userId,
  expenseId
) => {

  const expense =
    await budgetRepository.findById(
      expenseId
    );

  if (!expense) {
    throw new ApiError(
      404,
      "Expense not found."
    );
  }

  const wedding =
    await weddingRepository.findByIdAndOwner(
      expense.wedding,
      userId
    );

  if (!wedding) {
    throw new ApiError(
      404,
      "Expense not found."
    );
  }

  return expense;
};


// ======================================================
// UPDATE EXPENSE
// ======================================================

const updateExpense = async (
  userId,
  expenseId,
  updateData
) => {

  const expense =
    await budgetRepository.findById(
      expenseId
    );

  if (!expense) {
    throw new ApiError(
      404,
      "Expense not found."
    );
  }

  const wedding =
    await weddingRepository.findByIdAndOwner(
      expense.wedding,
      userId
    );

  if (!wedding) {
    throw new ApiError(
      404,
      "Expense not found."
    );
  }


  // Prevent moving expense to another wedding.

  if (
    updateData.wedding &&
    updateData.wedding.toString() !==
      expense.wedding.toString()
  ) {
    throw new ApiError(
      403,
      "Expense cannot be moved to another wedding."
    );
  }


  const updatedExpense =
    await budgetRepository
      .updateByIdAndWedding(
        expenseId,
        expense.wedding,
        updateData
      );

  if (!updatedExpense) {
    throw new ApiError(
      404,
      "Expense not found."
    );
  }

  return updatedExpense;
};


// ======================================================
// DELETE EXPENSE
// ======================================================

const deleteExpense = async (
  userId,
  expenseId
) => {

  const expense =
    await budgetRepository.findById(
      expenseId
    );

  if (!expense) {
    throw new ApiError(
      404,
      "Expense not found."
    );
  }

  const wedding =
    await weddingRepository.findByIdAndOwner(
      expense.wedding,
      userId
    );

  if (!wedding) {
    throw new ApiError(
      404,
      "Expense not found."
    );
  }


  const deletedExpense =
    await budgetRepository
      .deleteByIdAndWedding(
        expenseId,
        expense.wedding
      );

  if (!deletedExpense) {
    throw new ApiError(
      404,
      "Expense not found."
    );
  }

  return deletedExpense;
};


module.exports = {
  createExpense,
  getExpensesByWedding,
  getExpenseById,
  updateExpense,
  deleteExpense,
};