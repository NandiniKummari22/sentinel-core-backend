import axios from 'axios';

const AUTH_BASE = 'http://localhost:8080/api/auth';

export const login = (username, password) => {
  return axios.post(`${AUTH_BASE}/login`, { username, password });
};

export const refreshAccessToken = (refreshToken) => {
  return axios.post(`${AUTH_BASE}/refresh`, { refreshToken });
};