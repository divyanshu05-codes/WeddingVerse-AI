const guestRepository =
  require("../repositories/guest.repository");

const weddingRepository =
  require("../repositories/wedding.repository");

const ApiError =
  require("../utils/ApiError");


// ======================================================
// CREATE GUEST
// ======================================================

const createGuest = async (
  userId,
  guestData
) => {

  const wedding =
    await weddingRepository.findByIdAndOwner(
      guestData.wedding,
      userId
    );

  if (!wedding) {
    throw new ApiError(
      404,
      "Wedding not found."
    );
  }

  return await guestRepository.create(
    guestData
  );
};


// ======================================================
// GET ALL GUESTS OF WEDDING
// ======================================================

const getGuestsByWedding = async (
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

  return await guestRepository
    .findAllByWedding(weddingId);
};


// ======================================================
// GET GUEST BY ID
// ======================================================

const getGuestById = async (
  userId,
  guestId
) => {

  const guest =
    await guestRepository.findById(
      guestId
    );

  if (!guest) {
    throw new ApiError(
      404,
      "Guest not found."
    );
  }


  // Verify that the guest's wedding
  // belongs to the logged-in user.

  const wedding =
    await weddingRepository.findByIdAndOwner(
      guest.wedding,
      userId
    );

  if (!wedding) {
    throw new ApiError(
      404,
      "Guest not found."
    );
  }

  return guest;
};


// ======================================================
// UPDATE GUEST
// ======================================================

const updateGuest = async (
  userId,
  guestId,
  updateData
) => {

  const guest =
    await guestRepository.findById(
      guestId
    );

  if (!guest) {
    throw new ApiError(
      404,
      "Guest not found."
    );
  }


  const wedding =
    await weddingRepository.findByIdAndOwner(
      guest.wedding,
      userId
    );

  if (!wedding) {
    throw new ApiError(
      404,
      "Guest not found."
    );
  }


  // Prevent changing the guest's wedding
  // to another wedding through the request body.

  if (
    updateData.wedding &&
    updateData.wedding.toString() !==
      guest.wedding.toString()
  ) {
    throw new ApiError(
      403,
      "Guest cannot be moved to another wedding."
    );
  }


  const updatedGuest =
    await guestRepository
      .updateByIdAndWedding(
        guestId,
        guest.wedding,
        updateData
      );


  if (!updatedGuest) {
    throw new ApiError(
      404,
      "Guest not found."
    );
  }

  return updatedGuest;
};


// ======================================================
// DELETE GUEST
// ======================================================

const deleteGuest = async (
  userId,
  guestId
) => {

  const guest =
    await guestRepository.findById(
      guestId
    );

  if (!guest) {
    throw new ApiError(
      404,
      "Guest not found."
    );
  }


  const wedding =
    await weddingRepository.findByIdAndOwner(
      guest.wedding,
      userId
    );

  if (!wedding) {
    throw new ApiError(
      404,
      "Guest not found."
    );
  }


  const deletedGuest =
    await guestRepository
      .deleteByIdAndWedding(
        guestId,
        guest.wedding
      );


  if (!deletedGuest) {
    throw new ApiError(
      404,
      "Guest not found."
    );
  }

  return deletedGuest;
};


module.exports = {
  createGuest,
  getGuestsByWedding,
  getGuestById,
  updateGuest,
  deleteGuest,
};