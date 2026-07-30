import { useState } from "react";
import { FaMagic, FaRandom, FaTrash } from "react-icons/fa";
import api from "../services/api";

function PromptBox({
  setImage,
  setPrompt,
  loading,
  setLoading,
  user,
  setUser,
  onImageGenerated,
}) {
  const [inputPrompt, setInputPrompt] = useState("");

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
      suggestions[Math.floor(Math.random() * suggestions.length)];
    setInputPrompt(random);
  };

  const clearPrompt = () => {
    setInputPrompt("");
  };

  const generateImage = async () => {
    if (!inputPrompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }

    try {
      setLoading(true);
      setPrompt(inputPrompt);

      const response = await api.post("/generate", {
        prompt: inputPrompt,
      });

      if (response.data?.image) {
        setImage(response.data.image);

        if (onImageGenerated) {
          onImageGenerated(
            response.data.promptData || {
              _id: Date.now().toString(),
              prompt: inputPrompt,
              image: response.data.image,
              createdAt: new Date().toISOString(),
            }
          );
        }

        // Update dashboard statistics instantly
        if (setUser && user) {
          const updatedUser = {
            ...user,
            totalImages: (user.totalImages || 0) + 1,
            totalPrompts: (user.totalPrompts || 0) + 1,
          };

          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      }
    } catch (error) {
      console.error("Generation error:", error);
      alert(
        error.response?.data?.message || "Image generation failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prompt-box">
      <div className="prompt-header">
        <h2>Create AI Image</h2>
        <p>Describe anything and let AI bring it to life.</p>
      </div>

      <textarea
        value={inputPrompt}
        maxLength={500}
        onChange={(e) => setInputPrompt(e.target.value)}
        placeholder="Describe your imagination..."
      />

      <div className="character-counter">{inputPrompt.length}/500</div>

      <div className="suggestions">
        {suggestions.map((item, index) => (
          <button
            key={index}
            className="chip"
            onClick={() => setInputPrompt(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="prompt-actions">
        <button className="secondary-btn" onClick={randomPrompt}>
          <FaRandom /> Random
        </button>

        <button className="secondary-btn" onClick={clearPrompt}>
          <FaTrash /> Clear
        </button>

        <button
          className="generate-btn"
          disabled={loading}
          onClick={generateImage}
        >
          <FaMagic /> {loading ? "Generating..." : "Generate Image"}
        </button>
      </div>
    </div>
  );
}

export default PromptBox;