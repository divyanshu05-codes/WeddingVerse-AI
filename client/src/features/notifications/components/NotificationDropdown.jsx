import { useEffect, useState } from "react";

import {
  Bell,
  Check,
  CheckCheck,
  Clock,
  AlertTriangle,
  Wallet,
  CalendarDays,
  ListTodo,
  Building2,
  Sparkles,
  X,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../services/notification.api";

import { socket } from "../../../services/socket";
import { useAuth } from "../../../context/useAuth";


function NotificationDropdown() {
  const navigate = useNavigate();

  const { user } = useAuth();


  // =====================================================
  // STATE
  // =====================================================

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [open, setOpen] =
    useState(false);

  const [markingAll, setMarkingAll] =
    useState(false);


  // =====================================================
  // LOAD NOTIFICATIONS
  // =====================================================

  const fetchNotifications = async () => {

    try {

      setLoading(true);

      const response =
        await getNotifications();

      const data =
        response.data?.data || [];

      setNotifications(data);

    } catch (error) {

      console.error(
        "Notification Error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // SOCKET.IO + INITIAL LOAD
  // =====================================================

  useEffect(() => {

    // Load existing notifications
    fetchNotifications();


    // User isn't available yet
    if (!user?._id) {
      return;
    }


    // ---------------------------------------------------
    // JOIN USER ROOM
    // ---------------------------------------------------

    const joinUserRoom = () => {

      console.log(
        `👤 Joining notification room: user:${user._id}`
      );

      socket.emit(
        "join-user-room",
        user._id
      );

    };


    // ---------------------------------------------------
    // SOCKET CONNECT
    // ---------------------------------------------------

    socket.on(
      "connect",
      joinUserRoom
    );


    // If already connected
    if (socket.connected) {

      joinUserRoom();

    } else {

      socket.connect();

    }


    // ===================================================
    // NEW NOTIFICATION
    // ===================================================

    const handleNewNotification = (
      notification
    ) => {

      console.log(
        "🔔 New notification received:",
        notification
      );


      setNotifications(
        (previous) => {

          const exists =
            previous.some(
              (item) =>
                item._id ===
                notification._id
            );


          if (exists) {

            return previous;

          }


          return [
            notification,
            ...previous,
          ].slice(0, 50);

        }
      );

    };


    // ===================================================
    // NOTIFICATION UPDATED
    // ===================================================

    const handleNotificationUpdate = (
      notification
    ) => {

      console.log(
        "🔄 Notification updated:",
        notification
      );


      setNotifications(
        (previous) => {

          const exists =
            previous.some(
              (item) =>
                item._id ===
                notification._id
            );


          if (!exists) {

            return [
              notification,
              ...previous,
            ].slice(0, 50);

          }


          return previous.map(
            (item) =>
              item._id ===
              notification._id
                ? notification
                : item
          );

        }
      );

    };


    // ===================================================
    // NOTIFICATION DELETED
    // ===================================================

    const handleNotificationDeleted = (
      data
    ) => {

      console.log(
        "🗑️ Notification deleted:",
        data
      );


      if (
        !data?.notificationId
      ) {

        return;

      }


      setNotifications(
        (previous) =>
          previous.filter(
            (item) =>
              item._id !==
              data.notificationId
          )
      );

    };


    // ===================================================
    // REGISTER SOCKET EVENTS
    // ===================================================

    socket.on(
      "notification:new",
      handleNewNotification
    );

    socket.on(
      "notification:update",
      handleNotificationUpdate
    );

    socket.on(
      "notification:deleted",
      handleNotificationDeleted
    );


    // ===================================================
    // CLEANUP
    // ===================================================

    return () => {

      socket.off(
        "connect",
        joinUserRoom
      );

      socket.off(
        "notification:new",
        handleNewNotification
      );

      socket.off(
        "notification:update",
        handleNotificationUpdate
      );

      socket.off(
        "notification:deleted",
        handleNotificationDeleted
      );


      // Disconnect when component unmounts
      if (socket.connected) {

        socket.disconnect();

      }

    };

  }, [user?._id]);


  // =====================================================
  // UNREAD COUNT
  // =====================================================

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.isRead
    ).length;


  // =====================================================
  // NOTIFICATION ICON
  // =====================================================

  const getNotificationIcon = (
    type
  ) => {

    switch (type) {

      case "WEDDING_APPROACHING":

        return (
          <CalendarDays
            size={18}
          />
        );


      case "TASK_OVERDUE":

        return (
          <AlertTriangle
            size={18}
          />
        );


      case "TASK_DUE_SOON":

        return (
          <Clock
            size={18}
          />
        );


      case "HIGH_PRIORITY_TASK":

        return (
          <ListTodo
            size={18}
          />
        );


      case "VENDOR_PAYMENT":

        return (
          <Building2
            size={18}
          />
        );


      case "BUDGET_WARNING":

        return (
          <Wallet
            size={18}
          />
        );


      default:

        return (
          <Sparkles
            size={18}
          />
        );

    }

  };


  // =====================================================
  // NOTIFICATION STYLE
  // =====================================================

  const getNotificationStyle = (
    severity
  ) => {

    switch (severity) {

      case "danger":

        return {
          wrapper:
            "bg-red-100 text-red-600",
        };


      case "warning":

        return {
          wrapper:
            "bg-amber-100 text-amber-600",
        };


      case "success":

        return {
          wrapper:
            "bg-emerald-100 text-emerald-600",
        };


      default:

        return {
          wrapper:
            "bg-purple-100 text-purple-600",
        };

    }

  };


  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatTime = (
    createdAt
  ) => {

    if (!createdAt) {
      return "";
    }


    const date =
      new Date(createdAt);

    const now =
      new Date();


    const difference =
      Math.floor(
        (now - date) /
          1000
      );


    if (
      difference < 60
    ) {

      return "Just now";

    }


    if (
      difference <
      60 * 60
    ) {

      const minutes =
        Math.floor(
          difference / 60
        );

      return `${minutes}m ago`;

    }


    if (
      difference <
      60 * 60 * 24
    ) {

      const hours =
        Math.floor(
          difference /
            (60 * 60)
        );

      return `${hours}h ago`;

    }


    if (
      difference <
      60 * 60 * 24 * 7
    ) {

      const days =
        Math.floor(
          difference /
            (60 * 60 * 24)
        );

      return `${days}d ago`;

    }


    return date.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
      }
    );

  };


  // =====================================================
  // GET NOTIFICATION DESTINATION
  // =====================================================

  const getNotificationPath = (
    notification
  ) => {

    const weddingId =
      notification.wedding?._id ||
      notification.wedding;

    const entityId =
      notification.entityId;


    if (!weddingId) {

      return null;

    }


    // ---------------------------------------------------
    // WEDDING
    // ---------------------------------------------------

    if (
      notification.type ===
        "WEDDING_APPROACHING" ||
      notification.entityType ===
        "Wedding"
    ) {

      if (
        notification.type ===
        "BUDGET_WARNING"
      ) {

        return `/weddings/${weddingId}/budget`;

      }


      return `/weddings/${weddingId}`;

    }


    // ---------------------------------------------------
    // TASK
    // ---------------------------------------------------

    if (
      notification.entityType ===
      "Task"
    ) {

      return `/weddings/${weddingId}/tasks`;

    }


    // ---------------------------------------------------
    // VENDOR
    // ---------------------------------------------------

    if (
      notification.entityType ===
        "Vendor" &&
      entityId
    ) {

      return `/weddings/${weddingId}/vendors/${entityId}`;

    }


    // ---------------------------------------------------
    // BUDGET
    // ---------------------------------------------------

    if (
      notification.entityType ===
      "Budget"
    ) {

      return `/weddings/${weddingId}/budget`;

    }


    // ---------------------------------------------------
    // BUDGET WARNING
    // ---------------------------------------------------

    if (
      notification.type ===
      "BUDGET_WARNING"
    ) {

      return `/weddings/${weddingId}/budget`;

    }


    return `/weddings/${weddingId}`;

  };


  // =====================================================
  // HANDLE NOTIFICATION CLICK
  // =====================================================

  const handleNotificationClick =
    async (
      notification
    ) => {

      try {

        // -----------------------------------------------
        // Mark as read
        // -----------------------------------------------

        if (
          !notification.isRead
        ) {

          await markNotificationAsRead(
            notification._id
          );


          setNotifications(
            (previous) =>
              previous.map(
                (item) =>
                  item._id ===
                  notification._id
                    ? {
                        ...item,
                        isRead: true,
                      }
                    : item
              )
          );

        }


        // -----------------------------------------------
        // Get destination
        // -----------------------------------------------

        const path =
          getNotificationPath(
            notification
          );


        // -----------------------------------------------
        // Close dropdown
        // -----------------------------------------------

        setOpen(false);


        // -----------------------------------------------
        // Navigate
        // -----------------------------------------------

        if (path) {

          navigate(path);

        }

      } catch (error) {

        console.error(
          "Notification navigation error:",
          error
        );


        toast.error(
          "Unable to open notification."
        );

      }

    };


  // =====================================================
  // MARK ONE AS READ
  // =====================================================

  const handleMarkAsRead =
    async (
      event,
      notificationId
    ) => {

      event.stopPropagation();


      try {

        await markNotificationAsRead(
          notificationId
        );


        setNotifications(
          (previous) =>
            previous.map(
              (notification) =>
                notification._id ===
                notificationId
                  ? {
                      ...notification,
                      isRead: true,
                    }
                  : notification
            )
        );

      } catch (error) {

        console.error(
          "Mark notification read error:",
          error
        );


        toast.error(
          "Unable to update notification."
        );

      }

    };


  // =====================================================
  // MARK ALL AS READ
  // =====================================================

  const handleMarkAllAsRead =
    async () => {

      if (
        unreadCount === 0
      ) {

        return;

      }


      try {

        setMarkingAll(true);


        await markAllNotificationsAsRead();


        setNotifications(
          (previous) =>
            previous.map(
              (notification) => ({
                ...notification,
                isRead: true,
              })
            )
        );


        toast.success(
          "All notifications marked as read."
        );

      } catch (error) {

        console.error(
          "Mark all read error:",
          error
        );


        toast.error(
          "Unable to update notifications."
        );

      } finally {

        setMarkingAll(false);

      }

    };


  // =====================================================
  // RETURN
  // =====================================================

  return (

    <div className="relative">


      {/* =================================================
          NOTIFICATION BUTTON
      ================================================= */}

      <button
        type="button"
        onClick={() =>
          setOpen(
            (previous) =>
              !previous
          )
        }
        className={`
          relative
          w-10 h-10
          rounded-xl
          flex items-center
          justify-center
          transition-all
          ${
            open
              ? "bg-pink-50 text-pink-600"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          }
        `}
      >

        <Bell
          size={20}
        />


        {unreadCount > 0 && (

          <span className="absolute -top-1 -right-1 min-w-[19px] h-[19px] px-1 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-white shadow-sm">

            {unreadCount > 99
              ? "99+"
              : unreadCount}

          </span>

        )}

      </button>


      {/* =================================================
          DROPDOWN
      ================================================= */}

      {open && (

        <>

          {/* Mobile backdrop */}

          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] sm:hidden"
            onClick={() =>
              setOpen(false)
            }
          />


          <div
            className="
              fixed
              left-3
              right-3
              top-[82px]
              sm:absolute
              sm:left-auto
              sm:right-0
              sm:top-14
              sm:w-[420px]
              z-50
              bg-white
              rounded-2xl
              border
              border-gray-100
              shadow-2xl
              overflow-hidden
            "
          >


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="px-5 py-4 border-b border-gray-100">

              <div className="flex items-center justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <h3 className="text-lg font-black text-gray-900">

                      Notifications

                    </h3>


                    {unreadCount > 0 && (

                      <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-600 text-[10px] font-black">

                        {unreadCount} NEW

                      </span>

                    )}

                  </div>


                  <p className="text-xs text-gray-400 mt-1">

                    Stay on top of your wedding planning.

                  </p>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="sm:hidden w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500"
                >

                  <X
                    size={16}
                  />

                </button>

              </div>


              {unreadCount > 0 && (

                <button
                  type="button"
                  onClick={
                    handleMarkAllAsRead
                  }
                  disabled={
                    markingAll
                  }
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 disabled:opacity-50"
                >

                  <CheckCheck
                    size={14}
                  />


                  {markingAll
                    ? "Marking..."
                    : "Mark all as read"}

                </button>

              )}

            </div>


            {/* =================================================
                BODY
            ================================================= */}

            <div className="max-h-[430px] overflow-y-auto">


              {loading ? (

                <div className="p-8">

                  <div className="animate-pulse space-y-4">

                    {[1, 2, 3].map(
                      (item) => (

                        <div
                          key={item}
                          className="flex gap-3"
                        >

                          <div className="w-10 h-10 rounded-xl bg-gray-100" />


                          <div className="flex-1">

                            <div className="h-3 bg-gray-100 rounded w-3/4" />

                            <div className="h-3 bg-gray-100 rounded w-full mt-2" />

                            <div className="h-2 bg-gray-100 rounded w-1/4 mt-2" />

                          </div>

                        </div>

                      )
                    )}

                  </div>

                </div>

              ) : notifications.length ===
                0 ? (

                <div className="px-8 py-12 text-center">

                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center text-3xl">

                    🔔

                  </div>


                  <h4 className="font-bold text-gray-900 mt-5">

                    You're all caught up

                  </h4>


                  <p className="text-sm text-gray-400 mt-2">

                    No wedding planning notifications right now.

                  </p>

                </div>

              ) : (

                <div>

                  {notifications.map(
                    (
                      notification
                    ) => {

                      const style =
                        getNotificationStyle(
                          notification.severity
                        );


                      return (

                        <div
                          key={
                            notification._id
                          }
                          onClick={() =>
                            handleNotificationClick(
                              notification
                            )
                          }
                          className={`
                            group
                            relative
                            px-5
                            py-4
                            border-b
                            border-gray-50
                            transition
                            cursor-pointer
                            ${
                              notification.isRead
                                ? "bg-white"
                                : "bg-pink-50/40"
                            }
                            hover:bg-gray-50
                          `}
                        >


                          {/* Unread marker */}

                          {!notification.isRead && (

                            <span className="absolute left-1.5 top-5 w-1.5 h-1.5 rounded-full bg-pink-600" />

                          )}


                          <div className="flex gap-3">


                            {/* Icon */}

                            <div
                              className={`
                                shrink-0
                                w-10
                                h-10
                                rounded-xl
                                flex items-center
                                justify-center
                                ${style.wrapper}
                              `}
                            >

                              {getNotificationIcon(
                                notification.type
                              )}

                            </div>


                            {/* Content */}

                            <div className="flex-1 min-w-0">

                              <div className="flex items-start justify-between gap-3">

                                <div>

                                  <p
                                    className={`text-sm ${
                                      notification.isRead
                                        ? "font-semibold text-gray-700"
                                        : "font-black text-gray-900"
                                    }`}
                                  >

                                    {
                                      notification.title
                                    }

                                  </p>


                                  <p className="text-xs text-gray-500 leading-relaxed mt-1">

                                    {
                                      notification.message
                                    }

                                  </p>

                                </div>


                                {!notification.isRead && (

                                  <span className="shrink-0 w-2 h-2 rounded-full bg-pink-500 mt-1" />

                                )}

                              </div>


                              {/* Footer */}

                              <div className="flex items-center justify-between mt-3">

                                <span className="text-[10px] text-gray-400 font-medium">

                                  {formatTime(
                                    notification.createdAt
                                  )}

                                </span>


                                <div className="flex items-center gap-3">


                                  {!notification.isRead && (

                                    <button
                                      type="button"
                                      onClick={(
                                        event
                                      ) =>
                                        handleMarkAsRead(
                                          event,
                                          notification._id
                                        )
                                      }
                                      className="inline-flex items-center gap-1 text-[10px] font-bold text-gray-500 hover:text-pink-600 transition"
                                    >

                                      <Check
                                        size={12}
                                      />

                                      Mark read

                                    </button>

                                  )}


                                  <ChevronRight
                                    size={14}
                                    className="text-gray-300 group-hover:text-pink-500 transition"
                                  />

                                </div>

                              </div>

                            </div>

                          </div>

                        </div>

                      );

                    }
                  )}

                </div>

              )}

            </div>


            {/* =================================================
                FOOTER
            ================================================= */}

            {notifications.length > 0 && (

              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">

                <button
                  type="button"
                  onClick={() => {

                    setOpen(false);

                    navigate(
                      "/notifications"
                    );

                  }}
                  className="w-full flex items-center justify-center gap-2 text-xs font-bold text-pink-600 hover:text-pink-700 transition"
                >

                  View all notifications

                  <ChevronRight
                    size={14}
                  />

                </button>

              </div>

            )}

          </div>

        </>

      )}

    </div>

  );

}


export default NotificationDropdown;