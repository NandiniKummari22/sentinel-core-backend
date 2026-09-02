import axios from "axios";

const API_BASE = "http://localhost:8080/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const getAllAssets = (page = 0, size = 10) => {
  return axios.get(`${API_BASE}/assets?page=${page}&size=${size}`, getAuthHeader());
};

export const searchAssets = (search = "", status = "", page = 0, size = 10) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (status) params.append("status", status);
  params.append("page", page);
  params.append("size", size);

  return axios.get(`${API_BASE}/assets/search?${params.toString()}`, getAuthHeader());
};

export const getDashboardSummary = () => {
  return axios.get(`${API_BASE}/assets/dashboard/summary`, getAuthHeader());
};