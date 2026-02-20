import axios from "axios";

const API = axios.create({
  baseURL: "https://resume-n22h-4fl3tx2ea-fahad114433s-projects.vercel.app/api", 
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
