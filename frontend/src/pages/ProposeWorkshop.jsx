import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Send, AlertCircle } from 'lucide-react';
import api from '../utils/api';

const ProposeWorkshop = ({ auth }) => {
  const navigate = useNavigate();
  const [workshopTypes, setWorkshopTypes] = useState([]);
  const [formData, setFormData] = useState({
    workshop_type: '',
    instructor: '',
    date: '',
    tnc_accepted: true
  });
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Auth Guard
    if (!auth?.isAuthenticated && !auth?.loading) {
       navigate('/login');
       return;
    }

    // Fetch Types
    api.get('workshop-types/')
      .then(res => {
        setWorkshopTypes(res.data);
        setLoadingTypes(false);
      })
      .catch(err => {
        console.error("Error fetching types:", err);
        setLoadingTypes(false);
      });
  }, [auth, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await api.post('workshops/', {
        ...formData,
        coordinator: auth.user.id
      });
      alert("Workshop Proposal Submitted Successfully!");
      navigate('/workshops');
    } catch (err) {
      console.error("Submission Error:", err);
      setError(err.response?.data?.detail || "Failed to submit proposal. Please check your inputs.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      initial="hidden" animate="visible" exit="exit" variants={containerVariants}
      className="min-h-screen bg-transparent text-gray-900 pt-40 pb-20 relative flex items-center justify-center"
    >
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-orange-100/50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-3xl mx-auto px-4 z-10">
        <Link to="/workshops" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ff6b00] font-bold mb-8 transition-colors">
          <ChevronLeft className="w-5 h-5" /> Back
        </Link>
        
        <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-neu-flat border border-white">
          <div className="text-center mb-12">
             <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4 drop-shadow-md uppercase">Propose <span className="text-[#ff6b00]">Workshop</span></h1>
             <p className="text-gray-500 font-bold text-lg uppercase tracking-tight">Submit your idea for a new FOSSEE educational session.</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold animate-shake">
              <AlertCircle className="w-5 h-5" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-6">Workshop Type</label>
              <select 
                name="workshop_type"
                value={formData.workshop_type}
                onChange={handleChange}
                required
                className="w-full bg-gray-50 text-gray-900 rounded-full px-8 py-5 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-shadow transition-colors font-bold appearance-none cursor-pointer"
              >
                <option value="">Select a workshop type</option>
                {workshopTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name} ({type.duration} Days)</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-6">Instructor Name</label>
                <input 
                  type="text" 
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleChange}
                  placeholder="e.g. Dr. Jane Smith"
                  required
                  className="w-full bg-gray-50 text-gray-900 placeholder-gray-300 rounded-full px-8 py-5 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-shadow transition-colors font-bold"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-6">Proposed Date</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 text-gray-800 placeholder-gray-400 rounded-full px-8 py-5 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-shadow transition-colors font-bold [color-scheme:light]"
                />
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 flex items-center justify-center gap-3 rounded-full bg-[#ff6b00] text-white font-black uppercase text-sm tracking-widest shadow-[0_8px_20px_rgba(255,107,0,0.3)] hover:shadow-[0_12px_25px_rgba(255,107,0,0.5)] active:scale-95 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Proposal'} <Send className="w-5 h-5 text-white/80" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ProposeWorkshop;
