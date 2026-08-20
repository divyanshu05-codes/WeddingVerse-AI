const jwt = require("jsonwebtoken");
const env = require("../config/env");

const generateToken = (
  userId,
  expiresIn = env.JWT_EXPIRES_IN || "7d"
) => {
  return jwt.sign(
    {
      id: userId,
    },
    env.JWT_SECRET || process.env.JWT_SECRET || "weddingverse_super_secret_jwt_key_2026",
    {
      expiresIn,
    }
  );
};

module.exports = generateToken;