const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const {
  isTokenBlacklisted,
} = require("../services/blacklist.service");


const protect = asyncHandler(
  async (req, res, next) => {

    let token;


    // ==================================================
    // GET TOKEN FROM AUTHORIZATION HEADER
    // ==================================================

    const authHeader =
      req.headers.authorization;

    if (
      authHeader &&
      authHeader.startsWith("Bearer ")
    ) {
      token =
        authHeader
          .substring(7)
          .trim();
    }


    // ==================================================
    // FALLBACK TO COOKIE
    // ==================================================

    if (
      !token &&
      req.cookies?.token
    ) {
      token =
        req.cookies.token;
    }


    // ==================================================
    // TOKEN REQUIRED
    // ==================================================

    if (!token) {
      throw new ApiError(
        401,
        "Please login to continue."
      );
    }


    // ==================================================
    // CHECK BLACKLIST
    // ==================================================

    const blacklisted =
      await isTokenBlacklisted(
        token
      );

    if (blacklisted) {
      throw new ApiError(
        401,
        "Session is no longer valid. Please login again."
      );
    }


    // ==================================================
    // VERIFY JWT
    // ==================================================

    let decoded;

    try {

      decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET || "weddingverse_super_secret_jwt_key_2026"
        );

    } catch (error) {

      if (
        error.name ===
        "TokenExpiredError"
      ) {
        throw new ApiError(
          401,
          "Your session has expired. Please login again."
        );
      }

      throw new ApiError(
        401,
        "Invalid authentication token."
      );
    }


    // ==================================================
    // VALIDATE PAYLOAD
    // ==================================================

    if (!decoded?.id) {
      throw new ApiError(
        401,
        "Invalid authentication token."
      );
    }


    // ==================================================
    // FIND USER
    // ==================================================

    const user =
      await User.findById(
        decoded.id
      );

    if (!user) {
      throw new ApiError(
        401,
        "User account no longer exists."
      );
    }


    // ==================================================
    // STORE AUTH DATA ON REQUEST
    // ==================================================

    req.user = user;

    req.token = token;

    req.tokenPayload =
      decoded;


    next();
  }
);


module.exports = protect;