const jwt = require("jsonwebtoken");

const generateToken = (
  userId,
  expiresIn = process.env.JWT_EXPIRES_IN
) => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn,
    }
  );
};

module.exports = generateToken;