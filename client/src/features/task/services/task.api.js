import api from "../../../api/axios";

export const getTasks = (weddingId) => {
  return api.get(`/tasks/wedding/${weddingId}`);
};

export const createTask = (weddingId, data) => {
  return api.post(
    `/tasks/wedding/${weddingId}`,
    data
  );
};

export const updateTask = (weddingId, taskId, data) => {
  return api.patch(
    `/tasks/wedding/${weddingId}/${taskId}`,
    data
  );
};

export const deleteTask = (weddingId, taskId) => {
  return api.delete(
    `/tasks/wedding/${weddingId}/${taskId}`
  );
};

export const generateAITasks = (weddingId) => {
  return api.post(
    `/ai/weddings/${weddingId}/tasks`
  );
};