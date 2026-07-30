import { FaMoon, FaSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Topbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="topbar">
      <div className="topbar-right">
        {/* Theme Button */}
        <button
          className="icon-btn"
          onClick={toggleTheme}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Profile */}
        <div
          className="profile-box"
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
        >
          <div className="avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
          </div>

          <div>
            <h4>{user?.name || "User"}</h4>
            <p>AI Creator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;