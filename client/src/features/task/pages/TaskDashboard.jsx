import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import TaskCard from "../components/TaskCard";
import useTask from "../hooks/useTask";
import { generateAITasks } from "../services/task.api";

function TaskDashboard() {
  const { weddingId } = useParams();

  const {
    tasks,
    loading,
    removeTask,
    toggleTask,
    fetchTasks,
  } = useTask(weddingId);

  const [aiLoading, setAiLoading] = useState(false);

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [search, setSearch] = useState("");

  // ================================
  // FILTER TASKS
  // ================================

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        task.title
          ?.toLowerCase()
          .includes(searchText) ||
        task.description
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All"
          ? true
          : statusFilter === "Completed"
          ? task.completed
          : !task.completed;

      const matchesPriority =
        priorityFilter === "All"
          ? true
          : task.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    tasks,
    search,
    statusFilter,
    priorityFilter,
  ]);

  // ================================
  // STATISTICS
  // ================================

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks =
    tasks.length - completedTasks;

  const highPriorityTasks = tasks.filter(
    (task) =>
      task.priority === "High" &&
      !task.completed
  ).length;

  const progress =
    tasks.length > 0
      ? Math.round(
          (completedTasks / tasks.length) * 100
        )
      : 0;

  // ================================
  // GENERATE AI TASKS
  // ================================

  const handleGenerateAITasks = async () => {
    console.log("🤖 AI TASK BUTTON CLICKED");

    try {
      setAiLoading(true);

      console.log(
        "Wedding ID:",
        weddingId
      );

      console.log(
        "Sending AI task generation request..."
      );

      const res = await generateAITasks(
        weddingId
      );

      console.log(
        "🤖 AI RESPONSE:",
        res.data
      );

      const generatedTasks =
        res.data?.data || [];

      toast.success(
        generatedTasks.length > 0
          ? `${generatedTasks.length} AI tasks generated successfully!`
          : "AI tasks generated successfully!"
      );

      // Refresh task list
      if (fetchTasks) {
        await fetchTasks();
      }

    } catch (error) {
      console.error(
        "❌ AI TASK GENERATION ERROR:",
        error
      );

      console.error(
        "Response:",
        error.response?.data
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to generate AI tasks."
      );

    } finally {
      setAiLoading(false);
    }
  };

  return (
    <DashboardLayout>

      <div className="max-w-7xl mx-auto">

        {/* ================================
            HEADER
        ================================= */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>

            <Link
              to={`/weddings/${weddingId}`}
              className="text-pink-600 font-semibold"
            >
              ← Back to Wedding
            </Link>

            <h1 className="text-4xl font-bold text-gray-800 mt-2">
              Planning Checklist
            </h1>

            <p className="text-gray-500 mt-2">
              Keep track of everything that needs
              to be completed for your wedding.
            </p>

          </div>

          {/* ACTION BUTTONS */}

          <div className="flex flex-col sm:flex-row gap-3">

            {/* AI BUTTON */}

            <button
              type="button"
              onClick={handleGenerateAITasks}
              disabled={aiLoading}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              {aiLoading
                ? "🤖 Generating..."
                : "✨ Generate AI Tasks"}
            </button>

            {/* ADD TASK */}

            <Link
              to={`/weddings/${weddingId}/tasks/new`}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium text-center transition"
            >
              + Add Task
            </Link>

          </div>

        </div>

        {/* ================================
            STATISTICS
        ================================= */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          {/* TOTAL */}

          <div className="bg-white rounded-xl shadow-md p-5">

            <p className="text-gray-500">
              Total Tasks
            </p>

            <p className="text-3xl font-bold text-pink-600 mt-2">
              {tasks.length}
            </p>

          </div>

          {/* COMPLETED */}

          <div className="bg-white rounded-xl shadow-md p-5">

            <p className="text-gray-500">
              Completed
            </p>

            <p className="text-3xl font-bold text-green-600 mt-2">
              {completedTasks}
            </p>

          </div>

          {/* PENDING */}

          <div className="bg-white rounded-xl shadow-md p-5">

            <p className="text-gray-500">
              Pending
            </p>

            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {pendingTasks}
            </p>

          </div>

          {/* HIGH PRIORITY */}

          <div className="bg-white rounded-xl shadow-md p-5">

            <p className="text-gray-500">
              High Priority
            </p>

            <p className="text-3xl font-bold text-red-500 mt-2">
              {highPriorityTasks}
            </p>

          </div>

        </div>

        {/* ================================
            PROGRESS
        ================================= */}

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

          <div className="flex justify-between items-center mb-3">

            <h2 className="text-xl font-semibold">
              Planning Progress
            </h2>

            <span className="font-bold text-pink-600">
              {progress}%
            </span>

          </div>

          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

            <div
              className="h-full bg-pink-600 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <p className="text-sm text-gray-500 mt-3">
            {completedTasks} of{" "}
            {tasks.length} tasks completed
          </p>

        </div>

        {/* ================================
            FILTERS
        ================================= */}

        <div className="bg-white rounded-xl shadow-md p-5 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >

            <option value="All">
              All Tasks
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>

          {/* PRIORITY */}

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >

            <option value="All">
              All Priorities
            </option>

            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>

          </select>

        </div>

        {/* ================================
            TASK LIST
        ================================= */}

        {loading ? (

          <div className="bg-white rounded-2xl shadow-md p-10 text-center">

            <p className="text-gray-500">
              Loading tasks...
            </p>

          </div>

        ) : filteredTasks.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-md p-10 text-center">

            <h2 className="text-2xl font-semibold text-gray-800">
              No Tasks Found
            </h2>

            <p className="text-gray-500 mt-2">
              Start adding tasks to organize
              your wedding planning.
            </p>

            <Link
              to={`/weddings/${weddingId}/tasks/new`}
              className="inline-block mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg"
            >
              + Add First Task
            </Link>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredTasks.map((task) => (

              <TaskCard
                key={task._id}
                task={task}
                onToggle={toggleTask}
                onDelete={removeTask}
              />

            ))}

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}

export default TaskDashboard;