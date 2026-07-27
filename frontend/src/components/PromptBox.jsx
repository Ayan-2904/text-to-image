import { useState } from "react";
import {
  FaMagic,
  FaRandom,
  FaTrash,
} from "react-icons/fa";

import api from "../services/api";

function PromptBox({
  setImage,
  loading,
  setLoading,
}) {
  const [prompt, setPrompt] = useState("");

  const suggestions = [
    "A futuristic cyberpunk city at night",
    "Astronaut riding a horse on Mars",
    "Fantasy castle in the clouds",
    "Ultra realistic lion with blue eyes",
    "Anime girl in Tokyo street",
    "3D robot holding a glowing crystal",
  ];

  const randomPrompt = () => {
    const random =
      suggestions[
        Math.floor(Math.random() * suggestions.length)
      ];

    setPrompt(random);
  };

  const clearPrompt = () => {
    setPrompt("");
  };

  const generateImage = async () => {
    if (!prompt.trim()) {
      alert("Enter a prompt.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/generate",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setImage(response.data.image);
    } catch (err) {
      console.log(err);
      alert("Image generation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prompt-box">

      <div className="prompt-header">
        <h2>Create AI Image</h2>
        <p>
          Describe anything and let AI bring it to life.
        </p>
      </div>

      <textarea
        value={prompt}
        maxLength={500}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your imagination..."
      />

      <div className="character-counter">
        {prompt.length}/500
      </div>

      <div className="suggestions">

        {suggestions.map((item, index) => (
          <button
            key={index}
            className="chip"
            onClick={() => setPrompt(item)}
          >
            {item}
          </button>
        ))}

      </div>

      <div className="prompt-actions">

        <button
          className="secondary-btn"
          onClick={randomPrompt}
        >
          <FaRandom />
          Random
        </button>

        <button
          className="secondary-btn"
          onClick={clearPrompt}
        >
          <FaTrash />
          Clear
        </button>

        <button
          className="generate-btn"
          disabled={loading}
          onClick={generateImage}
        >
          <FaMagic />

          {loading
            ? "Generating..."
            : "Generate Image"}
        </button>

      </div>

    </div>
  );
}

export default PromptBox;