const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const {
  registerUserService,
  loginUserService,
  updateProfileService,
  changePasswordService,
  forgotPasswordService,
  resetPasswordService,
} = require("../services/auth.service");

const generateToken = require("../utils/generateToken");

const {
  blacklistToken,
} = require("../services/blacklist.service");

const {
  sendPasswordResetEmail,
} = require("../services/email.service");


// ======================================================
// COOKIE OPTIONS
// ======================================================

const getCookieOptions = (rememberMe = false) => ({
  httpOnly: true,

  secure:
    process.env.NODE_ENV === "production",

  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",

  ...(rememberMe && {
    maxAge:
      30 * 24 * 60 * 60 * 1000,
  }),

  path: "/",
});


// ======================================================
// REGISTER
// ======================================================

exports.registerUser = asyncHandler(
  async (req, res) => {
    const {
      fullName,
      email,
      password,
      phone,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !password ||
      !phone
    ) {
      throw new ApiError(
        400,
        "All fields are required."
      );
    }

    const user =
      await registerUserService({
        fullName,
        email,
        password,
        phone,
      });

    return res.status(201).json(
      new ApiResponse(
        201,
        {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
        "User registered successfully."
      )
    );
  }
);


// ======================================================
// LOGIN
// ======================================================

exports.loginUser = asyncHandler(
  async (req, res) => {
    const {
      email,
      password,
      rememberMe = false,
    } = req.body;

    if (!email || !password) {
      throw new ApiError(
        400,
        "Email and password are required."
      );
    }

    const user =
      await loginUserService(
        email,
        password
      );

    const tokenExpiresIn = rememberMe
      ? "30d"
      : "1d";

    const token =
      generateToken(
        user._id,
        tokenExpiresIn
      );

    res.cookie(
      "token",
      token,
      getCookieOptions(rememberMe)
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role,
          },
        },
        "Login successful."
      )
    );
  }
);


// ======================================================
// GET PROFILE
// ======================================================

exports.getProfile = asyncHandler(
  async (req, res) => {

    // ======================================================
    // USER NOT LOGGED IN
    // ======================================================

    if (!req.user) {
      return res.status(200).json(
        new ApiResponse(
          200,
          null,
          "No active session."
        )
      );
    }

    // ======================================================
    // USER LOGGED IN
    // ======================================================

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          id: req.user._id,
          fullName: req.user.fullName,
          email: req.user.email,
          phone: req.user.phone,
          role: req.user.role,
        },
        "Profile fetched successfully."
      )
    );
  }
);

// ======================================================
// LOGOUT
// ======================================================

exports.logoutUser = asyncHandler(
  async (req, res) => {

    // ================================================
    // BLACKLIST CURRENT TOKEN
    // ================================================

    if (
      req.token &&
      req.tokenPayload?.exp
    ) {
      const expiresAt =
        new Date(
          req.tokenPayload.exp * 1000
        );

      await blacklistToken(
        req.token,
        expiresAt
      );
    }


    // ================================================
    // CLEAR COOKIE
    // ================================================

    res.clearCookie(
      "token",
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite:
          process.env.NODE_ENV ===
          "production"
            ? "none"
            : "lax",

        path: "/",
      }
    );


    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Logged out successfully."
      )
    );
  }
);


// ======================================================
// UPDATE PROFILE
// ======================================================

exports.updateProfile = asyncHandler(
  async (req, res) => {
    const user =
      await updateProfileService(
        req.user._id,
        req.body
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
        "Profile updated successfully."
      )
    );
  }
);


// ======================================================
// CHANGE PASSWORD
// ======================================================

exports.changePassword = asyncHandler(
  async (req, res) => {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    if (
      !currentPassword ||
      !newPassword
    ) {
      throw new ApiError(
        400,
        "Current password and new password are required."
      );
    }

    if (newPassword.length < 6) {
      throw new ApiError(
        400,
        "New password must be at least 6 characters long."
      );
    }

    await changePasswordService(
      req.user._id,
      currentPassword,
      newPassword
    );

    // Force current browser session
    // to login again.
    res.clearCookie(
      "token",
      getCookieOptions()
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Password changed successfully. Please login again."
      )
    );
  }
);


// ======================================================
// FORGOT PASSWORD
// ======================================================

exports.forgotPassword = asyncHandler(
  async (req, res) => {

    console.log(
      "🔥 FORGOT PASSWORD CONTROLLER HIT"
    );

    console.log(
      "📨 Request body:",
      req.body
    );

    const { email } = req.body;

    if (!email) {
      throw new ApiError(
        400,
        "Email is required."
      );
    }

    const result =
      await forgotPasswordService(
        email
      );

    // ==================================================
    // USER EXISTS
    // ==================================================

    if (result) {

      const resetUrl =
        `${process.env.CLIENT_URL}/reset-password/${result.resetToken}`;

      console.log(
        "🔗 Reset URL:",
        resetUrl
      );

      await sendPasswordResetEmail(
        result.user.email,
        resetUrl
      );

      console.log(
        "✅ Password reset email sent."
      );
    }

    // ==================================================
    // SAME RESPONSE FOR SECURITY
    // ==================================================

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "If an account exists with that email, a password reset link has been sent."
      )
    );
  }
);

// ======================================================
// RESET PASSWORD
// ======================================================

exports.resetPassword = asyncHandler(
  async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    if (!token) {
      throw new ApiError(
        400,
        "Reset token is required."
      );
    }

    if (!password) {
      throw new ApiError(
        400,
        "New password is required."
      );
    }

    if (password.length < 6) {
      throw new ApiError(
        400,
        "Password must be at least 6 characters long."
      );
    }

    await resetPasswordService(
      token,
      password
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Password reset successfully. You can now login."
      )
    );
  }
);