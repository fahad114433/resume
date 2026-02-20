import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "../backend/routes/authRoute.js"; 
import resumeRoutes from "../backend/routes/resumeRoute.js";

dotenv.config();

const app = express();


app.use(cors({
  origin: ["https://resume-six-plum-53.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.options("*", cors());

app.use(express.json());;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log(err));




app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);


export default app;
