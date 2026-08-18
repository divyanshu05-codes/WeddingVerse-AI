const express = require("express");

const router = express.Router();

const vendorController = require("../controllers/vendor.controller");

const authMiddleware = require("../middlewares/auth.middleware");

// ===============================
// Create Vendor
// POST /api/vendors
// ===============================
router.post(
  "/",
  authMiddleware,
  vendorController.createVendor
);

// ===============================
// Get Vendors By Wedding
// GET /api/vendors/wedding/:weddingId
// ===============================
router.get(
  "/wedding/:weddingId",
  authMiddleware,
  vendorController.getVendorsByWedding
);

// ===============================
// Get Vendor By ID
// GET /api/vendors/:id
// ===============================
router.get(
  "/:id",
  authMiddleware,
  vendorController.getVendorById
);

// ===============================
// Update Vendor
// PATCH /api/vendors/:id
// ===============================
router.patch(
  "/:id",
  authMiddleware,
  vendorController.updateVendor
);

// ===============================
// Delete Vendor
// DELETE /api/vendors/:id
// ===============================
router.delete(
  "/:id",
  authMiddleware,
  vendorController.deleteVendor
);

module.exports = router;