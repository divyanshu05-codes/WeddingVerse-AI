import { Link, useParams } from "react-router-dom";
import { Calendar, Trash2, Edit3, CheckCircle2, Clock, AlertCircle } from "lucide-react";

function TaskCard({ task, onToggle, onDelete }) {
  const { weddingId } = useParams();

  const priorityStyle = {
    High: "bg-red-50 text-red-700 border-red-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  return (
    <div
      className={`group bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200/80 p-5 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between ${
        task.completed ? "bg-slate-50/60 border-slate-200/40 opacity-75" : ""
      }`}
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3 min-w-0">
            <button
              type="button"
              onClick={() => onToggle(task)}
              className={`w-6 h-6 rounded-lg border-2 mt-0.5 flex items-center justify-center transition shrink-0 cursor-pointer ${
                task.completed
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "border-slate-300 hover:border-rose-500 bg-white"
              }`}
            >
              {task.completed && <CheckCircle2 size={16} />}
            </button>

            <div className="min-w-0">
              <h3
                className={`text-base font-bold font-display truncate transition ${
                  task.completed ? "line-through text-slate-400" : "text-slate-900 group-hover:text-rose-600"
                }`}
              >
                {task.title}
              </h3>
              <span className="text-[11px] font-semibold text-slate-400 mt-0.5 inline-block">
                {task.category || "General Task"}
              </span>
            </div>
          </div>

          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border shrink-0 ${
              priorityStyle[task.priority] || "bg-slate-100 text-slate-600 border-slate-200"
            }`}
          >
            {task.priority}
          </span>
        </div>

        {/* Task Description */}
        {task.description && (
          <p className="text-xs text-slate-600 my-2 line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}

        {/* Due Date & Status */}
        <div className="flex items-center justify-between text-xs text-slate-500 my-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 font-medium">
            <Calendar size={12} className="text-purple-500" />
            <span>
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "No Due Date"}
            </span>
          </div>

          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-lg ${
              task.completed ? "bg-emerald-100 text-emerald-700" : "bg-rose-50 text-rose-600"
            }`}
          >
            {task.completed ? "Done" : "Pending"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-100 mt-1">
        <Link
          to={`/weddings/${weddingId}/tasks/${task._id}/edit`}
          className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-xs transition"
        >
          <Edit3 size={12} />
          <span>Edit</span>
        </Link>

        <button
          type="button"
          onClick={() => onDelete(task._id)}
          className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/60 transition cursor-pointer"
          title="Delete Task"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;