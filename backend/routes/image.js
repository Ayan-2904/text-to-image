import express from "express";
import protect from "../middleware/auth.js";
import {
  generateImage,
  getUserHistory,
  deleteHistoryItem,
  clearUserHistory,
} from "../controllers/imageController.js";

const router = express.Router();

// Protected Routes
router.post("/", protect, generateImage);
router.get("/history", protect, getUserHistory);
router.delete("/history/:id", protect, deleteHistoryItem);
router.delete("/history", protect, clearUserHistory);

export default router;