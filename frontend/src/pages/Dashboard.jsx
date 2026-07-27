import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCard from "../components/StatsCard";
import PromptBox from "../components/PromptBox";
import ImageViewer from "../components/ImageViewer";
import HistoryCard from "../components/HistoryCard";

import {
  FaImage,
  FaKeyboard,
  FaDatabase,
  FaClock,
} from "react-icons/fa";


function Dashboard() {

  const [image, setImage] = useState("");

  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);


  // Temporary history data
  // Later this will come from MongoDB
  const [history] = useState([]);


  return (

    <div className="dashboard">


      {/* Sidebar */}

      <Sidebar />


      {/* Main Content */}

      <main className="dashboard-content">


        {/* Top Navigation */}

        <Topbar />



        {/* Welcome Section */}

        <section className="welcome">

          <h1>
            Welcome back, Ayan 👋
          </h1>

          <p>
            Create amazing AI images from your imagination.
          </p>

        </section>




        {/* Statistics */}

        <div className="stats-grid">


          <StatsCard
            title="Images Generated"
            value={145}
            subtitle="Total AI Images"
            icon={<FaImage />}
            color="#7c3aed"
          />


          <StatsCard
            title="Prompts"
            value={162}
            subtitle="Total Prompts"
            icon={<FaKeyboard />}
            color="#3b82f6"
          />


          <StatsCard
            title="Redis Cache"
            value={91}
            subtitle="Cache Hit %"
            icon={<FaDatabase />}
            color="#10b981"
          />


          <StatsCard
            title="Today's Images"
            value={8}
            subtitle="Generated Today"
            icon={<FaClock />}
            color="#f59e0b"
          />


        </div>





        {/* AI Generator */}

        <PromptBox

          setImage={setImage}

          setPrompt={setPrompt}

          loading={loading}

          setLoading={setLoading}

        />





        {/* Generated Image */}

        <ImageViewer

          image={image}

          prompt={prompt}

        />





        {/* History */}

        <HistoryCard

          history={history}

        />



      </main>


    </div>

  );

}


export default Dashboard;