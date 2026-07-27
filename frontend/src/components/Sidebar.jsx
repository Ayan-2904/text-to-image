import {
  FaHome,
  FaMagic,
  FaHistory,
  FaHeart,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/",
    },
    {
      title: "Generate",
      icon: <FaMagic />,
      path: "/",
    },
    {
      title: "History",
      icon: <FaHistory />,
      path: "/history",
    },
    {
      title: "Favorites",
      icon: <FaHeart />,
      path: "/favorites",
    },
    {
      title: "Profile",
      icon: <FaUser />,
      path: "/profile",
    },
    {
      title: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>🎨 AI Studio</h2>
        <span>Create Amazing Images</span>
      </div>

      <nav className="menu">
        {menu.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={
              location.pathname === item.path
                ? "menu-item active"
                : "menu-item"
            }
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;