import { useState } from "react";
import api from "../services/api";

function PromptForm({ loading, setLoading, setImage }) {
  const [prompt, setPrompt] = useState("");

  const generateImage = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/generate", {
        prompt,
      });

      if (response.data.image) {
        setImage(response.data.image);
        
        if (!response.data.success) {
          console.warn("Using placeholder image:", response.data.warning);
          alert(response.data.warning || "Image generation available but using placeholder.");
        }
      }
    } catch (error) {
      console.error("Generation error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to generate image. Check console for details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="prompt-form" onSubmit={generateImage}>
      <textarea
        placeholder="Describe your image..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Generating..." : "Generate Image"}
      </button>
    </form>
  );
}

export default PromptForm;