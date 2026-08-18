const Joi = require("joi");


// ======================================================
// VENDOR CATEGORIES
// ======================================================

const categories = [
  "Photographer",
  "Videographer",
  "Decorator",
  "Caterer",
  "Makeup",
  "DJ",
  "Band",
  "Transport",
  "Hotel",
  "Cake",
  "Jewellery",
  "Clothing",
  "Invitation",
  "Others",
];


// ======================================================
// CREATE VENDOR
// ======================================================

const createVendorSchema = Joi.object({

  wedding: Joi.string()
    .hex()
    .length(24)
    .required(),

  vendorName: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  companyName: Joi.string()
    .trim()
    .max(100)
    .allow("")
    .optional(),

  category: Joi.string()
    .valid(...categories)
    .required(),

  phone: Joi.string()
    .trim()
    .min(10)
    .max(15)
    .allow("")
    .optional(),

  email: Joi.string()
    .trim()
    .email()
    .allow("")
    .optional(),

  address: Joi.string()
    .trim()
    .max(300)
    .allow("")
    .optional(),

  totalCost: Joi.number()
    .min(0)
    .required(),

  advancePaid: Joi.number()
    .min(0)
    .default(0),

  paymentStatus: Joi.string()
    .valid(
      "Pending",
      "Partial",
      "Paid"
    )
    .default("Pending"),

  rating: Joi.number()
    .min(1)
    .max(5)
    .default(5),

  notes: Joi.string()
    .allow("")
    .optional(),

});


// ======================================================
// UPDATE VENDOR
// ======================================================

const updateVendorSchema = Joi.object({

  vendorName: Joi.string()
    .trim()
    .min(2)
    .max(100),

  companyName: Joi.string()
    .trim()
    .max(100)
    .allow(""),

  category: Joi.string()
    .valid(...categories),

  phone: Joi.string()
    .trim()
    .min(10)
    .max(15)
    .allow(""),

  email: Joi.string()
    .trim()
    .email()
    .allow(""),

  address: Joi.string()
    .trim()
    .max(300)
    .allow(""),

  totalCost: Joi.number()
    .min(0),

  advancePaid: Joi.number()
    .min(0),

  paymentStatus: Joi.string()
    .valid(
      "Pending",
      "Partial",
      "Paid"
    ),

  rating: Joi.number()
    .min(1)
    .max(5),

  notes: Joi.string()
    .allow(""),

})
  .min(1);


module.exports = {
  createVendorSchema,
  updateVendorSchema,
};