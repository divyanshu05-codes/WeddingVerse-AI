const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");

// ======================================================
// REGISTER USER
// ======================================================

const registerUserService = async (userData) => {
  const {
    fullName,
    email,
    password,
    phone,
  } = userData;

  const normalizedEmail =
    email.trim().toLowerCase();

  const normalizedPhone =
    phone.trim();

  // ====================================================
  // CHECK EMAIL
  // ====================================================

  const existingEmail =
    await User.findOne({
      email: normalizedEmail,
    });

  if (existingEmail) {
    throw new ApiError(
      400,
      "Email already registered."
    );
  }

  // ====================================================
  // CHECK PHONE
  // ====================================================

  const existingPhone =
    await User.findOne({
      phone: normalizedPhone,
    });

  if (existingPhone) {
    throw new ApiError(
      400,
      "Phone number already exists."
    );
  }

  // ====================================================
  // HASH PASSWORD
  // ====================================================

  const hashedPassword =
    await bcrypt.hash(
      password,
      12
    );

  // ====================================================
  // CREATE USER
  // ====================================================

  const user =
    await User.create({
      fullName:
        fullName.trim(),

      email:
        normalizedEmail,

      password:
        hashedPassword,

      phone:
        normalizedPhone,
    });

  return user;
};

// ======================================================
// LOGIN USER
// ======================================================

const loginUserService = async (
  email,
  password
) => {
  const normalizedEmail =
    email.trim().toLowerCase();

  const user =
    await User.findOne({
      email: normalizedEmail,
    }).select("+password");

  if (!user) {
    throw new ApiError(
      401,
      "Invalid email or password."
    );
  }

  const isPasswordMatched =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordMatched) {
    throw new ApiError(
      401,
      "Invalid email or password."
    );
  }

  return user;
};

// ======================================================
// UPDATE PROFILE
// ======================================================

const updateProfileService = async (
  userId,
  data
) => {
  const {
    fullName,
    phone,
  } = data;

  const user =
    await User.findById(
      userId
    );

  if (!user) {
    throw new ApiError(
      404,
      "User not found."
    );
  }

  // ====================================================
  // UPDATE FULL NAME
  // ====================================================

  if (fullName !== undefined) {
    const trimmedName =
      fullName.trim();

    if (
      trimmedName.length < 3
    ) {
      throw new ApiError(
        400,
        "Full name must be at least 3 characters."
      );
    }

    if (
      trimmedName.length > 50
    ) {
      throw new ApiError(
        400,
        "Full name cannot exceed 50 characters."
      );
    }

    user.fullName =
      trimmedName;
  }

  // ====================================================
  // UPDATE PHONE
  // ====================================================

  if (phone !== undefined) {
    const normalizedPhone =
      phone.trim();

    if (
      normalizedPhone.length < 10 ||
      normalizedPhone.length > 15
    ) {
      throw new ApiError(
        400,
        "Phone number must contain 10-15 characters."
      );
    }

    const existingPhone =
      await User.findOne({
        phone:
          normalizedPhone,

        _id: {
          $ne: userId,
        },
      });

    if (existingPhone) {
      throw new ApiError(
        400,
        "Phone number already exists."
      );
    }

    user.phone =
      normalizedPhone;
  }

  await user.save();

  return user;
};

// ======================================================
// CHANGE PASSWORD
// ======================================================

const changePasswordService = async (
  userId,
  currentPassword,
  newPassword
) => {
  const user =
    await User.findById(
      userId
    ).select("+password");

  if (!user) {
    throw new ApiError(
      404,
      "User not found."
    );
  }

  // ====================================================
  // CHECK CURRENT PASSWORD
  // ====================================================

  const isPasswordCorrect =
    await bcrypt.compare(
      currentPassword,
      user.password
    );

  if (!isPasswordCorrect) {
    throw new ApiError(
      400,
      "Current password is incorrect."
    );
  }

  // ====================================================
  // PREVENT SAME PASSWORD
  // ====================================================

  const isSamePassword =
    await bcrypt.compare(
      newPassword,
      user.password
    );

  if (isSamePassword) {
    throw new ApiError(
      400,
      "New password must be different from the current password."
    );
  }

  // ====================================================
  // HASH NEW PASSWORD
  // ====================================================

  user.password =
    await bcrypt.hash(
      newPassword,
      12
    );

  await user.save();

  return user;
};

// ======================================================
// FORGOT PASSWORD
// ======================================================

const forgotPasswordService = async (
  email
) => {
  const normalizedEmail =
    email.trim().toLowerCase();

  console.log(
    "🔎 Looking for user:",
    normalizedEmail
  );

  const user =
    await User.findOne({
      email:
        normalizedEmail,
    });

  // ====================================================
  // DON'T REVEAL WHETHER EMAIL EXISTS
  // ====================================================

  if (!user) {
    console.log(
      "⚠️ No user found for:",
      normalizedEmail
    );

    return null;
  }

  console.log(
    "✅ User found:",
    user.email
  );

  // ====================================================
  // GENERATE RESET TOKEN
  // ====================================================

  const resetToken =
    crypto
      .randomBytes(32)
      .toString("hex");

  console.log(
    "🔐 Reset token generated."
  );

  // ====================================================
  // HASH TOKEN BEFORE DATABASE STORAGE
  // ====================================================

  const hashedToken =
    crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

  // ====================================================
  // SAVE HASHED TOKEN
  // ====================================================

  user.resetPasswordToken =
    hashedToken;

  // Token valid for 15 minutes.
  user.resetPasswordExpires =
    new Date(
      Date.now() +
        15 * 60 * 1000
    );

  await user.save({
    validateBeforeSave: false,
  });

  console.log(
    "✅ Reset token saved to MongoDB."
  );

  return {
    user,
    resetToken,
  };
};

// ======================================================
// RESET PASSWORD
// ======================================================

const resetPasswordService = async (
  token,
  newPassword
) => {
  if (!token) {
    throw new ApiError(
      400,
      "Reset token is required."
    );
  }

  if (!newPassword) {
    throw new ApiError(
      400,
      "New password is required."
    );
  }

  if (
    newPassword.length < 6
  ) {
    throw new ApiError(
      400,
      "Password must be at least 6 characters long."
    );
  }

  // ====================================================
  // HASH TOKEN FROM URL
  // ====================================================

  const hashedToken =
    crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

  // ====================================================
  // FIND USER WITH VALID TOKEN
  // ====================================================

const userByToken =
  await User.findOne({
    resetPasswordToken: hashedToken,
  }).select(
    "+password +resetPasswordToken +resetPasswordExpires"
  );

console.log("🔍 RESET PASSWORD DEBUG");
console.log(
  "Token received:",
  token ? "YES" : "NO"
);
console.log(
  "Token length:",
  token?.length
);
console.log(
  "Hashed token:",
  hashedToken
);

console.log(
  "User found by token:",
  userByToken ? "YES" : "NO"
);

if (userByToken) {
  console.log(
    "Reset token expiry:",
    userByToken.resetPasswordExpires
  );

  console.log(
    "Current time:",
    new Date()
  );

  console.log(
    "Token expired:",
    userByToken.resetPasswordExpires <= new Date()
  );
}

if (!userByToken) {
  throw new ApiError(
    400,
    "Password reset link is invalid or expired."
  );
}

if (
  !userByToken.resetPasswordExpires ||
  userByToken.resetPasswordExpires <= new Date()
) {
  throw new ApiError(
    400,
    "Password reset link has expired."
  );
}

const user = userByToken;

  // ====================================================
  // HASH NEW PASSWORD
  // ====================================================

  user.password =
    await bcrypt.hash(
      newPassword,
      12
    );

  // ====================================================
  // INVALIDATE RESET TOKEN
  // ====================================================

  user.resetPasswordToken =
    null;

  user.resetPasswordExpires =
    null;

  await user.save();

  console.log(
    "✅ Password reset successfully for:",
    user.email
  );

  return user;
};

// ======================================================
// EXPORT ALL SERVICES
// ======================================================

module.exports = {
  registerUserService,
  loginUserService,
  updateProfileService,
  changePasswordService,
  forgotPasswordService,
  resetPasswordService,
};