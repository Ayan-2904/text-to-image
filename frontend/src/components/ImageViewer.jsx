import {
  FaDownload,
  FaCopy,
  FaRedo,
  FaShareAlt,
  FaHeart,
} from "react-icons/fa";

function ImageViewer({ image, prompt }) {
  if (!image) {
    return (
      <div className="image-viewer empty">
        <div className="empty-content">
          <h2>🎨 Your AI masterpiece will appear here</h2>

          <p>
            Enter a creative prompt and click
            <strong> Generate Image</strong>.
          </p>
        </div>
      </div>
    );
  }

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "ai-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    alert("Prompt copied!");
  };

  const shareImage = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "AI Generated Image",
        text: prompt,
      });
    } else {
      alert("Sharing isn't supported in this browser.");
    }
  };

  return (
    <div className="image-viewer">

      <div className="viewer-header">

        <div>

          <h2>Generated Image</h2>

          <p>{prompt}</p>

        </div>

      </div>

      <img
        src={image}
        alt="Generated AI"
      />

      <div className="viewer-actions">

        <button onClick={downloadImage}>
          <FaDownload />
          Download
        </button>

        <button onClick={copyPrompt}>
          <FaCopy />
          Copy Prompt
        </button>

        <button>
          <FaRedo />
          Regenerate
        </button>

        <button>
          <FaHeart />
          Favourite
        </button>

        <button onClick={shareImage}>
          <FaShareAlt />
          Share
        </button>

      </div>

    </div>
  );
}

export default ImageViewer;