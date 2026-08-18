const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

exports.getMyProfile = asyncHandler(async (req, res) => {

    return res.status(200).json(

        new ApiResponse(

            200,

            req.user,

            "Profile fetched successfully."

        )

    );

});