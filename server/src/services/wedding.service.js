const weddingRepository =
  require("../repositories/wedding.repository");

const ApiError =
  require("../utils/ApiError");


// ======================================================
// CREATE WEDDING
// ======================================================

const createWedding = async (
  userId,
  weddingData
) => {

  const wedding =
    await weddingRepository.create({
      ...weddingData,
      owner: userId,
    });

  return wedding;
};


// ======================================================
// GET ALL WEDDINGS
// ======================================================

const getAllWeddings = async (
  userId
) => {

  return await weddingRepository
    .findAllByOwner(userId);
};


// ======================================================
// GET WEDDING BY ID
// ======================================================

const getWeddingById = async (
  userId,
  weddingId
) => {

  const wedding =
    await weddingRepository
      .findByIdAndOwner(
        weddingId,
        userId
      );

  if (!wedding) {
    throw new ApiError(
      404,
      "Wedding not found."
    );
  }

  return wedding;
};


// ======================================================
// UPDATE WEDDING
// ======================================================

const updateWedding = async (
  userId,
  weddingId,
  updateData
) => {

  const wedding =
    await weddingRepository
      .findByIdAndOwner(
        weddingId,
        userId
      );

  if (!wedding) {
    throw new ApiError(
      404,
      "Wedding not found."
    );
  }


  const updatedWedding =
    await weddingRepository
      .updateByIdAndOwner(
        weddingId,
        userId,
        updateData
      );


  if (!updatedWedding) {
    throw new ApiError(
      404,
      "Wedding not found."
    );
  }


  return updatedWedding;
};


// ======================================================
// DELETE WEDDING
// ======================================================

const deleteWedding = async (
  userId,
  weddingId
) => {

  const wedding =
    await weddingRepository
      .findByIdAndOwner(
        weddingId,
        userId
      );

  if (!wedding) {
    throw new ApiError(
      404,
      "Wedding not found."
    );
  }


  const deletedWedding =
    await weddingRepository
      .deleteByIdAndOwner(
        weddingId,
        userId
      );


  if (!deletedWedding) {
    throw new ApiError(
      404,
      "Wedding not found."
    );
  }


  return deletedWedding;
};


module.exports = {
  createWedding,
  getAllWeddings,
  getWeddingById,
  updateWedding,
  deleteWedding,
};