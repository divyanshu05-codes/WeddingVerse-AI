import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Building2,
  Wallet,
  Sparkles,
  ArrowRight,
  Edit3,
  CheckCircle2,
  Clock,
} from "lucide-react";

function WeddingCard({ wedding }) {
  const totalBudget = Number(wedding.estimatedBudget || 0);
  const totalExpenses = Number(wedding.totalExpenses || 0);
  const percentSpent = totalBudget > 0 ? Math.min(Math.round((totalExpenses / totalBudget) * 100), 100) : 0;

  // Calculate days remaining
  const calculateDaysLeft = (dateString) => {
    if (!dateString) return null;
    const target = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const daysLeft = calculateDaysLeft(wedding.weddingDetails?.weddingDate);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "in progress":
      case "planning":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-purple-50 text-purple-700 border-purple-200";
    }
  };

  return (
    <div className="group relative bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Top Gradient Ribbon */}
      <div className="h-2 w-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600" />

      <div className="p-6">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusBadge(wedding.status)}`}>
            {wedding.status || "Planning"}
          </span>

          {daysLeft !== null && (
            <div className="flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
              <Clock size={12} className="text-rose-500" />
              <span>
                {daysLeft > 0 ? `${daysLeft} Days to Go` : daysLeft === 0 ? "Today 🎉" : "Past Event"}
              </span>
            </div>
          )}
        </div>

        {/* Couple Title */}
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900 tracking-tight group-hover:text-rose-600 transition">
            {wedding.bride?.fullName || "Bride"} <span className="text-rose-500">&</span> {wedding.groom?.fullName || "Groom"}
          </h2>
          <div className="flex flex-wrap items-center gap-y-1 gap-x-3 mt-2 text-xs text-slate-500 font-medium">
            {wedding.weddingDetails?.city && (
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-rose-500" />
                {wedding.weddingDetails?.venue ? `${wedding.weddingDetails.venue}, ` : ""}{wedding.weddingDetails.city}
              </span>
            )}
            {wedding.weddingDetails?.weddingDate && (
              <span className="flex items-center gap-1">
                <Calendar size={13} className="text-purple-500" />
                {new Date(wedding.weddingDetails.weddingDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-3 gap-2.5 my-5">
          <div className="bg-rose-50/60 border border-rose-100/80 rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold uppercase text-rose-500">
              <Users size={12} />
              <span>Guests</span>
            </div>
            <p className="text-lg font-black text-slate-900 mt-1 font-display">
              {wedding.totalGuests || 0}
            </p>
          </div>

          <div className="bg-purple-50/60 border border-purple-100/80 rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold uppercase text-purple-600">
              <Building2 size={12} />
              <span>Vendors</span>
            </div>
            <p className="text-lg font-black text-slate-900 mt-1 font-display">
              {wedding.totalVendors || 0}
            </p>
          </div>

          <div className="bg-amber-50/60 border border-amber-100/80 rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold uppercase text-amber-600">
              <Wallet size={12} />
              <span>Budget</span>
            </div>
            <p className="text-lg font-black text-slate-900 mt-1 font-display truncate">
              ₹{totalBudget > 0 ? (totalBudget >= 100000 ? `${(totalBudget / 100000).toFixed(1)}L` : totalBudget.toLocaleString("en-IN")) : "0"}
            </p>
          </div>
        </div>

        {/* Budget Meter */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-500">Spent: ₹{totalExpenses.toLocaleString("en-IN")}</span>
            <span className={percentSpent > 90 ? "text-red-500 font-bold" : "text-slate-700"}>{percentSpent}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentSpent > 90 ? "bg-red-500" : percentSpent > 70 ? "bg-amber-500" : "bg-gradient-to-r from-rose-500 to-purple-600"
              }`}
              style={{ width: `${percentSpent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center gap-2">
        <Link
          to={`/weddings/${wedding._id}`}
          className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold py-2.5 px-4 rounded-xl shadow-md shadow-rose-500/20 hover:shadow-rose-500/30 text-xs transition active:scale-95"
        >
          <span>Open Suite</span>
          <ArrowRight size={13} />
        </Link>

        <Link
          to={`/weddings/${wedding._id}/edit`}
          className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-300 shadow-sm transition"
          title="Edit Wedding Details"
        >
          <Edit3 size={15} />
        </Link>
      </div>
    </div>
  );
}

export default WeddingCard;