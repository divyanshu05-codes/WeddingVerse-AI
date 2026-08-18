const vendorRepository =
  require("../repositories/vendor.repository");

const weddingRepository =
  require("../repositories/wedding.repository");

const ApiError =
  require("../utils/ApiError");


// ======================================================
// CREATE VENDOR
// ======================================================

const createVendor = async (
  userId,
  data
) => {

  const wedding =
    await weddingRepository.findByIdAndOwner(
      data.wedding,
      userId
    );

  if (!wedding) {
    throw new ApiError(
      404,
      "Wedding not found."
    );
  }


  if (
    data.advancePaid !== undefined &&
    data.totalCost !== undefined &&
    Number(data.advancePaid) >
      Number(data.totalCost)
  ) {
    throw new ApiError(
      400,
      "Advance paid cannot be greater than total cost."
    );
  }


  return await vendorRepository.createVendor(
    data
  );
};


// ======================================================
// GET VENDORS BY WEDDING
// ======================================================

const getVendorsByWedding = async (
  userId,
  weddingId
) => {

  const wedding =
    await weddingRepository.findByIdAndOwner(
      weddingId,
      userId
    );

  if (!wedding) {
    throw new ApiError(
      404,
      "Wedding not found."
    );
  }

  return await vendorRepository
    .getVendorsByWedding(weddingId);
};


// ======================================================
// GET VENDOR BY ID
// ======================================================

const getVendorById = async (
  userId,
  vendorId
) => {

  const vendor =
    await vendorRepository.getVendorById(
      vendorId
    );

  if (!vendor) {
    throw new ApiError(
      404,
      "Vendor not found."
    );
  }


  const wedding =
    await weddingRepository.findByIdAndOwner(
      vendor.wedding,
      userId
    );

  if (!wedding) {
    throw new ApiError(
      404,
      "Vendor not found."
    );
  }

  return vendor;
};


// ======================================================
// UPDATE VENDOR
// ======================================================

const updateVendor = async (
  userId,
  vendorId,
  data
) => {

  const vendor =
    await vendorRepository.getVendorById(
      vendorId
    );

  if (!vendor) {
    throw new ApiError(
      404,
      "Vendor not found."
    );
  }


  const wedding =
    await weddingRepository.findByIdAndOwner(
      vendor.wedding,
      userId
    );

  if (!wedding) {
    throw new ApiError(
      404,
      "Vendor not found."
    );
  }


  if (
    data.wedding &&
    data.wedding.toString() !==
      vendor.wedding.toString()
  ) {
    throw new ApiError(
      403,
      "Vendor cannot be moved to another wedding."
    );
  }


  const totalCost =
    data.totalCost !== undefined
      ? Number(data.totalCost)
      : Number(vendor.totalCost);

  const advancePaid =
    data.advancePaid !== undefined
      ? Number(data.advancePaid)
      : Number(vendor.advancePaid);


  if (
    advancePaid > totalCost
  ) {
    throw new ApiError(
      400,
      "Advance paid cannot be greater than total cost."
    );
  }


  const updatedVendor =
    await vendorRepository
      .updateVendorByIdAndWedding(
        vendorId,
        vendor.wedding,
        data
      );


  if (!updatedVendor) {
    throw new ApiError(
      404,
      "Vendor not found."
    );
  }

  return updatedVendor;
};


// ======================================================
// DELETE VENDOR
// ======================================================

const deleteVendor = async (
  userId,
  vendorId
) => {

  const vendor =
    await vendorRepository.getVendorById(
      vendorId
    );

  if (!vendor) {
    throw new ApiError(
      404,
      "Vendor not found."
    );
  }


  const wedding =
    await weddingRepository.findByIdAndOwner(
      vendor.wedding,
      userId
    );

  if (!wedding) {
    throw new ApiError(
      404,
      "Vendor not found."
    );
  }


  const deletedVendor =
    await vendorRepository
      .deleteVendorByIdAndWedding(
        vendorId,
        vendor.wedding
      );


  if (!deletedVendor) {
    throw new ApiError(
      404,
      "Vendor not found."
    );
  }

  return deletedVendor;
};


module.exports = {
  createVendor,
  getVendorsByWedding,
  getVendorById,
  updateVendor,
  deleteVendor,
};