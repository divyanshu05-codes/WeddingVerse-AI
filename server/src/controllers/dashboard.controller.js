const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const dashboardService = require("../services/dashboard.service");

const getDashboardData = asyncHandler(
  async (req, res) => {
    const dashboard =
      await dashboardService.getDashboardData(
        req.user._id
      );

    res.status(200).json(
      new ApiResponse(
        200,
        dashboard,
        "Dashboard data fetched successfully."
      )
    );
  }
);

module.exports = {
  getDashboardData,
};