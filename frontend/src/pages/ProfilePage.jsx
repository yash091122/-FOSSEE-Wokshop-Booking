import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, LogOut, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 pt-40 pb-20 p-4"
    >
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ff6b00] font-bold mb-8 transition-colors">
          <ChevronLeft className="w-5 h-5" /> Back
        </Link>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-8">
            <div className="bg-white rounded-[3rem] p-8 shadow-neu-flat border border-white text-center">
               <div className="w-24 h-24 bg-gray-50 rounded-full shadow-neu-pressed flex items-center justify-center mx-auto mb-6 border-4 border-white">
                  <User className="w-12 h-12 text-gray-300" />
               </div>
               <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Yash Jain</h2>
               <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Project Lead</p>
            </div>

            <div className="bg-white rounded-[2.5rem] p-6 shadow-neu-flat border border-white space-y-2">
               <button className="w-full flex items-center gap-4 px-6 py-4 rounded-3xl hover:bg-gray-50 text-gray-600 font-bold transition-all text-sm uppercase tracking-widest">
                  <Settings className="w-5 h-5" /> Settings
               </button>
               <button className="w-full flex items-center gap-4 px-6 py-4 rounded-3xl hover:bg-gray-50 text-red-500 font-bold transition-all text-sm uppercase tracking-widest">
                  <LogOut className="w-5 h-5" /> Logout
               </button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-8">
             <div className="bg-white rounded-[3.5rem] p-10 shadow-neu-flat border border-white min-h-[400px]">
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-8 pb-4 border-b border-gray-100">Profile Details</h3>
                <div className="space-y-8">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 bg-gray-50 rounded-[2rem] shadow-neu-pressed border border-white">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Workshops Joined</p>
                         <p className="text-2xl font-black text-[#ff6b00]">12</p>
                      </div>
                      <div className="p-6 bg-gray-50 rounded-[2rem] shadow-neu-pressed border border-white">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Certificates Earned</p>
                         <p className="text-2xl font-black text-[#ff6b00]">8</p>
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 px-6 bg-gray-50 rounded-2xl">
                         <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email</span>
                         <span className="text-sm font-black text-gray-900">yashjain@example.com</span>
                      </div>
                      <div className="flex items-center justify-between p-4 px-6 bg-gray-50 rounded-2xl">
                         <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Membership</span>
                         <span className="text-sm font-black text-[#ff6b00]">Premium</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
