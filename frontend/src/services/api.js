import axios from "axios";

const API = axios.create({
  baseURL: "https://thriving-stillness.railway.app/api"
});

// Add token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
