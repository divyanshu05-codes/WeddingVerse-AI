const express = require("express");

const router =
  express.Router();

const protect =
  require("../middlewares/auth.middleware");

const notificationController =
  require("../controllers/notification.controller");


// ======================================================
// GET ALL NOTIFICATIONS
// ======================================================

router.get(
  "/",
  protect,
  notificationController.getNotifications
);


// ======================================================
// GET UNREAD COUNT
// ======================================================

router.get(
  "/unread-count",
  protect,
  notificationController.getUnreadCount
);


// ======================================================
// MARK ONE AS READ
// ======================================================

router.patch(
  "/:notificationId/read",
  protect,
  notificationController.markAsRead
);


// ======================================================
// MARK ALL AS READ
// ======================================================

router.patch(
  "/read-all",
  protect,
  notificationController.markAllAsRead
);


module.exports = router;