import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f8f7fb]">

      {/* =================================================
          DESKTOP SIDEBAR
      ================================================= */}

      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 z-40">
        <Sidebar />
      </aside>


      {/* =================================================
          MAIN APPLICATION AREA
      ================================================= */}

      <div className="lg:ml-64 min-h-screen flex flex-col">

        {/* =================================================
            NAVBAR
        ================================================= */}

        <header className="sticky top-0 z-30">
          <Navbar />
        </header>


        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main className="flex-1">

          <div className="px-4 py-5 sm:px-6 lg:px-8 lg:py-8">

            {children}

          </div>

        </main>


        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="px-6 lg:px-8 py-5 border-t border-gray-200/70 bg-white/60">

          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400">

            <p>
              © {new Date().getFullYear()} Marriage Planner
            </p>

            <p className="flex items-center gap-1">
              Made for beautiful celebrations
              <span>💍</span>
            </p>

          </div>

        </footer>

      </div>

    </div>
  );
}

export default DashboardLayout;