import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import {
  generateWeddingPlan,
  getWeddingPlan,
} from "../services/ai.api";


function WeddingPlanResult() {
  const { weddingId } = useParams();

  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);


  // =====================================================
  // LOAD SAVED PLAN
  // =====================================================

  useEffect(() => {
    const loadSavedPlan = async () => {
      try {
        const res =
          await getWeddingPlan(weddingId);

        const savedPlan =
          res?.data?.data?.plan || "";

        setPlan(savedPlan);

      } catch (error) {
        console.error(
          "Failed to load wedding plan:",
          error
        );

        toast.error(
          error.response?.data?.message ||
            "Failed to load wedding plan."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSavedPlan();
  }, [weddingId]);


  // =====================================================
  // GENERATE / REGENERATE PLAN
  // =====================================================

  const handleGeneratePlan = async () => {
    try {
      setGenerating(true);

      const res =
        await generateWeddingPlan(weddingId);

      const generatedPlan =
        res?.data?.data?.plan;

      if (!generatedPlan) {
        throw new Error(
          "AI did not return a wedding plan."
        );
      }

      setPlan(generatedPlan);

      toast.success(
        "Wedding plan generated successfully."
      );

    } catch (error) {
      console.error(
        "Failed to generate wedding plan:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to generate wedding plan."
      );

    } finally {
      setGenerating(false);
    }
  };


  // =====================================================
  // INITIAL LOADING
  // =====================================================

  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-5xl mx-auto">

          <div className="bg-white rounded-2xl shadow-md p-12 text-center">

            <div className="text-5xl mb-5">
              🤖
            </div>

            <h2 className="text-2xl font-semibold text-gray-800">
              Loading your wedding plan...
            </h2>

            <p className="text-gray-500 mt-2">
              Checking your saved AI wedding plan.
            </p>

          </div>

        </div>
      </DashboardLayout>
    );
  }


  return (
    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <Link
          to={`/weddings/${weddingId}`}
          className="inline-block text-pink-600 font-semibold mb-6"
        >
          ← Back to Wedding
        </Link>


        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <h1 className="text-4xl font-bold text-gray-800">
                🤖 AI Wedding Plan
              </h1>

              <p className="text-gray-500 mt-3">
                Your personalized wedding planning roadmap
                powered by Gemini AI.
              </p>

            </div>


            <button
              type="button"
              onClick={handleGeneratePlan}
              disabled={generating}
              className="bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              {generating
                ? "🤖 Generating..."
                : plan
                ? "🔄 Regenerate Plan"
                : "✨ Generate Wedding Plan"}
            </button>

          </div>

        </div>


        {/* GENERATING */}
        {generating && (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center mb-8">

            <div className="text-5xl mb-4">
              🤖
            </div>

            <h2 className="text-2xl font-semibold text-gray-800">
              Gemini is planning your wedding...
            </h2>

            <p className="text-gray-500 mt-2">
              Analyzing your wedding details and creating
              your personalized roadmap.
            </p>

          </div>
        )}


        {/* NO PLAN */}
        {!generating && !plan && (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">

            <div className="text-6xl mb-5">
              💍
            </div>

            <h2 className="text-2xl font-semibold text-gray-800">
              Your Wedding Plan is Waiting
            </h2>

            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Gemini AI can analyze your wedding details
              and create a personalized planning roadmap
              for you.
            </p>

            <button
              type="button"
              onClick={handleGeneratePlan}
              className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-7 py-3 rounded-lg font-semibold"
            >
              ✨ Create My Wedding Plan
            </button>

          </div>
        )}


        {/* SAVED / GENERATED PLAN */}
        {!generating && plan && (
          <div className="bg-white rounded-2xl shadow-md p-8">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Your Personalized Wedding Roadmap
                </h2>

                <p className="text-gray-500 mt-1">
                  Generated and saved by Gemini AI
                </p>

              </div>

              <span className="hidden sm:block text-4xl">
                💍
              </span>

            </div>


            <div className="border-t pt-6">

              <div className="whitespace-pre-wrap text-gray-700 leading-8 text-base">
                {plan}
              </div>

            </div>

          </div>
        )}

      </div>

    </DashboardLayout>
  );
}


export default WeddingPlanResult;