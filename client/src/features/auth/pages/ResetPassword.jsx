import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import { resetPassword } from "../services/auth.api";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters."
      );

      return;
    }

    if (password !== confirmPassword) {
      toast.error(
        "Passwords do not match."
      );

      return;
    }

    try {
      setLoading(true);

      const response =
        await resetPassword(
          token,
          password
        );

      toast.success(
        response.data.message
      );

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Reset Password Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Password reset failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-pink-600">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Create a new password for your account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div>
            <label className="block mb-2 font-medium">
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter new password"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="Confirm new password"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition disabled:opacity-50"
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>

          <p className="text-center text-sm">
            Remember your password?{" "}

            <Link
              to="/"
              className="text-pink-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default ResetPassword;