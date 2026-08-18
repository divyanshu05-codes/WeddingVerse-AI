import axios from "axios";

const api = axios.create({
   baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
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