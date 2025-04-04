import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Ensure the correct base URL
});

// Axios Request Interceptor - Attach Token Before Sending Request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      console.log("🔄 Attaching Token:", token);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios Response Interceptor - Handle Expired Token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && error.response.data.message === "Token expired. Please log in again.") {
      console.warn("Token expired! Attempting refresh...");

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          // Use `api.post` instead of `axios.post`
          const { data } = await api.post("/refresh", { refreshToken });

          // Store new tokens
          localStorage.setItem("accessToken", data.accessToken);
          console.log(" New Access Token Received");

          // Retry the failed request with the new token
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          originalRequest.baseURL = api.defaults.baseURL; // Ensure `baseURL` is set
          
          return api(originalRequest);
        } catch (refreshError) {
          console.error(" Refresh Token Expired, Logging Out...");

          // Clear tokens and redirect to login only once
          if (window.location.pathname !== "/login") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;

