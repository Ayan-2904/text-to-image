import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Routes>

      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />


      {/* Public Routes */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* Protected Dashboard Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />


      {/* Old Home Redirect */}
      <Route
        path="/home"
        element={<Navigate to="/dashboard" replace />}
      />


      {/* 404 Page */}
      <Route
        path="*"
        element={
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#0f172a",
              color: "#fff",
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            404 | Page Not Found
          </div>
        }
      />

    </Routes>
  );
}

export default App;