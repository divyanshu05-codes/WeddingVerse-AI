import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../services/auth.api";
import { useAuth } from "../../../context/useAuth";

import toast from "react-hot-toast";

function LoginForm() {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await loginUser(formData);

      await fetchUser();

      toast.success("Welcome Back!");

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Login Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

      <h1 className="text-3xl font-bold text-center text-pink-600">
        WeddingVerse AI
      </h1>

      <p className="text-center text-gray-500 mt-2">
        Welcome Back 👋
      </p>

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
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        {/* PASSWORD */}

        <div>
          <label className="block mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        {/* REMEMBER ME + FORGOT PASSWORD */}

        <div className="flex items-center justify-between">

          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 accent-pink-600 cursor-pointer"
            />

            <span>
              Remember me
            </span>
          </label>

          <Link
            to="/forgot-password"
            className="text-sm text-pink-600 font-semibold hover:underline"
          >
            Forgot password?
          </Link>

        </div>

        {/* LOGIN */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        {/* REGISTER */}

        <p className="text-center">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-pink-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </form>
    </div>
  );
}

export default LoginForm;