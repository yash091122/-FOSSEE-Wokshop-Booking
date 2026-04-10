import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WorkshopListing from './pages/WorkshopListing';
import WorkshopDetails from './pages/WorkshopDetails';
import ProposeWorkshop from './pages/ProposeWorkshop';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import ActivationPendingPage from './pages/ActivationPendingPage';
import ActivationPage from './pages/ActivationPage';
import api from './utils/api';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Wrapper for Animate Presence Router
const AnimatedRoutes = ({ auth, setAuth }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/workshops" element={<WorkshopListing />} />
        <Route path="/workshops/:id" element={<WorkshopDetails />} />
        <Route path="/propose" element={<ProposeWorkshop />} />
        <Route path="/login" element={<LoginPage setAuth={setAuth} />} />
        <Route path="/register" element={<LoginPage setAuth={setAuth} />} />
        <Route path="/activation-pending" element={<ActivationPendingPage />} />
        <Route path="/activate/:key" element={<ActivationPage />} />
        <Route path="/profile" element={<ProfilePage auth={auth} />} />
        <Route path="*" element={<div className="min-h-screen text-gray-900 flex items-center justify-center text-3xl font-bold bg-gray-50 pt-40">404 - Page Not Found</div>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    loading: true
  });

  useEffect(() => {
    // Check if there is a session on the backend
    api.get('auth/check/')
      .then(res => {
        if (res.data.user) {
          setAuth({ isAuthenticated: true, user: res.data.user, loading: false });
        } else {
          setAuth({ isAuthenticated: false, user: null, loading: false });
        }
      })
      .catch(() => {
        setAuth({ isAuthenticated: false, user: null, loading: false });
      });
  }, []);

  const handleLogout = () => {
    api.post('auth/logout/')
      .then(() => {
        setAuth({ isAuthenticated: false, user: null, loading: false });
      })
      .catch((err) => {
        console.error("Logout error:", err);
        setAuth({ isAuthenticated: false, user: null, loading: false });
      });
  };

  return (
    <Router>
      <div className="bg-gray-50 min-h-screen font-sans selection:bg-[#ff6b00] selection:text-white">
        <Navbar 
          isAuthenticated={auth.isAuthenticated} 
          userFullName={auth.user ? `${auth.user.first_name || auth.user.username}` : ""} 
          onLogout={handleLogout}
        />
        {auth.loading ? (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
             <div className="w-16 h-16 border-4 border-[#ff6b00]/30 border-t-[#ff6b00] rounded-full animate-spin"></div>
          </div>
        ) : (
          <AnimatedRoutes auth={auth} setAuth={setAuth} />
        )}
      </div>
    </Router>
  );
}

export default App;
