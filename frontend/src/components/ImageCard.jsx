function ImageCard({ image }) {
  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "ai-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="image-card">
      <h2>Generated Image</h2>

      <img
        src={image}
        alt="Generated AI"
      />

      <button onClick={downloadImage}>
        Download Image
      </button>
    </div>
  );
}

export default ImageCard;