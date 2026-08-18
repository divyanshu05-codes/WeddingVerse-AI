const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    wedding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Venue",
        "Decoration",
        "Photography",
        "Catering",
        "Entertainment",
        "Transport",
        "Makeup",
        "Invitation",
        "Clothing",
        "Jewellery",
        "Miscellaneous",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    expenseDate: {
      type: Date,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Partial"],
      default: "Pending",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Budget", budgetSchema);