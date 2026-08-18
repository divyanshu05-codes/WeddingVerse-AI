import api from "../../../api/axios";

// Create Guest
export const createGuest = (data) =>
  api.post("/guests", data);

// Get Guests By Wedding
export const getGuestsByWedding = (weddingId) =>
  api.get(`/guests/wedding/${weddingId}`);

// Get Guest By ID
export const getGuestById = (id) =>
  api.get(`/guests/${id}`);

// Update Guest
export const updateGuest = (id, data) =>
  api.patch(`/guests/${id}`, data);

// Delete Guest
export const deleteGuest = (id) =>
  api.delete(`/guests/${id}`);