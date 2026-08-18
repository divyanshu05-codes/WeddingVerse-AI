import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.api";
import toast from "react-hot-toast";

function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser(formData);

      toast.success("Registration Successful!");

      navigate("/", { replace: true });

    } catch (error) {
      console.error("Registration Error:", error);

      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-3xl font-bold text-center text-pink-600">
        Create Account
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">

        <input
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-pink-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}

export default RegisterForm;