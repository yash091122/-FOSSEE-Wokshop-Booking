import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, ChevronLeft, CheckCircle } from 'lucide-react';
import api from '../utils/api';

const WorkshopDetails = () => {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`workshops/${id}/`)
      .then(res => {
        setWorkshop(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching workshop details:", err);
        setLoading(false);
      });
  }, [id]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-[#ff6b00]/30 border-t-[#ff6b00] rounded-full animate-spin shadow-neu-flat"></div>
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center text-gray-900 text-2xl font-bold pt-40">
        Workshop not found.
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden" animate="visible" exit="exit" variants={containerVariants}
      className="min-h-screen bg-transparent text-gray-900 pt-48 pb-20 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link to="/workshops" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#ff6b00] font-bold mb-8 transition-colors">
          <ChevronLeft className="w-5 h-5" /> Back to Workshops
        </Link>
        
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white rounded-[3rem] p-10 shadow-neu-flat border border-white relative overflow-hidden">
               {/* Ambient Glow */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/50 rounded-full blur-[80px] pointer-events-none"></div>

               <div className="flex items-center gap-4 mb-6 relative z-10">
                 <span className="px-4 py-1.5 bg-gray-50 border border-gray-100 shadow-neu-pressed rounded-full text-[#ff6b00] font-black text-xs uppercase tracking-widest">
                    {workshop.status === 1 ? 'Approved' : 'Pending'}
                 </span>
                 <span className="text-gray-400 font-bold text-sm tracking-wider uppercase">FOSSEE Official</span>
               </div>
               
               <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6 relative z-10 uppercase tracking-tighter">{workshop.workshop_type_name}</h1>
               
               <div className="flex flex-wrap gap-6 text-gray-500 font-bold mb-10 relative z-10 uppercase text-xs tracking-widest">
                 <div className="flex items-center gap-2"><User className="w-5 h-5 text-[#ff6b00]" /> {workshop.coordinator_name || 'Coordinator'}</div>
                 <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-[#ff6b00]" /> {workshop.date}</div>
                 <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-[#ff6b00]" /> {workshop.workshop_type_duration} Days</div>
                 <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-[#ff6b00]" /> Online</div>
               </div>

               <div className="space-y-6 relative z-10">
                 <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">About this Workshop</h3>
                 <p className="text-gray-600 leading-relaxed font-medium">
                   Join us for an intensive, hands-on session focusing on {workshop.workshop_type_name}. 
                   This workshop is designed to provide comprehensive, practical knowledge directly from the FOSSEE team. 
                   You will engage with complex architectural patterns, real-world deployment strategies, and modern tooling designed to elevate your technical capabilities.
                 </p>
                 <div className="bg-gray-50 border border-white shadow-neu-pressed rounded-2xl p-6 mt-6">
                    <h4 className="text-gray-900 font-black mb-4 drop-shadow-sm uppercase tracking-widest text-sm">What you will learn:</h4>
                    <ul className="space-y-3 text-gray-600 font-bold text-sm">
                      <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-[#ff6b00]" /> Interactive codebase walkthroughs</li>
                      <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-[#ff6b00]" /> Scalability paradigms</li>
                      <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-[#ff6b00]" /> Best practices and tooling</li>
                    </ul>
                 </div>
               </div>
            </div>
          </div>

          {/* Sticky Sidebar / Booking Action */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white rounded-[3rem] p-8 shadow-neu-flat border border-white">
               <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Enrollment</h3>
               <p className="text-gray-400 text-sm mb-8 font-bold uppercase tracking-widest">Secure your spot for the {workshop.date} session.</p>
               
               <div className="space-y-4 mb-8">
                 <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl shadow-neu-pressed border border-white">
                   <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Price</span>
                   <span className="text-gray-900 font-black text-xl">Free</span>
                 </div>
                 <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl shadow-neu-pressed border border-white">
                   <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Duration</span>
                   <span className="text-gray-900 font-black">{workshop.workshop_type_duration} Days</span>
                 </div>
                 <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl shadow-neu-pressed border border-white">
                   <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Seats</span>
                   <span className="text-gray-900 font-black">Unlimited</span>
                 </div>
               </div>

               <button className="w-full py-4 rounded-full bg-[#ff6b00] text-white font-black uppercase text-sm tracking-widest shadow-[0_8px_20px_rgba(255,107,0,0.3)] hover:shadow-[0_12px_25px_rgba(255,107,0,0.5)] active:scale-95 transition-all">
                 Book Workshop
               </button>
               <p className="text-center text-[10px] text-gray-400 mt-4 font-black uppercase tracking-[0.2em]">Limited Time Registration</p>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default WorkshopDetails;
