const weddingRepository = require("../repositories/wedding.repository");
const taskRepository = require("../repositories/task.repository");
const budgetRepository = require("../repositories/budget.repository");
const guestRepository = require("../repositories/guest.repository");
const vendorRepository = require("../repositories/vendor.repository");

const {
  generateWeddingPlan,
  generateWeddingTasks: generateTasksFromAI,
  generateBudgetAnalysis,
  generateTimelineAnalysis,
  generateGuestAnalysis,
  generateInvitation,
  generateVendorAnalysis,
  generateWeddingChatResponse,
  generateWeddingInsights,
} = require("../services/ai.service");

// ======================================================
// GENERATE WEDDING PLAN
// ======================================================

const createWeddingPlan = async (req, res, next) => {
  try {
    const { weddingId } = req.params;

    // ---------------------------------------------
    // Find wedding belonging to logged-in user
    // ---------------------------------------------

    const wedding =
      await weddingRepository.findByIdAndOwner(
        weddingId,
        req.user._id
      );

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found.",
      });
    }

    // ---------------------------------------------
    // Generate plan using Gemini
    // ---------------------------------------------

    const plan = await generateWeddingPlan(wedding);

    if (!plan) {
      return res.status(500).json({
        success: false,
        message: "AI did not generate a wedding plan.",
      });
    }

    // ---------------------------------------------
    // SAVE PLAN TO MONGODB
    // ---------------------------------------------

const updatedWedding =
  await weddingRepository.updateByIdAndOwner(
    weddingId,
    req.user._id,
    {
      aiWeddingPlan: plan,
    }
  );

    // ---------------------------------------------
    // Verify that plan was actually saved
    // ---------------------------------------------

    console.log(
      "Wedding plan saved:",
      updatedWedding.aiWeddingPlan
        ? "YES"
        : "NO"
    );

    // ---------------------------------------------
    // Send generated plan to frontend
    // ---------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "Wedding plan generated successfully.",
      data: {
        plan: updatedWedding.aiWeddingPlan,
      },
    });

  } catch (error) {
    console.error(
      "Wedding Plan Generation Error:",
      error
    );

    next(error);
  }
};

// ======================================================
// GET SAVED WEDDING PLAN
// ======================================================

const getWeddingPlan = async (req, res, next) => {
  try {
    const { weddingId } = req.params;

    // ---------------------------------------------
    // Find wedding belonging to logged-in user
    // ---------------------------------------------

    const wedding =
      await weddingRepository.findByIdAndOwner(
        weddingId,
        req.user._id
      );

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found.",
      });
    }

    // ---------------------------------------------
    // Debug MongoDB saved value
    // ---------------------------------------------

    console.log(
      "Saved wedding plan:",
      wedding.aiWeddingPlan
        ? "FOUND"
        : "EMPTY"
    );

    // ---------------------------------------------
    // Return saved AI plan
    // ---------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "Wedding plan fetched successfully.",
      data: {
        plan: wedding.aiWeddingPlan || "",
      },
    });

  } catch (error) {
    console.error(
      "Get Wedding Plan Error:",
      error
    );

    next(error);
  }
};

// ======================================================
// GENERATE AI WEDDING TASKS
// ======================================================

const generateWeddingTasks = async (req, res, next) => {
  try {
    const { weddingId } = req.params;

    // ---------------------------------------------
    // Find wedding belonging to logged-in user
    // ---------------------------------------------

    const wedding =
      await weddingRepository.findByIdAndOwner(
        weddingId,
        req.user._id
      );

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found.",
      });
    }

    // ---------------------------------------------
    // Generate tasks using Gemini
    // ---------------------------------------------

    const aiTasks =
      await generateTasksFromAI(wedding);

    // ---------------------------------------------
    // Save tasks to MongoDB
    // ---------------------------------------------

    const savedTasks = [];

    for (const task of aiTasks) {

      // Skip invalid tasks
      if (!task.title) {
        continue;
      }

      const taskData = {
        wedding: weddingId,

        title: task.title,

        description:
          task.description || "",

        category:
          task.category || "Other",

        priority:
          task.priority || "Medium",

        dueDate:
          task.dueDate
            ? new Date(task.dueDate)
            : null,

        completed: false,
      };

      const savedTask =
        await taskRepository.create(taskData);

      savedTasks.push(savedTask);
    }

    // ---------------------------------------------
    // Send saved tasks to frontend
    // ---------------------------------------------

    return res.status(201).json({
      success: true,

      message:
        "AI wedding tasks generated successfully.",

      data: savedTasks,
    });

  } catch (error) {

    // Keep actual errors visible in backend
    console.error(
      "AI Task Generation Error:",
      error
    );

    next(error);
  }
};

// ======================================================
// AI BUDGET ANALYSIS
// ======================================================

const analyzeWeddingBudget = async (
  req,
  res,
  next
) => {
  try {
    const { weddingId } = req.params;

    // ---------------------------------------------
    // Find wedding belonging to logged-in user
    // ---------------------------------------------

    const wedding =
      await weddingRepository.findByIdAndOwner(
        weddingId,
        req.user._id
      );

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found.",
      });
    }

    // ---------------------------------------------
    // Get actual wedding expenses
    // ---------------------------------------------

    const expenses =
      await budgetRepository.findAllByWedding(
        weddingId
      );

    // ---------------------------------------------
    // Generate AI analysis
    // ---------------------------------------------

    const analysis =
      await generateBudgetAnalysis(
        wedding,
        expenses
      );

    // ---------------------------------------------
    // SAVE AI ANALYSIS
    // ---------------------------------------------

    wedding.aiBudgetAnalysis = analysis;

    await wedding.save();

    // ---------------------------------------------
    // Send analysis to frontend
    // ---------------------------------------------

    return res.status(200).json({
      success: true,

      message:
        "AI budget analysis generated and saved successfully.",

      data: {
        analysis,
      },
    });

  } catch (error) {
    console.error(
      "AI Budget Analysis Error:",
      error
    );

    next(error);
  }
};

// ======================================================
// GET SAVED AI BUDGET ANALYSIS
// ======================================================

const getBudgetAnalysis = async (
  req,
  res,
  next
) => {
  try {
    const { weddingId } = req.params;

    // ---------------------------------------------
    // Find wedding belonging to logged-in user
    // ---------------------------------------------

    const wedding =
      await weddingRepository.findByIdAndOwner(
        weddingId,
        req.user._id
      );

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found.",
      });
    }

    // ---------------------------------------------
    // Return saved analysis
    // ---------------------------------------------

    return res.status(200).json({
      success: true,

      message:
        "AI budget analysis fetched successfully.",

      data: {
        analysis:
          wedding.aiBudgetAnalysis || "",
      },
    });

  } catch (error) {
    console.error(
      "Get AI Budget Analysis Error:",
      error
    );

    next(error);
  }
};

// ======================================================
// AI TIMELINE ANALYSIS
// ======================================================

const analyzeWeddingTimeline = async (
  req,
  res,
  next
) => {
  try {
    const { weddingId } = req.params;

    // --------------------------------------------------
    // Find wedding belonging to logged-in user
    // --------------------------------------------------

    const wedding =
      await weddingRepository.findByIdAndOwner(
        weddingId,
        req.user._id
      );

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found.",
      });
    }

    // --------------------------------------------------
    // Get existing wedding tasks
    // --------------------------------------------------

    const tasks =
      await taskRepository.findAllByWedding(
        weddingId
      );

    // --------------------------------------------------
    // Generate AI timeline analysis
    // --------------------------------------------------

    const analysis =
      await generateTimelineAnalysis(
        wedding,
        tasks
      );

    if (!analysis) {
      return res.status(500).json({
        success: false,
        message:
          "AI did not generate timeline analysis.",
      });
    }

    // --------------------------------------------------
    // Save analysis to wedding
    // --------------------------------------------------

    wedding.aiTimelineAnalysis = analysis;

    await wedding.save();

    console.log(
      "Timeline analysis saved:",
      wedding.aiTimelineAnalysis
        ? "YES"
        : "NO"
    );

    // --------------------------------------------------
    // Send analysis to frontend
    // --------------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "AI timeline analysis generated and saved successfully.",
      data: {
        analysis: wedding.aiTimelineAnalysis,
      },
    });

  } catch (error) {
    console.error(
      "AI Timeline Analysis Error:",
      error
    );

    next(error);
  }
};


// ======================================================
// GET SAVED AI TIMELINE ANALYSIS
// ======================================================

const getTimelineAnalysis = async (
  req,
  res,
  next
) => {
  try {
    const { weddingId } = req.params;

    // --------------------------------------------------
    // Find wedding belonging to logged-in user
    // --------------------------------------------------

    const wedding =
      await weddingRepository.findByIdAndOwner(
        weddingId,
        req.user._id
      );

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found.",
      });
    }

    // --------------------------------------------------
    // Return saved analysis
    // --------------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "AI timeline analysis fetched successfully.",
      data: {
        analysis:
          wedding.aiTimelineAnalysis || "",
      },
    });

  } catch (error) {
    console.error(
      "Get AI Timeline Analysis Error:",
      error
    );

    next(error);
  }
};

// ======================================================
// AI GUEST ANALYSIS
// ======================================================

const analyzeWeddingGuests = async (
  req,
  res,
  next
) => {
  try {
    const { weddingId } = req.params;

    // ---------------------------------------------
    // Find wedding belonging to logged-in user
    // ---------------------------------------------

    const wedding =
      await weddingRepository.findByIdAndOwner(
        weddingId,
        req.user._id
      );

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found.",
      });
    }

    // ---------------------------------------------
    // Get actual guests
    // ---------------------------------------------

    const guests =
      await guestRepository.findAllByWedding(
        weddingId
      );

    // ---------------------------------------------
    // Generate AI guest analysis
    // ---------------------------------------------

    const analysis =
      await generateGuestAnalysis(
        wedding,
        guests
      );

    if (!analysis) {
      return res.status(500).json({
        success: false,
        message:
          "AI did not generate guest analysis.",
      });
    }

    // ---------------------------------------------
    // SAVE ANALYSIS TO WEDDING
    // ---------------------------------------------

    wedding.aiGuestAnalysis = analysis;

    await wedding.save();

    // ---------------------------------------------
    // Send analysis to frontend
    // ---------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "AI guest analysis generated and saved successfully.",
      data: {
        analysis,
      },
    });

  } catch (error) {
    console.error(
      "AI Guest Analysis Error:",
      error
    );

    next(error);
  }
};


// ======================================================
// GET SAVED AI GUEST ANALYSIS
// ======================================================

const getGuestAnalysis = async (
  req,
  res,
  next
) => {
  try {
    const { weddingId } = req.params;

    // ---------------------------------------------
    // Find wedding belonging to logged-in user
    // ---------------------------------------------

    const wedding =
      await weddingRepository.findByIdAndOwner(
        weddingId,
        req.user._id
      );

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found.",
      });
    }

    // ---------------------------------------------
    // Return saved analysis
    // ---------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "AI guest analysis fetched successfully.",
      data: {
        analysis:
          wedding.aiGuestAnalysis || "",
      },
    });

  } catch (error) {
    console.error(
      "Get AI Guest Analysis Error:",
      error
    );

    next(error);
  }
};

// ======================================================
// AI INVITATION GENERATOR
// ======================================================

const generateWeddingInvitation = async (
  req,
  res,
  next
) => {
  try {
    const { weddingId } = req.params;

    // ---------------------------------------------
    // Find wedding belonging to logged-in user
    // ---------------------------------------------

    const wedding =
      await weddingRepository.findByIdAndOwner(
        weddingId,
        req.user._id
      );

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found.",
      });
    }

    // ---------------------------------------------
    // Get invitation options
    // ---------------------------------------------

    const {
      style,
      language,
      customMessage,
    } = req.body || {};

    // ---------------------------------------------
    // Generate invitation using Gemini
    // ---------------------------------------------

    const invitation =
      await generateInvitation(
        wedding,
        {
          style,
          language,
          customMessage,
        }
      );

    if (!invitation) {
      return res.status(500).json({
        success: false,
        message:
          "AI did not generate an invitation.",
      });
    }

    // ---------------------------------------------
    // SAVE INVITATION TO MONGODB
    // ---------------------------------------------

    wedding.aiInvitation = invitation;

    await wedding.save();

    console.log(
      "Wedding invitation saved:",
      wedding.aiInvitation
        ? "YES"
        : "NO"
    );

    // ---------------------------------------------
    // Return generated invitation
    // ---------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "Wedding invitation generated and saved successfully.",
      data: {
        invitation,
      },
    });

  } catch (error) {
    console.error(
      "AI Invitation Generation Error:",
      error
    );

    next(error);
  }
};


// ======================================================
// GET SAVED AI INVITATION
// ======================================================

const getWeddingInvitation = async (
  req,
  res,
  next
) => {
  try {
    const { weddingId } = req.params;

    // ---------------------------------------------
    // Find wedding belonging to logged-in user
    // ---------------------------------------------

    const wedding =
      await weddingRepository.findByIdAndOwner(
        weddingId,
        req.user._id
      );

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found.",
      });
    }

    // ---------------------------------------------
    // Return saved invitation
    // ---------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "Wedding invitation fetched successfully.",
      data: {
        invitation:
          wedding.aiInvitation || "",
      },
    });

  } catch (error) {
    console.error(
      "Get AI Invitation Error:",
      error
    );

    next(error);
  }
};

// ======================================================
// AI VENDOR ASSISTANT
// ======================================================

const analyzeWeddingVendors = async (
  req,
  res,
  next
) => {
  try {
    const { weddingId } = req.params;

    // ---------------------------------------------
    // Find wedding belonging to logged-in user
    // ---------------------------------------------

    const wedding =
      await weddingRepository.findByIdAndOwner(
        weddingId,
        req.user._id
      );

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found.",
      });
    }

    // ---------------------------------------------
    // Get existing vendors
    // ---------------------------------------------

    const vendors =
      await vendorRepository.getVendorsByWedding(
        weddingId
      );

    // ---------------------------------------------
    // Generate AI vendor analysis
    // ---------------------------------------------

    const analysis =
      await generateVendorAnalysis(
        wedding,
        vendors
      );

    if (!analysis) {
      return res.status(500).json({
        success: false,
        message:
          "AI did not generate vendor analysis.",
      });
    }

    // ---------------------------------------------
    // SAVE AI ANALYSIS
    // ---------------------------------------------

    wedding.aiVendorAnalysis = analysis;

    await wedding.save();

    console.log(
      "Vendor analysis saved:",
      wedding.aiVendorAnalysis
        ? "YES"
        : "NO"
    );

    // ---------------------------------------------
    // SEND ANALYSIS TO FRONTEND
    // ---------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "AI vendor analysis generated and saved successfully.",
      data: {
        analysis,
      },
    });

  } catch (error) {
    console.error(
      "AI Vendor Analysis Error:",
      error
    );

    next(error);
  }
};

// ======================================================
// GET SAVED AI VENDOR ANALYSIS
// ======================================================

const getVendorAnalysis = async (
  req,
  res,
  next
) => {
  try {
    const { weddingId } = req.params;

    // ---------------------------------------------
    // Find wedding belonging to logged-in user
    // ---------------------------------------------

    const wedding =
      await weddingRepository.findByIdAndOwner(
        weddingId,
        req.user._id
      );

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found.",
      });
    }

    // ---------------------------------------------
    // Return saved analysis
    // ---------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "AI vendor analysis fetched successfully.",
      data: {
        analysis:
          wedding.aiVendorAnalysis || "",
      },
    });

  } catch (error) {
    console.error(
      "Get AI Vendor Analysis Error:",
      error
    );

    next(error);
  }
};

// ======================================================
// AI WEDDING CHATBOT
// ======================================================

const chatWithWeddingAI = async (
  req,
  res,
  next
) => {
  try {
    const { weddingId } = req.params;

    const { message } = req.body;

    // ---------------------------------------------
    // Validate message
    // ---------------------------------------------

    if (
      !message ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    // ---------------------------------------------
    // Find wedding belonging to logged-in user
    // ---------------------------------------------

    const wedding =
      await weddingRepository.findByIdAndOwner(
        weddingId,
        req.user._id
      );

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found.",
      });
    }

    // ---------------------------------------------
    // Get wedding tasks
    // ---------------------------------------------

    const tasks =
      await taskRepository.findAllByWedding(
        weddingId
      );

    // ---------------------------------------------
    // Get wedding guests
    // ---------------------------------------------

    const guests =
      await guestRepository.findAllByWedding(
        weddingId
      );

    // ---------------------------------------------
    // Get wedding vendors
    // ---------------------------------------------

    const vendors =
      await vendorRepository.getVendorsByWedding(
        weddingId
      );

    // ---------------------------------------------
    // Get wedding expenses
    // ---------------------------------------------

    const expenses =
      await budgetRepository.findAllByWedding(
        weddingId
      );

    // ---------------------------------------------
    // Previous chat history
    // ---------------------------------------------

    const chatHistory =
      wedding.aiChatHistory || [];

    // ---------------------------------------------
    // Generate AI response
    // ---------------------------------------------

    const aiResponse =
      await generateWeddingChatResponse(
        wedding,
        tasks,
        guests,
        vendors,
        expenses,
        chatHistory,
        message.trim()
      );

    if (!aiResponse) {
      return res.status(500).json({
        success: false,
        message:
          "AI did not generate a response.",
      });
    }

    // ---------------------------------------------
    // Save USER message
    // ---------------------------------------------

    wedding.aiChatHistory.push({
      role: "user",
      message: message.trim(),
    });

    // ---------------------------------------------
    // Save AI response
    // ---------------------------------------------

    wedding.aiChatHistory.push({
      role: "assistant",
      message: aiResponse,
    });

    // ---------------------------------------------
    // Save to MongoDB
    // ---------------------------------------------

    await wedding.save();

    console.log(
      "AI chat saved:",
      wedding.aiChatHistory.length,
      "messages"
    );

    // ---------------------------------------------
    // Send response
    // ---------------------------------------------

    return res.status(200).json({
      success: true,
      message: "AI response generated successfully.",
      data: {
        response: aiResponse,
      },
    });

  } catch (error) {
    console.error(
      "AI Wedding Chat Error:",
      error
    );

    next(error);
  }
};

// ======================================================
// GET SAVED AI CHAT HISTORY
// ======================================================

const getWeddingChatHistory = async (
  req,
  res,
  next
) => {
  try {
    const { weddingId } = req.params;

    // ---------------------------------------------
    // Find wedding belonging to logged-in user
    // ---------------------------------------------

    const wedding =
      await weddingRepository.findByIdAndOwner(
        weddingId,
        req.user._id
      );

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found.",
      });
    }

    // ---------------------------------------------
    // Return saved chat history
    // ---------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "Wedding chat history fetched successfully.",
      data: {
        history: wedding.aiChatHistory || [],
      },
    });

  } catch (error) {
    console.error(
      "Get AI Chat History Error:",
      error
    );

    next(error);
  }
};

// ======================================================
// AI WEDDING INSIGHTS
// ======================================================

const generateWeddingInsightsController = async (
  req,
  res,
  next
) => {
  try {
    const { weddingId } =
      req.params;

    // ---------------------------------------------
    // Find wedding belonging to logged-in user
    // ---------------------------------------------

    const wedding =
      await weddingRepository.findByIdAndOwner(
        weddingId,
        req.user._id
      );

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found.",
      });
    }

    // ---------------------------------------------
    // Load wedding data
    // ---------------------------------------------

    const [
      tasks,
      guests,
      vendors,
      expenses,
    ] = await Promise.all([
      taskRepository.findAllByWedding(
        weddingId
      ),

      guestRepository.findAllByWedding(
        weddingId
      ),

      vendorRepository.getVendorsByWedding(
        weddingId
      ),

      budgetRepository.findAllByWedding(
        weddingId
      ),
    ]);

    // ---------------------------------------------
    // Generate AI insights
    // ---------------------------------------------

    const insights =
      await generateWeddingInsights(
        wedding,
        tasks,
        guests,
        vendors,
        expenses
      );

    if (!insights) {
      return res.status(500).json({
        success: false,
        message:
          "AI did not generate wedding insights.",
      });
    }

    // ---------------------------------------------
    // Save to MongoDB
    // ---------------------------------------------

    wedding.aiInsights =
      JSON.stringify(insights);

    await wedding.save();

    console.log(
      "Wedding AI insights saved:",
      wedding.aiInsights
        ? "YES"
        : "NO"
    );

    // ---------------------------------------------
    // Send to frontend
    // ---------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "AI wedding insights generated successfully.",
      data: {
        insights,
      },
    });
  } catch (error) {
    console.error(
      "AI Wedding Insights Error:",
      error
    );

    next(error);
  }
};


// ======================================================
// GET SAVED AI WEDDING INSIGHTS
// ======================================================

const getWeddingInsights = async (
  req,
  res,
  next
) => {
  try {
    const { weddingId } =
      req.params;

    const wedding =
      await weddingRepository.findByIdAndOwner(
        weddingId,
        req.user._id
      );

    if (!wedding) {
      return res.status(404).json({
        success: false,
        message: "Wedding not found.",
      });
    }

    let insights = null;

    if (wedding.aiInsights) {
      try {
        insights =
          JSON.parse(
            wedding.aiInsights
          );
      } catch (error) {
        console.error(
          "Failed to parse saved AI insights:",
          error
        );

        insights = null;
      }
    }

    return res.status(200).json({
      success: true,
      message:
        "AI wedding insights fetched successfully.",
      data: {
        insights,
      },
    });
  } catch (error) {
    console.error(
      "Get AI Wedding Insights Error:",
      error
    );

    next(error);
  }
};

// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  createWeddingPlan,
  getWeddingPlan,
  generateWeddingTasks,
  analyzeWeddingBudget,
  getBudgetAnalysis,
  analyzeWeddingTimeline,
  getTimelineAnalysis,
  analyzeWeddingGuests,
  getGuestAnalysis,
  generateWeddingInvitation,
  getWeddingInvitation,
  analyzeWeddingVendors,
  getVendorAnalysis,
  chatWithWeddingAI,
  getWeddingChatHistory,
  generateWeddingInsightsController,
  getWeddingInsights,
};