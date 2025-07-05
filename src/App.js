// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignupPage from "./pages/SignUp";
import Login from "./pages/Login";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  // Also make sure this is imported

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<Login />} />
            {/* Role-based dashboards */}
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
        </Routes>
      </div>

      {/*  ToastContainer should be outside Routes */}
      <ToastContainer position="top-center" autoClose={2000} />
    </Router>
  );
};

export default App;
