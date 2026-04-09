import React from 'react';
import Navbar from './components/Navbar';
import WorkshopListing from './pages/WorkshopListing';
import WorkshopDetails from './pages/WorkshopDetails';
import ProposeWorkshop from './pages/ProposeWorkshop';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Wrapper for Animate Presence Router
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/workshops" element={<WorkshopListing />} />
        <Route path="/workshops/:id" element={<WorkshopDetails />} />
        <Route path="/propose" element={<ProposeWorkshop />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<div className="min-h-screen text-gray-900 flex items-center justify-center text-3xl font-bold bg-gray-50">404 - Page Not Found</div>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen font-sans selection:bg-[#ff6b00] selection:text-white">
        <Navbar isAuthenticated={false} userFullName="" />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
