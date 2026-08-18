import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import BudgetForm from "../components/BudgetForm";
import { createExpense } from "../services/budget.api";

function CreateExpense() {
  const { weddingId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleCreate = async (data) => {
    try {
      setLoading(true);

      await createExpense({
        ...data,
        wedding: weddingId,
      });

      toast.success("Expense added successfully.");

      navigate(`/weddings/${weddingId}/budget`);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create expense."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-pink-600 mb-8">
          Add Expense
        </h1>

<BudgetForm
  onSubmit={handleCreate}
  loading={loading}
  buttonText="Save Expense"
/>

      </div>

    </DashboardLayout>
  );
}

export default CreateExpense;