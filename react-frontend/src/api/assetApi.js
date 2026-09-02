import axios from "axios";

const API_BASE = "http://localhost:8080/api";

export const getAllAssets = () => {
    const token = localStorage.getItem("token");

    return axios.get(`${API_BASE}/assets`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getDashboardSummary = () => {
    const token = localStorage.getItem("token");

    return axios.get(`${API_BASE}/assets/dashboard/summary`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};