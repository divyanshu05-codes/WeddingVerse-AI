const Joi = require("joi");


// ======================================================
// REGISTER
// ======================================================

const registerSchema = Joi.object({

  fullName: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required(),

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),

  password: Joi.string()
    .min(6)
    .required(),

  phone: Joi.string()
    .trim()
    .min(10)
    .max(15)
    .required(),

});


// ======================================================
// LOGIN
// ======================================================

const loginSchema = Joi.object({

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),

  password: Joi.string()
    .required(),

});

// ======================================================
// FORGOT PASSWORD
// ======================================================

const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),
});


// ======================================================
// RESET PASSWORD
// ======================================================

const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};