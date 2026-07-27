import mongoose from "mongoose";

const promptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    prompt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    image: {
      type: String,
      required: true,
    },

    cached: {
      type: Boolean,
      default: false,
    },

    model: {
      type: String,
      default: "Pollinations AI",
    },

    generationTime: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["success", "failed"],
      default: "success",
    }
  },
  {
    timestamps: true,
  }
);

const Prompt = mongoose.model("Prompt", promptSchema);

export default Prompt;