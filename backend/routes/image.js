import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    console.log("Generating image with Pollinations.ai for prompt:", prompt);

    try {
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=true`;
      
      const response = await axios.get(url, {
        responseType: "arraybuffer",
        timeout: 120000,
      });

      console.log("Image generated successfully by Pollinations.ai");
      
      // Convert the binary image buffer to a base64 string
      const base64 = Buffer.from(response.data, "binary").toString("base64");
      const imageUrl = `data:image/jpeg;base64,${base64}`;
      
      res.json({
        image: imageUrl,
        success: true,
        message: "Image generated successfully"
      });
    } catch (serviceError) {
      console.error("Pollinations API error:", serviceError.message);

      return res.status(503).json({
        message: "Image generation failed via Pollinations.",
        error: serviceError.message
      });
    }
  } catch (error) {
    console.error("Unexpected error:", error);

    res.status(500).json({
      message: "Image generation failed",
      error: error.message,
    });
  }
});

export default router;