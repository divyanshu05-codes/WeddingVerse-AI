import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { analyzeWeddingBudget, getBudgetAnalysis } from "../../ai/services/ai.api";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import ExpenseCard from "../components/ExpenseCard";
import useBudget from "../hooks/useBudget";

function BudgetDashboard() {
  const { weddingId } = useParams();
  const {
    expenses,
    wedding,
    loading,
  } = useBudget(weddingId);
const [aiAnalysis, setAiAnalysis] = useState("");
const [aiLoading, setAiLoading] = useState(false);

  // Budget Calculations
  const totalBudget = Number(
    wedding?.estimatedBudget || 0
  );

  const totalSpent = expenses.reduce(
    (sum, item) =>
      sum + Number(item.amount || 0),
    0
  );

  const remaining = totalBudget - totalSpent;

  const progress =
    totalBudget > 0
      ? Math.min(
          (totalSpent / totalBudget) * 100,
          100
        )
      : 0;

  const averageExpense =
    expenses.length > 0
      ? Math.round(
          totalSpent / expenses.length
        )
      : 0;

  const largestExpense =
    expenses.length > 0
      ? Math.max(
          ...expenses.map((expense) =>
            Number(expense.amount || 0)
          )
        )
      : 0;

const handleAIAnalysis = async () => {
  try {
    setAiLoading(true);

    const res =
      await analyzeWeddingBudget(weddingId);

    const analysis =
      res?.data?.data?.analysis;

    if (!analysis) {
      throw new Error(
        "AI did not return a budget analysis."
      );
    }

    setAiAnalysis(analysis);

    toast.success(
      "AI budget analysis generated successfully."
    );
  } catch (error) {
    console.error(
      "AI Budget Analysis Error:",
      error
    );

    toast.error(
      error.response?.data?.message ||
        error.message ||
        "Failed to generate AI budget analysis."
    );
  } finally {
    setAiLoading(false);
  }
};

useEffect(() => {
  const loadSavedAIAnalysis = async () => {
    try {
      const res =
        await getBudgetAnalysis(weddingId);

      const savedAnalysis =
        res?.data?.data?.analysis || "";

      setAiAnalysis(savedAnalysis);

    } catch (error) {
      console.error(
        "Failed to load saved AI budget analysis:",
        error
      );
    }
  };

  if (weddingId) {
    loadSavedAIAnalysis();
  }
}, [weddingId]);

  // -----------------------------
  // Loading
  // -----------------------------

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-gray-500">
            Loading budget...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

        <div>

          <Link
            to={`/weddings/${weddingId}`}
            className="text-pink-600 font-semibold hover:underline"
          >
            ← Back to Wedding
          </Link>

          <h1 className="text-4xl font-bold mt-3">
            Budget Dashboard
          </h1>

          {wedding && (
            <p className="text-gray-500 mt-2">
              {wedding.bride?.fullName} ❤️{" "}
              {wedding.groom?.fullName}
            </p>
          )}

        </div>


        <Link
          to={`/weddings/${weddingId}/budget/new`}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium text-center"
        >
          + Add Expense
        </Link>

      </div>


      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Total Budget */}

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500 text-lg">
            Total Budget
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-4">
            ₹{totalBudget.toLocaleString()}
          </p>

        </div>


        {/* Total Spent */}

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500 text-lg">
            Total Spent
          </h2>

          <p className="text-4xl font-bold text-red-500 mt-4">
            ₹{totalSpent.toLocaleString()}
          </p>

        </div>


        {/* Remaining */}

        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-gray-500 text-lg">
            Remaining
          </h2>

          <p
            className={`text-4xl font-bold mt-4 ${
              remaining < 0
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            ₹{remaining.toLocaleString()}
          </p>

        </div>

      </div>


      {/* Budget Usage */}

      <div className="bg-white rounded-2xl shadow-md p-8 mb-10">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h2 className="text-2xl font-semibold">
              Budget Usage
            </h2>

            <p className="text-gray-500 mt-1">
              Track how much of your wedding budget has been spent.
            </p>

          </div>

          <span className="text-xl font-bold">
            {progress.toFixed(1)}%
          </span>

        </div>

{/* =====================================================
    AI BUDGET ADVISOR
===================================================== */}

<div className="bg-white rounded-2xl shadow-md p-8 mb-10">

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

    <div>

      <h2 className="text-2xl font-bold text-gray-800">
        🤖 AI Budget Advisor
      </h2>

      <p className="text-gray-500 mt-2">
        Let Gemini analyze your actual wedding budget
        and expenses and provide personalized advice.
      </p>

    </div>

<button
  type="button"
  onClick={handleAIAnalysis}
  disabled={aiLoading}
  className="bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 text-white px-6 py-3 rounded-lg font-semibold transition"
>
  {aiLoading
    ? "🤖 Analyzing..."
    : aiAnalysis
    ? "🔄 Analyze Again"
    : "✨ Analyze My Budget"}
</button>

  </div>

  {/* AI Loading */}

  {aiLoading && (
    <div className="mt-8 bg-gray-50 rounded-xl p-8 text-center">

      <div className="text-4xl mb-3">
        🤖
      </div>

      <h3 className="text-xl font-semibold text-gray-800">
        Gemini is analyzing your wedding budget...
      </h3>

      <p className="text-gray-500 mt-2">
        Reviewing your expenses and budget allocation.
      </p>

    </div>
  )}

  {/* AI Result */}

  {!aiLoading && aiAnalysis && (
    <div className="mt-8 border-t pt-6">

      <div className="flex items-center justify-between mb-5">

        <h3 className="text-xl font-bold text-gray-800">
          AI Budget Analysis
        </h3>

        <span className="text-3xl">
          💡
        </span>

      </div>

      <div className="bg-gray-50 rounded-xl p-6 whitespace-pre-wrap text-gray-700 leading-8">
        {aiAnalysis}
      </div>

    </div>
  )}

</div>

        {/* Progress Bar */}

        <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">

          <div
            className={`h-full transition-all duration-700 ${
              progress < 50
                ? "bg-green-500"
                : progress < 80
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{
              width: `${progress}%`,
            }}
          />

        </div>


        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          {/* Total Expenses */}

          <div className="bg-gray-50 rounded-xl p-6 text-center">

            <h3 className="text-gray-500">
              Total Expenses
            </h3>

            <p className="text-4xl font-bold text-pink-600 mt-3">
              {expenses.length}
            </p>

          </div>


          {/* Average */}

          <div className="bg-gray-50 rounded-xl p-6 text-center">

            <h3 className="text-gray-500">
              Average Expense
            </h3>

            <p className="text-4xl font-bold text-blue-600 mt-3">
              ₹{averageExpense.toLocaleString()}
            </p>

          </div>


          {/* Largest */}

          <div className="bg-gray-50 rounded-xl p-6 text-center">

            <h3 className="text-gray-500">
              Largest Expense
            </h3>

            <p className="text-4xl font-bold text-red-500 mt-3">
              ₹{largestExpense.toLocaleString()}
            </p>

          </div>

        </div>

      </div>


      {/* Expenses */}

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-semibold">
          Your Expenses
        </h2>

      </div>


      {expenses.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-md p-10 text-center">

          <h2 className="text-2xl font-semibold">
            No Expenses Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Add your first wedding expense to start tracking your budget.
          </p>

          <Link
            to={`/weddings/${weddingId}/budget/new`}
            className="inline-block mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg"
          >
            + Add Expense
          </Link>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {expenses.map((expense) => (
            <ExpenseCard
              key={expense._id}
              expense={expense}
            />
          ))}

        </div>

      )}

    </DashboardLayout>
  );
}

export default BudgetDashboard;