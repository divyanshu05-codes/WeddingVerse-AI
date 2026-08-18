const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    wedding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

category: {
  type: String,
  enum: [
    "Venue",
    "Decoration",
    "Photography",
    "Catering",
    "Guests",
    "Makeup",
    "Invitation",
    "Clothing",
    "Entertainment",
    "Transport",
    "Budget",
    "Other",
  ],
  default: "Other",
},

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    dueDate: {
      type: Date,
      default: null,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);