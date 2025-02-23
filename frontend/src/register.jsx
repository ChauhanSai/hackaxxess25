import React, { useState } from "react";
import "./styles/Register.css"; // Import the CSS file

const VITE_AWS_INVOKE_URL = import.meta.env.VITE_AWS_INVOKE_URL;
console.log(VITE_AWS_INVOKE_URL);

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleRegisterClick = async () => {
    // Gather the input fields into variables

    const userData = '{"username":"'+username+'","password":"'+password+'","email":"'+email+'","age":"'+age+'","sex":"'+sex+'","height":"'+height+'","weight":"'+weight+'"}';

    console.log("Register button clicked");
    console.log("User Data:", userData);

    try {
      const response = await fetch(VITE_AWS_INVOKE_URL + "/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        // Handle successful registration (e.g., redirect to login page)
      } else {
        console.error("Registration failed:", response.statusText);
        // Handle registration failure (e.g., show error message)
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle network or other errors
    }
  };

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
            <InputField label="Username" value={username} onChange={setUsername} />
            <div></div>
            <InputField label="Password" value={password} onChange={setPassword} />
          </div>
          <InputField label="Email" value={email} onChange={setEmail} />
          <div className="input-row">
            <InputField label="Age" value={age} onChange={setAge} />
            <div></div>
            <InputField label="Sex" value={sex} onChange={setSex} />
          </div>
          <div className="input-row">
            <InputField label="Height" value={height} onChange={setHeight} />
            <div></div>
            <InputField label="Weight" value={weight} onChange={setWeight} />
          </div>
        </div>

        {/* Register Button */}
        <button className="register-button" onClick={handleRegisterClick}>Register</button>

        {/* Login Link */}
        <div className="login-link">Already a Fork? <span>Login</span></div>
      </div>
    </div>
  );
};

// Reusable InputField Component
const InputField = ({ label, value, onChange }) => {
  return (
    <div className="input-wrapper">
      <label className="input-label">{label}</label>
      <input
        className="input-field"
        type={label === "Password" ? "password" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default RegisterPage;