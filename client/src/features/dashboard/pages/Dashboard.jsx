import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import { getDashboardData } from "../services/dashboard.api";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await getDashboardData();

      setDashboard(res.data.data);
    } catch (error) {
      console.error(
        "Failed to load dashboard:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // HELPERS
  // =====================================================

  const getDaysRemaining = (date) => {
    if (!date) return null;

    const today = new Date();
    const weddingDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    weddingDate.setHours(0, 0, 0, 0);

    const difference =
      weddingDate.getTime() -
      today.getTime();

    return Math.ceil(
      difference /
        (1000 * 60 * 60 * 24)
    );
  };

  const getBudgetPercentage = (
    budget,
    remaining
  ) => {
    const total = Number(budget || 0);
    const left = Number(remaining || 0);

    if (total <= 0) return 0;

    const spent = Math.max(
      total - left,
      0
    );

    return Math.min(
      Math.round(
        (spent / total) * 100
      ),
      100
    );
  };

  const getBudgetStatus = (percentage) => {
    if (percentage >= 90) {
      return {
        label: "High usage",
        text: "text-red-600",
        bg: "bg-red-100",
        bar: "bg-red-500",
      };
    }

    if (percentage >= 70) {
      return {
        label: "Watch budget",
        text: "text-amber-600",
        bg: "bg-amber-100",
        bar: "bg-amber-500",
      };
    }

    return {
      label: "Healthy",
      text: "text-emerald-600",
      bg: "bg-emerald-100",
      bar: "bg-emerald-500",
    };
  };

  // =====================================================
  // UPCOMING WEDDING
  // =====================================================

  const upcomingWedding = useMemo(() => {
    if (
      !dashboard?.weddings ||
      dashboard.weddings.length === 0
    ) {
      return null;
    }

    return dashboard.weddings
      .filter((wedding) => {
        const date =
          wedding.weddingDetails
            ?.weddingDate;

        return (
          date &&
          new Date(date) >=
            new Date()
        );
      })
      .sort(
        (a, b) =>
          new Date(
            a.weddingDetails.weddingDate
          ) -
          new Date(
            b.weddingDetails.weddingDate
          )
      )[0];
  }, [dashboard]);

  // =====================================================
  // GLOBAL BUDGET
  // =====================================================

  const totalBudget = Number(
    dashboard?.totalBudget || 0
  );

  const totalExpenses = Number(
    dashboard?.totalExpenses || 0
  );

  const totalRemaining = Number(
    dashboard?.totalRemaining || 0
  );

  const overallBudgetPercentage =
    totalBudget > 0
      ? Math.min(
          Math.round(
            (totalExpenses /
              totalBudget) *
              100
          ),
          100
        )
      : 0;

  const overallBudgetStatus =
    getBudgetStatus(
      overallBudgetPercentage
    );

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[75vh] flex items-center justify-center">

          <div className="text-center">

            <div className="relative w-16 h-16 mx-auto">

              <div className="absolute inset-0 rounded-full border-4 border-pink-100" />

              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-pink-600 animate-spin" />

            </div>

            <p className="mt-5 text-gray-500 font-medium">
              Preparing your wedding dashboard...
            </p>

          </div>

        </div>
      </DashboardLayout>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (!dashboard) {
    return (
      <DashboardLayout>
        <div className="max-w-xl mx-auto py-20">

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 text-center">

            <div className="text-6xl mb-5">
              💒
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Unable to load dashboard
            </h2>

            <p className="text-gray-500 mt-3">
              Something went wrong while
              loading your wedding data.
            </p>

            <button
              onClick={fetchDashboard}
              className="mt-6 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-7 py-3 rounded-xl font-semibold shadow-lg transition"
            >
              Try Again
            </button>

          </div>

        </div>
      </DashboardLayout>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <DashboardLayout>

      <div className="max-w-7xl mx-auto pb-14">

        {/* =================================================
            PREMIUM HERO
        ================================================= */}

        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700 text-white shadow-2xl">

          <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-white/10" />

          <div className="absolute -left-24 -bottom-36 w-96 h-96 rounded-full bg-white/10" />

          <div className="relative p-7 md:p-10">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

              <div>

                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold">
                  ✨ Wedding Planning Command Center
                </div>

                <h1 className="text-4xl md:text-5xl font-black mt-5 leading-tight">
                  Your wedding,
                  <br />
                  beautifully organized.
                </h1>

                <p className="text-white/80 text-lg mt-4 max-w-2xl">
                  Track your weddings, manage
                  your budget, stay on top of
                  planning and use AI to make
                  smarter decisions.
                </p>

              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">

                <Link
                  to="/weddings/new"
                  className="bg-white text-purple-700 hover:bg-gray-50 px-7 py-3.5 rounded-xl font-bold text-center shadow-lg transition hover:-translate-y-0.5"
                >
                  + Create Wedding
                </Link>

                {upcomingWedding && (
                  <Link
                    to={`/weddings/${upcomingWedding._id}/insights`}
                    className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur px-7 py-3.5 rounded-xl font-bold text-center transition"
                  >
                    ✨ AI Insights
                  </Link>
                )}

              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            SUMMARY
        ================================================= */}

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-6">

          {/* Weddings */}

          <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl p-5 transition">

            <div className="flex justify-between items-start">

              <div className="w-11 h-11 rounded-xl bg-pink-100 flex items-center justify-center text-xl">
                💍
              </div>

              <span className="text-pink-500 text-sm">
                Weddings
              </span>

            </div>

            <p className="text-3xl font-black text-gray-900 mt-5">
              {dashboard.totalWeddings}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Total weddings
            </p>

          </div>


          {/* Guests */}

          <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl p-5 transition">

            <div className="flex justify-between items-start">

              <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                👥
              </div>

              <span className="text-blue-500 text-sm">
                Guests
              </span>

            </div>

            <p className="text-3xl font-black text-gray-900 mt-5">
              {dashboard.totalGuests}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Across all weddings
            </p>

          </div>


          {/* Vendors */}

          <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl p-5 transition">

            <div className="flex justify-between items-start">

              <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center text-xl">
                🏢
              </div>

              <span className="text-purple-500 text-sm">
                Vendors
              </span>

            </div>

            <p className="text-3xl font-black text-gray-900 mt-5">
              {dashboard.totalVendors}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Booked vendors
            </p>

          </div>


          {/* Budget */}

          <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl p-5 transition">

            <div className="flex justify-between items-start">

              <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center text-xl">
                💰
              </div>

              <span className="text-emerald-500 text-sm">
                Budget
              </span>

            </div>

            <p className="text-2xl font-black text-gray-900 mt-5">
              ₹
              {totalBudget.toLocaleString(
                "en-IN"
              )}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Planned budget
            </p>

          </div>

        </section>


        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="grid xl:grid-cols-[1.5fr_1fr] gap-6 mt-6">

          {/* =================================================
              UPCOMING WEDDING
          ================================================= */}

          {upcomingWedding ? (

            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

              <div className="relative bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 p-7">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

                  <div>

                    <p className="text-pink-600 text-sm font-bold uppercase tracking-[0.18em]">
                      Next celebration
                    </p>

                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-2">
                      {upcomingWedding.bride?.fullName}
                      {" "}
                      <span className="text-pink-500">
                        &
                      </span>
                      {" "}
                      {upcomingWedding.groom?.fullName}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      📍{" "}
                      {upcomingWedding.weddingDetails?.venue ||
                        "Venue not provided"}
                      {" • "}
                      {upcomingWedding.weddingDetails?.city ||
                        "City not provided"}
                    </p>

                  </div>


                  <div className="bg-white rounded-2xl shadow-sm border border-pink-100 px-6 py-4 text-center">

                    <p className="text-xs uppercase tracking-wider font-bold text-gray-400">
                      Countdown
                    </p>

                    <p className="text-4xl font-black text-pink-600 mt-1">

                      {getDaysRemaining(
                        upcomingWedding.weddingDetails
                          ?.weddingDate
                      ) >= 0
                        ? getDaysRemaining(
                            upcomingWedding
                              .weddingDetails
                              ?.weddingDate
                          )
                        : 0}

                    </p>

                    <p className="text-xs text-gray-500">
                      days to go
                    </p>

                  </div>

                </div>

              </div>


              <div className="p-7">

                <div className="grid sm:grid-cols-2 gap-4">

                  {/* Date */}

                  <div className="rounded-2xl bg-blue-50 p-5">

                    <p className="text-sm text-gray-500">
                      Wedding Date
                    </p>

                    <p className="font-bold text-blue-700 text-lg mt-2">
                      {upcomingWedding
                        .weddingDetails
                        ?.weddingDate
                        ? new Date(
                            upcomingWedding
                              .weddingDetails
                              .weddingDate
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              weekday:
                                "short",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : "Not provided"}
                    </p>

                  </div>


                  {/* Budget */}

                  <div className="rounded-2xl bg-emerald-50 p-5">

                    <p className="text-sm text-gray-500">
                      Remaining Budget
                    </p>

                    <p className="font-bold text-emerald-700 text-lg mt-2">
                      ₹
                      {Number(
                        upcomingWedding.remainingBudget ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>

                  </div>


                  {/* Guests */}

                  <div className="rounded-2xl bg-purple-50 p-5">

                    <p className="text-sm text-gray-500">
                      Guests
                    </p>

                    <p className="font-bold text-purple-700 text-2xl mt-2">
                      {upcomingWedding.totalGuests ||
                        0}
                    </p>

                  </div>


                  {/* Vendors */}

                  <div className="rounded-2xl bg-orange-50 p-5">

                    <p className="text-sm text-gray-500">
                      Vendors
                    </p>

                    <p className="font-bold text-orange-700 text-2xl mt-2">
                      {upcomingWedding.totalVendors ||
                        0}
                    </p>

                  </div>

                </div>


                {/* Budget progress */}

                <div className="mt-6">

                  <div className="flex justify-between items-center mb-2">

                    <span className="text-sm font-semibold text-gray-600">
                      Budget utilization
                    </span>

                    <span className="text-sm font-bold text-gray-900">
                      {getBudgetPercentage(
                        upcomingWedding.estimatedBudget,
                        upcomingWedding.remainingBudget
                      )}
                      %
                    </span>

                  </div>

                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">

                    <div
                      className={`h-full rounded-full ${
                        getBudgetStatus(
                          getBudgetPercentage(
                            upcomingWedding.estimatedBudget,
                            upcomingWedding.remainingBudget
                          )
                        ).bar
                      }`}
                      style={{
                        width: `${getBudgetPercentage(
                          upcomingWedding.estimatedBudget,
                          upcomingWedding.remainingBudget
                        )}%`,
                      }}
                    />

                  </div>

                </div>


                {/* Actions */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7">

                  <Link
                    to={`/weddings/${upcomingWedding._id}`}
                    className="bg-gray-900 hover:bg-gray-800 text-white text-center py-3 rounded-xl font-semibold transition"
                  >
                    View Wedding
                  </Link>

                  <Link
                    to={`/weddings/${upcomingWedding._id}/insights`}
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white text-center py-3 rounded-xl font-semibold transition shadow-md"
                  >
                    ✨ AI Insights
                  </Link>

                  <Link
                    to={`/weddings/${upcomingWedding._id}/budget`}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white text-center py-3 rounded-xl font-semibold transition"
                  >
                    💰 Budget
                  </Link>

                </div>

              </div>

            </section>

          ) : (

            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 flex items-center justify-center">

              <div className="text-center">

                <div className="text-6xl">
                  💍
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mt-5">
                  No upcoming wedding
                </h2>

                <p className="text-gray-500 mt-2">
                  Create a wedding to start
                  your planning journey.
                </p>

                <Link
                  to="/weddings/new"
                  className="inline-block mt-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  + Create Wedding
                </Link>

              </div>

            </section>

          )}


          {/* =================================================
              FINANCIAL HEALTH
          ================================================= */}

          <section className="bg-gray-950 rounded-3xl text-white p-7 shadow-xl">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-emerald-400 text-sm font-bold uppercase tracking-wider">
                  Financial Health
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  Wedding finances
                </h2>

              </div>

              <span className="text-3xl">
                💰
              </span>

            </div>


            <div className="mt-8">

              <div className="flex justify-between items-end">

                <div>

                  <p className="text-gray-400 text-sm">
                    Total spent
                  </p>

                  <p className="text-3xl font-black mt-1">
                    ₹
                    {totalExpenses.toLocaleString(
                      "en-IN"
                    )}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-gray-400 text-sm">
                    Remaining
                  </p>

                  <p className="text-xl font-bold text-emerald-400 mt-1">
                    ₹
                    {totalRemaining.toLocaleString(
                      "en-IN"
                    )}
                  </p>

                </div>

              </div>


              <div className="mt-6">

                <div className="flex justify-between text-sm mb-2">

                  <span className="text-gray-400">
                    Budget used
                  </span>

                  <span className="font-bold">
                    {overallBudgetPercentage}%
                  </span>

                </div>

                <div className="h-3 bg-white/10 rounded-full overflow-hidden">

                  <div
                    className={`h-full rounded-full ${
                      overallBudgetStatus.bar
                    }`}
                    style={{
                      width: `${overallBudgetPercentage}%`,
                    }}
                  />

                </div>

              </div>


              <div
                className={`mt-5 inline-flex px-3 py-1.5 rounded-full text-xs font-bold ${overallBudgetStatus.bg} ${overallBudgetStatus.text}`}
              >
                {overallBudgetStatus.label}
              </div>

            </div>


            <Link
              to={
                upcomingWedding
                  ? `/weddings/${upcomingWedding._id}/budget`
                  : "/weddings"
              }
              className="block mt-8 text-center bg-white/10 hover:bg-white/15 border border-white/10 py-3 rounded-xl font-semibold transition"
            >
              Open Budget Manager →
            </Link>

          </section>

        </div>


        {/* =================================================
            AI COMMAND CENTER
        ================================================= */}

        {upcomingWedding && (

          <section className="relative overflow-hidden mt-6 rounded-3xl bg-gradient-to-r from-gray-950 via-purple-950 to-gray-950 text-white shadow-2xl">

            <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />

            <div className="relative p-7 md:p-8">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                <div>

                  <div className="flex items-center gap-2">

                    <span className="text-2xl">
                      ✨
                    </span>

                    <span className="text-purple-300 text-sm font-bold uppercase tracking-[0.18em]">
                      AI Command Center
                    </span>

                  </div>

                  <h2 className="text-2xl md:text-3xl font-black mt-2">
                    Your intelligent wedding assistant
                  </h2>

                  <p className="text-gray-400 mt-2 max-w-2xl">
                    Analyze your wedding, identify
                    risks, create plans and ask AI
                    anything about your celebration.
                  </p>

                </div>

                <Link
                  to={`/weddings/${upcomingWedding._id}/insights`}
                  className="shrink-0 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-6 py-3 rounded-xl font-bold shadow-lg transition"
                >
                  Open AI Insights →
                </Link>

              </div>


              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-7">

                <Link
                  to={`/weddings/${upcomingWedding._id}/ai`}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition"
                >
                  <div className="text-2xl">
                    🤖
                  </div>

                  <p className="font-bold mt-3">
                    AI Planner
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Build your plan
                  </p>
                </Link>


                <Link
                  to={`/weddings/${upcomingWedding._id}/timeline-advisor`}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition"
                >
                  <div className="text-2xl">
                    📅
                  </div>

                  <p className="font-bold mt-3">
                    Timeline
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Check readiness
                  </p>
                </Link>


                <Link
                  to={`/weddings/${upcomingWedding._id}/insights`}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition"
                >
                  <div className="text-2xl">
                    🧠
                  </div>

                  <p className="font-bold mt-3">
                    Insights
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Find risks
                  </p>
                </Link>


                <Link
                  to={`/weddings/${upcomingWedding._id}/chatbot`}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition"
                >
                  <div className="text-2xl">
                    💬
                  </div>

                  <p className="font-bold mt-3">
                    Ask AI
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Get answers
                  </p>
                </Link>

              </div>

            </div>

          </section>

        )}


        {/* =================================================
            MY WEDDINGS
        ================================================= */}

        <section className="mt-10">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">

            <div>

              <p className="text-pink-600 text-sm font-bold uppercase tracking-wider">
                Your celebrations
              </p>

              <h2 className="text-3xl font-black text-gray-900 mt-1">
                My Weddings
              </h2>

            </div>

            <Link
              to="/weddings"
              className="text-pink-600 font-semibold hover:text-pink-700"
            >
              View All →
            </Link>

          </div>


          {dashboard.weddings.length === 0 ? (

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">

              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-4xl mx-auto">
                💍
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-6">
                Your first wedding starts here
              </h2>

              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                Create a wedding and start
                managing guests, vendors,
                budget, tasks and AI planning
                from one place.
              </p>

              <Link
                to="/weddings/new"
                className="inline-block mt-7 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-7 py-3 rounded-xl font-bold shadow-lg transition"
              >
                + Create Your Wedding
              </Link>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

              {dashboard.weddings.map(
                (wedding) => {

                  const budgetPercentage =
                    getBudgetPercentage(
                      wedding.estimatedBudget,
                      wedding.remainingBudget
                    );

                  const budgetStatus =
                    getBudgetStatus(
                      budgetPercentage
                    );

                  const daysRemaining =
                    getDaysRemaining(
                      wedding
                        .weddingDetails
                        ?.weddingDate
                    );

                  return (
                    <div
                      key={wedding._id}
                      className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >

                      {/* Card Header */}

                      <div className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">

                        <div className="absolute right-4 top-4 text-4xl opacity-20">
                          💍
                        </div>

                        <div className="relative">

                          <span className="inline-flex bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-pink-600">
                            {wedding.status ||
                              "Planning"}
                          </span>

                          <h3 className="text-xl font-black text-gray-900 mt-4 leading-snug pr-10">
                            {wedding.bride?.fullName}
                            {" "}
                            <span className="text-pink-500">
                              &
                            </span>
                            {" "}
                            {wedding.groom?.fullName}
                          </h3>

                          <p className="text-gray-500 text-sm mt-2">
                            📍{" "}
                            {wedding.weddingDetails?.venue ||
                              "Venue not provided"}
                          </p>

                        </div>

                      </div>


                      <div className="p-6">

                        {/* Date */}

                        <div className="flex items-center justify-between">

                          <div>

                            <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                              Wedding Date
                            </p>

                            <p className="font-semibold text-gray-800 mt-1">
                              {wedding
                                .weddingDetails
                                ?.weddingDate
                                ? new Date(
                                    wedding
                                      .weddingDetails
                                      .weddingDate
                                  ).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )
                                : "Not available"}
                            </p>

                          </div>

                          {daysRemaining !== null && (
                            <div className="text-right">

                              <p className="text-xs text-gray-400">
                                Countdown
                              </p>

                              <p className="font-black text-pink-600">
                                {daysRemaining >= 0
                                  ? `${daysRemaining}d`
                                  : "Past"}

                              </p>

                            </div>
                          )}

                        </div>


                        {/* Stats */}

                        <div className="grid grid-cols-3 gap-2 mt-6">

                          <div className="rounded-xl bg-blue-50 p-3 text-center">

                            <p className="text-xs text-gray-500">
                              Guests
                            </p>

                            <p className="text-xl font-black text-blue-600 mt-1">
                              {wedding.totalGuests ||
                                0}
                            </p>

                          </div>


                          <div className="rounded-xl bg-purple-50 p-3 text-center">

                            <p className="text-xs text-gray-500">
                              Vendors
                            </p>

                            <p className="text-xl font-black text-purple-600 mt-1">
                              {wedding.totalVendors ||
                                0}
                            </p>

                          </div>


                          <div className="rounded-xl bg-red-50 p-3 text-center">

                            <p className="text-xs text-gray-500">
                              Spent
                            </p>

                            <p className="text-sm font-black text-red-500 mt-2">
                              ₹
                              {Number(
                                wedding.totalExpenses ||
                                  0
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </p>

                          </div>

                        </div>


                        {/* Budget */}

                        <div className="mt-6">

                          <div className="flex justify-between items-center text-sm">

                            <span className="font-semibold text-gray-600">
                              Budget
                            </span>

                            <span className="font-bold text-gray-900">
                              {budgetPercentage}%
                            </span>

                          </div>

                          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mt-2">

                            <div
                              className={`h-full rounded-full ${budgetStatus.bar}`}
                              style={{
                                width: `${budgetPercentage}%`,
                              }}
                            />

                          </div>

                          <div className="flex justify-between mt-2 text-xs">

                            <span className="text-gray-400">
                              ₹
                              {Number(
                                wedding.totalExpenses ||
                                  0
                              ).toLocaleString(
                                "en-IN"
                              )}{" "}
                              spent
                            </span>

                            <span
                              className={`font-semibold ${budgetStatus.text}`}
                            >
                              ₹
                              {Number(
                                wedding.remainingBudget ||
                                  0
                              ).toLocaleString(
                                "en-IN"
                              )}{" "}
                              left
                            </span>

                          </div>

                        </div>


                        {/* Actions */}

                        <div className="grid grid-cols-2 gap-3 mt-6">

                          <Link
                            to={`/weddings/${wedding._id}`}
                            className="bg-gray-900 hover:bg-gray-800 text-white text-center py-2.5 rounded-xl font-semibold transition"
                          >
                            View Wedding
                          </Link>

                          <Link
                            to={`/weddings/${wedding._id}/insights`}
                            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white text-center py-2.5 rounded-xl font-semibold transition"
                          >
                            ✨ AI Insights
                          </Link>

                        </div>


                        {/* Quick Links */}

                        <div className="grid grid-cols-3 gap-2 mt-3">

                          <Link
                            to={`/weddings/${wedding._id}/guests`}
                            className="text-center text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg py-2 transition"
                          >
                            👥 Guests
                          </Link>

                          <Link
                            to={`/weddings/${wedding._id}/vendors`}
                            className="text-center text-xs font-semibold text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg py-2 transition"
                          >
                            🏢 Vendors
                          </Link>

                          <Link
                            to={`/weddings/${wedding._id}/budget`}
                            className="text-center text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg py-2 transition"
                          >
                            💰 Budget
                          </Link>

                        </div>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          )}

        </section>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;