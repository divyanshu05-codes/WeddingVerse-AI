const Joi = require("joi");


// ======================================================
// PERSON SCHEMA
// ======================================================

const personSchema = Joi.object({

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

});


// ======================================================
// WEDDING DETAILS SCHEMA
// ======================================================

const weddingDetailsSchema = Joi.object({

  weddingDate: Joi.date()
    .required(),

  weddingTime: Joi.string()
    .trim()
    .required(),

  venue: Joi.string()
    .trim()
    .required(),

  city: Joi.string()
    .trim()
    .required(),

  address: Joi.string()
    .trim()
    .required(),

});


// ======================================================
// CREATE WEDDING
// ======================================================

const createWeddingSchema = Joi.object({

  bride: personSchema
    .required(),

  groom: personSchema
    .required(),

  weddingDetails: weddingDetailsSchema
    .required(),

  estimatedBudget: Joi.number()
    .min(0)
    .optional(),

  status: Joi.string()
    .valid(
      "Planning",
      "Booked",
      "Completed",
      "Cancelled"
    )
    .optional(),

  notes: Joi.string()
    .allow("")
    .optional(),

  coverImage: Joi.string()
    .allow("")
    .optional(),

});


// ======================================================
// UPDATE WEDDING
// ======================================================

const updateWeddingSchema = Joi.object({

  bride: Joi.object({

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

  }),

  groom: Joi.object({

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

  }),

  weddingDetails: Joi.object({

    weddingDate: Joi.date(),

    weddingTime: Joi.string()
      .trim(),

    venue: Joi.string()
      .trim(),

    city: Joi.string()
      .trim(),

    address: Joi.string()
      .trim(),

  }),

  estimatedBudget: Joi.number()
    .min(0),

  status: Joi.string()
    .valid(
      "Planning",
      "Booked",
      "Completed",
      "Cancelled"
    ),

  notes: Joi.string()
    .allow(""),

  coverImage: Joi.string()
    .allow(""),

})
  .min(1);


module.exports = {
  createWeddingSchema,
  updateWeddingSchema,
};