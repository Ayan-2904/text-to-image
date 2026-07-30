import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCard from "../components/StatsCard";
import PromptBox from "../components/PromptBox";
import ImageViewer from "../components/ImageViewer";
import HistoryCard from "../components/HistoryCard";
import api from "../services/api";

import { FaImage, FaKeyboard } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, setUser } = useAuth();
  const [image, setImage] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/generate/history");
        if (response.data?.success) {
          setHistory(response.data.history || []);
        }
      } catch (error) {
        console.error("Failed to load dashboard history:", error);
      }
    };
    fetchHistory();
  }, []);

  const handleImageGenerated = (newItem) => {
    setHistory((prev) => [newItem, ...prev]);
  };

  const handleDeleteItem = async (id) => {
    try {
      await api.delete(`/generate/history/${id}`);
      setHistory((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to delete history item:", error);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-content">
        <Topbar />

        <section className="welcome">
          <h1>Welcome back, {user?.name || "Creator"} 👋</h1>
          <p>Create amazing AI images from your imagination.</p>
        </section>

        <div className="stats-grid">
          <StatsCard
            title="Images Generated"
            value={user?.totalImages || 0}
            subtitle="Total Images"
            icon={<FaImage />}
            color="#7c3aed"
          />

          <StatsCard
            title="Prompts Used"
            value={user?.totalPrompts || 0}
            subtitle="Total Prompts"
            icon={<FaKeyboard />}
            color="#2563eb"
          />
        </div>

        <PromptBox
          setImage={setImage}
          setPrompt={setPrompt}
          loading={loading}
          setLoading={setLoading}
          setUser={setUser}
          user={user}
          onImageGenerated={handleImageGenerated}
        />

        <ImageViewer image={image} prompt={prompt} />

        <HistoryCard history={history} onDeleteItem={handleDeleteItem} />
      </main>
    </div>
  );
}

export default Dashboard;