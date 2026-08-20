import { Link, useParams } from "react-router-dom";
import { Phone, Mail, Users, Utensils, Heart, ArrowRight, Edit3 } from "lucide-react";

function GuestCard({ guest }) {
  const { weddingId } = useParams();

  const getRsvpBadge = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Declined":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="group bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/80 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex justify-between items-start gap-3 mb-3">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-slate-900 truncate font-display group-hover:text-rose-600 transition">
              {guest.fullName}
            </h3>
            <span className="inline-block text-[11px] font-semibold text-slate-400 mt-0.5">
              {guest.side ? `${guest.side}'s Side` : "General Guest"}
            </span>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shrink-0 ${getRsvpBadge(
              guest.rsvpStatus
            )}`}
          >
            {guest.rsvpStatus || "Pending"}
          </span>
        </div>

        {/* Guest Details */}
        <div className="space-y-2 text-xs text-slate-600 my-4 pt-3 border-t border-slate-100">
          {guest.phone && (
            <div className="flex items-center gap-2">
              <Phone size={13} className="text-rose-500 shrink-0" />
              <span className="truncate">{guest.phone}</span>
            </div>
          )}

          {guest.email && (
            <div className="flex items-center gap-2">
              <Mail size={13} className="text-purple-500 shrink-0" />
              <span className="truncate">{guest.email}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-xl font-medium">
              <Users size={12} className="text-slate-400" />
              <span>{guest.numberOfGuests || 1} {Number(guest.numberOfGuests) > 1 ? "Attending" : "Guest"}</span>
            </div>

            {guest.mealPreference && (
              <div className="flex items-center gap-1 bg-rose-50 border border-rose-100 text-rose-700 px-2.5 py-1 rounded-xl font-semibold">
                <Utensils size={11} />
                <span>{guest.mealPreference}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
        <Link
          to={`/weddings/${weddingId}/guests/${guest._id}`}
          className="flex-1 flex items-center justify-center gap-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-xl text-xs transition shadow-sm"
        >
          <span>Details</span>
          <ArrowRight size={12} />
        </Link>

        <Link
          to={`/weddings/${weddingId}/guests/${guest._id}/edit`}
          className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-300 transition"
          title="Edit Guest"
        >
          <Edit3 size={14} />
        </Link>
      </div>
    </div>
  );
}

export default GuestCard;