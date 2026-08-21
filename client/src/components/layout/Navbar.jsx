import { useState } from "react";

import {
  Search,
  Sparkles,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";

import NotificationDropdown from "../../features/notifications/components/NotificationDropdown";

import { logoutUser } from "../../features/auth/services/auth.api";
import { useAuth } from "../../context/useAuth";

import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

function Navbar() {
  const { user, setUser } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const { weddingId } = useParams();

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [logoutLoading, setLogoutLoading] =
    useState(false);

  const firstLetter =
    user?.fullName?.charAt(0)?.toUpperCase() ||
    "U";

  // =====================================================
  // PAGE TITLE
  // =====================================================

  const getPageTitle = () => {
    if (location.pathname === "/dashboard") {
      return "Dashboard";
    }

    if (location.pathname === "/weddings") {
      return "My Weddings";
    }

    if (location.pathname.includes("/guests")) {
      return "Guests";
    }

    if (location.pathname.includes("/vendors")) {
      return "Vendors";
    }

    if (location.pathname.includes("/budget")) {
      return "Budget";
    }

    if (location.pathname.includes("/tasks")) {
      return "Planning Tasks";
    }

    if (
      location.pathname.includes(
        "/timeline-advisor"
      )
    ) {
      return "Timeline Advisor";
    }

    if (
      location.pathname.includes(
        "/guest-analyzer"
      )
    ) {
      return "Guest Analyzer";
    }

    if (
      location.pathname.includes(
        "/invitation-generator"
      )
    ) {
      return "Invitation Generator";
    }

    if (
      location.pathname.includes(
        "/vendor-assistant"
      )
    ) {
      return "Vendor Assistant";
    }

    if (
      location.pathname.includes("/chatbot")
    ) {
      return "AI Wedding Assistant";
    }

    if (
      location.pathname.includes("/insights")
    ) {
      return "AI Wedding Insights";
    }

    if (location.pathname.includes("/ai")) {
      return "AI Wedding Planner";
    }

    if (location.pathname.includes("/edit")) {
      return "Edit Wedding";
    }

    return weddingId
      ? "Wedding Overview"
      : "WeddingVerse";
  };

  const pageTitle = getPageTitle();

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    if (logoutLoading) return;

    try {
      setLogoutLoading(true);

      await logoutUser();

      // Clear authenticated user
      setUser(null);

      // Close dropdown
      setProfileOpen(false);

      toast.success(
        "Logged out successfully."
      );

      // Redirect to login page
      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Logout Error:",
        error
      );

      // Clear local auth state even if
      // the backend logout request fails
      setUser(null);

      setProfileOpen(false);

      toast.error(
        error?.response?.data?.message ||
          "Logout failed. Please try again."
      );

      navigate("/login", {
        replace: true,
      });
    } finally {
      setLogoutLoading(false);
    }
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <header
      className="
        relative
        bg-white/90
        dark:bg-gray-900/90
        backdrop-blur-xl
        border-b
        border-gray-100
        dark:border-gray-800
        transition-colors
        duration-300
        z-40
      "
    >
      <div
        className="
          min-h-[76px]
          px-4
          sm:px-6
          lg:px-8
          flex
          items-center
          justify-between
          gap-4
        "
      >
        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div
          className="
            flex
            items-center
            gap-4
            pl-14
            lg:pl-0
          "
        >
          <div>
            <div className="flex items-center gap-2">
              <h1
                className="
                  text-xl
                  md:text-2xl
                  font-black
                  text-gray-900
                  dark:text-white
                  transition-colors
                "
              >
                {pageTitle}
              </h1>

              {pageTitle.includes("AI") && (
                <span
                  className="
                    hidden
                    sm:inline-flex
                    items-center
                    gap-1
                    px-2.5
                    py-1
                    rounded-full
                    bg-purple-100
                    dark:bg-purple-900/40
                    text-purple-600
                    dark:text-purple-300
                    text-[10px]
                    font-black
                    uppercase
                    tracking-wider
                  "
                >
                  <Sparkles size={11} />
                  Powered by AI
                </span>
              )}
            </div>

            <p
              className="
                hidden
                md:block
                text-xs
                text-gray-400
                dark:text-gray-500
                mt-1
              "
            >
              Manage your wedding beautifully
            </p>
          </div>
        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div
          className="
            flex
            items-center
            gap-2
            sm:gap-4
          "
        >
          {/* =================================================
              SEARCH
          ================================================= */}

          <button
            type="button"
            className="
              hidden
              md:flex
              items-center
              gap-3
              w-52
              lg:w-64
              px-4
              py-2.5
              rounded-xl
              bg-gray-50
              dark:bg-gray-800
              border
              border-gray-100
              dark:border-gray-700
              text-gray-400
              hover:bg-gray-100
              dark:hover:bg-gray-700
              hover:text-gray-600
              dark:hover:text-gray-200
              transition
            "
          >
            <Search size={18} />

            <span className="text-sm">
              Search...
            </span>

            <span
              className="
                ml-auto
                hidden
                lg:inline-flex
                items-center
                justify-center
                px-1.5
                py-0.5
                rounded
                bg-white
                dark:bg-gray-900
                border
                border-gray-200
                dark:border-gray-700
                text-[10px]
                font-bold
                text-gray-400
              "
            >
              /
            </span>
          </button>

          {/* =================================================
              AI BUTTON
          ================================================= */}

          {weddingId && (
            <a
              href={`/weddings/${weddingId}/insights`}
              className="
                hidden
                sm:flex
                items-center
                gap-2
                px-3.5
                py-2.5
                rounded-xl
                bg-gradient-to-r
                from-pink-600
                to-purple-600
                text-white
                text-sm
                font-bold
                shadow-md
                shadow-pink-200
                dark:shadow-pink-950/30
                hover:shadow-lg
                hover:-translate-y-0.5
                transition
              "
            >
              <Sparkles size={16} />

              <span className="hidden lg:inline">
                AI Insights
              </span>
            </a>
          )}

          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          <NotificationDropdown />

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div
            className="
              hidden
              sm:block
              h-9
              w-px
              bg-gray-200
              dark:bg-gray-700
            "
          />

          {/* =================================================
              PROFILE
          ================================================= */}

          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setProfileOpen(
                  (previous) => !previous
                )
              }
              aria-label="Open profile menu"
              aria-expanded={profileOpen}
              className="
                flex
                items-center
                gap-2
                sm:gap-3
                rounded-xl
                px-2
                py-1.5
                hover:bg-gray-50
                dark:hover:bg-gray-800
                transition
              "
            >
              {/* Avatar */}

              <div className="relative">
                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-gradient-to-br
                    from-pink-500
                    via-purple-500
                    to-indigo-600
                    text-white
                    flex
                    items-center
                    justify-center
                    font-black
                    shadow-md
                  "
                >
                  {firstLetter}
                </div>

                {/* Online indicator */}

                <span
                  className="
                    absolute
                    -right-0.5
                    -bottom-0.5
                    w-3
                    h-3
                    rounded-full
                    bg-green-500
                    border-2
                    border-white
                    dark:border-gray-900
                  "
                />
              </div>

              {/* User information */}

              <div
                className="
                  hidden
                  lg:block
                  text-left
                  max-w-[150px]
                "
              >
                <p
                  className="
                    font-bold
                    text-sm
                    text-gray-900
                    dark:text-white
                    truncate
                  "
                >
                  {user?.fullName || "User"}
                </p>

                <p
                  className="
                    text-xs
                    text-gray-400
                    dark:text-gray-500
                    truncate
                  "
                >
                  {user?.email ||
                    "Welcome back"}
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`
                  hidden
                  lg:block
                  text-gray-400
                  dark:text-gray-500
                  transition-transform
                  ${
                    profileOpen
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>

            {/* =================================================
                PROFILE DROPDOWN
            ================================================= */}

            {profileOpen && (
              <>
                {/* Mobile backdrop */}

                <div
                  className="
                    fixed
                    inset-0
                    z-40
                    bg-black/10
                    sm:hidden
                  "
                  onClick={() =>
                    setProfileOpen(false)
                  }
                />

                <div
                  className="
                    absolute
                    right-0
                    top-full
                    mt-2
                    z-50
                    w-64
                    sm:w-72
                    rounded-2xl
                    bg-white
                    dark:bg-gray-900
                    border
                    border-gray-100
                    dark:border-gray-700
                    shadow-2xl
                    overflow-hidden
                  "
                >
                  {/* User info */}

                  <div
                    className="
                      px-4
                      py-4
                      border-b
                      border-gray-100
                      dark:border-gray-800
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          w-11
                          h-11
                          rounded-xl
                          bg-gradient-to-br
                          from-pink-500
                          via-purple-500
                          to-indigo-600
                          text-white
                          flex
                          items-center
                          justify-center
                          font-black
                        "
                      >
                        {firstLetter}
                      </div>

                      <div className="min-w-0">
                        <p
                          className="
                            font-bold
                            text-sm
                            text-gray-900
                            dark:text-white
                            truncate
                          "
                        >
                          {user?.fullName ||
                            "User"}
                        </p>

                        <p
                          className="
                            text-xs
                            text-gray-400
                            dark:text-gray-500
                            truncate
                          "
                        >
                          {user?.email ||
                            ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Profile */}

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/profile");
                    }}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      text-left
                      text-gray-700
                      dark:text-gray-200
                      hover:bg-gray-50
                      dark:hover:bg-gray-800
                      transition
                    "
                  >
                    <User size={18} />

                    <span className="text-sm font-medium">
                      My Profile
                    </span>
                  </button>

                  {/* Logout */}

                  <div
                    className="
                      px-3
                      pb-3
                    "
                  >
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={logoutLoading}
                      className="
                        w-full
                        flex
                        items-center
                        justify-center
                        gap-2
                        px-4
                        py-3
                        rounded-xl
                        bg-red-50
                        dark:bg-red-950/30
                        text-red-600
                        dark:text-red-400
                        hover:bg-red-100
                        dark:hover:bg-red-950/50
                        disabled:opacity-50
                        transition
                        font-bold
                        text-sm
                      "
                    >
                      <LogOut size={18} />

                      <span>
                        {logoutLoading
                          ? "Logging out..."
                          : "Logout"}
                      </span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;