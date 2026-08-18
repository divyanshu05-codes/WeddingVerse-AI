import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import {
  analyzeWeddingTimeline,
} from "../services/ai.api";


function WeddingTimelineAdvisor() {
  const { weddingId } = useParams();

  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");


  // ======================================================
  // ANALYZE TIMELINE
  // ======================================================

  const handleAnalyzeTimeline = async () => {
    try {
      setLoading(true);

      const response =
        await analyzeWeddingTimeline(weddingId);

      const result =
        response?.data?.data?.analysis ||
        response?.data?.analysis ||
        "";

      if (!result) {
        toast.error(
          "AI did not return a timeline analysis."
        );

        return;
      }

      setAnalysis(result);

      toast.success(
        "Wedding timeline analyzed successfully."
      );

    } catch (error) {
      console.error(
        "Timeline Analysis Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to analyze wedding timeline."
      );

    } finally {
      setLoading(false);
    }
  };


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

          <h1 className="text-3xl font-bold text-indigo-600">
            📅 AI Timeline Advisor
          </h1>

          <p className="text-gray-500 mt-2">
            Let Gemini analyze your wedding date
            and planning tasks to create a realistic
            wedding timeline.
          </p>


          {/* Analyze Button */}

          <div className="mt-8 text-center py-10 bg-gray-50 rounded-xl">

            <p className="text-gray-600">
              Analyze your current wedding tasks
              and get AI-powered timeline advice.
            </p>


            <button
              onClick={handleAnalyzeTimeline}
              disabled={loading}
              className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "🤖 Analyzing..."
                : "📅 Analyze My Timeline"}
            </button>

          </div>


          {/* AI Analysis */}

          {analysis && (

            <div className="mt-8">

              <div className="flex justify-between items-center mb-4">

                <h2 className="text-2xl font-bold text-gray-800">
                  🤖 AI Timeline Analysis
                </h2>

                <button
                  onClick={handleAnalyzeTimeline}
                  disabled={loading}
                  className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  {loading
                    ? "Analyzing..."
                    : "🔄 Analyze Again"}
                </button>

              </div>


              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">

                <div className="whitespace-pre-wrap text-gray-700 leading-7">
                  {analysis}
                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </DashboardLayout>
  );
}

export default WeddingTimelineAdvisor;