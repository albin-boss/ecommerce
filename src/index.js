
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";


import AuthLayout from "layouts/Auth.js";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="*" element={<Navigate to="/auth/index" replace />} />
      
      
    </Routes>
  </BrowserRouter>
);
