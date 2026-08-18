import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import { getWeddingById } from "../../wedding/services/wedding.api";
import { getGuestsByWedding } from "../../guest/services/guest.api";
import { getVendorsByWedding } from "../../vendor/services/vendor.api";
import { getTasks } from "../../task/services/task.api";
import { getExpensesByWedding } from "../../budget/services/budget.api";

function AIInsightsDashboard() {
  const { weddingId } = useParams();

  const [loading, setLoading] = useState(true);

  const [wedding, setWedding] = useState(null);
  const [guests, setGuests] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // =====================================================
  // LOAD ALL WEDDING DATA
  // =====================================================

  useEffect(() => {
    if (weddingId) {
      loadDashboardData();
    }
  }, [weddingId]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const [
        weddingResponse,
        guestsResponse,
        vendorsResponse,
        tasksResponse,
        expensesResponse,
      ] = await Promise.all([
        getWeddingById(weddingId),
        getGuestsByWedding(weddingId),
        getVendorsByWedding(weddingId),
        getTasks(weddingId),
        getExpensesByWedding(weddingId),
      ]);

      // -------------------------------------------------
      // Wedding
      // -------------------------------------------------

      setWedding(
        weddingResponse?.data?.data || null
      );

      // -------------------------------------------------
      // Guests
      // -------------------------------------------------

      setGuests(
        guestsResponse?.data?.data || []
      );

      // -------------------------------------------------
      // Vendors
      // -------------------------------------------------

      setVendors(
        vendorsResponse?.data?.data || []
      );

      // -------------------------------------------------
      // Tasks
      // -------------------------------------------------

      setTasks(
        tasksResponse?.data?.data || []
      );

      // -------------------------------------------------
      // Expenses
      // -------------------------------------------------

      setExpenses(
        expensesResponse?.data?.data || []
      );
    } catch (error) {
      console.error(
        "AI Insights loading error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load wedding insights."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // TASK INSIGHTS
  // =====================================================

  const completedTasks = tasks.filter(
    (task) =>
      task.completed === true ||
      task.status === "Completed"
  ).length;

  const pendingTasks =
    tasks.length - completedTasks;

  const taskProgress =
    tasks.length > 0
      ? Math.round(
          (completedTasks / tasks.length) * 100
        )
      : 0;

  // =====================================================
  // GUEST INSIGHTS
  // =====================================================

  const acceptedGuests = guests.filter(
    (guest) =>
      guest.rsvpStatus === "Accepted"
  ).length;

  const pendingGuests = guests.filter(
    (guest) =>
      guest.rsvpStatus === "Pending"
  ).length;

  const declinedGuests = guests.filter(
    (guest) =>
      guest.rsvpStatus === "Declined"
  ).length;

  // =====================================================
  // VENDOR INSIGHTS
  // =====================================================

  const vendorCost = vendors.reduce(
    (sum, vendor) =>
      sum + Number(vendor.totalCost || 0),
    0
  );

  const vendorAdvance = vendors.reduce(
    (sum, vendor) =>
      sum + Number(vendor.advancePaid || 0),
    0
  );

  const vendorRemaining =
    Math.max(
      vendorCost - vendorAdvance,
      0
    );

  const paidVendors = vendors.filter(
    (vendor) =>
      vendor.paymentStatus === "Paid"
  ).length;

  const pendingVendors = vendors.filter(
    (vendor) =>
      vendor.paymentStatus === "Pending" ||
      vendor.paymentStatus === "Partial"
  ).length;

  // =====================================================
  // BUDGET INSIGHTS
  // =====================================================

  const totalExpenses = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount || 0),
    0
  );

  const estimatedBudget =
    Number(
      wedding?.estimatedBudget || 0
    );

  const remainingBudget =
    estimatedBudget - totalExpenses;

  const budgetPercentage =
    estimatedBudget > 0
      ? Math.min(
          Math.round(
            (totalExpenses /
              estimatedBudget) *
              100
          ),
          100
        )
      : 0;

  // =====================================================
  // WEDDING HEALTH
  // =====================================================

  const calculateHealth = () => {
    let score = 100;

    // Tasks
    if (tasks.length > 0) {
      if (taskProgress < 30) {
        score -= 25;
      } else if (taskProgress < 60) {
        score -= 10;
      }
    }

    // Guests
    if (
      guests.length > 0 &&
      pendingGuests >
        guests.length * 0.5
    ) {
      score -= 15;
    }

    // Vendors
    if (
      vendors.length > 0 &&
      pendingVendors >
        vendors.length * 0.5
    ) {
      score -= 15;
    }

    // Budget
    if (
      estimatedBudget > 0 &&
      totalExpenses > estimatedBudget
    ) {
      score -= 30;
    }

    score = Math.max(
      0,
      Math.min(score, 100)
    );

    if (score >= 80) {
      return {
        score,
        label: "Excellent",
        description:
          "Your wedding planning is on track.",
      };
    }

    if (score >= 60) {
      return {
        score,
        label: "Good",
        description:
          "Your wedding is progressing well, but some areas need attention.",
      };
    }

    return {
      score,
      label: "Needs Attention",
      description:
        "Several important planning areas need your attention.",
    };
  };

  const health = calculateHealth();

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center">

          <div className="text-center">

            <div className="w-14 h-14 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto" />

            <p className="mt-5 text-gray-500 font-medium">
              Preparing your wedding insights...
            </p>

          </div>

        </div>
      </DashboardLayout>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <DashboardLayout>

      <div className="max-w-7xl mx-auto pb-12">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">

          <Link
            to={`/weddings/${weddingId}`}
            className="text-pink-600 font-semibold hover:underline"
          >
            ← Back to Wedding
          </Link>

          <div className="mt-5">

            <p className="text-purple-600 font-semibold tracking-wider">
              AI POWERED OVERVIEW
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-1">
              Wedding Insights
            </h1>

            <p className="text-gray-500 mt-3 max-w-2xl">
              A complete overview of your wedding
              planning progress, budget, guests,
              vendors and tasks.
            </p>

          </div>

        </div>


        {/* =================================================
            WEDDING HEALTH
        ================================================= */}

        <div className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-600 rounded-3xl p-7 md:p-9 text-white shadow-xl mb-8">

          <div className="absolute -right-20 -top-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

          <div className="relative grid lg:grid-cols-[auto_1fr] gap-8 items-center">

            {/* Score */}

            <div className="w-32 h-32 rounded-full border-8 border-white/20 flex items-center justify-center">

              <div className="text-center">

                <p className="text-4xl font-bold">
                  {health.score}
                </p>

                <p className="text-xs text-white/70">
                  / 100
                </p>

              </div>

            </div>

            {/* Details */}

            <div>

              <p className="text-white/70 text-sm font-semibold uppercase tracking-wider">
                Wedding Health
              </p>

              <h2 className="text-3xl font-bold mt-1">
                {health.label}
              </h2>

              <p className="text-white/80 mt-2 max-w-xl">
                {health.description}
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            KEY METRICS
        ================================================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          {/* Tasks */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-500 text-sm">
                  Task Progress
                </p>

                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {taskProgress}%
                </p>

              </div>

              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
                📋
              </div>

            </div>

            <p className="text-sm text-gray-500 mt-4">
              {completedTasks} completed ·{" "}
              {pendingTasks} pending
            </p>

          </div>


          {/* Guests */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-500 text-sm">
                  Guest RSVPs
                </p>

                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {acceptedGuests}
                </p>

              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                👥
              </div>

            </div>

            <p className="text-sm text-gray-500 mt-4">
              {pendingGuests} pending ·{" "}
              {declinedGuests} declined
            </p>

          </div>


          {/* Vendors */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-500 text-sm">
                  Vendor Payments
                </p>

                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ₹
                  {vendorRemaining.toLocaleString(
                    "en-IN"
                  )}
                </p>

              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
                🏢
              </div>

            </div>

            <p className="text-sm text-gray-500 mt-4">
              {paidVendors} paid ·{" "}
              {pendingVendors} pending
            </p>

          </div>


          {/* Budget */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-500 text-sm">
                  Budget Used
                </p>

                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {budgetPercentage}%
                </p>

              </div>

              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                💰
              </div>

            </div>

            <p className="text-sm text-gray-500 mt-4">
              ₹
              {Math.max(
                remainingBudget,
                0
              ).toLocaleString("en-IN")}{" "}
              remaining
            </p>

          </div>

        </div>


        {/* =================================================
            PROGRESS
        ================================================= */}

        <div className="grid lg:grid-cols-2 gap-6 mb-8">

          {/* Task Progress */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-xl font-bold text-gray-900">
                📋 Planning Progress
              </h2>

              <Link
                to={`/weddings/${weddingId}/tasks`}
                className="text-purple-600 text-sm font-semibold hover:underline"
              >
                View Tasks →
              </Link>

            </div>

            <div className="w-full bg-gray-100 rounded-full h-4">

              <div
                className="bg-gradient-to-r from-orange-500 to-pink-500 h-4 rounded-full transition-all"
                style={{
                  width: `${taskProgress}%`,
                }}
              />

            </div>

            <div className="flex justify-between text-sm mt-3">

              <span className="text-gray-500">
                {completedTasks} completed
              </span>

              <span className="font-semibold text-gray-700">
                {taskProgress}%
              </span>

            </div>

          </div>


          {/* Budget Progress */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-xl font-bold text-gray-900">
                💰 Budget Progress
              </h2>

              <Link
                to={`/weddings/${weddingId}/budget`}
                className="text-green-600 text-sm font-semibold hover:underline"
              >
                View Budget →
              </Link>

            </div>

            <div className="w-full bg-gray-100 rounded-full h-4">

              <div
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-4 rounded-full transition-all"
                style={{
                  width: `${budgetPercentage}%`,
                }}
              />

            </div>

            <div className="flex justify-between text-sm mt-3">

              <span className="text-gray-500">
                ₹
                {totalExpenses.toLocaleString(
                  "en-IN"
                )}{" "}
                spent
              </span>

              <span className="font-semibold text-gray-700">
                {budgetPercentage}%
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            AI PLANNING SUITE
        ================================================= */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">

          <div className="mb-6">

            <p className="text-purple-600 text-sm font-bold uppercase tracking-wider">
              AI Planning Suite
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-1">
              Smart Wedding Tools
            </h2>

            <p className="text-gray-500 mt-2">
              Get deeper insights and assistance for
              every part of your wedding.
            </p>

          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Wedding Planner */}

            <Link
              to={`/weddings/${weddingId}/ai`}
              className="group rounded-2xl bg-pink-50 hover:bg-pink-100 p-5 transition"
            >
              <div className="text-3xl">
                🤖
              </div>

              <h3 className="font-bold text-gray-900 mt-3">
                Wedding Planner
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Generate your complete wedding plan.
              </p>
            </Link>


            {/* Timeline */}

            <Link
              to={`/weddings/${weddingId}/timeline-advisor`}
              className="group rounded-2xl bg-indigo-50 hover:bg-indigo-100 p-5 transition"
            >
              <div className="text-3xl">
                📅
              </div>

              <h3 className="font-bold text-gray-900 mt-3">
                Timeline Advisor
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Find timeline risks and priorities.
              </p>
            </Link>


            {/* Vendor Assistant */}

            <Link
              to={`/weddings/${weddingId}/vendor-assistant`}
              className="group rounded-2xl bg-purple-50 hover:bg-purple-100 p-5 transition"
            >
              <div className="text-3xl">
                🤝
              </div>

              <h3 className="font-bold text-gray-900 mt-3">
                Vendor Assistant
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Review vendors and pending payments.
              </p>
            </Link>


            {/* Chatbot */}

            <Link
              to={`/weddings/${weddingId}/ai-chat`}
              className="group rounded-2xl bg-blue-50 hover:bg-blue-100 p-5 transition"
            >
              <div className="text-3xl">
                💬
              </div>

              <h3 className="font-bold text-gray-900 mt-3">
                AI Wedding Assistant
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Ask anything about your wedding.
              </p>
            </Link>


            {/* Invitation */}

            <Link
              to={`/weddings/${weddingId}/invitation-generator`}
              className="group rounded-2xl bg-rose-50 hover:bg-rose-100 p-5 transition"
            >
              <div className="text-3xl">
                💌
              </div>

              <h3 className="font-bold text-gray-900 mt-3">
                Invitation Generator
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Create personalized invitations.
              </p>
            </Link>


            {/* Guests */}

            <Link
              to={`/weddings/${weddingId}/guests`}
              className="group rounded-2xl bg-cyan-50 hover:bg-cyan-100 p-5 transition"
            >
              <div className="text-3xl">
                👥
              </div>

              <h3 className="font-bold text-gray-900 mt-3">
                Guest Management
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Manage RSVPs and guest details.
              </p>
            </Link>

          </div>

        </div>


        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

          <Link
            to={`/weddings/${weddingId}/tasks`}
            className="bg-gray-900 hover:bg-gray-800 text-white rounded-2xl p-5 transition"
          >
            <p className="text-2xl">
              📋
            </p>

            <p className="font-bold mt-3">
              Manage Tasks
            </p>

            <p className="text-gray-400 text-sm mt-1">
              {pendingTasks} tasks pending
            </p>
          </Link>


          <Link
            to={`/weddings/${weddingId}/guests`}
            className="bg-gray-900 hover:bg-gray-800 text-white rounded-2xl p-5 transition"
          >
            <p className="text-2xl">
              👥
            </p>

            <p className="font-bold mt-3">
              Manage Guests
            </p>

            <p className="text-gray-400 text-sm mt-1">
              {pendingGuests} RSVPs pending
            </p>
          </Link>


          <Link
            to={`/weddings/${weddingId}/vendors`}
            className="bg-gray-900 hover:bg-gray-800 text-white rounded-2xl p-5 transition"
          >
            <p className="text-2xl">
              🏢
            </p>

            <p className="font-bold mt-3">
              Manage Vendors
            </p>

            <p className="text-gray-400 text-sm mt-1">
              ₹
              {vendorRemaining.toLocaleString(
                "en-IN"
              )}{" "}
              pending
            </p>
          </Link>


          <Link
            to={`/weddings/${weddingId}/ai-chat`}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl p-5 transition shadow-md"
          >
            <p className="text-2xl">
              💬
            </p>

            <p className="font-bold mt-3">
              Ask AI
            </p>

            <p className="text-white/70 text-sm mt-1">
              Get personalized planning help
            </p>
          </Link>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default AIInsightsDashboard;