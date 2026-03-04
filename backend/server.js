import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoute.js"; 
import resumeRoutes from "./routes/resumeRoute.js";

dotenv.config();

const app = express();
// ✅ Add this in your express server
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups"); // ✅ allows Google popup
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});
app.use(cors({
  origin: "https://resume-six-plum-53.vercel.app/", // ✅ explicit origin
  credentials: true,
}));

app.use(express.json());;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log(err));




app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
