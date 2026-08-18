import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import TaskForm from "../components/TaskForm";

import {
  getTasks,
  updateTask,
} from "../services/task.api";

function EditTask() {
  const {
    weddingId,
    taskId,
  } = useParams();

  const navigate = useNavigate();

  const [task, setTask] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    fetchTask();
  }, [weddingId, taskId]);

  const fetchTask = async () => {
    try {
      const res =
        await getTasks(weddingId);

      const foundTask =
        res.data.data?.find(
          (item) =>
            item._id === taskId
        );

      if (!foundTask) {
        toast.error(
          "Task not found."
        );

        navigate(
          `/weddings/${weddingId}/tasks`
        );

        return;
      }

      setTask(foundTask);
    } catch (error) {
      console.error(
        "Failed to load task:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load task."
      );

      navigate(
        `/weddings/${weddingId}/tasks`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (
    data
  ) => {
    try {
      setSaving(true);

      await updateTask(
        weddingId,
        taskId,
        data
      );

      toast.success(
        "Task updated successfully."
      );

      navigate(
        `/weddings/${weddingId}/tasks`
      );
    } catch (error) {
      console.error(
        "Failed to update task:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update task."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>

        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            Loading task...
          </p>
        </div>

      </DashboardLayout>
    );
  }

  if (!task) {
    return (
      <DashboardLayout>

        <div className="text-center py-20">
          <p className="text-gray-500">
            Task not found.
          </p>
        </div>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-pink-600 mb-2">
          Edit Planning Task
        </h1>

        <p className="text-gray-500 mb-8">
          Update your wedding planning task.
        </p>

        <TaskForm
          initialData={task}
          onSubmit={handleUpdate}
          loading={saving}
        />

      </div>

    </DashboardLayout>
  );
}

export default EditTask;