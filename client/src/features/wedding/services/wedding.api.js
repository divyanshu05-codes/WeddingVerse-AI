import api from "../../../api/axios";

// Create
export const createWedding = (data) =>
  api.post("/weddings", data);

// Read
export const getAllWeddings = () =>
  api.get("/weddings");

export const getWeddingById = (id) =>
  api.get(`/weddings/${id}`);

// Update
export const updateWedding = (id, data) =>
  api.patch(`/weddings/${id}`, data);

// Delete
export const deleteWedding = (id) =>
  api.delete(`/weddings/${id}`);