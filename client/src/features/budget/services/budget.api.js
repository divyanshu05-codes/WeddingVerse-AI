import api from "../../../api/axios";

// Create Expense
export const createExpense = (data) =>
  api.post("/budget", data);

// Get Expenses By Wedding
export const getExpensesByWedding = (weddingId) =>
  api.get(`/budget/wedding/${weddingId}`);

// Get Expense By ID
export const getExpenseById = (id) =>
  api.get(`/budget/${id}`);

// Update Expense
export const updateExpense = (id, data) =>
  api.patch(`/budget/${id}`, data);

// Delete Expense
export const deleteExpense = (id) =>
  api.delete(`/budget/${id}`);