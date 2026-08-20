import { Link, useParams } from "react-router-dom";
import { Calendar, Tag, ArrowRight, Edit3, IndianRupee, FileText } from "lucide-react";

function ExpenseCard({ expense }) {
  const { weddingId } = useParams();
  const amount = Number(expense.amount || 0);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Partial":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-red-50 text-red-700 border-red-200";
    }
  };

  return (
    <div className="group bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/80 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex justify-between items-start gap-3 mb-3">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-slate-900 truncate font-display group-hover:text-rose-600 transition">
              {expense.title}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold">
                <Tag size={10} />
                {expense.category || "General"}
              </span>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shrink-0 ${getStatusBadge(
              expense.paymentStatus
            )}`}
          >
            {expense.paymentStatus || "Pending"}
          </span>
        </div>

        {/* Amount Hero */}
        <div className="my-4 p-3.5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Recorded Expense</span>
          <p className="text-2xl font-black font-display text-white mt-0.5">
            ₹{amount.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Date & Notes */}
        <div className="space-y-1.5 text-xs text-slate-500 my-2">
          {expense.expenseDate && (
            <div className="flex items-center gap-1.5">
              <Calendar size={12} className="text-purple-500 shrink-0" />
              <span>{new Date(expense.expenseDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}</span>
            </div>
          )}

          {expense.notes && (
            <p className="text-slate-400 italic text-[11px] line-clamp-2 mt-1">
              "{expense.notes}"
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-100 mt-2">
        <Link
          to={`/weddings/${weddingId}/budget/${expense._id}`}
          className="flex-1 flex items-center justify-center gap-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-xl text-xs transition shadow-sm"
        >
          <span>View Details</span>
          <ArrowRight size={12} />
        </Link>

        <Link
          to={`/weddings/${weddingId}/budget/${expense._id}/edit`}
          className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-300 transition"
          title="Edit Expense"
        >
          <Edit3 size={14} />
        </Link>
      </div>
    </div>
  );
}

export default ExpenseCard;