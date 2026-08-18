import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import {
  getExpenseById,
  deleteExpense,
} from "../services/budget.api";

function ExpenseDetails() {
  const { weddingId, expenseId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [expense, setExpense] = useState(null);

  // -----------------------------
  // Fetch Expense
  // -----------------------------

  useEffect(() => {
    fetchExpense();
  }, [expenseId]);

  const fetchExpense = async () => {
    try {
      const res = await getExpenseById(
        expenseId
      );

      setExpense(res.data.data);
    } catch (error) {
      console.error(
        "Failed to load expense:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load expense."
      );

      navigate(
        `/weddings/${weddingId}/budget`
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Delete Expense
  // -----------------------------

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteExpense(expenseId);

      toast.success(
        "Expense deleted successfully."
      );

      navigate(
        `/weddings/${weddingId}/budget`
      );
    } catch (error) {
      console.error(
        "Failed to delete expense:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to delete expense."
      );
    }
  };

  // -----------------------------
  // Loading
  // -----------------------------

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center py-20">
          <p className="text-lg text-gray-500">
            Loading expense...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  // -----------------------------
  // Not Found
  // -----------------------------

  if (!expense) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-2xl shadow p-10 text-center">

          <h2 className="text-2xl font-bold">
            Expense Not Found
          </h2>

          <p className="text-gray-500 mt-2">
            The expense you're looking for does not exist.
          </p>

          <Link
            to={`/weddings/${weddingId}/budget`}
            className="inline-block mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg"
          >
            Back to Budget
          </Link>

        </div>
      </DashboardLayout>
    );
  }

  const amount = Number(
    expense.amount || 0
  );

  return (
    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        {/* Back */}

        <Link
          to={`/weddings/${weddingId}/budget`}
          className="text-pink-600 font-semibold hover:underline"
        >
          ← Back to Budget
        </Link>


        {/* Header */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-5">

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">

            <div>

              <h1 className="text-3xl font-bold text-pink-600">
                {expense.title}
              </h1>

              <p className="text-gray-500 mt-2">
                {expense.category ||
                  "Uncategorized"}
              </p>

            </div>


            {/* Actions */}

            <div className="flex gap-3">

              <Link
                to={`/weddings/${weddingId}/budget/${expense._id}/edit`}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition"
              >
                Edit
              </Link>

              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
              >
                Delete
              </button>

            </div>

          </div>

        </div>


        {/* Expense Information */}

        <div className="bg-white rounded-2xl shadow p-8 mt-6 mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Expense Information
          </h2>


          <div className="grid md:grid-cols-2 gap-6">

            {/* Category */}

            <div>

              <p className="text-sm text-gray-500">
                Category
              </p>

              <p className="text-lg font-semibold mt-1">
                {expense.category ||
                  "Not specified"}
              </p>

            </div>


            {/* Amount */}

            <div>

              <p className="text-sm text-gray-500">
                Amount
              </p>

              <p className="text-2xl font-bold text-red-500 mt-1">
                ₹{amount.toLocaleString()}
              </p>

            </div>


            {/* Payment Status */}

            <div>

              <p className="text-sm text-gray-500">
                Payment Status
              </p>

              <p
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                  expense.paymentStatus ===
                  "Paid"
                    ? "bg-green-100 text-green-700"
                    : expense.paymentStatus ===
                      "Partial"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {expense.paymentStatus ||
                  "Pending"}
              </p>

            </div>


            {/* Date */}

            <div>

              <p className="text-sm text-gray-500">
                Expense Date
              </p>

              <p className="text-lg font-semibold mt-1">
                {expense.expenseDate
                  ? new Date(
                      expense.expenseDate
                    ).toLocaleDateString()
                  : "Not specified"}
              </p>

            </div>


            {/* Notes */}

            <div className="md:col-span-2">

              <p className="text-sm text-gray-500">
                Notes
              </p>

              <p className="text-gray-700 mt-2 whitespace-pre-wrap">
                {expense.notes ||
                  "No notes available."}
              </p>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default ExpenseDetails;