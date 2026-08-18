import api from "../../../api/axios";

export const getDashboardData = () =>
  api.get("/dashboard");