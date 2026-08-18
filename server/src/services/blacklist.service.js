const Blacklist = require("../models/blacklist.model");


// ======================================================
// ADD TOKEN TO BLACKLIST
// ======================================================

const blacklistToken = async (
  token,
  expiresAt
) => {
  if (!token || !expiresAt) {
    return;
  }

  await Blacklist.findOneAndUpdate(
    { token },
    {
      token,
      expiresAt,
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );
};


// ======================================================
// CHECK IF TOKEN IS BLACKLISTED
// ======================================================

const isTokenBlacklisted = async (
  token
) => {
  if (!token) {
    return false;
  }

  const blacklisted =
    await Blacklist.exists({
      token,
    });

  return Boolean(
    blacklisted
  );
};


module.exports = {
  blacklistToken,
  isTokenBlacklisted,
};