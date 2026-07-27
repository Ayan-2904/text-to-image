import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Generate cache key
export const getCacheKey = (prompt) => {
  return `image:${prompt.trim().toLowerCase().replace(/\s+/g, " ")}`;
};

// Get image from cache
export const getCachedImage = async (prompt) => {
  try {
    const key = getCacheKey(prompt);

    const cachedImage = await redis.get(key);

    if (cachedImage) {
      console.log("🟢 Redis Cache HIT");
      return cachedImage;
    }

    console.log("🟡 Redis Cache MISS");
    return null;
  } catch (error) {
    console.error("Redis GET Error:", error.message);
    return null;
  }
};

// Save image to cache
export const cacheImage = async (
  prompt,
  image,
  ttl = 60 * 60 * 24
) => {
  try {
    const key = getCacheKey(prompt);

    await redis.set(key, image, {
      ex: ttl,
    });

    console.log("🔵 Image Cached Successfully");
  } catch (error) {
    console.error("Redis SET Error:", error.message);
  }
};

export default redis;