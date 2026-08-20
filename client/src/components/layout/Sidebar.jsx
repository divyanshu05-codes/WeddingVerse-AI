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
  PieChart,
  Crown,
} from "lucide-react";

import toast from "react-hot-toast";
import { logoutUser } from "../../features/auth/services/auth.api";
import { useAuth } from "../../context/useAuth";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { weddingId } = useParams();
  const { user, setUser } = useAuth();

  const [logoutLoading, setLogoutLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(true);

  const weddingBase = weddingId ? `/weddings/${weddingId}` : null;

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await logoutUser();
      setUser(null);
      toast.success("Logged out successfully.");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout Error:", error);
      setUser(null);
      navigate("/", { replace: true });
    } finally {
      setLogoutLoading(false);
    }
  };

  const mainMenus = [
    {
      name: "Command Center",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Weddings",
      path: "/weddings",
      icon: Heart,
    },
  ];

  const weddingMenus = weddingBase
    ? [
        {
          name: "Wedding Overview",
          path: weddingBase,
          icon: Crown,
        },
        {
          name: "Guest List & RSVPs",
          path: `${weddingBase}/guests`,
          icon: Users,
        },
        {
          name: "Vendor Management",
          path: `${weddingBase}/vendors`,
          icon: Building2,
        },
        {
          name: "Budget & Expenses",
          path: `${weddingBase}/budget`,
          icon: Wallet,
        },
        {
          name: "Planning Checklist",
          path: `${weddingBase}/tasks`,
          icon: ListTodo,
        },
      ]
    : [];

  const aiMenus = weddingBase
    ? [
        {
          name: "AI Health Insights",
          path: `${weddingBase}/insights`,
          icon: Sparkles,
          badge: "Smart",
        },
        {
          name: "AI Master Planner",
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
          icon: PieChart,
        },
        {
          name: "Invitation Studio",
          path: `${weddingBase}/invitation-generator`,
          icon: Mail,
        },
        {
          name: "Vendor Assistant",
          path: `${weddingBase}/vendor-assistant`,
          icon: Building2,
        },
        {
          name: "AI Wedding Assistant",
          path: `${weddingBase}/chatbot`,
          icon: MessageCircle,
        },
      ]
    : [];

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    if (path === "/weddings") {
      return location.pathname === "/weddings" || location.pathname === "/weddings/";
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleNavigation = () => {
    setMobileOpen(false);
  };

  const NavigationItem = ({ menu }) => {
    const Icon = menu.icon;
    const active = isActive(menu.path);

    return (
      <Link
        to={menu.path}
        onClick={handleNavigation}
        className={`
          group relative flex items-center gap-3
          px-3.5 py-2.5 rounded-xl mb-1
          transition-all duration-200 text-sm font-medium
          ${
            active
              ? "bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold shadow-md shadow-rose-500/20"
              : "text-slate-600 hover:bg-rose-50/70 hover:text-rose-600"
          }
        `}
      >
        <Icon
          size={18}
          strokeWidth={active ? 2.5 : 2}
          className={`
            transition-transform duration-200 shrink-0
            group-hover:scale-110
            ${active ? "text-white" : "text-slate-400 group-hover:text-rose-500"}
          `}
        />

        <span className="truncate">{menu.name}</span>

        {menu.badge && (
          <span className={`ml-auto text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
            active ? "bg-white/20 text-white" : "bg-rose-100 text-rose-600"
          }`}>
            {menu.badge}
          </span>
        )}

        {active && !menu.badge && (
          <ChevronRight size={14} className="ml-auto opacity-70" />
        )}
      </Link>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white/95 backdrop-blur-xl border-r border-slate-200/80">
      {/* BRAND LOGO */}
      <div className="px-6 py-6 border-b border-slate-100">
        <Link
          to="/dashboard"
          onClick={handleNavigation}
          className="flex items-center gap-3 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/25 text-xl group-hover:scale-105 transition-transform">
            💍
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-black font-display text-slate-900 tracking-tight leading-none">
                WeddingVerse
              </h1>
              <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md bg-rose-500 text-white">
                AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">
              Luxury Wedding Suite
            </p>
          </div>
        </Link>
      </div>

      {/* NAVIGATION LINKS */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 custom-scrollbar">
        {/* MAIN / CORE */}
        <div>
          <p className="px-3 mb-2 text-[10px] font-black tracking-[0.18em] text-slate-400 uppercase font-sans">
            Core Hub
          </p>
          <div className="space-y-0.5">
            {mainMenus.map((menu) => (
              <NavigationItem key={menu.path} menu={menu} />
            ))}
          </div>
        </div>

        {/* ACTIVE WEDDING SUITE */}
        {weddingBase && (
          <div>
            <div className="flex items-center justify-between px-3 mb-2">
              <p className="text-[10px] font-black tracking-[0.18em] text-slate-400 uppercase font-sans">
                Wedding Manager
              </p>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <div className="space-y-0.5">
              {weddingMenus.map((menu) => (
                <NavigationItem key={menu.path} menu={menu} />
              ))}
            </div>
          </div>
        )}

        {/* AI CREATIVE SUITE */}
        {weddingBase && (
          <div>
            <button
              type="button"
              onClick={() => setAiOpen((prev) => !prev)}
              className="w-full flex items-center justify-between px-3 mb-2 text-[10px] font-black tracking-[0.18em] text-slate-400 uppercase hover:text-slate-600 transition cursor-pointer"
            >
              <span className="flex items-center gap-1.5 text-purple-600 font-black">
                <Sparkles size={12} className="text-purple-500" />
                AI Creative Suite
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  aiOpen ? "rotate-0" : "-rotate-90"
                }`}
              />
            </button>

            {aiOpen && (
              <div className="space-y-0.5">
                {aiMenus.map((menu) => (
                  <NavigationItem key={menu.path} menu={menu} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* AI QUICK ADVISORY CARD */}
        {weddingBase && (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 p-4 text-white shadow-xl shadow-purple-950/20">
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-rose-500/20 blur-xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-base">✨</span>
                <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">AI Strategist</span>
              </div>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-medium">
                Analyze your budget, timeline & RSVPs in real time.
              </p>
              <Link
                to={`${weddingBase}/insights`}
                onClick={handleNavigation}
                className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-white bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg backdrop-blur-sm transition"
              >
                <span>Open Health Report</span>
                <ChevronRight size={12} />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER USER / LOGOUT */}
      <div className="border-t border-slate-100 p-3 bg-slate-50/50">
        <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-slate-200/70 shadow-sm">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">
                {user?.fullName || "Wedding Planner"}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {user?.email || "Signed In"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={logoutLoading}
            title="Sign Out"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition shrink-0 cursor-pointer disabled:opacity-50"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE TRIGGER */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed left-4 top-4.5 z-40 w-10 h-10 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 transition cursor-pointer"
        aria-label="Open Sidebar"
      >
        <Menu size={20} />
      </button>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 z-40">
        <SidebarContent />
      </div>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity"
        />
      )}

      {/* MOBILE SIDEBAR DRAWER */}
      <div
        className={`
          lg:hidden fixed left-0 top-0 bottom-0
          w-[300px] z-50 shadow-2xl
          transition-transform duration-300 ease-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="absolute right-3 top-4.5 z-10">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
        <SidebarContent />
      </div>
    </>
  );
}

export default Sidebar;