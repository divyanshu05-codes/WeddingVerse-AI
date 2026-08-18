import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import BudgetForm from "../components/BudgetForm";

import {
  getExpenseById,
  updateExpense,
} from "../services/budget.api";

function EditExpense() {
  const { weddingId, expenseId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [expense, setExpense] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  // -----------------------------
  // Fetch Expense
  // -----------------------------

  useEffect(() => {
    fetchExpense();
  }, [expenseId]);

  const fetchExpense = async () => {
    try {
      setPageLoading(true);

      const res = await getExpenseById(expenseId);

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
      setPageLoading(false);
    }
  };

  // -----------------------------
  // Update Expense
  // -----------------------------

  const handleUpdate = async (data) => {
    try {
      setLoading(true);

      await updateExpense(
        expenseId,
        data
      );

      toast.success(
        "Expense updated successfully."
      );

      navigate(
        `/weddings/${weddingId}/budget`
      );
    } catch (error) {
      console.error(
        "Failed to update expense:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update expense."
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Loading
  // -----------------------------

  if (pageLoading) {
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
  // Expense Not Found
  // -----------------------------

  if (!expense) {
    return (
      <DashboardLayout>
        <div className="bg-white rounded-2xl shadow p-10 text-center">

          <h2 className="text-2xl font-bold">
            Expense Not Found
          </h2>

          <p className="text-gray-500 mt-2">
            The expense you're trying to edit
            could not be found.
          </p>

          <button
            onClick={() =>
              navigate(
                `/weddings/${weddingId}/budget`
              )
            }
            className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg"
          >
            Back to Budget
          </button>

        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="max-w-4xl mx-auto">

        {/* Back */}

        <button
          onClick={() =>
            navigate(
              `/weddings/${weddingId}/budget`
            )
          }
          className="text-pink-600 font-semibold hover:underline mb-5"
        >
          ← Back to Budget
        </button>


        {/* Heading */}

        <h1 className="text-3xl font-bold text-pink-600 mb-8">
          Edit Expense
        </h1>


        {/* Form */}

        <BudgetForm
          initialData={expense}
          onSubmit={handleUpdate}
          loading={loading}
          buttonText="Update Expense"
        />

      </div>

    </DashboardLayout>
  );
}

export default EditExpense;