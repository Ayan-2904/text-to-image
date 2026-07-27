import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/mongo.js";

import authRoute from "./routes/auth.js";
import imageRoute from "./routes/image.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 AI Image Generator API Running...");
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server Running",
  });
});

// Routes
app.use("/auth", authRoute);

app.use("/generate", imageRoute);

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server Running On Port ${PORT}`);
  });
}

export default app;