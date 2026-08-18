import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  forgotPassword,
} from "../services/auth.api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] =
    useState(false);

  // ======================================================
  // SUBMIT
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(
      "🔥 FORGOT PASSWORD FORM SUBMITTED"
    );

    const trimmedEmail =
      email.trim().toLowerCase();

    console.log(
      "📧 Email entered:",
      trimmedEmail
    );

    if (!trimmedEmail) {
      toast.error(
        "Please enter your email address."
      );

      return;
    }

    try {
      setLoading(true);

      console.log(
        "📤 Calling forgotPassword API..."
      );

      const response =
        await forgotPassword(
          trimmedEmail
        );

      console.log(
        "✅ Forgot password response:",
        response
      );

      console.log(
        "📦 Response data:",
        response.data
      );

      toast.success(
        response.data?.message ||
          "If an account exists with that email, a password reset link has been sent."
      );

      setEmail("");

    } catch (error) {
      console.error(
        "❌ Forgot Password Error:",
        error
      );

      console.error(
        "❌ Status:",
        error.response?.status
      );

      console.error(
        "❌ Response:",
        error.response?.data
      );

      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);

      console.log(
        "🏁 Forgot password request finished."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* ==================================================
            HEADING
        ================================================== */}

        <h1 className="text-3xl font-bold text-center text-pink-600">
          Forgot Password?
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Enter your registered email and we'll
          send you a password reset link.
        </p>

        {/* ==================================================
            FORM
        ================================================== */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {/* EMAIL */}

          <div>

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              autoComplete="email"
              disabled={loading}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-100"
              required
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={
              loading ||
              !email.trim()
            }
            className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>

          {/* LOGIN */}

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

export default ForgotPassword;