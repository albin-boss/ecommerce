import React from "react";
import "./login.css"; // Import the external CSS file
import { useNavigate } from "react-router-dom";
const Login = () => {
   const navigate = useNavigate();
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
          
        </div>

        {/* Register Link */}
        <div className="login-register">
          Don't have an account? <a href="#"onClick={() => navigate("/register")} className="login-signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
