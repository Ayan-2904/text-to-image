import express from "express";
import protect from "../middleware/auth.js";
import { generateImage } from "../controllers/imageController.js";

const router = express.Router();

// Protected Route
router.post("/", protect, generateImage);

export default router;