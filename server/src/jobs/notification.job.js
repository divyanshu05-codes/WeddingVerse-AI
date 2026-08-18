const cron = require("node-cron");

const User = require("../models/user.model");

const {
  generateNotifications,
} = require("../services/notification.service");

// ======================================================
// NOTIFICATION JOB
// ======================================================

const startNotificationJob = () => {
  // Run every minute
  cron.schedule("* * * * *", async () => {
    try {
      const users = await User.find({})
        .select("_id")
        .lean();

      for (const user of users) {
        try {
          await generateNotifications(user._id);
        } catch (error) {
          console.error(
            `❌ Notification check failed for user ${user._id}:`,
            error.message
          );
        }
      }
    } catch (error) {
      console.error(
        "❌ Notification scheduler error:",
        error.message
      );
    }
  });
};

module.exports = {
  startNotificationJob,
};