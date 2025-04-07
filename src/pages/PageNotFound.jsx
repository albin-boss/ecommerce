import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/PageNotFound.css"; // Optional for custom styling

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="page-not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you’re looking for doesn't exist.</p>
      <button onClick={() => navigate("/afterlogin")}>
        Go to Dashboard
      </button>
    </div>
  );
}
