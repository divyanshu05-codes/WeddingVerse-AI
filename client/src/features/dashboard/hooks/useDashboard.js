import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboard.api";

function useDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await getDashboardData();

      console.log(
        "Dashboard Data:",
        res.data.data
      );

      setDashboard(res.data.data);
    } catch (error) {
      console.error(
        "Failed to fetch dashboard:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    dashboard,
    loading,
    fetchDashboard,
  };
}

export default useDashboard;