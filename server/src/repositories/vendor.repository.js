const Vendor = require("../models/vendor.model");


// ======================================================
// CREATE VENDOR
// ======================================================

const createVendor = async (data) => {
  return await Vendor.create(data);
};


// ======================================================
// GET VENDORS BY WEDDING
// ======================================================

const getVendorsByWedding = async (
  weddingId
) => {
  return await Vendor.find({
    wedding: weddingId,
  }).sort({
    createdAt: -1,
  });
};


// ======================================================
// GET VENDOR BY ID
// ======================================================

const getVendorById = async (id) => {
  return await Vendor.findById(id);
};


// ======================================================
// GET VENDOR BY ID + WEDDING
// ======================================================

const getVendorByIdAndWedding =
  async (
    vendorId,
    weddingId
  ) => {

    return await Vendor.findOne({
      _id: vendorId,
      wedding: weddingId,
    });
  };


// ======================================================
// UPDATE VENDOR BY ID + WEDDING
// ======================================================

const updateVendorByIdAndWedding =
  async (
    vendorId,
    weddingId,
    data
  ) => {

    return await Vendor.findOneAndUpdate(
      {
        _id: vendorId,
        wedding: weddingId,
      },
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  };


// ======================================================
// DELETE VENDOR BY ID + WEDDING
// ======================================================

const deleteVendorByIdAndWedding =
  async (
    vendorId,
    weddingId
  ) => {

    return await Vendor.findOneAndDelete({
      _id: vendorId,
      wedding: weddingId,
    });
  };


module.exports = {
  createVendor,
  getVendorsByWedding,
  getVendorById,
  getVendorByIdAndWedding,
  updateVendorByIdAndWedding,
  deleteVendorByIdAndWedding,
};