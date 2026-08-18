const asyncHandler =
  require("../utils/asyncHandler");

const ApiResponse =
  require("../utils/ApiResponse");

const guestService =
  require("../services/guest.service");


// ======================================================
// CREATE GUEST
// ======================================================

exports.createGuest = asyncHandler(
  async (req, res) => {

    const guest =
      await guestService.createGuest(
        req.user._id,
        req.body
      );

    res.status(201).json(
      new ApiResponse(
        201,
        guest,
        "Guest created successfully."
      )
    );
  }
);


// ======================================================
// GET ALL GUESTS BY WEDDING
// ======================================================

exports.getGuestsByWedding =
  asyncHandler(
    async (req, res) => {

      const guests =
        await guestService.getGuestsByWedding(
          req.user._id,
          req.params.weddingId
        );

      res.status(200).json(
        new ApiResponse(
          200,
          guests,
          "Guests fetched successfully."
        )
      );
    }
  );


// ======================================================
// GET GUEST BY ID
// ======================================================

exports.getGuestById =
  asyncHandler(
    async (req, res) => {

      const guest =
        await guestService.getGuestById(
          req.user._id,
          req.params.id
        );

      res.status(200).json(
        new ApiResponse(
          200,
          guest,
          "Guest fetched successfully."
        )
      );
    }
  );


// ======================================================
// UPDATE GUEST
// ======================================================

exports.updateGuest =
  asyncHandler(
    async (req, res) => {

      const guest =
        await guestService.updateGuest(
          req.user._id,
          req.params.id,
          req.body
        );

      res.status(200).json(
        new ApiResponse(
          200,
          guest,
          "Guest updated successfully."
        )
      );
    }
  );


// ======================================================
// DELETE GUEST
// ======================================================

exports.deleteGuest =
  asyncHandler(
    async (req, res) => {

      await guestService.deleteGuest(
        req.user._id,
        req.params.id
      );

      res.status(200).json(
        new ApiResponse(
          200,
          null,
          "Guest deleted successfully."
        )
      );
    }
  );