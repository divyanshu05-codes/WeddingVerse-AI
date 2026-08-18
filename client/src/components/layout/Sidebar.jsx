import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  LayoutDashboard,
  Heart,
  Users,
  Building2,
  Wallet,
  ListTodo,
  Sparkles,
  Bot,
  MessageCircle,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  CalendarDays,
  Mail,
} from "lucide-react";

import toast from "react-hot-toast";

import { logoutUser } from "../../features/auth/services/auth.api";
import { useAuth } from "../../context/useAuth";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { weddingId } = useParams();

  const { setUser } = useAuth();

  const [logoutLoading, setLogoutLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(true);

  // =====================================================
  // CURRENT WEDDING BASE URL
  // =====================================================

  const weddingBase = weddingId
    ? `/weddings/${weddingId}`
    : null;

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      await logoutUser();

      setUser(null);

      toast.success("Logged out successfully.");

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Logout Error:",
        error
      );

      setUser(null);

      toast.error(
        error.response?.data?.message ||
          "Logout failed. Please try again."
      );

      navigate("/", {
        replace: true,
      });
    } finally {
      setLogoutLoading(false);
    }
  };

  // =====================================================
  // GLOBAL MENU
  // =====================================================

  const mainMenus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      name: "My Weddings",
      path: "/weddings",
      icon: Heart,
    },
  ];

  // =====================================================
  // WEDDING MENU
  // =====================================================

  const weddingMenus = weddingBase
    ? [
        {
          name: "Wedding Overview",
          path: weddingBase,
          icon: Heart,
        },

        {
          name: "Guests",
          path: `${weddingBase}/guests`,
          icon: Users,
        },

        {
          name: "Vendors",
          path: `${weddingBase}/vendors`,
          icon: Building2,
        },

        {
          name: "Budget",
          path: `${weddingBase}/budget`,
          icon: Wallet,
        },

        {
          name: "Tasks",
          path: `${weddingBase}/tasks`,
          icon: ListTodo,
        },
      ]
    : [];

  // =====================================================
  // AI MENU
  // =====================================================

  const aiMenus = weddingBase
    ? [
        {
          name: "AI Insights",
          path: `${weddingBase}/insights`,
          icon: Sparkles,
        },

        {
          name: "AI Wedding Planner",
          path: `${weddingBase}/ai`,
          icon: Bot,
        },

        {
          name: "Timeline Advisor",
          path: `${weddingBase}/timeline-advisor`,
          icon: CalendarDays,
        },

        {
          name: "Guest Analyzer",
          path: `${weddingBase}/guest-analyzer`,
          icon: Users,
        },

        {
          name: "Invitation Generator",
          path: `${weddingBase}/invitation-generator`,
          icon: Mail,
        },

        {
          name: "Vendor Assistant",
          path: `${weddingBase}/vendor-assistant`,
          icon: Building2,
        },

        {
          name: "AI Assistant",
          path: `${weddingBase}/chatbot`,
          icon: MessageCircle,
        },
      ]
    : [];

  // =====================================================
  // ACTIVE ROUTE
  // =====================================================

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    if (path === "/weddings") {
      return (
        location.pathname === "/weddings" ||
        location.pathname === "/weddings/"
      );
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(
        `${path}/`
      )
    );
  };

  // =====================================================
  // CLOSE MOBILE SIDEBAR
  // =====================================================

  const handleNavigation = () => {
    setMobileOpen(false);
  };

  // =====================================================
  // NAVIGATION ITEM
  // =====================================================

  const NavigationItem = ({ menu }) => {
    const Icon = menu.icon;
    const active = isActive(menu.path);

    return (
      <Link
        to={menu.path}
        onClick={handleNavigation}
        className={`
          group relative flex items-center gap-3
          px-4 py-3 rounded-xl mb-1.5
          transition-all duration-200
          ${
            active
              ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-200"
              : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
          }
        `}
      >

        {active && (
          <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />
        )}

        <Icon
          size={19}
          strokeWidth={
            active ? 2.5 : 2
          }
          className={`
            transition-transform duration-200
            group-hover:scale-110
            ${
              active
                ? "text-white"
                : "text-gray-400 group-hover:text-pink-600"
            }
          `}
        />

        <span
          className={`text-sm ${
            active
              ? "font-bold"
              : "font-medium"
          }`}
        >
          {menu.name}
        </span>

        {active && (
          <ChevronRight
            size={15}
            className="ml-auto opacity-80"
          />
        )}

      </Link>
    );
  };

  // =====================================================
  // SIDEBAR CONTENT
  // =====================================================

  const SidebarContent = () => (
    <div className="flex flex-col h-full">

      {/* =================================================
          LOGO
      ================================================= */}

      <div className="px-6 pt-7 pb-6">

        <Link
          to="/dashboard"
          onClick={handleNavigation}
          className="flex items-center gap-3"
        >

          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-pink-200">

            <Heart
              size={22}
              fill="currentColor"
            />

          </div>

          <div>

            <h1 className="text-lg font-black text-gray-900 leading-none">
              WeddingVerse
            </h1>

            <p className="text-[11px] text-pink-600 font-bold tracking-wider mt-1">
              AI WEDDING PLANNER
            </p>

          </div>

        </Link>

      </div>


      {/* =================================================
          NAVIGATION
      ================================================= */}

      <div className="flex-1 overflow-y-auto px-4 pb-5">

        {/* MAIN */}

        <div className="mb-6">

          <p className="px-3 mb-2 text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
            Main
          </p>

          {mainMenus.map(
            (menu) => (
              <NavigationItem
                key={menu.path}
                menu={menu}
              />
            )
          )}

        </div>


        {/* =================================================
            CURRENT WEDDING
        ================================================= */}

        {weddingBase && (
          <div className="mb-6">

            <div className="flex items-center justify-between px-3 mb-2">

              <p className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
                Current Wedding
              </p>

              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

            </div>

            {weddingMenus.map(
              (menu) => (
                <NavigationItem
                  key={menu.path}
                  menu={menu}
                />
              )
            )}

          </div>
        )}


        {/* =================================================
            AI CENTER
        ================================================= */}

        {weddingBase && (
          <div>

            <button
              type="button"
              onClick={() =>
                setAiOpen(
                  (prev) => !prev
                )
              }
              className="w-full flex items-center justify-between px-3 mb-2 text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase"
            >

              <span className="flex items-center gap-2">

                <Sparkles
                  size={13}
                  className="text-purple-500"
                />

                AI Center

              </span>

              <ChevronDown
                size={14}
                className={`transition-transform ${
                  aiOpen
                    ? "rotate-0"
                    : "-rotate-90"
                }`}
              />

            </button>


            {aiOpen && (
              <div>

                {aiMenus.map(
                  (menu) => (
                    <NavigationItem
                      key={menu.path}
                      menu={menu}
                    />
                  )
                )}

              </div>
            )}

          </div>
        )}


        {/* =================================================
            AI PROMOTION
        ================================================= */}

        {weddingBase && (
          <div className="mt-7 relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-950 via-purple-950 to-indigo-950 p-5 text-white">

            <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-purple-500/20 blur-xl" />

            <div className="relative">

              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                ✨
              </div>

              <p className="font-bold text-sm mt-4">
                Wedding Intelligence
              </p>

              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Get personalized AI insights
                for this wedding.
              </p>

              <Link
                to={`${weddingBase}/insights`}
                onClick={handleNavigation}
                className="inline-flex items-center gap-1 mt-4 text-xs font-bold text-purple-300 hover:text-white transition"
              >
                Open Insights
                <ChevronRight size={13} />
              </Link>

            </div>

          </div>
        )}

      </div>


      {/* =================================================
          BOTTOM
      ================================================= */}

      <div className="border-t border-gray-100 p-4">

        <button
          type="button"
          onClick={() =>
            toast("Settings coming soon.")
          }
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition"
        >

          <Settings size={19} />

          <span className="text-sm font-medium">
            Settings
          </span>

        </button>


        <button
          type="button"
          onClick={handleLogout}
          disabled={logoutLoading}
          className="w-full mt-1 flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 disabled:opacity-50 transition"
        >

          <LogOut size={19} />

          <span className="text-sm font-semibold">
            {logoutLoading
              ? "Logging out..."
              : "Logout"}
          </span>

        </button>

      </div>

    </div>
  );

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <>
      {/* =================================================
          MOBILE MENU BUTTON
      ================================================= */}

      <button
        type="button"
        onClick={() =>
          setMobileOpen(true)
        }
        className="lg:hidden fixed left-4 top-4 z-[60] w-11 h-11 rounded-xl bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700"
      >
        <Menu size={22} />
      </button>


      {/* =================================================
          DESKTOP SIDEBAR
      ================================================= */}

      <div className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-100 z-50">

        <SidebarContent />

      </div>


      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      {mobileOpen && (
        <div
          onClick={() =>
            setMobileOpen(false)
          }
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
        />
      )}


      {/* =================================================
          MOBILE SIDEBAR
      ================================================= */}

      <div
        className={`
          lg:hidden fixed left-0 top-0 bottom-0
          w-[285px] bg-white z-[80]
          shadow-2xl
          transition-transform duration-300
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        <div className="absolute right-3 top-4 z-10">

          <button
            type="button"
            onClick={() =>
              setMobileOpen(false)
            }
            className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"
          >
            <X size={19} />
          </button>

        </div>

        <SidebarContent />

      </div>
    </>
  );
}

export default Sidebar;