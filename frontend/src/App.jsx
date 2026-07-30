import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import History from "./pages/History";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";



function App() {


  return (


    <Routes>


      {/* Default Route */}

      <Route

        path="/"

        element={

          <Navigate

            to="/login"

            replace

          />

        }

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









      {/* Protected Routes */}



      <Route

        path="/dashboard"

        element={

          <ProtectedRoute>

            <Dashboard />

          </ProtectedRoute>

        }

      />







      <Route

        path="/profile"

        element={

          <ProtectedRoute>

            <Profile />

          </ProtectedRoute>

        }

      />







      <Route

        path="/history"

        element={

          <ProtectedRoute>

            <History />

          </ProtectedRoute>

        }

      />







      <Route

        path="/settings"

        element={

          <ProtectedRoute>

            <Settings />

          </ProtectedRoute>

        }

      />









      {/* Old Route Redirect */}


      <Route

        path="/home"

        element={

          <Navigate

            to="/dashboard"

            replace

          />

        }

      />









      {/* 404 */}


      <Route

        path="*"

        element={


          <div className="page-placeholder">


            <h1>

              404 | Page Not Found

            </h1>


          </div>


        }

      />




    </Routes>


  );

}



export default App;