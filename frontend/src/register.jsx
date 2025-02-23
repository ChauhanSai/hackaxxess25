import React from "react";
import "./styles/Register.css"; // Import the CSS file

const RegisterPage = () => {
  return (
    <div className="register-container">
      {/* Welcome Title */}
      <div className="welcome-title">Welcome to Forkast</div>

      {/* Registration Form Container */}
      <div className="form-container">
        {/* Form Title */}
        <div className="form-title">Register</div>

        {/* Input Fields */}
        <div className="input-fields">
          <div className="input-row">
            <InputField label="Username" />
            <div></div>
            <InputField label="Password" />
          </div>
          <InputField label="Email" />
          <div className="input-row">
            <InputField label="Age" />
            <div></div>
            <InputField label="Sex" />
          </div>
          <div className="input-row">
            <InputField label="Height" />
            <div></div>
            <InputField label="Weight" />
          </div>
          
        </div>

        {/* Register Button */}
        <button className="register-button">Register</button>

        {/* Login Link */}
        <div className="login-link">Already a Fork? <span>Login</span></div>
      </div>
    </div>
  );
};

// Reusable InputField Component
const InputField = ({ label }) => {
  return (
    <div className="input-wrapper">
      <label className="input-label">{label}</label>
      <input className="input-field" type={label === "Password" ? "password" : "text"} />
    </div>
  );
};

export default RegisterPage;
