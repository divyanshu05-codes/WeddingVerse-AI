import api from "../../../api/axios";

// Create Vendor
export const createVendor = (data) =>
  api.post("/vendors", data);

// Get all vendors for a wedding
export const getVendorsByWedding = (weddingId) =>
  api.get(`/vendors/wedding/${weddingId}`);

// Get vendor by ID
export const getVendorById = (id) =>
  api.get(`/vendors/${id}`);

// Update Vendor
export const updateVendor = (id, data) =>
  api.patch(`/vendors/${id}`, data);

// Delete Vendor
export const deleteVendor = (id) =>
  api.delete(`/vendors/${id}`);