import React from "react";
import "./styles/Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="welcome-text">Welcome Back!</div>
      <div className="login-box">
        <div className="login-background" />
        <div className="login-button" />
        <div className="login-text">Login</div>
        <div className="signup-text">Create a New Account</div>
        
        <div className="input-box">
          <svg width="520" height="70" viewBox="0 0 520 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 25C0 11.1929 11.1929 0 25 0H495C508.807 0 520 11.1929 520 25V44.3333C520 58.1405 508.807 69.3333 495 69.3333H25C11.1929 69.3333 0 58.1405 0 44.3333V25Z" fill="#FFFFF0" fillOpacity="0.941176"/>
          </svg>
        </div>

        <div className="input-label password">password</div>

        <div className="input-box">
          <svg width="520" height="70" viewBox="0 0 520 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 25C0 11.1929 11.1929 0 25 0H495C508.807 0 520 11.1929 520 25V44.3333C520 58.1405 508.807 69.3333 495 69.3333H25C11.1929 69.3333 0 58.1405 0 44.3333V25Z" fill="#FFFFF0" fillOpacity="0.941176"/>
          </svg>
        </div>

        <div className="input-label email">email</div>

        <div className="login-title">Login</div>
      </div>
    </div>
  );
};

export default Login;
