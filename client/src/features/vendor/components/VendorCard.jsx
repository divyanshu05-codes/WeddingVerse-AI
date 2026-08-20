import { Link, useParams } from "react-router-dom";
import { Phone, Star, Building2, Wallet, ArrowRight, Edit3 } from "lucide-react";

function VendorCard({ vendor }) {
  const { weddingId } = useParams();

  const totalCost = Number(vendor.totalCost || 0);
  const advancePaid = Number(vendor.advancePaid || 0);
  const remaining = Math.max(totalCost - advancePaid, 0);

  const getStatusStyle = () => {
    if (vendor.paymentStatus === "Paid") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    if (vendor.paymentStatus === "Partial") {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    return "bg-red-50 text-red-700 border-red-200";
  };

  return (
    <div className="group bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/80 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex justify-between items-start gap-3 mb-3">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-slate-900 truncate font-display group-hover:text-purple-600 transition">
              {vendor.vendorName}
            </h3>
            <p className="text-xs text-slate-400 font-medium truncate mt-0.5">
              {vendor.companyName || vendor.category || "Wedding Service"}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shrink-0 ${getStatusStyle()}`}
          >
            {vendor.paymentStatus || "Pending"}
          </span>
        </div>

        {/* Category & Contact Badge */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold">
            <Building2 size={12} />
            {vendor.category || "Vendor"}
          </span>

          {vendor.phone && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium">
              <Phone size={11} className="text-slate-400" />
              {vendor.phone}
            </span>
          )}

          {vendor.rating && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 text-amber-700 text-xs font-bold ml-auto">
              <Star size={11} className="fill-amber-400 text-amber-500" />
              {vendor.rating}
            </span>
          )}
        </div>

        {/* Financial Details */}
        <div className="grid grid-cols-2 gap-2.5 bg-slate-50/70 border border-slate-200/60 rounded-2xl p-3 my-2">
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400">Total Cost</span>
            <p className="text-sm font-black text-slate-900 font-display mt-0.5">
              ₹{totalCost.toLocaleString("en-IN")}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400">Advance Paid</span>
            <p className="text-sm font-black text-emerald-600 font-display mt-0.5">
              ₹{advancePaid.toLocaleString("en-IN")}
            </p>
          </div>

          {remaining > 0 && (
            <div className="col-span-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Balance Due:</span>
              <span className="font-bold text-red-500">₹{remaining.toLocaleString("en-IN")}</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-100 mt-2">
        <Link
          to={`/weddings/${weddingId}/vendors/${vendor._id}`}
          className="flex-1 flex items-center justify-center gap-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-xl text-xs transition shadow-sm"
        >
          <span>Manage</span>
          <ArrowRight size={12} />
        </Link>

        <Link
          to={`/weddings/${weddingId}/vendors/${vendor._id}/edit`}
          className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-purple-600 hover:border-purple-300 transition"
          title="Edit Vendor"
        >
          <Edit3 size={14} />
        </Link>
      </div>
    </div>
  );
}

export default VendorCard;