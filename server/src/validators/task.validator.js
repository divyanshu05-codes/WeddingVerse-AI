const Joi = require("joi");


// ======================================================
// CREATE TASK
// ======================================================

const createTaskSchema = Joi.object({

  title: Joi.string()
    .trim()
    .min(2)
    .max(150)
    .required(),

  description: Joi.string()
    .trim()
    .max(1000)
    .allow("")
    .optional(),

  category: Joi.string()
    .valid(
      "Venue",
      "Decoration",
      "Photography",
      "Catering",
      "Guests",
      "Makeup",
      "Invitation",
      "Clothing",
      "Entertainment",
      "Transport",
      "Budget",
      "Other"
    )
    .default("Other"),

  priority: Joi.string()
    .valid(
      "Low",
      "Medium",
      "High"
    )
    .default("Medium"),

  dueDate: Joi.date()
    .allow(null)
    .optional(),

  completed: Joi.boolean()
    .default(false),

});


// ======================================================
// UPDATE TASK
// ======================================================

const updateTaskSchema = Joi.object({

  title: Joi.string()
    .trim()
    .min(2)
    .max(150),

  description: Joi.string()
    .trim()
    .max(1000)
    .allow(""),

  category: Joi.string()
    .valid(
      "Venue",
      "Decoration",
      "Photography",
      "Catering",
      "Guests",
      "Makeup",
      "Invitation",
      "Clothing",
      "Entertainment",
      "Transport",
      "Budget",
      "Other"
    ),

  priority: Joi.string()
    .valid(
      "Low",
      "Medium",
      "High"
    ),

  dueDate: Joi.date()
    .allow(null),

  completed: Joi.boolean(),

})
  .min(1);


module.exports = {
  createTaskSchema,
  updateTaskSchema,
};