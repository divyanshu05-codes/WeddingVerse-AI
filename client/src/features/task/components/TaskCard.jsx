import { Link, useParams } from "react-router-dom";

function TaskCard({
  task,
  onToggle,
  onDelete,
}) {
  const { weddingId } = useParams();

  const priorityStyle = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-600",
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-6 ${
        task.completed
          ? "opacity-70"
          : ""
      }`}
    >

      {/* Header */}

      <div className="flex justify-between items-start gap-4">

        <div className="flex gap-3">

          <input
            type="checkbox"
            checked={task.completed}
            onChange={() =>
              onToggle(task)
            }
            className="w-5 h-5 mt-1 accent-pink-600"
          />

          <div>

            <h3
              className={`text-xl font-bold ${
                task.completed
                  ? "line-through text-gray-400"
                  : "text-gray-800"
              }`}
            >
              {task.title}
            </h3>

            <p className="text-gray-500 mt-1">
              {task.category}
            </p>

          </div>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            priorityStyle[
              task.priority
            ] || "bg-gray-100 text-gray-600"
          }`}
        >
          {task.priority}
        </span>

      </div>

      {/* Description */}

      {task.description && (
        <p className="text-gray-600 mt-4">
          {task.description}
        </p>
      )}

      {/* Due Date */}

      <div className="mt-4">

        <p className="text-sm text-gray-500">
          Due Date
        </p>

        <p className="font-semibold mt-1">
          {task.dueDate
            ? new Date(
                task.dueDate
              ).toLocaleDateString()
            : "No due date"}
        </p>

      </div>

      {/* Status */}

      <div className="mt-4">

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            task.completed
              ? "bg-green-100 text-green-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {task.completed
            ? "Completed"
            : "Pending"}
        </span>

      </div>

      {/* Actions */}

      <div className="flex gap-3 mt-6">

        <Link
          to={`/weddings/${weddingId}/tasks/${task._id}/edit`}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-center py-2 rounded-lg"
        >
          Edit
        </Link>

        <button
          onClick={() =>
            onDelete(task._id)
          }
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;