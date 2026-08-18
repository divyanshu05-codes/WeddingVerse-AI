const Joi = require("joi");


// ======================================================
// CREATE GUEST
// ======================================================

const createGuestSchema = Joi.object({

  wedding: Joi.string()
    .hex()
    .length(24)
    .required(),

  fullName: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required(),

  phone: Joi.string()
    .trim()
    .min(10)
    .max(15)
    .required(),

  email: Joi.string()
    .trim()
    .email()
    .allow("")
    .optional(),

  side: Joi.string()
    .valid("Bride", "Groom")
    .default("Bride"),

  rsvpStatus: Joi.string()
    .valid(
      "Pending",
      "Accepted",
      "Declined"
    )
    .default("Pending"),

  mealPreference: Joi.string()
    .valid(
      "Veg",
      "Non-Veg",
      "Jain",
      "Vegan"
    )
    .default("Veg"),

  numberOfGuests: Joi.number()
    .integer()
    .min(1)
    .default(1),

  notes: Joi.string()
    .allow("")
    .optional(),

});


// ======================================================
// UPDATE GUEST
// ======================================================

const updateGuestSchema = Joi.object({

  fullName: Joi.string()
    .trim()
    .min(3)
    .max(50),

  phone: Joi.string()
    .trim()
    .min(10)
    .max(15),

  email: Joi.string()
    .trim()
    .email()
    .allow(""),

  side: Joi.string()
    .valid("Bride", "Groom"),

  rsvpStatus: Joi.string()
    .valid(
      "Pending",
      "Accepted",
      "Declined"
    ),

  mealPreference: Joi.string()
    .valid(
      "Veg",
      "Non-Veg",
      "Jain",
      "Vegan"
    ),

  numberOfGuests: Joi.number()
    .integer()
    .min(1),

  notes: Joi.string()
    .allow(""),

})
  .min(1);


module.exports = {
  createGuestSchema,
  updateGuestSchema,
};