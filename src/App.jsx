import React from "react";
import "./index.css";
import logo from "./assets/logo.png";

export default function App() {

  return (
    <div className="container">
      <div className="left">
        <img src={logo} alt="InsurAI Logo" className="logo" />
        <h1>InsurAI Insurance Company</h1>
        <h2>Sign Up</h2>
        <p>Please enter your details below:</p>
        <form>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button className="sign-up-btn">Sign-Up</button>
        </form>
        <div className="login-text">
          <p>
            Already have an account? <a href="#">Log In</a>
          </p>
        </div>
      </div>

      <div className="right">
        <h2> Grow your business with insurance.</h2>
        <p>
          Get access to exclusive plans, and protect what's most important.
        </p>
        <div className="coverage-list">
          <div className="coverage-item">
            <span>🛡️ Health Coverage</span>
          </div>
          <div className="coverage-item">
            <span>💰 Life Coverage</span>
          </div>
          <div className="coverage-item">
            <span>📋 Tailored Plans</span>
          </div>
        </div>
  
      </div>
    </div>
  );
}
