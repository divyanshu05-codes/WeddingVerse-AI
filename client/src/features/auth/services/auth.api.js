import api from "../../../api/axios";

// ======================================================
// LOGIN
// ======================================================

export const loginUser = (data) => {
  return api.post(
    "/auth/login",
    data
  );
};

// ======================================================
// REGISTER
// ======================================================

export const registerUser = (data) => {
  return api.post(
    "/auth/register",
    data
  );
};

// ======================================================
// GET CURRENT USER
// ======================================================

export const getProfile = () => {
  return api.get(
    "/auth/me"
  );
};

// ======================================================
// LOGOUT
// ======================================================

export const logoutUser = () => {
  return api.post(
    "/auth/logout"
  );
};

// ======================================================
// FORGOT PASSWORD
// ======================================================

export const forgotPassword = (email) => {
  console.log(
    "📤 Forgot password API called"
  );

  console.log(
    "📧 Email:",
    email
  );

  return api.post(
    "/auth/forgot-password",
    {
      email,
    }
  );
};

// ======================================================
// RESET PASSWORD
// ======================================================

export const resetPassword = (
  token,
  password
) => {
  return api.post(
    `/auth/reset-password/${token}`,
    {
      password,
    }
  );
};