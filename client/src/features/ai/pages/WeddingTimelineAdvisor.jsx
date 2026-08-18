import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import {
  analyzeWeddingTimeline,
  getTimelineAnalysis,
} from "../services/ai.api";

function WeddingTimelineAdvisor() {
  const { weddingId } = useParams();

  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  // ======================================================
  // LOAD SAVED TIMELINE ANALYSIS
  // ======================================================

  useEffect(() => {
    const fetchSavedAnalysis = async () => {
      try {
        setLoading(true);

        const response =
          await getTimelineAnalysis(weddingId);

        const savedAnalysis =
          response.data?.data?.analysis || "";

        setAnalysis(savedAnalysis);

      } catch (error) {
        console.error(
          "Failed to load timeline analysis:",
          error
        );

        toast.error(
          error.response?.data?.message ||
            "Failed to load timeline analysis."
        );
      } finally {
        setLoading(false);
      }
    };

    if (weddingId) {
      fetchSavedAnalysis();
    }
  }, [weddingId]);

  // ======================================================
  // GENERATE TIMELINE ANALYSIS
  // ======================================================

  const handleAnalyzeTimeline = async () => {
    try {
      setAnalyzing(true);

      const response =
        await analyzeWeddingTimeline(
          weddingId
        );

      const generatedAnalysis =
        response.data?.data?.analysis || "";

      if (!generatedAnalysis) {
        throw new Error(
          "AI returned an empty timeline analysis."
        );
      }

      setAnalysis(generatedAnalysis);

      toast.success(
        "AI timeline analysis generated successfully."
      );

    } catch (error) {
      console.error(
        "Timeline analysis generation failed:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to generate timeline analysis."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  // ======================================================
  // LOADING SAVED ANALYSIS
  // ======================================================

  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-6xl mx-auto">

          <Link
            to={`/weddings/${weddingId}`}
            className="text-pink-600 font-semibold hover:underline"
          >
            ← Back to Wedding
          </Link>

          <div className="bg-white rounded-2xl shadow-lg p-10 mt-5 text-center">

            <div className="animate-pulse">

              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto" />

              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mt-4" />

              <div className="h-12 bg-gray-200 rounded w-48 mx-auto mt-8" />

            </div>

            <p className="text-gray-500 mt-6">
              Loading your timeline analysis...
            </p>

          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ======================================================
  // MAIN UI
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

          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5">

            <div>

              <h1 className="text-3xl font-bold text-indigo-600">
                📅 AI Timeline Advisor
              </h1>

              <p className="text-gray-500 mt-2 max-w-2xl">
                Gemini analyzes your wedding date and
                existing planning tasks to identify
                deadlines, overdue work, upcoming
                priorities, and potential scheduling risks.
              </p>

            </div>


            {/* Analyze Button */}

            <button
              onClick={handleAnalyzeTimeline}
              disabled={analyzing}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white px-6 py-3 rounded-lg font-semibold whitespace-nowrap"
            >
              {analyzing
                ? "Analyzing..."
                : analysis
                ? "🔄 Analyze Again"
                : "📅 Analyze My Timeline"}
            </button>

          </div>


          {/* No Analysis Yet */}

          {!analysis && !analyzing && (
            <div className="mt-8 bg-gray-50 rounded-xl p-10 text-center">

              <div className="text-5xl mb-4">
                📅
              </div>

              <h2 className="text-2xl font-semibold text-gray-800">
                Your Timeline Analysis
              </h2>

              <p className="text-gray-500 mt-2 max-w-xl mx-auto">
                Let AI review your wedding date and
                planning tasks to help you understand
                what needs attention and when.
              </p>

              <button
                onClick={handleAnalyzeTimeline}
                className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                📅 Analyze My Timeline
              </button>

            </div>
          )}


          {/* Generating */}

          {analyzing && (
            <div className="mt-8 bg-indigo-50 rounded-xl p-10 text-center">

              <div className="text-5xl mb-4">
                🤖
              </div>

              <h2 className="text-2xl font-semibold text-indigo-700">
                Analyzing Your Wedding Timeline...
              </h2>

              <p className="text-gray-600 mt-3">
                Gemini is reviewing your wedding date
                and planning tasks.
              </p>

              <div className="flex justify-center mt-6">

                <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />

              </div>

            </div>
          )}


          {/* Analysis Result */}

          {analysis && !analyzing && (
            <div className="mt-8">

              <div className="flex justify-between items-center mb-4">

                <h2 className="text-2xl font-bold text-gray-800">
                  📊 Timeline Analysis
                </h2>

                <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full font-medium">
                  ✓ Saved
                </span>

              </div>


              <div className="bg-gray-50 rounded-xl p-6 md:p-8">

                <div className="whitespace-pre-wrap text-gray-700 leading-7">
                  {analysis}
                </div>

              </div>


              {/* Bottom Action */}

              <div className="flex justify-center mt-8">

                <button
                  onClick={handleAnalyzeTimeline}
                  disabled={analyzing}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  🔄 Analyze Timeline Again
                </button>

              </div>

            </div>
          )}

        </div>

      </div>
    </DashboardLayout>
  );
}

export default WeddingTimelineAdvisor;