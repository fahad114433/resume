import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoute.js"; 
import resumeRoutes from "./routes/resumeRoute.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://resume-jx4frb2bi-fahad114433s-projects.vercel.app/",
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log(err));




app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);


app.listen(5000, () => console.log("Server running on port 5000"));
