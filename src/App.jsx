// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import CatalogPage from '@/pages/CatalogPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import BlogPage from '@/pages/BlogPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import AdminLoginPage from '@/pages/login';
import AdminDashboardPage from '@/pages/admin';
import AdminProductsPage from '@/pages/admin/products';
import AdminArticlesPage from '@/pages/admin/blog';
import AdminLayout from '@/components/admin/AdminLayout';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/product/:productId" element={<ProductDetailPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          isAuthenticated ? (
            <AdminLayout>
              <AdminDashboardPage />
            </AdminLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/admin/products"
        element={
          isAuthenticated ? (
            <AdminLayout>
              <AdminProductsPage />
            </AdminLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/admin/articles"
        element={
          isAuthenticated ? (
            <AdminLayout>
              <AdminArticlesPage />
            </AdminLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <AuthProvider>
          <div className="flex flex-col min-h-screen bg-background text-foreground">
            <ConditionalNavbar />
            <main className="flex-grow">
              <AppRoutes />
            </main>
            <ConditionalFooter />
            <Toaster />
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

const ConditionalNavbar = () => {
  const location = window.location.pathname;
  if (location.startsWith('/admin')) {
    return null;
  }
  return <Navbar />;
};

const ConditionalFooter = () => {
  const location = window.location.pathname;
  if (location.startsWith('/admin')) {
    return null;
  }
  return <Footer />;
};

export default App;
