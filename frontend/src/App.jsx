import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterPage from "./register";  // Import Register Page
import ActivityPage from "./Activity";
import ChatBot from "./chatbot";
import logo from "./assets/logo.svg";
import Dashboard from "./Dashboard";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <div className="container">
        <div className="landing-container">
        {/* Navbar remains visible on all pages */}
        <div className="navbar">
        <Link to="/" className="logo-container">
            <img src={logo} alt="Forkast Logo" className="logo" />
          </Link>
          <div className = "routes">
          <Link to="/chat-bot" className="nav-item">Chatbot</Link>
            <Link to="/activities" className="nav-item">temp</Link>
            <Link to="/forkast" className="nav-item">Dashboard</Link>
            <Link to="/register" className="login-button">Register</Link>  {/* Link to Register Page */}
          </div>
        </div>

        <Routes>
          {/* Main landing page */}
          <Route
            path="/"
            element={
              <>
                <div className="main-box" />
                
                <div className="header">
                  <h1>Welcome to Forkast</h1>
                  <h2>Your personal nutrition tracker</h2>
                </div>
                <div className="description">
                  Wondering how healthy your weekly meals are? Give us a picture of your
                  food, and we’ll tell you exactly what nutrients are in it! See what
                  you’ve eaten all week on your dashboard, with graphs of your intake
                  compared to the recommended intake.
                </div>
              </>
            }
          />
          
          {/* Register Page */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/chat-bot" element={<ChatBot/>} />
          <Route path="/activities" element={<ActivityPage/>} />
          <Route path="/forkast" element={<Dashboard/>} />
        </Routes>

        {/* Footer remains visible on all pages
        <div className="footer">
          Created by Prerita Babarjung, Sai Chauhan, Ishita Saran, and Allen Zheng
        </div> */}
        </div>
      </div>
    </Router>
  );
};

export default App;
