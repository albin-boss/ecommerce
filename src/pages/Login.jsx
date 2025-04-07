import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const response = await fetch("http://localhost:8005/api/employee/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Store Employee ID in localStorage
        localStorage.setItem("employeeId", data.id);
        localStorage.setItem("user", JSON.stringify(data)); // Store full user data if needed

        navigate("/afterlogin"); // Redirect to dashboard after login
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google login successful:", credentialResponse);
    // Handle Google login (send token to backend for validation)
    navigate("/dashboard");
  };

  const handleGoogleLoginError = () => {
    setError("Google login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId="186458287471-ukm5cj3kv3f7l4c9158obpc5btmc0874.apps.googleusercontent.com">
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

          {error && <p className="error-message">{error}</p>}

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Remember Me & Forgot Password */}
            <div className="login-options">
              <label>
                <input type="checkbox" className="login-checkbox" />
                Remember me
              </label>
              <a href="#" className="login-forgot">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-button">Login</button>
          </form>

          {/* Divider */}
          <div className="login-divider">or</div>

          {/* Google Login */}
          <div className="login-social">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
          </div>

          {/* Register Link */}
          <div className="login-register">
            Don't have an account?{" "}
            <a href="#" onClick={() => navigate("/register")} className="login-signup">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
