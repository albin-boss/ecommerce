import React from "react";
import "./login.css"; // Import the external CSS file
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider,GoogleLogin } from "@react-oauth/google";

const Login = () => {
   const navigate = useNavigate();
  return (
    <GoogleOAuthProvider clientId="186458287471-ukm5cj3kv3f7l4c9158obpc5btmc0874.apps.googleusercontent.com">
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
            <GoogleLogin onSuccess={()=>{}}onError={()=>{}}/>
          </button>
          
        </div>

        {/* Register Link */}
        <div className="login-register">
          Don't have an account? <a href="#"onClick={() => navigate("/register")} className="login-signup">Sign up</a>
        </div>
      </div>
    </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
