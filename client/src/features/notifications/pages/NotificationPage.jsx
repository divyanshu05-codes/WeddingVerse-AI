import { useEffect, useMemo, useState } from "react";
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
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../services/notification.api";


function NotificationPage() {

  const navigate = useNavigate();

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [markingAll, setMarkingAll] =
    useState(false);

  const [filter, setFilter] =
    useState("all");


  // =====================================================
  // FETCH NOTIFICATIONS
  // =====================================================

  const fetchNotifications = async () => {

    try {

      setLoading(true);

      const response =
        await getNotifications();

      setNotifications(
        response.data?.data || []
      );

    } catch (error) {

      console.error(
        "Notification Error:",
        error
      );

      toast.error(
        "Unable to load notifications."
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    fetchNotifications();

  }, []);


  // =====================================================
  // FILTERED NOTIFICATIONS
  // =====================================================

  const filteredNotifications =
    useMemo(() => {

      if (filter === "unread") {

        return notifications.filter(
          (notification) =>
            !notification.isRead
        );

      }

      if (filter === "tasks") {

        return notifications.filter(
          (notification) =>
            notification.entityType ===
            "Task"
        );

      }

      if (filter === "payments") {

        return notifications.filter(
          (notification) =>
            notification.type ===
              "VENDOR_PAYMENT" ||
            notification.type ===
              "BUDGET_WARNING"
        );

      }

      return notifications;

    }, [
      notifications,
      filter,
    ]);


  // =====================================================
  // COUNTS
  // =====================================================

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.isRead
    ).length;


  // =====================================================
  // ICON
  // =====================================================

  const getNotificationIcon = (
    type
  ) => {

    switch (type) {

      case "WEDDING_APPROACHING":
        return (
          <CalendarDays
            size={21}
          />
        );

      case "TASK_OVERDUE":
        return (
          <AlertTriangle
            size={21}
          />
        );

      case "TASK_DUE_SOON":
        return (
          <Clock size={21} />
        );

      case "HIGH_PRIORITY_TASK":
        return (
          <ListTodo size={21} />
        );

      case "VENDOR_PAYMENT":
        return (
          <Building2
            size={21}
          />
        );

      case "BUDGET_WARNING":
        return (
          <Wallet size={21} />
        );

      default:
        return (
          <Sparkles size={21} />
        );
    }
  };


  // =====================================================
  // ICON STYLE
  // =====================================================

  const getNotificationStyle = (
    severity
  ) => {

    switch (severity) {

      case "danger":
        return {
          wrapper:
            "bg-red-100 text-red-600",
          badge:
            "bg-red-50 text-red-600",
        };

      case "warning":
        return {
          wrapper:
            "bg-amber-100 text-amber-600",
          badge:
            "bg-amber-50 text-amber-600",
        };

      case "success":
        return {
          wrapper:
            "bg-emerald-100 text-emerald-600",
          badge:
            "bg-emerald-50 text-emerald-600",
        };

      default:
        return {
          wrapper:
            "bg-purple-100 text-purple-600",
          badge:
            "bg-purple-50 text-purple-600",
        };
    }
  };


  // =====================================================
  // TIME
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
        (now - date) / 1000
      );


    if (difference < 60) {
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
        year: "numeric",
      }
    );
  };


  // =====================================================
  // NAVIGATION
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


    if (
      notification.entityType ===
      "Task"
    ) {

      return `/weddings/${weddingId}/tasks`;
    }


    if (
      notification.entityType ===
        "Vendor" &&
      entityId
    ) {

      return `/weddings/${weddingId}/vendors/${entityId}`;
    }


    if (
      notification.type ===
      "BUDGET_WARNING"
    ) {

      return `/weddings/${weddingId}/budget`;
    }


    return `/weddings/${weddingId}`;
  };


  // =====================================================
  // CLICK NOTIFICATION
  // =====================================================

  const handleNotificationClick =
    async (
      notification
    ) => {

      try {

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


        const path =
          getNotificationPath(
            notification
          );


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
          "Mark read error:",
          error
        );

        toast.error(
          "Unable to update notification."
        );
      }
    };


  // =====================================================
  // MARK ALL
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
  // FILTER BUTTON
  // =====================================================

  const filters = [
    {
      id: "all",
      label: "All",
      count:
        notifications.length,
    },
    {
      id: "unread",
      label: "Unread",
      count:
        unreadCount,
    },
    {
      id: "tasks",
      label: "Tasks",
      count:
        notifications.filter(
          (notification) =>
            notification.entityType ===
            "Task"
        ).length,
    },
    {
      id: "payments",
      label: "Payments",
      count:
        notifications.filter(
          (notification) =>
            notification.type ===
              "VENDOR_PAYMENT" ||
            notification.type ===
              "BUDGET_WARNING"
        ).length,
    },
  ];


  // =====================================================
  // UI
  // =====================================================

  return (
    <DashboardLayout>

      <div className="max-w-5xl mx-auto">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>

            <button
              type="button"
              onClick={() =>
                navigate(-1)
              }
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-pink-600 transition mb-4"
            >

              <ArrowLeft
                size={16}
              />

              Back

            </button>


            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white flex items-center justify-center shadow-lg">

                <Bell
                  size={26}
                />

              </div>


              <div>

                <h1 className="text-3xl md:text-4xl font-black text-gray-900">
                  Notifications
                </h1>

                <p className="text-gray-500 mt-1">
                  Everything that needs your attention.
                </p>

              </div>

            </div>

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
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition disabled:opacity-50"
            >

              <CheckCheck
                size={17}
              />

              {markingAll
                ? "Marking..."
                : "Mark all as read"}

            </button>

          )}

        </div>


        {/* =================================================
            SUMMARY
        ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total
            </p>

            <p className="text-3xl font-black text-gray-900 mt-2">
              {notifications.length}
            </p>

          </div>


          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Unread
            </p>

            <p className="text-3xl font-black text-pink-600 mt-2">
              {unreadCount}
            </p>

          </div>


          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">

            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Action Required
            </p>

            <p className="text-3xl font-black text-purple-600 mt-2">
              {
                notifications.filter(
                  (notification) =>
                    notification.severity ===
                      "danger" &&
                    !notification.isRead
                ).length
              }
            </p>

          </div>

        </div>


        {/* =================================================
            FILTERS
        ================================================= */}

        <div className="bg-white border border-gray-100 rounded-2xl p-2 shadow-sm mb-6">

          <div className="flex flex-wrap gap-2">

            {filters.map(
              (item) => (

                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setFilter(
                      item.id
                    )
                  }
                  className={`
                    flex items-center gap-2
                    px-4 py-2.5
                    rounded-xl
                    text-sm
                    font-bold
                    transition
                    ${
                      filter ===
                      item.id
                        ? "bg-pink-600 text-white shadow-md"
                        : "text-gray-500 hover:bg-gray-100"
                    }
                  `}
                >

                  {item.label}

                  <span
                    className={`
                      min-w-[20px]
                      h-5
                      px-1.5
                      rounded-full
                      text-[10px]
                      flex items-center
                      justify-center
                      ${
                        filter ===
                        item.id
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {item.count}
                  </span>

                </button>

              )
            )}

          </div>

        </div>


        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

          {loading ? (

            <div className="p-8 space-y-5">

              {[1, 2, 3, 4].map(
                (item) => (

                  <div
                    key={item}
                    className="animate-pulse flex gap-4"
                  >

                    <div className="w-12 h-12 rounded-xl bg-gray-100" />

                    <div className="flex-1">

                      <div className="h-4 bg-gray-100 rounded w-1/3" />

                      <div className="h-3 bg-gray-100 rounded w-3/4 mt-3" />

                      <div className="h-3 bg-gray-100 rounded w-1/4 mt-3" />

                    </div>

                  </div>

                )
              )}

            </div>

          ) : filteredNotifications.length ===
            0 ? (

            <div className="py-20 px-8 text-center">

              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">

                <Bell
                  size={32}
                  className="text-pink-500"
                />

              </div>

              <h2 className="text-xl font-black text-gray-900 mt-6">
                No notifications here
              </h2>

              <p className="text-gray-400 text-sm mt-2">
                You're all caught up for this category.
              </p>

            </div>

          ) : (

            <div>

              {filteredNotifications.map(
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
                        md:px-7
                        py-5
                        border-b
                        border-gray-100
                        cursor-pointer
                        transition
                        ${
                          notification.isRead
                            ? "bg-white"
                            : "bg-pink-50/40"
                        }
                        hover:bg-gray-50
                      `}
                    >

                      {!notification.isRead && (

                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 to-purple-500" />

                      )}


                      <div className="flex gap-4">

                        {/* Icon */}

                        <div
                          className={`
                            shrink-0
                            w-12
                            h-12
                            rounded-2xl
                            flex items-center justify-center
                            ${style.wrapper}
                          `}
                        >

                          {getNotificationIcon(
                            notification.type
                          )}

                        </div>


                        {/* Content */}

                        <div className="flex-1 min-w-0">

                          <div className="flex items-start justify-between gap-4">

                            <div>

                              <div className="flex flex-wrap items-center gap-2">

                                <h3
                                  className={`text-sm md:text-base ${
                                    notification.isRead
                                      ? "font-semibold text-gray-700"
                                      : "font-black text-gray-900"
                                  }`}
                                >
                                  {
                                    notification.title
                                  }
                                </h3>


                                {!notification.isRead && (

                                  <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-600 text-[9px] font-black uppercase">
                                    New
                                  </span>

                                )}

                              </div>


                              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                                {
                                  notification.message
                                }
                              </p>

                            </div>


                            <ChevronRight
                              size={19}
                              className="shrink-0 text-gray-300 group-hover:text-pink-500 transition"
                            />

                          </div>


                          <div className="flex items-center justify-between mt-4">

                            <div className="flex items-center gap-2 text-xs text-gray-400">

                              <Clock
                                size={13}
                              />

                              {
                                formatTime(
                                  notification.createdAt
                                )
                              }

                            </div>


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
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-pink-600 transition"
                              >

                                <Check
                                  size={14}
                                />

                                Mark as read

                              </button>

                            )}

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

      </div>

    </DashboardLayout>
  );
}

export default NotificationPage;