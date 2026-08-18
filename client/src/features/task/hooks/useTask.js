import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getTasks,
  deleteTask,
  updateTask,
} from "../services/task.api";

function useTask(weddingId) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getTasks(weddingId);

      setTasks(res.data.data || []);
    } catch (error) {
      console.error(
        "Failed to load tasks:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load tasks."
      );
    } finally {
      setLoading(false);
    }
  }, [weddingId]);

  useEffect(() => {
    if (weddingId) {
      fetchTasks();
    }
  }, [weddingId, fetchTasks]);

  const removeTask = async (taskId) => {
    try {
      await deleteTask(weddingId, taskId);

      setTasks((prev) =>
        prev.filter(
          (task) => task._id !== taskId
        )
      );

      toast.success(
        "Task deleted successfully."
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete task."
      );
    }
  };

  const toggleTask = async (task) => {
    try {
      const res = await updateTask(
        weddingId,
        task._id,
        {
          completed: !task.completed,
        }
      );

      setTasks((prev) =>
        prev.map((item) =>
          item._id === task._id
            ? res.data.data
            : item
        )
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update task."
      );
    }
  };

  return {
    tasks,
    loading,
    fetchTasks,
    removeTask,
    toggleTask,
  };
}

export default useTask;