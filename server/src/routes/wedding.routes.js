const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validation.middleware");

const {
  createWeddingSchema,
  updateWeddingSchema,
} = require("../validators/wedding.validator");

const {
  createWedding,
  getAllWeddings,
  getWeddingById,
  updateWedding,
  deleteWedding,
} = require("../controllers/wedding.controller");

// Create Wedding
router.post(
  "/",
  protect,
  validate(createWeddingSchema),
  createWedding
);

// Get All Weddings
router.get("/", protect, getAllWeddings);

// Get Wedding By ID
router.get("/:id", protect, getWeddingById);

// Update Wedding
router.patch(
  "/:id",
  protect,
  validate(updateWeddingSchema),
  updateWedding
);

// Delete Wedding
router.delete("/:id", protect, deleteWedding);

module.exports = router;