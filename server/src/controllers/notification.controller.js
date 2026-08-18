const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const notificationService = require("../services/notification.service");


// ======================================================
// GET NOTIFICATIONS
// ======================================================

const getNotifications =
  asyncHandler(
    async (req, res) => {

      const notifications =
        await notificationService.getNotifications(
          req.user._id
        );

      res.status(200).json(
        new ApiResponse(
          200,
          notifications,
          "Notifications fetched successfully."
        )
      );
    }
  );


// ======================================================
// GET UNREAD COUNT
// ======================================================

const getUnreadCount =
  asyncHandler(
    async (req, res) => {

      const count =
        await notificationService.getUnreadCount(
          req.user._id
        );

      res.status(200).json(
        new ApiResponse(
          200,
          { count },
          "Unread notification count fetched successfully."
        )
      );
    }
  );


// ======================================================
// MARK ONE AS READ
// ======================================================

const markAsRead =
  asyncHandler(
    async (req, res) => {

      const notification =
        await notificationService.markAsRead(
          req.user._id,
          req.params.notificationId
        );

      if (!notification) {
        return res.status(404).json(
          new ApiResponse(
            404,
            null,
            "Notification not found."
          )
        );
      }

      res.status(200).json(
        new ApiResponse(
          200,
          notification,
          "Notification marked as read."
        )
      );
    }
  );


// ======================================================
// MARK ALL AS READ
// ======================================================

const markAllAsRead =
  asyncHandler(
    async (req, res) => {

      await notificationService.markAllAsRead(
        req.user._id
      );

      res.status(200).json(
        new ApiResponse(
          200,
          null,
          "All notifications marked as read."
        )
      );
    }
  );


module.exports = {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
};