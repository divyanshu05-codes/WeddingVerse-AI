const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    wedding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
      default: null,
      index: true,
    },

    type: {
      type: String,
      enum: [
        "WEDDING_APPROACHING",
        "TASK_OVERDUE",
        "TASK_DUE_SOON",
        "HIGH_PRIORITY_TASK",
        "VENDOR_PAYMENT",
        "BUDGET_WARNING",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    severity: {
      type: String,
      enum: [
        "info",
        "success",
        "warning",
        "danger",
      ],
      default: "info",
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    entityType: {
      type: String,
      enum: [
        "Wedding",
        "Task",
        "Vendor",
        "Budget",
        null,
      ],
      default: null,
    },

    uniqueKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Notification",
  notificationSchema
);