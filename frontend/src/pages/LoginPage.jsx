import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, ChevronLeft, LogIn } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Attempt:", formData);
    alert("Login functionality will be integrated with the Django backend soon!");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-20"
    >
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ff6b00] font-bold mb-8 transition-colors">
          <ChevronLeft className="w-5 h-5" /> Back to Home
        </Link>

        <div className="bg-white rounded-[3rem] p-10 md:p-12 shadow-neu-flat border border-white">
          <div className="text-center mb-10">
             <div className="w-20 h-20 bg-gray-50 rounded-3xl shadow-neu-pressed flex items-center justify-center mx-auto mb-6">
                <img src="/favicon.png" alt="Logo" className="w-12 h-12" />
             </div>
             <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Welcome <span className="text-[#ff6b00]">Back</span></h1>
             <p className="text-gray-400 font-bold text-sm uppercase mt-2 tracking-widest">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pl-6">Username / Email</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="yashjain"
                  required
                  className="w-full bg-gray-50 text-gray-900 placeholder-gray-300 rounded-full pl-14 pr-8 py-5 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pl-6">Password</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-gray-50 text-gray-900 placeholder-gray-300 rounded-full pl-14 pr-8 py-5 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold"
                />
              </div>
            </div>

            <div className="flex justify-between items-center px-4">
               <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-200 text-[#ff6b00] focus:ring-[#ff6b00]/30" />
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Remember</span>
               </label>
               <a href="#" className="text-xs text-[#ff6b00] font-black uppercase tracking-widest hover:underline">Forgot?</a>
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                className="w-full py-5 flex items-center justify-center gap-3 rounded-full bg-[#ff6b00] text-white font-black uppercase text-sm tracking-widest shadow-[0_8px_20px_rgba(255,107,0,0.3)] hover:shadow-[0_12px_25px_rgba(255,107,0,0.5)] active:scale-95 transition-all"
              >
                Sign In <LogIn className="w-5 h-5" />
              </button>
            </div>
          </form>

          <div className="mt-10 text-center">
             <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                New here? <Link to="/register" className="text-[#ff6b00] font-black hover:underline ml-1">Create Account</Link>
             </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
