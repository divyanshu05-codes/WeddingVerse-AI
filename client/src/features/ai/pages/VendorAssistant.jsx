import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import {
  analyzeWeddingVendors,
  getVendorAnalysis,
} from "../services/ai.api";

function VendorAssistant() {
  const { weddingId } = useParams();

  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  // ======================================================
  // LOAD SAVED ANALYSIS
  // ======================================================

  useEffect(() => {
    const fetchVendorAnalysis = async () => {
      try {
        setLoading(true);

        const response =
          await getVendorAnalysis(weddingId);

        setAnalysis(
          response.data?.data?.analysis || ""
        );
      } catch (error) {
        console.error(
          "Failed to load vendor analysis:",
          error
        );

        toast.error(
          error.response?.data?.message ||
            "Failed to load vendor analysis."
        );
      } finally {
        setLoading(false);
      }
    };

    if (weddingId) {
      fetchVendorAnalysis();
    }
  }, [weddingId]);

  // ======================================================
  // GENERATE ANALYSIS
  // ======================================================

  const handleAnalyzeVendors = async () => {
    try {
      setGenerating(true);

      const response =
        await analyzeWeddingVendors(weddingId);

      const generatedAnalysis =
        response.data?.data?.analysis || "";

      setAnalysis(generatedAnalysis);

      toast.success(
        "Vendor analysis generated successfully."
      );
    } catch (error) {
      console.error(
        "Vendor analysis generation failed:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to generate vendor analysis."
      );
    } finally {
      setGenerating(false);
    }
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">

            <div className="w-14 h-14 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto" />

            <p className="mt-5 text-gray-500 font-medium">
              Loading vendor assistant...
            </p>

          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ======================================================
  // UI
  // ======================================================

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto pb-12">

        {/* ==================================================
            BACK
        ================================================== */}

        <Link
          to={`/weddings/${weddingId}`}
          className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 hover:underline"
        >
          ← Back to Wedding
        </Link>


        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 rounded-3xl border border-purple-100 shadow-sm p-8 mt-5">

          <div className="absolute -top-16 -right-16 w-56 h-56 bg-purple-200/30 rounded-full blur-3xl" />

          <div className="relative">

            <div className="inline-flex items-center gap-2 bg-white/80 border border-purple-100 px-4 py-2 rounded-full text-sm font-semibold text-purple-600">
              🤝 AI Vendor Management
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mt-5">
              Vendor Assistant
            </h1>

            <p className="text-gray-600 mt-3 max-w-3xl text-lg leading-7">
              Analyze your existing wedding vendors,
              identify pending payments and missing
              information, and get practical follow-up
              actions.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">

              <span className="bg-white/80 border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-600">
                💰 Payment Tracking
              </span>

              <span className="bg-white/80 border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-600">
                📋 Follow-up Actions
              </span>

              <span className="bg-white/80 border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-600">
                ⚠️ Missing Information
              </span>

            </div>

          </div>

        </div>


        {/* ==================================================
            MAIN PANEL
        ================================================== */}

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 mt-8 overflow-hidden">

          {/* TOP BAR */}

          <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <h2 className="text-2xl font-bold text-gray-900">
                Vendor Analysis
              </h2>

              <p className="text-gray-500 mt-1">
                AI insights based on the vendors you've
                already added.
              </p>

            </div>

            <button
              onClick={handleAnalyzeVendors}
              disabled={generating}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition"
            >
              {generating
                ? "🤖 Analyzing Vendors..."
                : analysis
                ? "🔄 Analyze Again"
                : "🤝 Analyze My Vendors"}
            </button>

          </div>


          {/* ==================================================
              EMPTY STATE
          ================================================== */}

          {!analysis && !generating && (
            <div className="p-12 md:p-16 text-center">

              <div className="w-24 h-24 mx-auto rounded-3xl bg-purple-100 flex items-center justify-center text-5xl">
                🤝
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6">
                Your Vendor Assistant Is Ready
              </h3>

              <p className="text-gray-500 mt-3 max-w-xl mx-auto leading-7">
                Click "Analyze My Vendors" and AI will
                review the vendors already recorded for
                this wedding.
              </p>

              <p className="text-sm text-gray-400 mt-4">
                It will not recommend new vendors.
              </p>

            </div>
          )}


          {/* ==================================================
              GENERATING
          ================================================== */}

          {generating && (
            <div className="p-12 md:p-16 text-center">

              <div className="w-20 h-20 mx-auto rounded-full bg-purple-100 flex items-center justify-center text-4xl animate-pulse">
                🤖
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6">
                AI Is Analyzing Your Vendors
              </h3>

              <p className="text-gray-500 mt-3">
                Reviewing payment status, vendor details,
                and potential follow-up actions...
              </p>

            </div>
          )}


          {/* ==================================================
              ANALYSIS RESULT
          ================================================== */}

          {analysis && !generating && (
            <div className="p-6 md:p-8">

              {/* Status */}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-purple-50 border border-purple-100 rounded-2xl p-5 mb-6">

                <div>

                  <p className="text-sm font-semibold text-purple-600">
                    AI Vendor Assistant
                  </p>

                  <p className="text-gray-700 mt-1">
                    Analysis is saved and will remain
                    available after refreshing.
                  </p>

                </div>

                <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-semibold text-green-600 border border-green-100">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Saved
                </span>

              </div>


              {/* Analysis */}

              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 md:p-8">

                <div className="whitespace-pre-wrap text-gray-700 leading-8">
                  {analysis}
                </div>

              </div>


              {/* Disclaimer */}

              <div className="mt-6 bg-yellow-50 border border-yellow-100 rounded-xl p-4">

                <p className="text-sm text-yellow-800 leading-6">
                  <strong>Note:</strong> This assistant
                  analyzes the vendor information you've
                  entered. Always confirm payment terms,
                  contracts, schedules and other important
                  details directly with your vendors.
                </p>

              </div>

            </div>
          )}

        </div>

      </div>
    </DashboardLayout>
  );
}

export default VendorAssistant;