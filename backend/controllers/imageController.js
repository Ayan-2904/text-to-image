import axios from "axios";
import Prompt from "../models/Prompt.js";
import User from "../models/User.js";
import { getCachedImage, cacheImage } from "../config/redis.js";

/**
 * Generate Image
 * POST /generate
 */
export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required.",
      });
    }

    const startTime = Date.now();

    // Check Redis Cache
    const cachedImage = await getCachedImage(prompt);

    if (cachedImage) {
      // Save prompt history
      const newPrompt = await Prompt.create({
        user: req.user._id,
        prompt,
        image: cachedImage,
        cached: true,
        model: "Pollinations AI",
        generationTime: Date.now() - startTime,
      });

      // Update user statistics
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          $inc: {
            totalImages: 1,
            totalPrompts: 1,
          },
        },
        { new: true }
      );

      return res.json({
        success: true,
        cached: true,
        image: cachedImage,
        promptData: newPrompt,
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          totalImages: updatedUser.totalImages,
          totalPrompts: updatedUser.totalPrompts,
        },
      });
    }

    // Call AI Generation Endpoint
    const response = await axios.get(
      `https://image.pollinations.ai/prompt/${encodeURIComponent(
        prompt
      )}?nologo=true`,
      {
        responseType: "arraybuffer",
        timeout: 120000,
      }
    );

    const base64 = Buffer.from(response.data, "binary").toString("base64");
    const image = `data:image/jpeg;base64,${base64}`;

    // Cache Image in Redis
    await cacheImage(prompt, image);

    // Save Prompt History to Database
    const newPrompt = await Prompt.create({
      user: req.user._id,
      prompt,
      image,
      cached: false,
      model: "Pollinations AI",
      generationTime: Date.now() - startTime,
    });

    // Update User Stats
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $inc: {
          totalImages: 1,
          totalPrompts: 1,
        },
      },
      { new: true }
    );

    return res.json({
      success: true,
      cached: false,
      image,
      promptData: newPrompt,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        totalImages: updatedUser.totalImages,
        totalPrompts: updatedUser.totalPrompts,
      },
    });

  } catch (error) {
    console.error("Image generation error:", error);
    return res.status(500).json({
      success: false,
      message: "Image generation failed.",
      error: error.message,
    });
  }
};

/**
 * Get User Prompt & Image History
 * GET /generate/history
 */
export const getUserHistory = async (req, res) => {
  try {
    const history = await Prompt.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(100);

    return res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    console.error("Error fetching history:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch prompt history.",
    });
  }
};

/**
 * Delete History Item
 * DELETE /generate/history/:id
 */
export const deleteHistoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const promptItem = await Prompt.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!promptItem) {
      return res.status(404).json({
        success: false,
        message: "History item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "History item deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting history item:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete history item.",
    });
  }
};

/**
 * Clear All User History
 * DELETE /generate/history
 */
export const clearUserHistory = async (req, res) => {
  try {
    await Prompt.deleteMany({ user: req.user._id });

    return res.status(200).json({
      success: true,
      message: "All history cleared successfully.",
    });
  } catch (error) {
    console.error("Error clearing history:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to clear history.",
    });
  }
};