import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import api from "../services/api";

import {
  FaSearch,
  FaTrash,
  FaCopy,
  FaDownload,
  FaExpand,
  FaImage,
  FaCheck,
  FaBolt,
  FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [copiedId, setCopiedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await api.get("/generate/history");
      if (response.data?.success) {
        setHistory(response.data.history || []);
      }
    } catch (error) {
      console.error("Failed to load prompt history:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleDeleteItem = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this prompt from your history?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/generate/history/${id}`);
      setHistory((prev) => prev.filter((item) => item._id !== id));
      if (selectedItem?._id === id) {
        setSelectedItem(null);
      }
    } catch (error) {
      console.error("Failed to delete history item:", error);
      alert("Failed to delete history item.");
    }
  };

  const handleClearAll = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your ENTIRE generation history? This action cannot be undone."
    );
    if (!confirmClear) return;

    try {
      await api.delete("/generate/history");
      setHistory([]);
    } catch (error) {
      console.error("Failed to clear history:", error);
      alert("Failed to clear history.");
    }
  };

  const filteredHistory = history
    .filter((item) =>
      item.prompt.toLowerCase().includes(searchQuery.toLowerCase().trim())
    )
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  const cachedCount = history.filter((item) => item.cached).length;

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-content">
        <Topbar />

        <div className="history-page-container">
          <div className="history-page-header">
            <div>
              <h1>Image & Prompt History</h1>
              <p>Review, copy, and re-download all your AI generated artwork.</p>
            </div>

            {history.length > 0 && (
              <button className="delete-account-btn clear-history-btn" onClick={handleClearAll}>
                <FaTrash /> Clear All History
              </button>
            )}
          </div>

          {/* Stats Bar */}
          <div className="history-stats-bar">
            <div className="history-stat-box">
              <FaImage className="stat-icon purple" />
              <div>
                <span>Total Generations</span>
                <h3>{history.length}</h3>
              </div>
            </div>

            <div className="history-stat-box">
              <FaBolt className="stat-icon blue" />
              <div>
                <span>Cached Hits</span>
                <h3>{cachedCount}</h3>
              </div>
            </div>

            <div className="history-stat-box">
              <FaClock className="stat-icon green" />
              <div>
                <span>Latest Generation</span>
                <h3>
                  {history.length > 0
                    ? new Date(history[0].createdAt).toLocaleDateString()
                    : "No data"}
                </h3>
              </div>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="history-filter-bar">
            <div className="history-search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search prompts by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery("")}
                >
                  ✕
                </button>
              )}
            </div>

            <div className="history-sort-box">
              <label>Sort By:</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Gallery Content */}
          {loading ? (
            <div className="history-loading">
              <div className="spinner"></div>
              <p>Loading your AI image history...</p>
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="empty-history-full">
              <FaImage />
              <h3>No Prompts Found</h3>
              <p>
                {searchQuery
                  ? `No generations matched "${searchQuery}". Try a different keyword.`
                  : "You haven't generated any AI images yet!"}
              </p>
              <button
                className="settings-action generate-first-btn"
                onClick={() => navigate("/dashboard")}
              >
                Generate Image Now
              </button>
            </div>
          ) : (
            <div className="history-full-grid">
              {filteredHistory.map((item) => (
                <div className="history-full-card" key={item._id}>
                  <div
                    className="history-full-img-wrapper"
                    onClick={() => setSelectedItem(item)}
                  >
                    <img src={item.image} alt={item.prompt} loading="lazy" />
                    {item.cached && <span className="cached-badge">Cached</span>}
                    <div className="history-full-overlay">
                      <button
                        className="overlay-action-btn"
                        title="View Fullscreen"
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
                        {copiedId === item._id ? (
                          <FaCheck style={{ color: "#10b981" }} />
                        ) : (
                          <FaCopy />
                        )}
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

                  <div className="history-full-card-info">
                    <p className="prompt-text" title={item.prompt}>
                      {item.prompt}
                    </p>
                    <div className="card-footer">
                      <span className="timestamp">
                        {new Date(item.createdAt).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <button
                        className="delete-item-btn"
                        title="Delete Prompt"
                        onClick={() => handleDeleteItem(item._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detailed Inspection Modal */}
        {selectedItem && (
          <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
            <div
              className="modal-card history-detail-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-modal"
                onClick={() => setSelectedItem(null)}
                title="Close"
              >
                ✕
              </button>

              <div className="detail-modal-body">
                <div className="detail-image-container">
                  <img src={selectedItem.image} alt={selectedItem.prompt} />
                </div>

                <div className="detail-info-container">
                  <h2>Prompt Information</h2>
                  <div className="prompt-quote-box">
                    <p>"{selectedItem.prompt}"</p>
                  </div>

                  <div className="detail-meta-grid">
                    <div className="meta-item">
                      <span>Model</span>
                      <h4>{selectedItem.model || "Pollinations AI"}</h4>
                    </div>

                    <div className="meta-item">
                      <span>Generation Time</span>
                      <h4>
                        {selectedItem.generationTime
                          ? `${(selectedItem.generationTime / 1000).toFixed(2)}s`
                          : "Instant"}
                      </h4>
                    </div>

                    <div className="meta-item">
                      <span>Status</span>
                      <h4>{selectedItem.cached ? "Cached Hit" : "Fresh Generation"}</h4>
                    </div>

                    <div className="meta-item">
                      <span>Created At</span>
                      <h4>{new Date(selectedItem.createdAt).toLocaleString()}</h4>
                    </div>
                  </div>

                  <div className="modal-actions">
                    <button
                      className="settings-action"
                      onClick={() => handleCopy(selectedItem.prompt, "detail")}
                    >
                      <FaCopy /> {copiedId === "detail" ? "Copied!" : "Copy Prompt"}
                    </button>
                    <button
                      className="secondary-btn"
                      onClick={() =>
                        handleDownload(selectedItem.image, selectedItem.prompt)
                      }
                    >
                      <FaDownload /> Download Image
                    </button>
                    <button
                      className="delete-account-btn"
                      onClick={() => handleDeleteItem(selectedItem._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default History;