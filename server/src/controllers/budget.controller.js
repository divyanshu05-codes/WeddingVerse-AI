const asyncHandler =
  require("../utils/asyncHandler");

const ApiResponse =
  require("../utils/ApiResponse");

const budgetService =
  require("../services/budget.service");


// ======================================================
// CREATE EXPENSE
// ======================================================

exports.createExpense =
  asyncHandler(async (req, res) => {

    const expense =
      await budgetService.createExpense(
        req.user._id,
        req.body
      );

    res.status(201).json(
      new ApiResponse(
        201,
        expense,
        "Expense created successfully."
      )
    );
  });


// ======================================================
// GET EXPENSES BY WEDDING
// ======================================================

exports.getExpensesByWedding =
  asyncHandler(async (req, res) => {

    const expenses =
      await budgetService.getExpensesByWedding(
        req.user._id,
        req.params.weddingId
      );

    res.status(200).json(
      new ApiResponse(
        200,
        expenses,
        "Expenses fetched successfully."
      )
    );
  });


// ======================================================
// GET EXPENSE BY ID
// ======================================================

exports.getExpenseById =
  asyncHandler(async (req, res) => {

    const expense =
      await budgetService.getExpenseById(
        req.user._id,
        req.params.id
      );

    res.status(200).json(
      new ApiResponse(
        200,
        expense,
        "Expense fetched successfully."
      )
    );
  });


// ======================================================
// UPDATE EXPENSE
// ======================================================

exports.updateExpense =
  asyncHandler(async (req, res) => {

    const expense =
      await budgetService.updateExpense(
        req.user._id,
        req.params.id,
        req.body
      );

    res.status(200).json(
      new ApiResponse(
        200,
        expense,
        "Expense updated successfully."
      )
    );
  });


// ======================================================
// DELETE EXPENSE
// ======================================================

exports.deleteExpense =
  asyncHandler(async (req, res) => {

    await budgetService.deleteExpense(
      req.user._id,
      req.params.id
    );

    res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Expense deleted successfully."
      )
    );
  });