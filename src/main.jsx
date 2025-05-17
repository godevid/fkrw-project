// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Import halaman
import LoginPage from "./pages/login";
import AdminDashboard from "./pages/admin";
import ProductAdminPage from "./pages/admin/products";
import BlogAdminPage from "./pages/admin/blog";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ProductAdminPage />} />
        <Route path="/admin/blog" element={<BlogAdminPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
