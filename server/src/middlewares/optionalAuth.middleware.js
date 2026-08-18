const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const {
  isTokenBlacklisted,
} = require("../services/blacklist.service");

// ======================================================
// OPTIONAL AUTHENTICATION
// ======================================================
//
// Used for endpoints such as GET /auth/me.
//
// Logged in  -> req.user = user
// Logged out -> req.user = null
//
// It does NOT reject unauthenticated users.
// ======================================================

const optionalAuth = async (
  req,
  res,
  next
) => {
  try {
    let token = null;

    // ==================================================
    // AUTHORIZATION HEADER
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
    // COOKIE
    // ==================================================

    if (
      !token &&
      req.cookies?.token
    ) {
      token =
        req.cookies.token;
    }

    // ==================================================
    // NO TOKEN
    // ==================================================

    if (!token) {
      req.user = null;
      req.token = null;
      req.tokenPayload = null;

      return next();
    }

    // ==================================================
    // BLACKLIST
    // ==================================================

    const blacklisted =
      await isTokenBlacklisted(
        token
      );

    if (blacklisted) {
      req.user = null;
      req.token = null;
      req.tokenPayload = null;

      return next();
    }

    // ==================================================
    // VERIFY TOKEN
    // ==================================================

    let decoded;

    try {
      decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );
    } catch (error) {
      req.user = null;
      req.token = null;
      req.tokenPayload = null;

      return next();
    }

    // ==================================================
    // PAYLOAD
    // ==================================================

    if (!decoded?.id) {
      req.user = null;
      req.token = null;
      req.tokenPayload = null;

      return next();
    }

    // ==================================================
    // USER
    // ==================================================

    const user =
      await User.findById(
        decoded.id
      );

    if (!user) {
      req.user = null;
      req.token = null;
      req.tokenPayload = null;

      return next();
    }

    // ==================================================
    // AUTH DATA
    // ==================================================

    req.user = user;
    req.token = token;
    req.tokenPayload = decoded;

    next();

  } catch (error) {

    // Optional authentication should
    // never break a public endpoint.

    req.user = null;
    req.token = null;
    req.tokenPayload = null;

    next();
  }
};

module.exports = optionalAuth;