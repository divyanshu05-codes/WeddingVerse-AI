import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Sparkles, Heart } from "lucide-react";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#fbfafd] text-slate-800 relative selection:bg-rose-500 selection:text-white">
      {/* Subtle ambient light meshes for visual depth */}
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed top-1/3 -left-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed -bottom-40 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      {/* =================================================
          DESKTOP SIDEBAR
      ================================================= */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-72 z-40">
        <Sidebar />
      </aside>

      {/* =================================================
          MAIN APPLICATION AREA
      ================================================= */}
      <div className="lg:ml-72 min-h-screen flex flex-col relative z-10">
        {/* NAVBAR */}
        <header className="sticky top-0 z-30">
          <Navbar />
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1">
          <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>

        {/* FOOTER */}
        <footer className="px-6 lg:px-8 py-6 border-t border-slate-200/60 bg-white/70 backdrop-blur-md mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700 tracking-tight flex items-center gap-1.5">
                💍 WeddingVerse AI
              </span>
              <span>— Intelligent Wedding Planning Architecture</span>
            </div>

            <div className="flex items-center gap-4 text-slate-500">
              <span className="flex items-center gap-1 text-rose-500 font-semibold">
                <Heart size={13} className="fill-rose-500" /> Made for beautiful celebrations
              </span>
              <span>•</span>
              <span>© {new Date().getFullYear()} All Rights Reserved</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default DashboardLayout;