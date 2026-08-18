const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const weddingService = require("../services/wedding.service");

// Create Wedding
exports.createWedding = asyncHandler(async (req, res) => {
  const wedding = await weddingService.createWedding(
    req.user._id,
    req.body
  );

  res.status(201).json(
    new ApiResponse(
      201,
      wedding,
      "Wedding created successfully."
    )
  );
});

// Get All Weddings
exports.getAllWeddings = asyncHandler(async (req, res) => {
  const weddings = await weddingService.getAllWeddings(
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      weddings,
      "Weddings fetched successfully."
    )
  );
});

// Get Wedding By ID
exports.getWeddingById = asyncHandler(async (req, res) => {
  const wedding = await weddingService.getWeddingById(
    req.user._id,
    req.params.id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      wedding,
      "Wedding fetched successfully."
    )
  );
});

// Update Wedding
exports.updateWedding = asyncHandler(async (req, res) => {
  const wedding = await weddingService.updateWedding(
    req.user._id,
    req.params.id,
    req.body
  );

  res.status(200).json(
    new ApiResponse(
      200,
      wedding,
      "Wedding updated successfully."
    )
  );
});

// Delete Wedding
exports.deleteWedding = asyncHandler(async (req, res) => {
  await weddingService.deleteWedding(
    req.user._id,
    req.params.id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Wedding deleted successfully."
    )
  );
});