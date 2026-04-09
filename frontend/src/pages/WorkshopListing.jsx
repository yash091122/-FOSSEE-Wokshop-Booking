import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const WorkshopListing = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('workshops/')
      .then(res => {
        setWorkshops(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching workshops:", err);
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <motion.div 
      initial="hidden" animate="visible" exit="exit" variants={containerVariants}
      className="min-h-screen bg-transparent text-gray-900 pt-40 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col mx-auto text-center md:text-left md:flex-row md:items-end justify-between mb-16 pb-10 border-b border-gray-200/50">
          <motion.div variants={itemVariants}>
            <p className="text-[#ff6b00] font-black mb-3 tracking-widest uppercase text-sm drop-shadow-sm">Featured Selection</p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none drop-shadow-md text-gray-900">
              Explore <br/>
              <span className="text-gray-400">Workshops</span>
            </h1>
          </motion.div>
          <motion.div variants={itemVariants} className="flex justify-center md:justify-end gap-5 mt-10 md:mt-0 pb-2">
            <button className="px-8 py-4 rounded-full bg-[#ff6b00] text-white font-black uppercase text-sm tracking-widest shadow-[0_8px_20px_rgba(255,107,0,0.3)] hover:shadow-[0_12px_25px_rgba(255,107,0,0.5)] active:scale-95 transition-all">
              All Workshops
            </button>
            <Link to="/propose" className="px-8 py-4 rounded-full bg-white border border-gray-100 text-gray-800 font-black uppercase text-sm tracking-widest shadow-neu-flat active:shadow-neu-pressed transition-all">
              Propose
            </Link>
          </motion.div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
             <div className="w-16 h-16 border-4 border-[#ff6b00]/30 border-t-[#ff6b00] rounded-full animate-spin shadow-neu-flat"></div>
          </div>
        ) : workshops.length === 0 ? (
          <motion.div variants={itemVariants} className="text-center py-24 px-6 bg-gray-50 rounded-[3rem] shadow-neu-pressed text-gray-400 font-bold text-xl uppercase tracking-widest border border-white">
            No workshops found.
          </motion.div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {workshops.map((ws) => (
              <motion.div 
                key={ws.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group bg-gray-50 rounded-[2.5rem] p-8 flex flex-col h-full border border-white shadow-neu-flat hover:shadow-neu-hover transition-all duration-500 relative"
              >
                {/* Neumorphic Extruded Header Image representation */}
                <div className="w-full h-56 rounded-3xl bg-gray-50 shadow-neu-pressed p-6 flex flex-col justify-between relative mb-8 border border-white/50 overflow-hidden">
                  
                  {/* Internal Glow on Hover */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#ff6b00]/0 rounded-full blur-[40px] group-hover:bg-[#ff6b00]/10 transition-all duration-700"></div>
                  
                  <div className="relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/80 border border-white shadow-sm backdrop-blur-md text-[#ff6b00] font-black text-[10px] uppercase tracking-widest w-max">
                      {ws.status === 1 ? 'Accepted' : ws.status === 0 ? 'Pending' : 'Deleted'}
                    </span>
                  </div>
                  
                  <div className="relative z-10 flex justify-end">
                    <div className="w-14 h-14 rounded-full bg-white shadow-neu-flat flex items-center justify-center text-[#ff6b00] font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                       ➔
                    </div>
                  </div>
                </div>
                
                <div className="px-2 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-black tracking-tighter mb-3 uppercase text-gray-800 group-hover:text-[#ff6b00] transition-colors">{ws.workshop_type_name}</h3>
                    <p className="text-gray-500 text-xs mb-8 font-black tracking-widest uppercase">By {ws.coordinator_name || 'Coordinator'}</p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-auto">
                    <div className="flex flex-col text-xs text-gray-500 font-bold tracking-wide">
                      <span className="mb-2"><span className="text-[#ff6b00] mr-2 text-base">📅</span>{ws.date}</span>
                      <span><span className="text-[#ff6b00] mr-2 text-base">⏱</span>{ws.workshop_type_duration} days</span>
                    </div>
                    <Link to={`/workshops/${ws.id}`} className="bg-white text-gray-800 border border-gray-100 shadow-neu-flat px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#ff6b00] hover:text-white hover:border-[#ff6b00] hover:shadow-[0_4px_15px_rgba(255,107,0,0.4)] active:scale-95 transition-all duration-300 text-center">
                      Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default WorkshopListing;
