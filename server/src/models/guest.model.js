const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema(
  {
    wedding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: "",
    },

    side: {
      type: String,
      enum: ["Bride", "Groom"],
      default: "Bride",
    },

    rsvpStatus: {
      type: String,
      enum: ["Pending", "Accepted", "Declined"],
      default: "Pending",
    },

    mealPreference: {
      type: String,
      enum: ["Veg", "Non-Veg", "Jain", "Vegan"],
      default: "Veg",
    },

    numberOfGuests: {
      type: Number,
      default: 1,
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

module.exports = mongoose.model("Guest", guestSchema);