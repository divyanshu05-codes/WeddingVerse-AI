const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const aiController = require("../controllers/ai.controller");


// ======================================================
// GENERATE WEDDING PLAN
// ======================================================

router.post(
  "/weddings/:weddingId/plan",
  protect,
  aiController.createWeddingPlan
);


// ======================================================
// GET SAVED WEDDING PLAN
// ======================================================

router.get(
  "/weddings/:weddingId/plan",
  protect,
  aiController.getWeddingPlan
);


// ======================================================
// GENERATE AI WEDDING TASKS
// ======================================================

router.post(
  "/weddings/:weddingId/tasks",
  protect,
  aiController.generateWeddingTasks
);


// ======================================================
// AI BUDGET ANALYSIS
// ======================================================

// Generate Budget Analysis
router.post(
  "/weddings/:weddingId/budget-analysis",
  protect,
  aiController.analyzeWeddingBudget
);


// Get Saved Budget Analysis
router.get(
  "/weddings/:weddingId/budget-analysis",
  protect,
  aiController.getBudgetAnalysis
);


// ======================================================
// AI TIMELINE ANALYSIS
// ======================================================

// Generate Timeline Analysis
router.post(
  "/weddings/:weddingId/timeline-advisor",
  protect,
  aiController.analyzeWeddingTimeline
);


// Get Saved Timeline Analysis
router.get(
  "/weddings/:weddingId/timeline-advisor",
  protect,
  aiController.getTimelineAnalysis
);


// ======================================================
// AI GUEST ANALYSIS
// ======================================================

// Generate Guest Analysis
router.post(
  "/weddings/:weddingId/guest-analysis",
  protect,
  aiController.analyzeWeddingGuests
);


// Get Saved Guest Analysis
router.get(
  "/weddings/:weddingId/guest-analysis",
  protect,
  aiController.getGuestAnalysis
);


// ======================================================
// AI INVITATION GENERATOR
// ======================================================

// Generate Invitation
router.post(
  "/weddings/:weddingId/invitation",
  protect,
  aiController.generateWeddingInvitation
);


// Get Saved Invitation
router.get(
  "/weddings/:weddingId/invitation",
  protect,
  aiController.getWeddingInvitation
);


// ======================================================
// AI VENDOR ASSISTANT
// ======================================================

// Generate Vendor Analysis
router.post(
  "/weddings/:weddingId/vendor-analysis",
  protect,
  aiController.analyzeWeddingVendors
);


// Get Saved Vendor Analysis
router.get(
  "/weddings/:weddingId/vendor-analysis",
  protect,
  aiController.getVendorAnalysis
);


// ======================================================
// AI WEDDING CHATBOT
// ======================================================

// Send message to AI
router.post(
  "/weddings/:weddingId/chat",
  protect,
  aiController.chatWithWeddingAI
);


// Get saved chat history
router.get(
  "/weddings/:weddingId/chat",
  protect,
  aiController.getWeddingChatHistory
);


// ======================================================
// AI WEDDING INSIGHTS
// ======================================================

// Generate AI Insights
router.post(
  "/weddings/:weddingId/insights",
  protect,
  aiController.generateWeddingInsightsController
);


// Get Saved AI Insights
router.get(
  "/weddings/:weddingId/insights",
  protect,
  aiController.getWeddingInsights
);


// ======================================================
// EXPORT ROUTER
// ======================================================

module.exports = router;