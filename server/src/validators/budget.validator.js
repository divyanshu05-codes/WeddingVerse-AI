const Joi = require("joi");


// ======================================================
// CREATE BUDGET / EXPENSE
// ======================================================

const createBudgetSchema = Joi.object({

  wedding: Joi.string()
    .required(),

  category: Joi.string()
    .valid(
      "Venue",
      "Decoration",
      "Photography",
      "Catering",
      "Entertainment",
      "Transport",
      "Makeup",
      "Invitation",
      "Clothing",
      "Jewellery",
      "Miscellaneous"
    )
    .required(),

  title: Joi.string()
    .trim()
    .required(),

  amount: Joi.number()
    .min(0)
    .required(),

  expenseDate: Joi.date()
    .required(),

  paymentStatus: Joi.string()
    .valid(
      "Paid",
      "Pending",
      "Partial"
    )
    .required(),

  notes: Joi.string()
    .allow("")
    .optional(),

});


// ======================================================
// UPDATE BUDGET / EXPENSE
// ======================================================

const updateBudgetSchema = Joi.object({

  category: Joi.string()
    .valid(
      "Venue",
      "Decoration",
      "Photography",
      "Catering",
      "Entertainment",
      "Transport",
      "Makeup",
      "Invitation",
      "Clothing",
      "Jewellery",
      "Miscellaneous"
    ),

  title: Joi.string()
    .trim(),

  amount: Joi.number()
    .min(0),

  expenseDate: Joi.date(),

  paymentStatus: Joi.string()
    .valid(
      "Paid",
      "Pending",
      "Partial"
    ),

  notes: Joi.string()
    .allow(""),

})
  .min(1);


module.exports = {
  createBudgetSchema,
  updateBudgetSchema,
};