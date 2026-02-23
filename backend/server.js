import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoute.js"; 
import resumeRoutes from "./routes/resumeRoute.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log(err));




app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
