import api from "../../../api/axios";

// ======================================================
// GENERATE WEDDING PLAN
// ======================================================

export const generateWeddingPlan = (weddingId) => {
  return api.post(
    `/ai/weddings/${weddingId}/plan`
  );
};


// ======================================================
// GET SAVED WEDDING PLAN
// ======================================================

export const getWeddingPlan = (weddingId) => {
  return api.get(
    `/ai/weddings/${weddingId}/plan`
  );
};


// ======================================================
// GENERATE AI WEDDING TASKS
// ======================================================

export const generateWeddingTasks = (weddingId) => {
  return api.post(
    `/ai/weddings/${weddingId}/tasks`
  );
};


// ======================================================
// AI BUDGET ANALYSIS
// ======================================================

export const analyzeWeddingBudget = (weddingId) => {
  return api.post(
    `/ai/weddings/${weddingId}/budget-analysis`
  );
};


// ======================================================
// GET SAVED AI BUDGET ANALYSIS
// ======================================================

export const getBudgetAnalysis = (weddingId) => {
  return api.get(
    `/ai/weddings/${weddingId}/budget-analysis`
  );
};


// ======================================================
// AI TIMELINE ADVISOR
// ======================================================

// Generate and save timeline analysis
export const analyzeWeddingTimeline = (weddingId) => {
  return api.post(
    `/ai/weddings/${weddingId}/timeline-advisor`
  );
};


// Get saved timeline analysis
export const getTimelineAnalysis = (weddingId) => {
  return api.get(
    `/ai/weddings/${weddingId}/timeline-advisor`
  );
};

// ======================================================
// AI GUEST ANALYSIS
// ======================================================

// Generate Guest Analysis
export const analyzeWeddingGuests = (weddingId) => {
  return api.post(
    `/ai/weddings/${weddingId}/guest-analysis`
  );
};

// Get Saved Guest Analysis
export const getGuestAnalysis = (weddingId) => {
  return api.get(
    `/ai/weddings/${weddingId}/guest-analysis`
  );
};

// ======================================================
// AI INVITATION GENERATOR
// ======================================================

// Generate Invitation
export const generateWeddingInvitation = (
  weddingId,
  options
) => {
  return api.post(
    `/ai/weddings/${weddingId}/invitation`,
    options
  );
};

// Get Saved Invitation
export const getWeddingInvitation = (
  weddingId
) => {
  return api.get(
    `/ai/weddings/${weddingId}/invitation`
  );
};

// ======================================================
// AI VENDOR ASSISTANT
// ======================================================

// Generate Vendor Analysis
export const analyzeWeddingVendors = (weddingId) => {
  return api.post(
    `/ai/weddings/${weddingId}/vendor-analysis`
  );
};


// Get Saved Vendor Analysis
export const getVendorAnalysis = (weddingId) => {
  return api.get(
    `/ai/weddings/${weddingId}/vendor-analysis`
  );
};

// ======================================================
// AI WEDDING CHATBOT
// ======================================================

// Send message to AI
export const sendWeddingChatMessage = (
  weddingId,
  message
) => {
  return api.post(
    `/ai/weddings/${weddingId}/chat`,
    {
      message,
    }
  );
};


// Get saved chat history
export const getWeddingChatHistory = (
  weddingId
) => {
  return api.get(
    `/ai/weddings/${weddingId}/chat`
  );
};