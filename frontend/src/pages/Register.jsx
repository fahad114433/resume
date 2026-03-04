import { useState, useContext } from "react";
import API from "../services/api.js";
import { AuthContext } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/register", form);
      login(res.data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6">

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account 🚀
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Start building your professional resume today
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 mt-8">

          <input
            name="name"
            type="text"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition duration-300 shadow-md hover:scale-105"
          >
            Register
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Register */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await API.post("/api/auth/google", {
                    token: credentialResponse.credential,
                  });

                  localStorage.setItem("userInfo", JSON.stringify(res.data));
                  login(res.data);
                  navigate("/dashboard");
                } catch (error) {
                  console.log(error);
                }
              }}
              onError={() => {
                console.log("Google Login Failed");
              }}
            />
          </div>

        </form>

        {/* Login Link */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}