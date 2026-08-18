import api from "../../../api/axios";

// Get all notifications
export const getNotifications = () =>
  api.get("/notifications");

// Get unread notification count
export const getUnreadNotificationCount = () =>
  api.get("/notifications/unread-count");

// Mark one notification as read
export const markNotificationAsRead = (
  notificationId
) =>
  api.patch(
    `/notifications/${notificationId}/read`
  );

// Mark all notifications as read
export const markAllNotificationsAsRead = () =>
  api.patch(
    "/notifications/read-all"
  );