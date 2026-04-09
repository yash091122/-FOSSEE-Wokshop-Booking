import React from 'react';
import Navbar from './components/Navbar';
import WorkshopListing from './pages/WorkshopListing';
import WorkshopDetails from './pages/WorkshopDetails';
import ProposeWorkshop from './pages/ProposeWorkshop';
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
        <Route path="*" element={<div className="min-h-screen text-white flex items-center justify-center text-3xl font-bold bg-[#0f0f0f]">404 - Page Not Found</div>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="bg-[#0f0f0f] min-h-screen font-sans selection:bg-[#ff6b00] selection:text-black">
        <Navbar isAuthenticated={false} userFullName="" />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
