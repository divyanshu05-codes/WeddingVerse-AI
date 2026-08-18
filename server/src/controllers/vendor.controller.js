const asyncHandler =
  require("../utils/asyncHandler");

const ApiResponse =
  require("../utils/ApiResponse");

const vendorService =
  require("../services/vendor.service");

const {
  createVendorSchema,
  updateVendorSchema,
} = require("../validators/vendor.validation");


// ======================================================
// CREATE VENDOR
// ======================================================

const createVendor =
  asyncHandler(async (req, res) => {

    const {
      error,
    } = createVendorSchema.validate(
      req.body
    );

    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map(
          (err) => ({
            field: err.path[0],
            message: err.message,
          })
        ),
      });
    }


    const vendor =
      await vendorService.createVendor(
        req.user._id,
        req.body
      );


    return res.status(201).json(
      new ApiResponse(
        201,
        vendor,
        "Vendor created successfully."
      )
    );
  });


// ======================================================
// GET VENDORS BY WEDDING
// ======================================================

const getVendorsByWedding =
  asyncHandler(async (req, res) => {

    const vendors =
      await vendorService
        .getVendorsByWedding(
          req.user._id,
          req.params.weddingId
        );


    return res.status(200).json(
      new ApiResponse(
        200,
        vendors,
        "Vendors fetched successfully."
      )
    );
  });


// ======================================================
// GET VENDOR BY ID
// ======================================================

const getVendorById =
  asyncHandler(async (req, res) => {

    const vendor =
      await vendorService.getVendorById(
        req.user._id,
        req.params.id
      );


    return res.status(200).json(
      new ApiResponse(
        200,
        vendor,
        "Vendor fetched successfully."
      )
    );
  });


// ======================================================
// UPDATE VENDOR
// ======================================================

const updateVendor =
  asyncHandler(async (req, res) => {

    const {
      error,
    } = updateVendorSchema.validate(
      req.body
    );

    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map(
          (err) => ({
            field: err.path[0],
            message: err.message,
          })
        ),
      });
    }


    const vendor =
      await vendorService.updateVendor(
        req.user._id,
        req.params.id,
        req.body
      );


    return res.status(200).json(
      new ApiResponse(
        200,
        vendor,
        "Vendor updated successfully."
      )
    );
  });


// ======================================================
// DELETE VENDOR
// ======================================================

const deleteVendor =
  asyncHandler(async (req, res) => {

    await vendorService.deleteVendor(
      req.user._id,
      req.params.id
    );


    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Vendor deleted successfully."
      )
    );
  });


module.exports = {
  createVendor,
  getVendorsByWedding,
  getVendorById,
  updateVendor,
  deleteVendor,
};