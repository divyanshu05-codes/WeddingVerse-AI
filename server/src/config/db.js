const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/weddingverse";

    await mongoose.connect(mongoUri);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:");
    console.error(error.message);
    console.warn(
      "⚠️ Tip: Ensure MongoDB is running locally or specify a valid MONGO_URI in server/.env"
    );
  }
};

module.exports = connectDB;