import { useEffect, useState } from "react";

import {
  getExpensesByWedding,
} from "../services/budget.api";

import {
  getWeddingById,
} from "../../wedding/services/wedding.api";

function useBudget(weddingId) {
  const [expenses, setExpenses] = useState([]);
  const [wedding, setWedding] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBudgetData = async () => {
    if (!weddingId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const [
        expenseResponse,
        weddingResponse,
      ] = await Promise.all([
        getExpensesByWedding(weddingId),
        getWeddingById(weddingId),
      ]);

      setExpenses(
        expenseResponse.data.data || []
      );

      setWedding(
        weddingResponse.data.data || null
      );

    } catch (error) {
      console.error(
        "Failed to fetch budget data:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetData();
  }, [weddingId]);

  return {
    expenses,
    wedding,
    loading,
    fetchBudgetData,
  };
}

export default useBudget;