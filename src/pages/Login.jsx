import React from "react";
import "./login.css"; // Import the external CSS file

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>

        {/* Email Input */}
        <input type="email" placeholder="Email" className="login-input" />

        {/* Password Input */}
        <input type="password" placeholder="Password" className="login-input" />

        {/* Remember Me & Forgot Password */}
        <div className="login-options">
          <label>
            <input type="checkbox" className="login-checkbox" />
            Remember me
          </label>
          <a href="#" className="login-forgot">Forgot Password?</a>
        </div>

        {/* Login Button */}
        <button className="login-button">Login</button>

        {/* Divider */}
        <div className="login-divider">or</div>

        {/* Social Login Buttons */}
        <div className="login-social">
          <button className="social-btn google">
            <img src="https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg" alt="Google" className="social-icon" />
            Google
          </button>
          <button className="social-btn apple">
            <img src="data:image/png;base64,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" alt="Apple" className="social-icon" />
            Apple
          </button>
        </div>

        {/* Register Link */}
        <div className="login-register">
          Don't have an account? <a href="#" className="login-signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
