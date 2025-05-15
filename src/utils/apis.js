import axios from "axios";

// Get environment variables
const JOBS_BASE_URL = import.meta.env.APP_JOBS_BASE_URL;
const USERS_BASE_URL = import.meta.env.APP_USERS_BASE_URL;

// const JOBS_BASE_URL = "http://localhost:8000/api/jobs";
// const USERS_BASE_URL = "http://localhost:8000/api/users";

const getToken = () => localStorage.getItem("token");

// Axios instance for authenticated routes
const axiosInstance = axios.create({
  baseURL: JOBS_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Attach token to all requests
axiosInstance.interceptors.request.use((config) => {
  const authToken = getToken();
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

// --- AUTH APIs ---
export const registerUser = (data) => axios.post(`${USERS_BASE_URL}/register`, data, { withCredentials: true });
export const loginUser = (data) => axios.post(`${USERS_BASE_URL}/login`, data, { withCredentials: true });

// --- JOB APIs ---
export const getAllJobs = () => axiosInstance.get("/all");
export const addJob = (data) => axiosInstance.post("/add", data);
export const updateJob = (id, data) => axiosInstance.put(`/edit/${id}`, data);
export const deleteJob = (id) => axiosInstance.delete(`/delete/${id}`);
