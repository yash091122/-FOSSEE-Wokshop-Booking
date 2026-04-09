import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ isAuthenticated, userFullName }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed w-full z-50 top-0 transition-all duration-300 bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-white/5 shadow-glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <Link to="/" className="flex items-center gap-2">
              <img src="/favicon.png" alt="FOSSEE Logo" className="h-10 w-auto" />
              <span className="font-extrabold text-2xl tracking-tighter text-white drop-shadow-sm">
                FOSSEE<span className="text-[#ff6b00]">.</span>
              </span>
            </Link>
          </motion.div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-sm font-bold tracking-wide text-gray-400 hover:text-white transition-colors">HOME</Link>
            <Link to="/workshops" className="text-sm font-bold tracking-wide text-gray-400 hover:text-white transition-colors">WORKSHOPS</Link>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-300">{userFullName}</span>
                <Link to="/profile" className="px-6 py-2.5 rounded-full bg-[#121212] text-white text-sm font-bold hover:text-[#ff6b00] transition-all duration-300 shadow-neu-flat hover:shadow-neu-hover active:shadow-neu-pressed">Profile</Link>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/login" className="px-6 py-2.5 rounded-full bg-[#ff6b00] text-black text-sm font-bold hover:bg-[#e66000] shadow-[0_4px_14px_rgba(255,107,0,0.4)] transition-all">
                  JOIN US
                </Link>
              </motion.div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-xl text-gray-400 hover:text-white bg-[#121212] shadow-neu-flat active:shadow-neu-pressed focus:outline-none transition-transform">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0f0f0f]/95 backdrop-blur-3xl border-b border-white/10 shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-2xl text-lg font-bold text-gray-300 hover:text-[#ff6b00] bg-[#121212] shadow-neu-flat active:shadow-neu-pressed transition-all">HOME</Link>
              <Link to="/workshops" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-2xl text-lg font-bold text-gray-300 hover:text-[#ff6b00] bg-[#121212] shadow-neu-flat active:shadow-neu-pressed transition-all">WORKSHOPS</Link>
              {isAuthenticated ? (
                <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-2xl text-lg font-bold text-gray-300 hover:text-[#ff6b00] bg-[#121212] shadow-neu-flat active:shadow-neu-pressed transition-all">PROFILE</Link>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-4 py-3 mt-6 rounded-2xl text-lg font-black bg-[#ff6b00] text-black text-center shadow-[0_8px_20px_rgba(255,107,0,0.3)] hover:bg-[#e66000]">JOIN US</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
