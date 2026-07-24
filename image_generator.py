"""
Local image generation service using Hugging Face Diffusers
Supports FLUX.1-dev and Stable Diffusion models
"""

import os
import sys
import base64
from io import BytesIO

if sys.version_info >= (3, 13):
    raise RuntimeError(
        "Python 3.10-3.12 is required for the current PyTorch stack. "
        f"Detected Python {sys.version_info.major}.{sys.version_info.minor}. "
        "Install Python 3.12 and run this service with that interpreter."
    )

# This service uses PyTorch; avoid optional TensorFlow imports in Transformers.
os.environ.setdefault("USE_TF", "0")

import torch
from flask import Flask, request, jsonify
from diffusers import AutoPipelineForText2Image
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), "backend", ".env"))

app = Flask(__name__)

# Initialize the pipeline (loaded on first request)
pipeline = None
model_id = os.getenv("IMAGE_MODEL", "segmind/tiny-sd")
model_error = None


def load_model():
    """Load the configured text-to-image model."""
    global pipeline, model_error
    if pipeline is None:
        print(f"Loading {model_id}...")
        try:
            dtype = torch.float16 if torch.cuda.is_available() else torch.float32
            token = os.getenv("HF_TOKEN")
            model_options = {"torch_dtype": dtype}
            if token:
                model_options["token"] = token

            pipeline = AutoPipelineForText2Image.from_pretrained(
                model_id,
                **model_options,
            )
            pipeline.enable_attention_slicing()
            if torch.cuda.is_available():
                pipeline.enable_model_cpu_offload()
            else:
                pipeline.to("cpu")
            model_error = None
            print("Model loaded successfully!")
        except Exception as e:
            model_error = str(e)
            print(f"Error loading model: {e}")
            raise


@app.route("/", methods=["GET"])
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "ok",
        "message": "Image generation service running",
        "model": model_id,
        "modelLoaded": pipeline is not None,
        "modelError": model_error,
    })


@app.route("/generate", methods=["POST"])
def generate():
    """Generate an image from a text prompt"""
    try:
        data = request.get_json()
        prompt = data.get("prompt", "").strip()

        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        print(f"Generating image for prompt: {prompt}")

        # Load model on first request
        if pipeline is None:
            load_model()

        # Generate image
        with torch.no_grad():
            image = pipeline(
                prompt,
                height=512,
                width=512,
                guidance_scale=7.5,
                num_inference_steps=25,
                generator=torch.Generator("cpu").manual_seed(0)
            ).images[0]

        # Convert to base64
        buffer = BytesIO()
        image.save(buffer, format="PNG")
        img_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")

        print("Image generated successfully!")

        return jsonify({
            "image": f"data:image/png;base64,{img_base64}",
            "success": True,
            "message": "Image generated successfully"
        })

    except Exception as e:
        print(f"Error generating image: {e}")
        return jsonify({
            "message": "Image generation failed. Check model access and service logs.",
            "error": str(e),
            "success": False
        }), 500


if __name__ == "__main__":
    # Start Flask immediately; the large model loads on the first request.
    print("Starting image generation service on port 5001...")
    app.run(host="0.0.0.0", port=5001, debug=False)
