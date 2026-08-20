import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Send, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { forgotPassword } from "../services/auth.api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      const response = await forgotPassword(trimmedEmail);
      toast.success(
        response.data?.message ||
          "If an account exists with that email, a password reset link has been sent."
      );
      setSent(true);
    } catch (error) {
      console.error("Forgot Password Error:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full bg-white/95 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl text-slate-800 border border-white/40">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 shadow-lg shadow-rose-500/25 mb-4 text-white">
            <Mail size={26} />
          </div>
          <h2 className="text-2xl font-black font-display text-slate-900 tracking-tight">
            Forgot Password?
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
            Enter your registered email address and we'll send you instructions to reset your password.
          </p>
        </div>

        {sent ? (
          <div className="text-center space-y-4 py-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold">
              ✅ Check your email inbox for the reset link!
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-rose-600 font-bold text-sm hover:underline"
            >
              <ArrowLeft size={16} />
              <span>Back to Sign In</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition shadow-sm text-sm font-medium"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:-translate-y-0.5 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending instructions...</span>
                </>
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <Send size={15} />
                </>
              )}
            </button>

            <div className="pt-3 border-t border-slate-100 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-rose-600 font-bold transition"
              >
                <ArrowLeft size={14} />
                <span>Return to Sign In</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;