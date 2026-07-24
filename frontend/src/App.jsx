import { useState } from "react";

import Navbar from "./components/Navbar";
import PromptForm from "./components/PromptForm";
import Loader from "./components/Loader";
import ImageCard from "./components/ImageCard";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  return (
    <div className="app">
      <Navbar />

      <PromptForm
        loading={loading}
        setLoading={setLoading}
        setImage={setImage}
      />

      {loading && <Loader />}

      {image && <ImageCard image={image} />}

      <Footer />
    </div>
  );
}

export default App;