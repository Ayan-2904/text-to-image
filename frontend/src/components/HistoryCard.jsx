import { useState } from "react";
import { FaClock, FaImage, FaCopy, FaTrash, FaDownload, FaExpand, FaCheck } from "react-icons/fa";

function HistoryCard({ history = [], onDeleteItem }) {
  const [copiedId, setCopiedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (imageUrl, promptText) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `ai-image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="history-card">
      <div className="history-header">
        <h2>
          <FaClock /> Recent Generations
        </h2>
        <span className="history-count-badge">{history.length} items</span>
      </div>

      {history.length === 0 ? (
        <div className="empty-history">
          <FaImage />
          <h3>No Images Generated Yet</h3>
          <p>Describe a prompt above to start creating AI artwork!</p>
        </div>
      ) : (
        <div className="history-grid-preview">
          {history.slice(0, 6).map((item) => (
            <div className="history-item-card" key={item._id}>
              <div className="history-img-wrapper" onClick={() => setSelectedItem(item)}>
                <img src={item.image} alt={item.prompt} loading="lazy" />
                <div className="history-overlay-actions">
                  <button
                    className="overlay-action-btn"
                    title="View details"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItem(item);
                    }}
                  >
                    <FaExpand />
                  </button>
                  <button
                    className="overlay-action-btn"
                    title="Copy Prompt"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(item.prompt, item._id);
                    }}
                  >
                    {copiedId === item._id ? <FaCheck style={{ color: "#10b981" }} /> : <FaCopy />}
                  </button>
                  <button
                    className="overlay-action-btn"
                    title="Download"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(item.image, item.prompt);
                    }}
                  >
                    <FaDownload />
                  </button>
                </div>
              </div>

              <div className="history-card-body">
                <h4 title={item.prompt}>{item.prompt}</h4>
                <div className="history-card-meta">
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  {onDeleteItem && (
                    <button
                      className="delete-history-btn"
                      title="Delete prompt"
                      onClick={() => onDeleteItem(item._id)}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-card history-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedItem(null)}>
              ✕
            </button>
            <div className="history-modal-content">
              <img src={selectedItem.image} alt={selectedItem.prompt} className="history-modal-img" />
              <div className="history-modal-details">
                <h3>Prompt Details</h3>
                <p className="history-modal-prompt">{selectedItem.prompt}</p>
                <div className="history-modal-tags">
                  <span className="meta-tag">Model: {selectedItem.model || "Pollinations AI"}</span>
                  {selectedItem.generationTime && (
                    <span className="meta-tag">Speed: {(selectedItem.generationTime / 1000).toFixed(2)}s</span>
                  )}
                  <span className="meta-tag">Date: {new Date(selectedItem.createdAt).toLocaleString()}</span>
                </div>
                <div className="modal-actions">
                  <button
                    className="settings-action"
                    onClick={() => handleCopy(selectedItem.prompt, "modal")}
                  >
                    <FaCopy /> {copiedId === "modal" ? "Copied!" : "Copy Prompt"}
                  </button>
                  <button
                    className="secondary-btn"
                    onClick={() => handleDownload(selectedItem.image, selectedItem.prompt)}
                  >
                    <FaDownload /> Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoryCard;