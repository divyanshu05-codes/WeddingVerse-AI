const RESPONSE_MESSAGES = {
  AUTH: {
    REGISTER_SUCCESS: "User registered successfully.",
    LOGIN_SUCCESS: "Login successful.",
    PROFILE_FETCHED: "Profile fetched successfully.",
    PROFILE_UPDATED: "Profile updated successfully.",
    PASSWORD_CHANGED: "Password changed successfully.",
    LOGOUT_SUCCESS: "Logged out successfully.",
  },

  COMMON: {
    NOT_FOUND: "Resource not found.",
    SERVER_ERROR: "Internal server error.",
    UNAUTHORIZED: "Unauthorized access.",
    VALIDATION_ERROR: "Validation failed.",
  },
};

module.exports = RESPONSE_MESSAGES;