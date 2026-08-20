import { useState } from "react";
import {
  Search,
  Sparkles,
  ChevronDown,
  Plus,
  Heart,
  Crown,
} from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import NotificationDropdown from "../../features/notifications/components/NotificationDropdown";
import { useAuth } from "../../context/useAuth";

function Navbar() {
  const { user } = useAuth();
  const location = useLocation();
  const { weddingId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const firstLetter = user?.fullName?.charAt(0)?.toUpperCase() || "U";

  const getPageTitle = () => {
    if (location.pathname === "/dashboard") return "Command Center";
    if (location.pathname === "/weddings") return "My Weddings";
    if (location.pathname.includes("/guests/new")) return "Add New Guest";
    if (location.pathname.includes("/guests")) return "Guest Directory";
    if (location.pathname.includes("/vendors/new")) return "Add New Vendor";
    if (location.pathname.includes("/vendors")) return "Vendor Management";
    if (location.pathname.includes("/budget/new")) return "Add New Expense";
    if (location.pathname.includes("/budget")) return "Budget & Expenses";
    if (location.pathname.includes("/tasks")) return "Planning Checklist";
    if (location.pathname.includes("/timeline-advisor")) return "AI Timeline Advisor";
    if (location.pathname.includes("/guest-analyzer")) return "AI Guest Analyzer";
    if (location.pathname.includes("/invitation-generator")) return "Invitation Generator";
    if (location.pathname.includes("/vendor-assistant")) return "AI Vendor Assistant";
    if (location.pathname.includes("/chatbot")) return "AI Wedding Chatbot";
    if (location.pathname.includes("/insights")) return "AI Health Insights";
    if (location.pathname.includes("/ai/plan") || location.pathname.includes("/ai-plan")) return "AI Wedding Plan Roadmap";
    if (location.pathname.includes("/ai")) return "AI Wedding Planner";
    if (location.pathname.includes("/edit")) return "Edit Wedding";
    if (location.pathname.includes("/new")) return "Create Wedding";

    return weddingId ? "Wedding Overview" : "WeddingVerse AI";
  };

  const pageTitle = getPageTitle();

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/70 sticky top-0 z-30 transition-all">
      <div className="min-h-[72px] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* LEFT SIDE: Title & Breadcrumbs */}
        <div className="flex items-center gap-4 pl-12 lg:pl-0">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black font-display text-slate-900 tracking-tight">
                {pageTitle}
              </h1>

              {pageTitle.includes("AI") && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-500/10 to-purple-500/10 border border-rose-500/20 text-rose-600 text-[10px] font-black uppercase tracking-wider">
                  <Sparkles size={11} className="text-rose-500" />
                  AI Powered
                </span>
              )}
            </div>
            <p className="hidden md:block text-xs text-slate-400 font-medium mt-0.5">
              Intelligent Luxury Wedding Planning Platform
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Search, Quick Actions, Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Create Wedding Button */}
          <Link
            to="/weddings/new"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100/80 font-bold text-xs border border-rose-200/60 transition"
          >
            <Plus size={15} />
            <span>New Wedding</span>
          </Link>

          {/* AI Insights Quick Trigger */}
          {weddingId && (
            <Link
              to={`/weddings/${weddingId}/insights`}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white text-xs font-bold shadow-md shadow-rose-500/20 hover:shadow-rose-500/30 hover:-translate-y-0.5 transition"
            >
              <Sparkles size={14} />
              <span>AI Insights</span>
            </Link>
          )}

          {/* Notifications */}
          <NotificationDropdown />

          {/* Vertical Divider */}
          <div className="hidden sm:block h-8 w-px bg-slate-200" />

          {/* Profile Badge */}
          <div className="flex items-center gap-2.5 pl-1 py-1 pr-2 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {firstLetter}
              </div>
              <span className="absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>

            <div className="hidden md:block text-left max-w-[120px]">
              <p className="font-bold text-xs text-slate-800 truncate leading-tight">
                {user?.fullName || "Account"}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {user?.role || "Planner"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;