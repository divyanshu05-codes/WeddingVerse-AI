import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import {
  getWeddingById,
  deleteWedding,
} from "../services/wedding.api";

import useVendor from "../../vendor/hooks/useVendor";

function WeddingDetails() {
  const { weddingId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [wedding, setWedding] = useState(null);

  const {
    vendors,
    loading: vendorsLoading,
  } = useVendor(weddingId);

  // =====================================================
  // VENDOR CALCULATIONS
  // =====================================================

  const totalVendorCost = vendors.reduce(
    (sum, vendor) =>
      sum + Number(vendor.totalCost || 0),
    0
  );

  const totalVendorAdvance = vendors.reduce(
    (sum, vendor) =>
      sum + Number(vendor.advancePaid || 0),
    0
  );

  const totalVendorRemaining =
    Math.max(
      totalVendorCost - totalVendorAdvance,
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
  // FETCH WEDDING
  // =====================================================

  useEffect(() => {
    fetchWedding();
  }, [weddingId]);

  const fetchWedding = async () => {
    try {
      setLoading(true);

      const res =
        await getWeddingById(weddingId);

      setWedding(res.data.data);
    } catch (error) {
      console.error(
        "Failed to load wedding:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load wedding."
      );

      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // DELETE WEDDING
  // =====================================================

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this wedding?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteWedding(weddingId);

      toast.success(
        "Wedding deleted successfully."
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Failed to delete wedding:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to delete wedding."
      );
    }
  };

  // =====================================================
  // WEDDING COUNTDOWN
  // =====================================================

  const countdown = useMemo(() => {
    if (
      !wedding?.weddingDetails?.weddingDate
    ) {
      return null;
    }

    const weddingDate = new Date(
      wedding.weddingDetails.weddingDate
    );

    const today = new Date();

    weddingDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const difference =
      weddingDate.getTime() -
      today.getTime();

    const days = Math.ceil(
      difference /
        (1000 * 60 * 60 * 24)
    );

    if (days > 0) {
      return {
        days,
        label: "days to go",
      };
    }

    if (days === 0) {
      return {
        days: 0,
        label: "It's Wedding Day! 🎉",
      };
    }

    return {
      days: Math.abs(days),
      label: "days since wedding",
    };
  }, [
    wedding?.weddingDetails?.weddingDate,
  ]);

  // =====================================================
  // BUDGET
  // =====================================================

  const estimatedBudget = Number(
    wedding?.estimatedBudget || 0
  );

  const budgetUsed =
    estimatedBudget > 0
      ? Math.min(
          Math.round(
            (totalVendorCost /
              estimatedBudget) *
              100
          ),
          100
        )
      : 0;

  const budgetRemaining =
    Math.max(
      estimatedBudget -
        totalVendorCost,
      0
    );

  // =====================================================
  // WEDDING HEALTH
  // =====================================================

  const weddingHealth = useMemo(() => {
    let score = 100;

    if (
      vendors.length === 0
    ) {
      score -= 15;
    }

    if (
      estimatedBudget > 0 &&
      totalVendorCost >
        estimatedBudget
    ) {
      score -= 30;
    }

    if (
      vendors.length > 0 &&
      pendingVendors >
        vendors.length / 2
    ) {
      score -= 15;
    }

    if (
      wedding?.status ===
      "Cancelled"
    ) {
      score = 20;
    }

    if (
      wedding?.status ===
      "Completed"
    ) {
      score = 100;
    }

    return Math.max(
      0,
      Math.min(score, 100)
    );
  }, [
    vendors,
    estimatedBudget,
    totalVendorCost,
    pendingVendors,
    wedding?.status,
  ]);

  const healthLabel =
    weddingHealth >= 80
      ? "Excellent"
      : weddingHealth >= 60
      ? "Good"
      : weddingHealth >= 40
      ? "Needs Attention"
      : "Critical";

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center">

          <div className="text-center">

            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mx-auto" />

            <p className="mt-5 text-gray-500 font-medium">
              Loading your wedding dashboard...
            </p>

          </div>

        </div>
      </DashboardLayout>
    );
  }

  // =====================================================
  // NOT FOUND
  // =====================================================

  if (!wedding) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-12 text-center">

          <div className="text-6xl mb-5">
            💒
          </div>

          <h2 className="text-3xl font-bold text-gray-900">
            Wedding Not Found
          </h2>

          <p className="text-gray-500 mt-3">
            The wedding you are looking for
            does not exist.
          </p>

          <Link
            to="/dashboard"
            className="inline-block mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Back to Dashboard
          </Link>

        </div>
      </DashboardLayout>
    );
  }

  // =====================================================
  // MAIN PAGE
  // =====================================================

  return (
    <DashboardLayout>

      <div className="max-w-7xl mx-auto pb-12">

        {/* =================================================
            BACK
        ================================================= */}

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 transition"
        >
          ← Back to Weddings
        </Link>


        {/* =================================================
            PREMIUM HERO
        ================================================= */}

        <div className="relative overflow-hidden mt-5 rounded-[2rem] bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700 text-white shadow-2xl">

          {/* Decorative circles */}

          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white/10 blur-sm" />

          <div className="absolute -left-24 -bottom-32 w-80 h-80 rounded-full bg-white/10" />

          <div className="relative p-7 md:p-10">

            <div className="flex flex-col xl:flex-row justify-between gap-8">

              {/* Couple */}

              <div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-sm font-medium mb-5">
                  💍 {wedding.status || "Planning"}
                </div>

                <p className="text-white/70 text-sm uppercase tracking-[0.2em] font-semibold">
                  Wedding Command Center
                </p>

                <h1 className="text-4xl md:text-5xl font-black mt-2 leading-tight">
                  {wedding.bride?.fullName}
                  {" "}
                  <span className="text-pink-200">
                    &
                  </span>
                  {" "}
                  {wedding.groom?.fullName}
                </h1>

                <div className="flex flex-wrap gap-4 mt-5 text-white/85">

                  <span>
                    📍{" "}
                    {wedding.weddingDetails?.city ||
                      "Location not provided"}
                  </span>

                  <span>
                    💒{" "}
                    {wedding.weddingDetails?.venue ||
                      "Venue not provided"}
                  </span>

                </div>

              </div>


              {/* Countdown */}

              {countdown && (
                <div className="shrink-0">

                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl px-8 py-6 text-center min-w-[190px]">

                    <p className="text-white/70 text-sm font-semibold uppercase tracking-wider">
                      {countdown.label}
                    </p>

                    {countdown.days !== 0 && (
                      <p className="text-6xl font-black mt-1">
                        {countdown.days}
                      </p>
                    )}

                    {countdown.days === 0 && (
                      <p className="text-4xl font-black mt-3">
                        🎉
                      </p>
                    )}

                  </div>

                </div>
              )}

            </div>

          </div>

        </div>


        {/* =================================================
            QUICK STATS
        ================================================= */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

          {/* Wedding Date */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

            <p className="text-gray-500 text-sm">
              Wedding Date
            </p>

            <p className="text-xl font-bold text-gray-900 mt-2">
              {wedding.weddingDetails?.weddingDate
                ? new Date(
                    wedding.weddingDetails.weddingDate
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )
                : "Not provided"}
            </p>

          </div>


          {/* Budget */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

            <p className="text-gray-500 text-sm">
              Estimated Budget
            </p>

            <p className="text-xl font-bold text-gray-900 mt-2">
              ₹
              {estimatedBudget.toLocaleString(
                "en-IN"
              )}
            </p>

          </div>


          {/* Vendors */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

            <p className="text-gray-500 text-sm">
              Vendors
            </p>

            <p className="text-xl font-bold text-gray-900 mt-2">
              {vendors.length}
            </p>

          </div>


          {/* Health */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

            <p className="text-gray-500 text-sm">
              Planning Health
            </p>

            <div className="flex items-center gap-3 mt-2">

              <p className="text-xl font-bold text-gray-900">
                {weddingHealth}/100
              </p>

              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${
                  weddingHealth >= 80
                    ? "bg-green-100 text-green-700"
                    : weddingHealth >= 60
                    ? "bg-blue-100 text-blue-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {healthLabel}
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            AI COMMAND CENTER
        ================================================= */}

        <div className="relative overflow-hidden mt-6 rounded-3xl bg-gray-950 text-white shadow-2xl">

          <div className="absolute right-0 top-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />

          <div className="relative p-7 md:p-8">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-7">

              <div>

                <div className="flex items-center gap-2">

                  <span className="text-2xl">
                    ✨
                  </span>

                  <p className="text-purple-300 text-sm font-bold uppercase tracking-[0.18em]">
                    AI Command Center
                  </p>

                </div>

                <h2 className="text-2xl md:text-3xl font-bold mt-2">
                  Plan smarter. Stress less.
                </h2>

                <p className="text-gray-400 mt-2 max-w-2xl">
                  Use AI to analyze your wedding,
                  generate plans, identify risks and
                  get personalized recommendations.
                </p>

              </div>

              <Link
                to={`/weddings/${weddingId}/insights`}
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-5 py-3 rounded-xl font-bold shadow-lg transition"
              >
                ✨ Open AI Insights
              </Link>

            </div>


            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

              <Link
                to={`/weddings/${weddingId}/ai`}
                className="group rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 p-5 transition"
              >
                <div className="text-3xl">
                  🤖
                </div>

                <h3 className="font-bold mt-3">
                  Wedding Planner
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  Build your complete AI plan.
                </p>
              </Link>


              <Link
                to={`/weddings/${weddingId}/timeline-advisor`}
                className="group rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 p-5 transition"
              >
                <div className="text-3xl">
                  📅
                </div>

                <h3 className="font-bold mt-3">
                  Timeline Advisor
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  Find planning risks.
                </p>
              </Link>


              <Link
                to={`/weddings/${weddingId}/insights`}
                className="group rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 p-5 transition"
              >
                <div className="text-3xl">
                  🧠
                </div>

                <h3 className="font-bold mt-3">
                  Smart Insights
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  Get your wedding health report.
                </p>
              </Link>


              <Link
                to={`/weddings/${weddingId}/chatbot`}
                className="group rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 p-5 transition"
              >
                <div className="text-3xl">
                  💬
                </div>

                <h3 className="font-bold mt-3">
                  Ask Wedding AI
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  Ask questions about your wedding.
                </p>
              </Link>

            </div>

          </div>

        </div>


        {/* =================================================
            MANAGEMENT GRID
        ================================================= */}

        <div className="mt-8">

          <div className="mb-5">

            <p className="text-pink-600 text-sm font-bold uppercase tracking-wider">
              Manage Everything
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-1">
              Your Wedding
            </h2>

          </div>


          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

            {/* Guests */}

            <Link
              to={`/weddings/${weddingId}/guests`}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 p-6 transition-all"
            >

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                👥
              </div>

              <h3 className="font-bold text-lg mt-5">
                Guests
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                Manage guests and RSVPs.
              </p>

              <span className="inline-block mt-4 text-blue-600 text-sm font-semibold">
                Manage Guests →
              </span>

            </Link>


            {/* Vendors */}

            <Link
              to={`/weddings/${weddingId}/vendors`}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 p-6 transition-all"
            >

              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
                🏢
              </div>

              <h3 className="font-bold text-lg mt-5">
                Vendors
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                Track vendors and payments.
              </p>

              <span className="inline-block mt-4 text-purple-600 text-sm font-semibold">
                Manage Vendors →
              </span>

            </Link>


            {/* Budget */}

            <Link
              to={`/weddings/${weddingId}/budget`}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 p-6 transition-all"
            >

              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                💰
              </div>

              <h3 className="font-bold text-lg mt-5">
                Budget
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                Monitor wedding spending.
              </p>

              <span className="inline-block mt-4 text-green-600 text-sm font-semibold">
                Manage Budget →
              </span>

            </Link>


            {/* Tasks */}

            <Link
              to={`/weddings/${weddingId}/tasks`}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 p-6 transition-all"
            >

              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
                📋
              </div>

              <h3 className="font-bold text-lg mt-5">
                Planning Tasks
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                Stay on top of wedding tasks.
              </p>

              <span className="inline-block mt-4 text-orange-600 text-sm font-semibold">
                View Tasks →
              </span>

            </Link>

          </div>

        </div>


        {/* =================================================
            WEDDING DETAILS
        ================================================= */}

        <div className="grid lg:grid-cols-2 gap-6 mt-8">

          {/* Couple */}

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-11 h-11 rounded-xl bg-pink-100 flex items-center justify-center text-xl">
                💕
              </div>

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Couple
                </h2>

                <p className="text-sm text-gray-500">
                  Wedding profiles
                </p>

              </div>

            </div>

            <div className="space-y-5">

              <div>

                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Bride
                </p>

                <p className="font-semibold text-gray-900 mt-1">
                  {wedding.bride?.fullName ||
                    "Not provided"}
                </p>

              </div>

              <div>

                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Groom
                </p>

                <p className="font-semibold text-gray-900 mt-1">
                  {wedding.groom?.fullName ||
                    "Not provided"}
                </p>

              </div>

            </div>

          </div>


          {/* Venue */}

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center text-xl">
                📍
              </div>

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Wedding Venue
                </h2>

                <p className="text-sm text-gray-500">
                  Event location
                </p>

              </div>

            </div>

            <div className="space-y-4">

              <div>

                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Venue
                </p>

                <p className="font-semibold text-gray-900 mt-1">
                  {wedding.weddingDetails?.venue ||
                    "Not provided"}
                </p>

              </div>

              <div>

                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Address
                </p>

                <p className="font-semibold text-gray-900 mt-1">
                  {wedding.weddingDetails?.address ||
                    "Not provided"}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            BUDGET OVERVIEW
        ================================================= */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 mt-6">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">

            <div>

              <p className="text-green-600 text-sm font-bold uppercase tracking-wider">
                Financial Overview
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                Wedding Budget
              </h2>

            </div>

            <Link
              to={`/weddings/${weddingId}/budget`}
              className="text-green-600 font-semibold hover:underline"
            >
              Open Budget →
            </Link>

          </div>


          <div className="grid md:grid-cols-3 gap-5">

            <div className="rounded-2xl bg-gray-50 p-5">

              <p className="text-gray-500 text-sm">
                Estimated Budget
              </p>

              <p className="text-2xl font-bold text-gray-900 mt-2">
                ₹
                {estimatedBudget.toLocaleString(
                  "en-IN"
                )}
              </p>

            </div>


            <div className="rounded-2xl bg-blue-50 p-5">

              <p className="text-gray-500 text-sm">
                Vendor Commitments
              </p>

              <p className="text-2xl font-bold text-blue-600 mt-2">
                ₹
                {totalVendorCost.toLocaleString(
                  "en-IN"
                )}
              </p>

            </div>


            <div className="rounded-2xl bg-green-50 p-5">

              <p className="text-gray-500 text-sm">
                Available Budget
              </p>

              <p className="text-2xl font-bold text-green-600 mt-2">
                ₹
                {budgetRemaining.toLocaleString(
                  "en-IN"
                )}
              </p>

            </div>

          </div>


          {estimatedBudget > 0 && (
            <div className="mt-7">

              <div className="flex justify-between mb-2">

                <span className="text-sm font-medium text-gray-600">
                  Budget utilization
                </span>

                <span className="text-sm font-bold text-gray-900">
                  {budgetUsed}%
                </span>

              </div>

              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">

                <div
                  className={`h-full rounded-full transition-all ${
                    budgetUsed >= 90
                      ? "bg-red-500"
                      : budgetUsed >= 70
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{
                    width: `${budgetUsed}%`,
                  }}
                />

              </div>

            </div>
          )}

        </div>


        {/* =================================================
            VENDOR SUMMARY
        ================================================= */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 mt-6">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">

            <div>

              <p className="text-purple-600 text-sm font-bold uppercase tracking-wider">
                Vendor Management
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                Vendor Overview
              </h2>

            </div>

            <Link
              to={`/weddings/${weddingId}/vendors`}
              className="text-purple-600 font-semibold hover:underline"
            >
              View Vendors →
            </Link>

          </div>


          {vendorsLoading ? (

            <div className="py-8 text-center text-gray-500">
              Loading vendor data...
            </div>

          ) : vendors.length === 0 ? (

            <div className="rounded-2xl bg-purple-50 p-8 text-center">

              <div className="text-4xl">
                🏢
              </div>

              <h3 className="font-bold text-lg mt-3">
                No vendors added yet
              </h3>

              <p className="text-gray-500 mt-1">
                Start adding your wedding vendors.
              </p>

              <Link
                to={`/weddings/${weddingId}/vendors/new`}
                className="inline-block mt-5 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl font-semibold"
              >
                + Add Vendor
              </Link>

            </div>

          ) : (

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

              <div className="bg-purple-50 rounded-2xl p-5">

                <p className="text-gray-500 text-sm">
                  Total Vendors
                </p>

                <p className="text-3xl font-bold text-purple-600 mt-2">
                  {vendors.length}
                </p>

              </div>


              <div className="bg-blue-50 rounded-2xl p-5">

                <p className="text-gray-500 text-sm">
                  Total Cost
                </p>

                <p className="text-2xl font-bold text-blue-600 mt-2">
                  ₹
                  {totalVendorCost.toLocaleString(
                    "en-IN"
                  )}
                </p>

              </div>


              <div className="bg-green-50 rounded-2xl p-5">

                <p className="text-gray-500 text-sm">
                  Advance Paid
                </p>

                <p className="text-2xl font-bold text-green-600 mt-2">
                  ₹
                  {totalVendorAdvance.toLocaleString(
                    "en-IN"
                  )}
                </p>

              </div>


              <div className="bg-red-50 rounded-2xl p-5">

                <p className="text-gray-500 text-sm">
                  Remaining
                </p>

                <p className="text-2xl font-bold text-red-500 mt-2">
                  ₹
                  {totalVendorRemaining.toLocaleString(
                    "en-IN"
                  )}
                </p>

              </div>

            </div>

          )}

        </div>


        {/* =================================================
            FINAL ACTIONS
        ================================================= */}

        <div className="flex flex-wrap gap-3 mt-8">

          <Link
            to={`/weddings/${weddingId}/edit`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            ✏️ Edit Wedding
          </Link>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            🗑️ Delete Wedding
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default WeddingDetails;