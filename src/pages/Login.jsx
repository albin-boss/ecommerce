import React, { useState, useEffect } from "react";
import "./login.css";
import { useNavigate, Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("loginEmails")) || [];
    setEmailSuggestions(stored);
  }, []);

  const saveEmailToHistory = (email) => {
    const stored = JSON.parse(localStorage.getItem("loginEmails")) || [];
    if (!stored.includes(email)) {
      stored.push(email);
      localStorage.setItem("loginEmails", JSON.stringify(stored));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const hardcodedEmail = "admin@gmail.com";
    const hardcodedPassword = "password";

    if (email === hardcodedEmail && password === hardcodedPassword) {
      const fakeAdmin = {
        id: 0,
        name: "Admin",
        email: hardcodedEmail,
        role: "admin",
      };

      localStorage.setItem("employeeId", fakeAdmin.id);
      localStorage.setItem("user", JSON.stringify(fakeAdmin));
      saveEmailToHistory(email);

      navigate("/dashboard");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8005/api/employee/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("employeeId", data.id);
        localStorage.setItem("user", JSON.stringify(data));
        saveEmailToHistory(email);

        navigate("/afterlogin");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid email or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
    setLoading(false);
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google login successful:", credentialResponse);
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

          <form onSubmit={handleLogin}>
            <input
              list="email-suggestions"
              type="email"
              placeholder="Email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <datalist id="email-suggestions">
              {emailSuggestions.map((item, index) => (
                <option key={index} value={item} />
              ))}
            </datalist>

            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="login-options">
              <label>
                <input type="checkbox" className="login-checkbox" />
                Remember me
              </label>
              <Link to="/forgot-password" className="login-forgot">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="login-divider">or</div>

          <div className="login-social">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
          </div>

          <div className="login-register">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="login-signup"
            >
              Sign up
            </span>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
