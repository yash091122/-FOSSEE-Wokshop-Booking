import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Send } from 'lucide-react';

const ProposeWorkshop = () => {
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    date: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    // In actual logic, api.post(...) would be called here.
    alert("Workshop Proposal Submitted!");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      initial="hidden" animate="visible" exit="exit" variants={containerVariants}
      className="min-h-screen bg-[#0f0f0f] text-white pt-24 pb-20 relative flex items-center justify-center"
    >
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#ff6b00]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-3xl mx-auto px-4 z-10">
        <Link to="/workshops" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ff6b00] font-bold mb-8 transition-colors">
          <ChevronLeft className="w-5 h-5" /> Back
        </Link>
        
        <div className="bg-[#121212] rounded-[3rem] p-10 md:p-14 shadow-neu-flat border border-white/5">
          <div className="text-center mb-12">
             <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 drop-shadow-md">Propose <span className="text-[#ff6b00]">Workshop</span></h1>
             <p className="text-gray-400 font-medium text-lg">Submit your idea for a new FOSSEE educational session.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300 uppercase tracking-widest pl-4">Workshop Title</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Advanced Data Science with Python"
                required
                className="w-full bg-[#0f0f0f] text-white placeholder-gray-600 rounded-full px-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/50 transition-shadow transition-colors"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 uppercase tracking-widest pl-4">Duration (Days)</label>
                <input 
                  type="number" 
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                  required
                  className="w-full bg-[#0f0f0f] text-white placeholder-gray-600 rounded-full px-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/50 transition-shadow transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 uppercase tracking-widest pl-4">Proposed Date</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0f0f0f] text-gray-300 placeholder-gray-600 rounded-full px-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/50 transition-shadow transition-colors [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300 uppercase tracking-widest pl-4">Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detail what the workshop covers..."
                required
                rows="4"
                className="w-full bg-[#0f0f0f] text-white placeholder-gray-600 rounded-[2rem] px-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/50 transition-shadow transition-colors resize-none"
              />
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                className="w-full py-5 flex items-center justify-center gap-3 rounded-full bg-[#ff6b00] text-black font-black uppercase text-sm tracking-widest shadow-[0_8px_20px_rgba(255,107,0,0.3)] hover:shadow-[0_12px_25px_rgba(255,107,0,0.5)] active:scale-95 transition-all"
              >
                Submit Proposal <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ProposeWorkshop;
