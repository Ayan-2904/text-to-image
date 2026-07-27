import axios from "axios";

import Prompt from "../models/Prompt.js";
import User from "../models/User.js";

import {
  getCachedImage,
  cacheImage,
} from "../config/redis.js";

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

    /*
    ===========================
    CHECK REDIS CACHE
    ===========================
    */

    const cachedImage = await getCachedImage(prompt);

    if (cachedImage) {
      // Save history in MongoDB
      await Prompt.create({
        user: req.user._id,
        prompt,
        image: cachedImage,
        cached: true,
        model: "Pollinations AI",
        generationTime: Date.now() - startTime,
      });

      // Update statistics
      await User.findByIdAndUpdate(req.user._id, {
        $inc: {
          totalImages: 1,
          totalPrompts: 1,
        },
      });

      return res.json({
        success: true,
        cached: true,
        image: cachedImage,
      });
    }

    /*
    ===========================
    GENERATE IMAGE
    ===========================
    */

    const response = await axios.get(
      `https://image.pollinations.ai/prompt/${encodeURIComponent(
        prompt
      )}?nologo=true`,
      {
        responseType: "arraybuffer",
        timeout: 120000,
      }
    );

    const base64 = Buffer.from(
      response.data,
      "binary"
    ).toString("base64");

    const image = `data:image/jpeg;base64,${base64}`;

    /*
    ===========================
    SAVE TO REDIS
    ===========================
    */

    await cacheImage(prompt, image);

    /*
    ===========================
    SAVE TO MONGODB
    ===========================
    */

    await Prompt.create({
      user: req.user._id,
      prompt,
      image,
      cached: false,
      model: "Pollinations AI",
      generationTime: Date.now() - startTime,
    });

    /*
    ===========================
    UPDATE USER STATS
    ===========================
    */

    await User.findByIdAndUpdate(req.user._id, {
      $inc: {
        totalImages: 1,
        totalPrompts: 1,
      },
    });

    return res.json({
      success: true,
      cached: false,
      image,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Image generation failed.",
      error: error.message,
    });

  }
};