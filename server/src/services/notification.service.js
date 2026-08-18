const Notification = require("../models/notification.model");
const Wedding = require("../models/wedding.model");
const Task = require("../models/task.model");
const Vendor = require("../models/vendor.model");
const Budget = require("../models/budget.model");
const { getIO } = require("../config/socket");

// ======================================================
// HELPERS
// ======================================================

const startOfDay = (date) => {
  const d = new Date(date);

  d.setHours(0, 0, 0, 0);

  return d;
};


const getDaysDifference = (from, to) => {
  const first = startOfDay(from);
  const second = startOfDay(to);

  return Math.ceil(
    (second - first) /
      (1000 * 60 * 60 * 24)
  );
};


// ======================================================
// CREATE OR UPDATE NOTIFICATION
// ======================================================

const createOrUpdateNotification = async (
  data
) => {

  const existing =
    await Notification.findOne({
      uniqueKey: data.uniqueKey,
    });


  // ====================================================
  // NOTIFICATION DOES NOT EXIST
  // ====================================================

  if (!existing) {

    const notification =
      await Notification.create(data);


    // Populate wedding before sending
    const populatedNotification =
      await Notification.findById(
        notification._id
      )
        .populate(
          "wedding",
          "bride groom weddingDetails"
        )
        .lean();


    // Send real-time notification
    const io = getIO();

    if (io && data.user) {

      io.to(
        `user:${data.user}`
      ).emit(
        "notification:new",
        populatedNotification
      );

      console.log(
        `🔔 Real-time notification sent to user:${data.user}`
      );
    }


    return populatedNotification;
  }


  // ====================================================
  // CHECK CONTENT CHANGE
  // ====================================================

  const contentChanged =
    existing.title !== data.title ||
    existing.message !== data.message ||
    existing.severity !== data.severity;


  // ====================================================
  // UPDATE EXISTING
  // ====================================================

  existing.title =
    data.title;

  existing.message =
    data.message;

  existing.severity =
    data.severity;

  existing.entityId =
    data.entityId;

  existing.entityType =
    data.entityType;

  existing.wedding =
    data.wedding;


  // If notification changed,
  // make it unread again.

  if (contentChanged) {
    existing.isRead = false;
  }


  await existing.save();


  // ====================================================
  // SEND REAL-TIME UPDATE
  // ====================================================

  if (contentChanged) {

    const populatedNotification =
      await Notification.findById(
        existing._id
      )
        .populate(
          "wedding",
          "bride groom weddingDetails"
        )
        .lean();


    const io = getIO();

    if (io && data.user) {

      io.to(
        `user:${data.user}`
      ).emit(
        "notification:update",
        populatedNotification
      );

      console.log(
        `🔄 Real-time notification update sent to user:${data.user}`
      );
    }


    return populatedNotification;
  }


  return existing;
};

// ======================================================
// DELETE NOTIFICATION
// ======================================================

const deleteNotification = async (
  uniqueKey
) => {

  const notification =
    await Notification.findOne({
      uniqueKey,
    });


  if (!notification) {
    return;
  }


  await Notification.deleteOne({
    _id: notification._id,
  });


  // ====================================================
  // SEND REAL-TIME DELETE EVENT
  // ====================================================

  const io = getIO();

  if (io && notification.user) {

    io.to(
      `user:${notification.user}`
    ).emit(
      "notification:deleted",
      {
        notificationId:
          notification._id,
      }
    );


    console.log(
      `🗑️ Real-time notification removal sent to user:${notification.user}`
    );
  }
};


// ======================================================
// GENERATE NOTIFICATIONS
// ======================================================

const generateNotifications = async (
  userId
) => {

  const weddings =
    await Wedding.find({
      owner: userId,
    }).lean();


  if (!weddings.length) {
    return;
  }


  const today =
    startOfDay(new Date());


  // ====================================================
  // PROCESS EACH WEDDING
  // ====================================================

  for (const wedding of weddings) {

    const weddingId =
      wedding._id;


    // ==================================================
    // WEDDING APPROACHING
    // ==================================================

    const weddingDate =
      wedding.weddingDetails?.weddingDate;


    const weddingNotificationKey =
      `WEDDING_APPROACHING_${weddingId}`;


    if (weddingDate) {

      const days =
        getDaysDifference(
          today,
          weddingDate
        );


      if (
        days >= 0 &&
        days <= 30
      ) {

        await createOrUpdateNotification({
          user: userId,

          wedding: weddingId,

          type:
            "WEDDING_APPROACHING",

          title:
            days === 0
              ? "Wedding day is today! 💍"
              : "Wedding day is approaching",

          message:
            days === 0
              ? "Your wedding is today! Make sure everything is ready."
              : `Your wedding is only ${days} day${
                  days === 1
                    ? ""
                    : "s"
                } away. Keep your final plans on track.`,

          severity:
            days <= 7
              ? "danger"
              : "warning",

          entityId:
            weddingId,

          entityType:
            "Wedding",

          uniqueKey:
            weddingNotificationKey,
        });

      } else {

        // Wedding is no longer within 30 days.
        await deleteNotification(
          weddingNotificationKey
        );
      }

    } else {

      await deleteNotification(
        weddingNotificationKey
      );
    }


    // ==================================================
    // TASK NOTIFICATIONS
    // ==================================================

    const tasks =
      await Task.find({
        wedding: weddingId,
        completed: false,
      }).lean();


    for (const task of tasks) {

      if (!task.dueDate) {
        continue;
      }


      const dueDate =
        startOfDay(
          task.dueDate
        );


      const daysUntil =
        getDaysDifference(
          today,
          dueDate
        );


      const overdueKey =
        `TASK_OVERDUE_${task._id}`;

      const dueSoonKey =
        `TASK_DUE_SOON_${task._id}`;

      const highPriorityKey =
        `HIGH_PRIORITY_TASK_${task._id}`;


      // =================================================
      // OVERDUE TASK
      // =================================================

      if (daysUntil < 0) {

        // Remove old "due soon" state.
        await deleteNotification(
          dueSoonKey
        );


        await createOrUpdateNotification({
          user: userId,

          wedding: weddingId,

          type:
            "TASK_OVERDUE",

          title:
            "Task is overdue",

          message:
            `"${task.title}" is overdue. Please complete it as soon as possible.`,

          severity:
            "danger",

          entityId:
            task._id,

          entityType:
            "Task",

          uniqueKey:
            overdueKey,
        });

      }

      // =================================================
      // TASK DUE SOON
      // =================================================

      else if (
        daysUntil >= 0 &&
        daysUntil <= 3
      ) {

        // Remove old overdue state.
        await deleteNotification(
          overdueKey
        );


        const message =
          daysUntil === 0
            ? `"${task.title}" is due today.`
            : `"${task.title}" is due in ${daysUntil} day${
                daysUntil === 1
                  ? ""
                  : "s"
              }.`;

        await createOrUpdateNotification({
          user: userId,

          wedding: weddingId,

          type:
            "TASK_DUE_SOON",

          title:
            "Task due soon",

          message,

          severity:
            daysUntil === 0
              ? "danger"
              : "warning",

          entityId:
            task._id,

          entityType:
            "Task",

          uniqueKey:
            dueSoonKey,
        });

      }

      // =================================================
      // TASK NOT DUE SOON
      // =================================================

      else {

        await deleteNotification(
          overdueKey
        );

        await deleteNotification(
          dueSoonKey
        );
      }


      // =================================================
      // HIGH PRIORITY
      // =================================================

      if (
        task.priority === "High"
      ) {

        await createOrUpdateNotification({
          user: userId,

          wedding: weddingId,

          type:
            "HIGH_PRIORITY_TASK",

          title:
            "High-priority task pending",

          message:
            `"${task.title}" is a high-priority task that still needs your attention.`,

          severity:
            "warning",

          entityId:
            task._id,

          entityType:
            "Task",

          uniqueKey:
            highPriorityKey,
        });

      } else {

        await deleteNotification(
          highPriorityKey
        );
      }
    }


    // ==================================================
    // VENDOR PAYMENT NOTIFICATIONS
    // ==================================================

    const vendors =
      await Vendor.find({
        wedding: weddingId,
      }).lean();


    for (const vendor of vendors) {

      const totalCost =
        Number(
          vendor.totalCost || 0
        );

      const advancePaid =
        Number(
          vendor.advancePaid || 0
        );

      const remaining =
        Math.max(
          totalCost -
            advancePaid,
          0
        );


      const vendorKey =
        `VENDOR_PAYMENT_${vendor._id}`;


      // ------------------------------------------------
      // Payment completely paid
      // ------------------------------------------------

      if (
        vendor.paymentStatus ===
          "Paid" ||
        remaining <= 0
      ) {

        await deleteNotification(
          vendorKey
        );

        continue;
      }


      // ------------------------------------------------
      // Payment pending / partial
      // ------------------------------------------------

      await createOrUpdateNotification({
        user: userId,

        wedding: weddingId,

        type:
          "VENDOR_PAYMENT",

        title:
          "Vendor payment remaining",

        message:
          `${vendor.vendorName} has ₹${remaining.toLocaleString(
            "en-IN"
          )} remaining to be paid.`,

        severity:
          vendor.paymentStatus ===
          "Pending"
            ? "warning"
            : "info",

        entityId:
          vendor._id,

        entityType:
          "Vendor",

        uniqueKey:
          vendorKey,
      });
    }


    // ==================================================
    // BUDGET NOTIFICATION
    // ==================================================

    const budget =
      Number(
        wedding.estimatedBudget ||
          0
      );


    const budgetKey =
      `BUDGET_WARNING_${weddingId}`;


    if (budget <= 0) {

      await deleteNotification(
        budgetKey
      );

      continue;
    }


    const expenses =
      await Budget.find({
        wedding: weddingId,
      }).lean();


    const spent =
      expenses.reduce(
        (sum, expense) =>
          sum +
          Number(
            expense.amount || 0
          ),
        0
      );


    const percentage =
      (spent / budget) * 100;


    // ==================================================
    // 90%+
    // ==================================================

    if (
      percentage >= 90
    ) {

      await createOrUpdateNotification({
        user: userId,

        wedding: weddingId,

        type:
          "BUDGET_WARNING",

        title:
          "Budget almost exhausted",

        message:
          `You have used ${Math.round(
            percentage
          )}% of your wedding budget. Review your remaining expenses.`,

        severity:
          "danger",

        entityId:
          weddingId,

        entityType:
          "Wedding",

        uniqueKey:
          budgetKey,
      });

    }

    // ==================================================
    // 80% - 89%
    // ==================================================

    else if (
      percentage >= 80
    ) {

      await createOrUpdateNotification({
        user: userId,

        wedding: weddingId,

        type:
          "BUDGET_WARNING",

        title:
          "Budget usage is high",

        message:
          `You have used ${Math.round(
            percentage
          )}% of your wedding budget. Keep an eye on upcoming expenses.`,

        severity:
          "warning",

        entityId:
          weddingId,

        entityType:
          "Wedding",

        uniqueKey:
          budgetKey,
      });

    }

    // ==================================================
    // BELOW 80%
    // ==================================================

    else {

      await deleteNotification(
        budgetKey
      );
    }
  }
};


// ======================================================
// GET USER NOTIFICATIONS
// ======================================================

const getNotifications =
  async (userId) => {

    await generateNotifications(
      userId
    );


    return Notification.find({
      user: userId,
    })
      .sort({
        isRead: 1,
        createdAt: -1,
      })
      .limit(50)
      .populate(
        "wedding",
        "bride groom weddingDetails"
      )
      .lean();
  };


// ======================================================
// UNREAD COUNT
// ======================================================

const getUnreadCount =
  async (userId) => {

    await generateNotifications(
      userId
    );


    return Notification.countDocuments({
      user: userId,
      isRead: false,
    });
  };


// ======================================================
// MARK ONE READ
// ======================================================

const markAsRead = async (
  userId,
  notificationId
) => {

  return Notification.findOneAndUpdate(
    {
      _id: notificationId,
      user: userId,
    },
    {
      $set: {
        isRead: true,
      },
    },
    {
      new: true,
    }
  );
};


// ======================================================
// MARK ALL READ
// ======================================================

const markAllAsRead = async (
  userId
) => {

  return Notification.updateMany(
    {
      user: userId,
      isRead: false,
    },
    {
      $set: {
        isRead: true,
      },
    }
  );
};


// ======================================================
// EXPORT
// ======================================================

module.exports = {
  generateNotifications,
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
};