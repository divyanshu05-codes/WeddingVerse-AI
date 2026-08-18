const express = require("express");

const router =
  express.Router();

// ======================================================
// MIDDLEWARES
// ======================================================

const protect =
  require("../middlewares/auth.middleware");

const optionalAuth =
  require("../middlewares/optionalAuth.middleware");

const validate =
  require("../middlewares/validation.middleware");

// ======================================================
// VALIDATORS
// ======================================================

const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("../validators/auth.validator");

// ======================================================
// CONTROLLERS
// ======================================================

const {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");

// ======================================================
// REGISTER
// ======================================================

router.post(
  "/register",
  validate(registerSchema),
  registerUser
);

// ======================================================
// LOGIN
// ======================================================

router.post(
  "/login",
  validate(loginSchema),
  loginUser
);

// ======================================================
// CURRENT USER
// ======================================================

router.get(
  "/me",
  optionalAuth,
  getProfile
);

// ======================================================
// LOGOUT
// ======================================================

router.post(
  "/logout",
  protect,
  logoutUser
);

// ======================================================
// UPDATE PROFILE
// ======================================================

router.patch(
  "/me",
  protect,
  updateProfile
);

// ======================================================
// CHANGE PASSWORD
// ======================================================

router.patch(
  "/change-password",
  protect,
  changePassword
);

// ======================================================
// FORGOT PASSWORD
// ======================================================

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPassword
);

// ======================================================
// RESET PASSWORD
// ======================================================

router.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPassword
);

module.exports = router;