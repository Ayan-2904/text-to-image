import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import imageRoute from "./routes/image.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/generate", imageRoute);

app.get("/", (req, res) => {
    res.send("Backend Running...");
});

app.get("/health", (req, res) => {
    res.json({ 
        status: "ok", 
        message: "Server is running",
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});