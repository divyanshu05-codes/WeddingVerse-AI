import { Link } from "react-router-dom";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import WeddingCard from "../components/WeddingCard";
import useWedding from "../hooks/useWedding";

function WeddingDashboard() {
  const { weddings, loading } = useWedding();

  const totalWeddings = weddings.length;

  const upcomingWeddings = weddings.filter((wedding) => {
    const weddingDate =
      wedding?.weddingDetails?.weddingDate;

    if (!weddingDate) return false;

    return new Date(weddingDate) >= new Date();
  }).length;

  return (
    <DashboardLayout>
      <div>

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              My Weddings
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your weddings and plan everything
              in one place.
            </p>
          </div>

          <Link
            to="/weddings/new"
            className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-3 rounded-lg font-semibold text-center transition"
          >
            + Create Wedding
          </Link>

        </div>


        {loading ? (

          /* =================================================
             LOADING
          ================================================= */

          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <p className="text-lg text-gray-500">
              Loading weddings...
            </p>
          </div>

        ) : (

          <>

            {/* =================================================
                DASHBOARD SUMMARY
            ================================================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

              {/* Total Weddings */}

              <div className="bg-white rounded-2xl shadow-md p-6">

                <h2 className="text-gray-500 text-lg">
                  Total Weddings
                </h2>

                <p className="text-4xl font-bold text-pink-600 mt-3">
                  {totalWeddings}
                </p>

                <p className="text-sm text-gray-400 mt-2">
                  Weddings in your account
                </p>

              </div>


              {/* Upcoming Weddings */}

              <div className="bg-white rounded-2xl shadow-md p-6">

                <h2 className="text-gray-500 text-lg">
                  Upcoming Weddings
                </h2>

                <p className="text-4xl font-bold text-blue-600 mt-3">
                  {upcomingWeddings}
                </p>

                <p className="text-sm text-gray-400 mt-2">
                  Weddings currently being planned
                </p>

              </div>

            </div>


            {/* =================================================
                AI PLANNING TOOLS
            ================================================= */}

            {weddings.length > 0 && (

              <div className="mb-10">

                <div className="mb-6">

                  <h2 className="text-2xl font-semibold">
                    🤖 AI Wedding Planning
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Use AI-powered tools to make your
                    wedding planning easier.
                  </p>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                  {/* AI Timeline Advisor */}

                  <Link
                    to={`/weddings/${weddings[0]._id}/timeline-advisor`}
                    className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition group"
                  >

                    <div className="flex items-start justify-between">

                      <div className="text-4xl">
                        📅
                      </div>

                      <span className="text-xs font-semibold bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
                        AI
                      </span>

                    </div>


                    <h3 className="text-xl font-bold text-gray-800 mt-5 group-hover:text-pink-600 transition">
                      AI Timeline Advisor
                    </h3>


                    <p className="text-gray-500 mt-2 leading-6">
                      Analyze your wedding tasks,
                      deadlines and wedding date to
                      understand whether your planning
                      is on track.
                    </p>


                    <div className="mt-5 text-pink-600 font-semibold">
                      Analyze Timeline →
                    </div>

                  </Link>


                  {/* AI Wedding Plan */}

                  <Link
                    to={`/weddings/${weddings[0]._id}/ai-plan`}
                    className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition group"
                  >

                    <div className="flex items-start justify-between">

                      <div className="text-4xl">
                        🤖
                      </div>

                      <span className="text-xs font-semibold bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
                        AI
                      </span>

                    </div>


                    <h3 className="text-xl font-bold text-gray-800 mt-5 group-hover:text-pink-600 transition">
                      AI Wedding Plan
                    </h3>


                    <p className="text-gray-500 mt-2 leading-6">
                      Generate a personalized wedding
                      planning roadmap based on your
                      wedding details.
                    </p>


                    <div className="mt-5 text-pink-600 font-semibold">
                      Open AI Plan →
                    </div>

                  </Link>


                  {/* AI Budget Analysis */}

                  <Link
                    to={`/weddings/${weddings[0]._id}/budget`}
                    className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition group"
                  >

                    <div className="flex items-start justify-between">

                      <div className="text-4xl">
                        💰
                      </div>

                      <span className="text-xs font-semibold bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
                        AI
                      </span>

                    </div>


                    <h3 className="text-xl font-bold text-gray-800 mt-5 group-hover:text-pink-600 transition">
                      AI Budget Analysis
                    </h3>


                    <p className="text-gray-500 mt-2 leading-6">
                      Analyze your actual wedding
                      expenses and understand your
                      spending and remaining budget.
                    </p>


                    <div className="mt-5 text-pink-600 font-semibold">
                      Open Budget →
                    </div>

                  </Link>

                </div>

              </div>

            )}


            {/* =================================================
                YOUR WEDDINGS
            ================================================= */}

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">

              <div>

                <h2 className="text-2xl font-semibold">
                  Your Weddings
                </h2>

                <p className="text-gray-500 mt-1">
                  Select a wedding to manage its
                  planning details.
                </p>

              </div>

            </div>


            {/* =================================================
                NO WEDDINGS
            ================================================= */}

            {weddings.length === 0 ? (

              <div className="bg-white rounded-2xl p-10 text-center shadow-md">

                <div className="text-6xl mb-5">
                  💍
                </div>

                <h2 className="text-2xl font-semibold">
                  No Weddings Yet
                </h2>

                <p className="text-gray-500 mt-2 max-w-md mx-auto">
                  Create your first wedding to start
                  planning your special day with
                  WeddingVerse.
                </p>

                <Link
                  to="/weddings/new"
                  className="inline-block mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  + Create Wedding
                </Link>

              </div>

            ) : (

              /* =================================================
                 WEDDING CARDS
              ================================================= */

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                {weddings.map((wedding) => (

                  <WeddingCard
                    key={wedding._id}
                    wedding={wedding}
                  />

                ))}

              </div>

            )}

          </>

        )}

      </div>
    </DashboardLayout>
  );
}

export default WeddingDashboard;