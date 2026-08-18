import { useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import TaskForm from "../components/TaskForm";
import { createTask } from "../services/task.api";

function CreateTask() {
  const { weddingId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const handleCreate = async (data) => {
    try {
      setLoading(true);

      await createTask(
        weddingId,
        data
      );

      toast.success(
        "Task created successfully."
      );

      navigate(
        `/weddings/${weddingId}/tasks`
      );
    } catch (error) {
      console.error(
        "Failed to create task:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to create task."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-pink-600 mb-2">
          Add Planning Task
        </h1>

        <p className="text-gray-500 mb-8">
          Add a task to your wedding planning
          checklist.
        </p>

        <TaskForm
          onSubmit={handleCreate}
          loading={loading}
        />

      </div>

    </DashboardLayout>
  );
}

export default CreateTask;