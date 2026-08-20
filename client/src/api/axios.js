import axios from "axios";

const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl) {
    return "http://localhost:5000/api/v1";
  }
  const clean = envUrl.trim().replace(/\/+$/, "");
  return clean.endsWith("/api/v1") ? clean : `${clean}/api/v1`;
};

const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.warn("Authentication required or session expired.");
      }

      if (status === 403) {
        console.warn("Access denied.");
      }

      if (status === 404) {
        console.warn("Requested resource not found.");
      }

      if (status >= 500) {
        console.error("Server error.");
      }
    } else if (error.request) {
      console.error("No response received from server.");
    } else {
      console.error(
        "Request configuration error:",
        error.message
      );
    }

    return Promise.reject(error);
  }
);

export default api;