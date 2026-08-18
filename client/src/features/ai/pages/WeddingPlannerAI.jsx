import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import { generateWeddingPlan } from "../services/ai.api";

function WeddingPlannerAI() {
  const { weddingId } = useParams();

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("");

  const handleGeneratePlan = async () => {
    try {
      setLoading(true);
      setPlan("");

      const res = await generateWeddingPlan(weddingId);

      setPlan(res.data.data.plan);

      toast.success("AI wedding plan generated successfully!");
    } catch (error) {
      console.error("AI plan generation failed:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to generate wedding plan."
      );
    } finally {
      setLoading(false);
    }
  };

  // Format AI response
  const formatPlan = (text) => {
    if (!text) return null;

    const lines = text.split("\n");

    return lines.map((line, index) => {
      const trimmed = line.trim();

      if (!trimmed) {
        return <div key={index} className="h-2" />;
      }

      // Main numbered headings
      if (/^\d+\.\s/.test(trimmed)) {
        return (
          <h3
            key={index}
            className="text-xl font-bold text-pink-600 mt-6 mb-3"
          >
            {trimmed}
          </h3>
        );
      }

      // Markdown headings
      if (
        trimmed.startsWith("##") ||
        trimmed.startsWith("###")
      ) {
        const heading = trimmed
          .replace(/^#+\s*/, "")
          .replace(/\*\*/g, "");

        return (
          <h3
            key={index}
            className="text-xl font-bold text-pink-600 mt-6 mb-3"
          >
            {heading}
          </h3>
        );
      }

      // Bullet points
      if (
        trimmed.startsWith("- ") ||
        trimmed.startsWith("* ") ||
        trimmed.startsWith("• ")
      ) {
        const bullet = trimmed
          .replace(/^[-*•]\s*/, "")
          .replace(/\*\*/g, "");

        return (
          <div
            key={index}
            className="flex gap-3 items-start mb-2"
          >
            <span className="text-pink-600 font-bold">
              ✓
            </span>

            <p className="text-gray-700 leading-7">
              {bullet}
            </p>
          </div>
        );
      }

      // Bold text
      const formatted = trimmed.replace(/\*\*/g, "");

      return (
        <p
          key={index}
          className="text-gray-700 leading-7 mb-2"
        >
          {formatted}
        </p>
      );
    });
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
        <div className="bg-white rounded-2xl shadow-md p-8 mt-5">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <h1 className="text-4xl font-bold text-pink-600">
                🤖 AI Wedding Planner
              </h1>

              <p className="text-gray-500 mt-3">
                Get a personalized wedding planning roadmap
                powered by Gemini AI.
              </p>
            </div>

            <button
              onClick={handleGeneratePlan}
              disabled={loading}
              className="bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              {loading
                ? "Generating..."
                : plan
                ? "✨ Regenerate Plan"
                : "✨ Generate Wedding Plan"}
            </button>

          </div>

        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-md p-10 mt-6 text-center">

            <div className="text-5xl mb-5">
              🤖
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              Gemini AI is creating your plan
            </h2>

            <p className="text-gray-500 mt-2">
              Analyzing your wedding details...
            </p>

            <div className="mt-6 w-full max-w-md mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-pink-600 rounded-full animate-pulse" />
            </div>

          </div>
        )}

        {/* Empty State */}
        {!plan && !loading && (
          <div className="bg-white rounded-2xl shadow-md p-12 mt-6 text-center">

            <div className="text-6xl mb-5">
              💍
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Your AI Wedding Plan
            </h2>

            <p className="text-gray-500 mt-3 max-w-2xl mx-auto leading-7">
              Gemini will analyze your wedding date, venue,
              location, budget and other details to create a
              personalized wedding planning roadmap.
            </p>

            <button
              onClick={handleGeneratePlan}
              className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-7 py-3 rounded-lg font-semibold"
            >
              ✨ Create My Wedding Plan
            </button>

          </div>
        )}

        {/* AI Result */}
        {plan && !loading && (
          <div className="mt-6">

            {/* Result Header */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow-md p-6">

              <div className="flex items-center gap-4">

                <div className="text-4xl">
                  🤖
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Your Personalized Wedding Plan
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Generated by Gemini AI based on your wedding
                    information.
                  </p>
                </div>

              </div>

            </div>

            {/* Plan */}
            <div className="bg-white rounded-2xl shadow-md p-8 mt-5">

              <div className="max-w-4xl">
                {formatPlan(plan)}
              </div>

            </div>

            {/* Bottom Action */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">

              <button
                onClick={handleGeneratePlan}
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                🔄 Regenerate Plan
              </button>

              <Link
                to={`/weddings/${weddingId}`}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-center px-6 py-3 rounded-lg font-semibold"
              >
                ← Back to Wedding
              </Link>

            </div>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default WeddingPlannerAI;