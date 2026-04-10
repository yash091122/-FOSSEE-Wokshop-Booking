import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MailOpen, ArrowLeft } from 'lucide-react';

const ActivationPendingPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-neu-flat border border-white text-center">
          <div className="w-24 h-24 mx-auto bg-gray-50 rounded-full shadow-neu-pressed flex items-center justify-center mb-8">
            <MailOpen className="w-10 h-10 text-[#ff6b00]" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter mb-4 uppercase">
            Check Your <span className="text-[#ff6b00]">Email</span>
          </h1>
          
          <p className="text-gray-500 font-medium mb-8 leading-relaxed">
            We've sent an activation link to your email address. Please click the link to verify your account. The link will expire in 24 hours.
          </p>
          
          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 text-sm text-orange-800 font-medium mb-8 text-left">
            <strong>Note for local testing:</strong> Check the backend terminal console. The SHA-256 activation link has been printed there.
          </div>

          <Link 
            to="/login"
            className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-full bg-gray-50 text-gray-900 font-black uppercase tracking-widest shadow-neu-flat hover:shadow-neu-pressed transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" /> Return to Login
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivationPendingPage;
