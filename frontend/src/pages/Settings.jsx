import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import api from "../services/api";

import {
  FaUser,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaLock,
  FaTrash,
  FaEdit,
  FaTimes,
} from "react-icons/fa";

function Settings() {
  const { user, logout, updateUser } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpenEdit = () => {
    setProfileData({
      name: user?.name || "",
      email: user?.email || "",
    });
    setEditOpen(true);
  };

  const updateProfile = async () => {
    try {
      const response = await api.put("/auth/update-profile", profileData);
      if (response.data.success) {
        if (response.data.user) {
          updateUser({
            ...user,
            ...response.data.user,
          });
        }
        alert(response.data.message || "Profile updated successfully");
        setEditOpen(false);
      }
    } catch (error) {
      console.error("Profile update error:", error);
      alert(
        error.response?.data?.message || "Profile update failed"
      );
    }
  };

  const changePassword = async () => {
    if (!passwordData.oldPassword || !passwordData.newPassword) {
      alert("Please fill in all password fields.");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("New password must be at least 6 characters long.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    try {
      const response = await api.put("/auth/change-password", {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });

      if (response.data.success) {
        alert(response.data.message || "Password changed successfully");
        setPasswordOpen(false);
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Password change error:", error);
      alert(
        error.response?.data?.message || "Password change failed"
      );
    }
  };

  const deleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action is permanent and cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete("/auth/delete-account");
      alert(response.data.message || "Account deleted successfully");
      logout();
    } catch (error) {
      console.error("Account deletion error:", error);
      alert(
        error.response?.data?.message || "Account deletion failed"
      );
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-content">
        <Topbar />

        <div className="settings-page">
          <div className="settings-card">
            <h1>Settings</h1>
            <p className="settings-subtitle">
              Manage your account preferences and theme settings.
            </p>

            <section className="settings-section">
              <h2>Account</h2>

              <div className="settings-item">
                <FaUser />
                <div>
                  <span>Name</span>
                  <h3>{user?.name || "N/A"}</h3>
                </div>
              </div>

              <div className="settings-item">
                <FaEnvelope />
                <div>
                  <span>Email</span>
                  <h3>{user?.email || "N/A"}</h3>
                </div>
              </div>

              <button
                className="settings-action"
                onClick={handleOpenEdit}
              >
                <FaEdit /> Edit Profile
              </button>
            </section>

            <section className="settings-section">
              <h2>Appearance</h2>
              <div
                className="settings-item theme-toggle-item"
                onClick={toggleTheme}
                style={{ cursor: "pointer" }}
              >
                {isDarkMode ? <FaMoon /> : <FaSun />}
                <div style={{ flex: 1 }}>
                  <span>Theme</span>
                  <h3>{isDarkMode ? "Dark Mode" : "Light Mode"}</h3>
                </div>
                <button
                  type="button"
                  className="theme-switch-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTheme();
                  }}
                >
                  Switch to {isDarkMode ? "Light" : "Dark"} Mode
                </button>
              </div>
            </section>

            <section className="settings-section">
              <h2>Security</h2>
              <button
                className="settings-action"
                onClick={() => setPasswordOpen(true)}
              >
                <FaLock /> Change Password
              </button>
            </section>

            <section className="settings-section danger">
              <h2>Danger Zone</h2>
              <button
                className="delete-account-btn"
                onClick={deleteAccount}
              >
                <FaTrash /> Delete Account
              </button>
            </section>
          </div>
        </div>

        {editOpen && (
          <div className="modal-overlay" onClick={() => setEditOpen(false)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                className="close-modal"
                onClick={() => setEditOpen(false)}
                title="Close"
              >
                <FaTimes />
              </button>

              <h2>Edit Profile</h2>

              <div className="modal-form-group">
                <label>Full Name</label>
                <input
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  placeholder="Enter your name"
                />
              </div>

              <div className="modal-form-group">
                <label>Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="modal-actions">
                <button
                  className="settings-action"
                  onClick={updateProfile}
                >
                  Save Changes
                </button>
                <button
                  className="modal-cancel-btn"
                  onClick={() => setEditOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {passwordOpen && (
          <div className="modal-overlay" onClick={() => setPasswordOpen(false)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                className="close-modal"
                onClick={() => {
                  setPasswordOpen(false);
                  setPasswordData({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
                title="Close"
              >
                <FaTimes />
              </button>

              <h2>Change Password</h2>

              <div className="modal-form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  placeholder="Enter current password"
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="modal-form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  placeholder="Enter new password (min 6 chars)"
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="modal-form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  placeholder="Re-enter new password"
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="modal-actions">
                <button
                  className="settings-action"
                  onClick={changePassword}
                >
                  Update Password
                </button>
                <button
                  className="modal-cancel-btn"
                  onClick={() => {
                    setPasswordOpen(false);
                    setPasswordData({
                      oldPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Settings;