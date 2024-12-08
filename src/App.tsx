import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import PosterBuilder from './pages/PosterBuilder';
import TemplateSelection from './pages/TemplateSelection';
import Archive from './pages/Archive';
import AdminDashboard from './components/AdminDashboard';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import Pricing from './pages/Pricing';
import UserManagement from './pages/UserManagement';
import Support from './pages/Support';
import AdminKnowledgeBase from './pages/AdminKnowledgeBase';
import AdminTickets from './pages/AdminTickets';
import Sales from './pages/Sales';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <Routes>
            {/* Public routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/" element={<LandingPage />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/templates" element={<ProtectedRoute><TemplateSelection /></ProtectedRoute>} />
            <Route path="/builder" element={<ProtectedRoute><PosterBuilder /></ProtectedRoute>} />
            <Route path="/archive" element={<ProtectedRoute><Archive /></ProtectedRoute>} />
            <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            {/* Admin routes */}
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
            <Route path="/admin/tickets" element={<AdminRoute><AdminTickets /></AdminRoute>} />
            <Route path="/admin/knowledge" element={<AdminRoute><AdminKnowledgeBase /></AdminRoute>} />
            <Route path="/admin/sales" element={<AdminRoute><Sales /></AdminRoute>} />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}