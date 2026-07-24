import express from "express";
import axios from "axios";

const router = express.Router();

const PYTHON_SERVICE_URL = "http://localhost:5001/generate";

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    console.log("Forwarding request to Python service for prompt:", prompt);

    try {
      // Call the Python image generation service
      const response = await axios.post(
        PYTHON_SERVICE_URL,
        { prompt },
        {
          timeout: 120000, // 2 minute timeout for generation
        }
      );

      console.log("Image generated successfully by Python service");
      res.json(response.data);
    } catch (serviceError) {
      console.error("Python service error:", {
        status: serviceError.response?.status,
        message: serviceError.message,
        code: serviceError.code,
      });

      // Check if Python service is running
      if (
        serviceError.code === "ECONNREFUSED" ||
        serviceError.code === "ENOTFOUND"
      ) {
        console.error(
          "Python image generation service is not running on port 5001"
        );
        console.error("Please start the Python service first:");
        console.error("  pip install flask diffusers torch");
        console.error("  python image_generator.py");

        return res.status(503).json({
          message:
            "Image generation service unavailable. Please ensure Python service is running on port 5001.",
          instructions:
            "Run: python image_generator.py (requires: flask, diffusers, torch)",
        });
      }

      const serviceMessage = serviceError.response?.data?.error;
      return res.status(503).json({
        message:
          serviceMessage ||
          "Image generation failed. Check the Python service logs.",
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