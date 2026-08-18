const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validation.middleware");

const {
  createBudgetSchema,
  updateBudgetSchema,
} = require("../validators/budget.validator");

const {
  createExpense,
  getExpensesByWedding,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require("../controllers/budget.controller");

// Create Expense
router.post(
  "/",
  protect,
  validate(createBudgetSchema),
  createExpense
);

// Get Expenses By Wedding
router.get(
  "/wedding/:weddingId",
  protect,
  getExpensesByWedding
);

// Get Expense By ID
router.get(
  "/:id",
  protect,
  getExpenseById
);

// Update Expense
router.patch(
  "/:id",
  protect,
  validate(updateBudgetSchema),
  updateExpense
);

// Delete Expense
router.delete(
  "/:id",
  protect,
  deleteExpense
);

module.exports = router;