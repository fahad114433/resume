import axios from "axios";

const API = axios.create({
baseURL:"resume-production-aaab.up.railway.app",
  //baseURL: "/api",
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
