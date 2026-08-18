const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validation.middleware");

const {
  createGuestSchema,
  updateGuestSchema
} = require("../validators/guest.validator");

const {
  createGuest,
  getGuestsByWedding,
  getGuestById,
  updateGuest,
  deleteGuest,
} = require("../controllers/guest.controller");

// Create Guest
router.post(
  "/",
  protect,
  validate(createGuestSchema),
  createGuest
);

// Get Guests of a Wedding
router.get(
  "/wedding/:weddingId",
  protect,
  getGuestsByWedding
);

// Get Guest By ID
router.get(
  "/:id",
  protect,
  getGuestById
);

// Update Guest
router.patch(
  "/:id",
  protect,
  validate(updateGuestSchema),
  updateGuest
);

// Delete Guest
router.delete(
  "/:id",
  protect,
  deleteGuest
);

module.exports = router;