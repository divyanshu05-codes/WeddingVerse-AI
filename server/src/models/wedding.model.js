const mongoose = require("mongoose");

const weddingSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bride: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        lowercase: true,
        trim: true,
      },
    },

    groom: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        lowercase: true,
        trim: true,
      },
    },

    weddingDetails: {
      weddingDate: {
        type: Date,
        required: true,
      },

      weddingTime: {
        type: String,
        required: true,
      },

      venue: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },
    },

    estimatedBudget: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "Planning",
        "Booked",
        "Completed",
        "Cancelled",
      ],
      default: "Planning",
    },

    notes: {
      type: String,
      default: "",
    },

    aiWeddingPlan: {
    type: String,
    default: "",
  },

  aiBudgetAnalysis: {
  type: String,
  default: "",
},

aiTimelineAnalysis: {
  type: String,
  default: "",
},

aiGuestAnalysis: {
  type: String,
  default: "",
},

aiInvitation: {
  type: String,
  default: "",
},

aiVendorAnalysis: {
  type: String,
  default: "",
},

aiInsights: {
  type: String,
  default: "",
},

aiChatHistory: {
  type: [
    {
      role: {
        type: String,
        enum: ["user", "assistant"],
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  default: [],
},

    coverImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Wedding", weddingSchema);