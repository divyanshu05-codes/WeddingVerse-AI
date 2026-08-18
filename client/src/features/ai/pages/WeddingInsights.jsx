import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import {
  generateWeddingInsights,
  getWeddingInsights,
} from "../services/insights.api";

function WeddingInsights() {
  const { weddingId } = useParams();

  const [insights, setInsights] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [generating, setGenerating] =
    useState(false);

  const [error, setError] =
    useState("");

  const loadInsights = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getWeddingInsights(
          weddingId
        );

      setInsights(
        response.data?.data?.insights ||
          null
      );
    } catch (err) {
      console.error(
        "Failed to load AI insights:",
        err
      );

      setError(
        "Unable to load AI insights."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, [weddingId]);

  const handleGenerate = async () => {
    try {
      setGenerating(true);
      setError("");

      const response =
        await generateWeddingInsights(
          weddingId
        );

      setInsights(
        response.data?.data?.insights ||
          null
      );
    } catch (err) {
      console.error(
        "Failed to generate AI insights:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to generate AI insights."
      );
    } finally {
      setGenerating(false);
    }
  };

  const getSeverityClasses = (
    severity
  ) => {
    switch (severity) {
      case "High":
        return "bg-red-50 border-red-200 text-red-700";

      case "Medium":
        return "bg-amber-50 border-amber-200 text-amber-700";

      default:
        return "bg-blue-50 border-blue-200 text-blue-700";
    }
  };

  const getStatusClasses = (
    status
  ) => {
    switch (status) {
      case "Excellent":
        return "from-emerald-500 to-green-600";

      case "Good":
        return "from-blue-500 to-indigo-600";

      case "Needs Attention":
        return "from-amber-400 to-orange-500";

      case "Critical":
        return "from-red-500 to-rose-600";

      default:
        return "from-pink-500 to-purple-600";
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mx-auto" />

            <p className="mt-4 text-gray-500">
              Loading your AI insights...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto pb-12">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>
            <Link
              to={`/weddings/${weddingId}`}
              className="text-pink-600 font-semibold hover:text-pink-700"
            >
              ← Back to Wedding
            </Link>

            <div className="flex items-center gap-3 mt-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg">
                ✨
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  AI Wedding Insights
                </h1>

                <p className="text-gray-500 mt-1">
                  Your intelligent wedding planning command center
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {generating
              ? "✨ Analyzing..."
              : "✨ Generate Fresh Insights"}
          </button>

        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {!insights ? (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center">

            <div className="text-6xl mb-5">
              🧠
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Your AI command center is ready
            </h2>

            <p className="text-gray-500 max-w-xl mx-auto mt-3">
              Let AI analyze your tasks, guests,
              vendors and budget to identify the
              most important things you should focus
              on next.
            </p>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="mt-7 px-7 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold shadow-lg"
            >
              {generating
                ? "Analyzing..."
                : "Generate AI Insights"}
            </button>

          </div>
        ) : (
          <>

            {/* Health Hero */}

            <div
              className={`rounded-3xl bg-gradient-to-br ${getStatusClasses(
                insights.healthStatus
              )} text-white p-8 md:p-10 shadow-xl mb-8 overflow-hidden relative`}
            >

              <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/10" />

              <div className="absolute -right-10 bottom-[-80px] w-64 h-64 rounded-full bg-white/10" />

              <div className="relative grid md:grid-cols-[auto_1fr] gap-8 items-center">

                <div className="w-40 h-40 rounded-full border-8 border-white/30 bg-white/10 backdrop-blur flex flex-col items-center justify-center shadow-2xl">

                  <span className="text-5xl font-black">
                    {insights.healthScore}
                  </span>

                  <span className="text-sm opacity-80">
                    / 100
                  </span>

                </div>

                <div>
                  <p className="uppercase tracking-[0.2em] text-sm font-semibold opacity-80">
                    Wedding Health
                  </p>

                  <h2 className="text-3xl md:text-4xl font-bold mt-2">
                    {insights.healthStatus}
                  </h2>

                  <p className="mt-4 text-white/90 text-lg leading-relaxed max-w-3xl">
                    {insights.executiveSummary}
                  </p>
                </div>

              </div>
            </div>


            {/* Priorities */}

            <section className="mb-8">

              <div className="flex items-center justify-between mb-5">

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Top Priorities
                  </h2>

                  <p className="text-gray-500 mt-1">
                    What deserves your attention first
                  </p>
                </div>

                <span className="text-2xl">
                  🎯
                </span>

              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

                {insights.topPriorities?.map(
                  (item, index) => (
                    <div
                      key={index}
                      className={`rounded-2xl border p-5 shadow-sm ${getSeverityClasses(
                        item.severity
                      )}`}
                    >

                      <div className="flex justify-between items-start gap-3">

                        <span className="text-xs font-bold uppercase tracking-wider">
                          Priority {index + 1}
                        </span>

                        <span className="px-2 py-1 rounded-full bg-white/70 text-xs font-bold">
                          {item.severity}
                        </span>

                      </div>

                      <h3 className="font-bold text-lg mt-4">
                        {item.title}
                      </h3>

                      <p className="text-sm mt-2 leading-relaxed opacity-90">
                        {item.description}
                      </p>

                    </div>
                  )
                )}

              </div>
            </section>


            {/* Risks */}

            <section className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8">

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Planning Risks
                </h2>

                <p className="text-gray-500 mt-1">
                  Potential issues identified from your actual wedding data
                </p>
              </div>

              <div className="space-y-4">

                {insights.risks?.length ? (
                  insights.risks.map(
                    (risk, index) => (
                      <div
                        key={index}
                        className={`rounded-2xl border p-5 ${getSeverityClasses(
                          risk.severity
                        )}`}
                      >

                        <div className="flex flex-col md:flex-row md:items-center gap-3">

                          <span className="px-3 py-1 rounded-full bg-white/70 text-xs font-bold uppercase">
                            {risk.area}
                          </span>

                          <h3 className="font-bold text-lg">
                            {risk.title}
                          </h3>

                          <span className="md:ml-auto text-xs font-bold">
                            {risk.severity} Risk
                          </span>

                        </div>

                        <p className="mt-3 text-sm leading-relaxed">
                          {risk.description}
                        </p>

                      </div>
                    )
                  )
                ) : (
                  <div className="rounded-xl bg-green-50 border border-green-200 p-5 text-green-700">
                    No major risks were identified from the available data.
                  </div>
                )}

              </div>
            </section>


            {/* Recommendations */}

            <section>

              <div className="mb-5">
                <h2 className="text-2xl font-bold text-gray-900">
                  AI Recommended Actions
                </h2>

                <p className="text-gray-500 mt-1">
                  Practical next steps based on your current planning status
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5">

                {insights.recommendations?.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 hover:shadow-xl transition"
                    >

                      <div className="flex gap-4">

                        <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-xl">
                          {index + 1}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">

                            <h3 className="font-bold text-gray-900">
                              {item.title}
                            </h3>

                            <span className="text-xs font-bold px-2 py-1 rounded-full bg-pink-50 text-pink-600">
                              {item.priority}
                            </span>

                          </div>

                          <p className="text-gray-600 text-sm leading-relaxed mt-2">
                            {item.description}
                          </p>
                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>
            </section>

          </>
        )}

      </div>
    </DashboardLayout>
  );
}

export default WeddingInsights;