const ApiResponse = require("../utils/ApiResponse");

const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // ==========================================
  // MONGOOSE VALIDATION ERROR
  // ==========================================
  if (err.name === "ValidationError") {
    statusCode = 400;

    const messages = Object.values(err.errors).map(
      (error) => error.message
    );

    message = messages.join(", ");
  }

  // ==========================================
  // MONGOOSE CAST ERROR
  // Invalid MongoDB ObjectId
  // ==========================================
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}.`;
  }

  // ==========================================
  // MONGODB DUPLICATE KEY ERROR
  // ==========================================
  if (err.code === 11000) {
    statusCode = 400;

    const field = Object.keys(err.keyPattern || {})[0];

    message = field
      ? `${field} already exists.`
      : "Duplicate value already exists.";
  }

  // ==========================================
  // JWT ERRORS
  // ==========================================
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid authentication token.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Authentication token has expired.";
  }

  // ==========================================
  // HIDE INTERNAL SERVER ERROR DETAILS
  // ==========================================
  if (statusCode >= 500) {
    message = "Internal Server Error";
  }

  return res.status(statusCode).json(
    new ApiResponse(
      statusCode,
      null,
      message
    )
  );
};

module.exports = errorHandler;