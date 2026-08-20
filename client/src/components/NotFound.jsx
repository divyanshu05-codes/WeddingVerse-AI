import { Link } from "react-router-dom";
import { Sparkles, Home, ArrowLeft, Heart } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-500 to-purple-600 shadow-xl shadow-rose-500/25 mb-6 text-3xl">
          💍
        </div>

        <h1 className="text-7xl font-black font-display tracking-tight bg-gradient-to-r from-rose-400 via-pink-300 to-purple-400 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="text-2xl font-bold font-display text-white mt-4">
          Aisle Not Found
        </h2>

        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          Looks like this wedding page took a detour. Let's get you back to your planning command center.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:-translate-y-0.5 transition text-sm"
          >
            <Home size={16} />
            <span>Go to Dashboard</span>
          </Link>

          <Link
            to="/weddings"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl border border-white/10 transition text-sm"
          >
            <Heart size={16} className="text-rose-400" />
            <span>My Weddings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;