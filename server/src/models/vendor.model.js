const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    wedding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wedding",
      required: true,
    },

    vendorName: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      trim: true,
      default: "",
    },

    category: {
      type: String,
      enum: [
        "Photographer",
        "Videographer",
        "Decorator",
        "Caterer",
        "Makeup",
        "DJ",
        "Band",
        "Transport",
        "Hotel",
        "Cake",
        "Jewellery",
        "Clothing",
        "Invitation",
        "Others",
      ],
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    totalCost: {
      type: Number,
      required: true,
      min: 0,
    },

    advancePaid: {
      type: Number,
      default: 0,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Partial", "Paid"],
      default: "Pending",
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
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

module.exports = mongoose.model("Vendor", vendorSchema);