import express from "express";
import { createResume, updateResume, deleteResume, getUserResumes, getResumeById } from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createResume);
router.get("/", protect, getUserResumes);
router.get("/:id", protect, getResumeById);
router.put("/:id", protect, updateResume);     
router.delete("/:id", protect, deleteResume); 


export default router;
