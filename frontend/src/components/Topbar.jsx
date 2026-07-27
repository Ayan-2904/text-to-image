import {
  FaBell,
  FaSearch,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Topbar() {
  const { user } = useAuth();

  const [darkMode, setDarkMode] = useState(true);

  return (
    <header className="topbar">

      <div className="search-box">

        <FaSearch />

        <input
          type="text"
          placeholder="Search prompts..."
        />

      </div>

      <div className="topbar-right">

        <button className="icon-btn">

          <FaBell />

          <span className="notification-dot"></span>

        </button>

        <button
          className="icon-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <div className="profile-box">

          <div className="avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>

            <h4>{user?.name}</h4>

            <p>Premium User</p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;