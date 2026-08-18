import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import {
  analyzeWeddingGuests,
  getGuestAnalysis,
} from "../services/ai.api";

function GuestAnalyzer() {
  const { weddingId } = useParams();

  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  // ======================================================
  // GET SAVED ANALYSIS
  // ======================================================

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);

        const response =
          await getGuestAnalysis(weddingId);

        setAnalysis(
          response.data?.data?.analysis || ""
        );

      } catch (error) {
        console.error(
          "Failed to load guest analysis:",
          error
        );

        toast.error(
          error.response?.data?.message ||
            "Failed to load guest analysis."
        );
      } finally {
        setLoading(false);
      }
    };

    if (weddingId) {
      fetchAnalysis();
    }
  }, [weddingId]);

  // ======================================================
  // GENERATE ANALYSIS
  // ======================================================

  const handleAnalyzeGuests = async () => {
    try {
      setGenerating(true);

      const response =
        await analyzeWeddingGuests(weddingId);

      const generatedAnalysis =
        response.data?.data?.analysis || "";

      setAnalysis(generatedAnalysis);

      toast.success(
        "Guest analysis generated successfully."
      );

    } catch (error) {
      console.error(
        "Guest analysis generation failed:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to generate guest analysis."
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
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-gray-500">
            Loading guest analysis...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  // ======================================================
  // UI
  // ======================================================

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <Link
          to={`/weddings/${weddingId}`}
          className="text-pink-600 font-semibold hover:underline"
        >
          ← Back to Wedding
        </Link>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-5">

          <h1 className="text-3xl font-bold text-purple-600">
            👥 AI Guest Analyzer
          </h1>

          <p className="text-gray-500 mt-2">
            Analyze your actual guest list and RSVP
            information to understand attendance,
            meal preferences, pending responses and
            guest-planning priorities.
          </p>

          {/* Generate / Analyze Again */}
          <div className="mt-8">

            <button
              onClick={handleAnalyzeGuests}
              disabled={generating}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              {generating
                ? "Analyzing Guests..."
                : analysis
                ? "🔄 Analyze Guests Again"
                : "👥 Analyze My Guests"}
            </button>

          </div>

        </div>

        {/* ==================================================
            NO ANALYSIS
        ================================================== */}

        {!analysis && !generating && (
          <div className="bg-white rounded-2xl shadow-md p-10 mt-6 text-center">

            <div className="text-5xl mb-4">
              👥
            </div>

            <h2 className="text-2xl font-semibold">
              Guest Analysis Not Generated Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Click "Analyze My Guests" to let AI
              analyze your existing guest and RSVP data.
            </p>

          </div>
        )}

        {/* ==================================================
            GENERATING
        ================================================== */}

        {generating && (
          <div className="bg-white rounded-2xl shadow-md p-10 mt-6 text-center">

            <div className="text-4xl mb-4">
              🤖
            </div>

            <h2 className="text-xl font-semibold">
              AI is analyzing your guests...
            </h2>

            <p className="text-gray-500 mt-2">
              Gemini is reviewing your actual guest,
              RSVP and meal preference data.
            </p>

          </div>
        )}

        {/* ==================================================
            ANALYSIS RESULT
        ================================================== */}

        {analysis && !generating && (
          <div className="bg-white rounded-2xl shadow-md p-8 mt-6">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

              <div>
                <h2 className="text-2xl font-bold">
                  Guest Analysis
                </h2>

                <p className="text-gray-500 mt-1">
                  AI insights based on your current
                  guest and RSVP data.
                </p>
              </div>

              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                AI Generated
              </span>

            </div>

            <div className="border-t pt-6">

              <div className="whitespace-pre-wrap text-gray-700 leading-7">
                {analysis}
              </div>

            </div>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default GuestAnalyzer;