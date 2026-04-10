import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import api from '../utils/api';

const ActivationPage = () => {
  const { key } = useParams();
  const [status, setStatus] = useState(null); // 'loading', 'success', 'expired', 'already_verified', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!key) {
      setStatus('error');
      setMessage('Invalid activation link.');
      return;
    }

    const activateAccount = async () => {
      setStatus('loading');
      try {
        const res = await api.post('auth/activate/', { key });
        // 0 = Success, 1 = Expired, 2 = Already Verified
        if (res.data.status === 0) setStatus('success');
        else if (res.data.status === 1) setStatus('expired');
        else if (res.data.status === 2) setStatus('already_verified');
        else setStatus('error');
        
        setMessage(res.data.message || 'Verification complete.');
      } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.error || 'Failed to activate account. The link may be invalid.');
      }
    };

    activateAccount();
  }, [key]);

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <div className="flex flex-col items-center">
          <Loader2 className="w-16 h-16 text-[#ff6b00] animate-spin mb-6" />
          <h2 className="text-xl font-black text-gray-900 uppercase">Verifying Key...</h2>
        </div>
      );
    }

    if (status === 'success' || status === 'already_verified') {
      return (
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-green-50 rounded-full shadow-neu-pressed flex items-center justify-center mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-4 uppercase">
            {status === 'success' ? 'Account Activated!' : 'Already Verified!'}
          </h2>
          <p className="text-gray-500 mb-8">{message}</p>
          <Link to="/login" className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-full bg-[#ff6b00] text-white font-black uppercase tracking-widest shadow-md hover:shadow-lg transition-all active:scale-95">
            Proceed to Login <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      );
    }

    if (status === 'expired') {
      return (
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-red-50 rounded-full shadow-neu-pressed flex items-center justify-center mb-8">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-4 uppercase">Link Expired</h2>
          <p className="text-gray-500 mb-8">{message}</p>
          <Link to="/register" state={{ isRegister: true }} className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-full bg-[#ff6b00] text-white font-black uppercase tracking-widest shadow-md hover:shadow-lg transition-all active:scale-95">
            Register Again <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-red-50 rounded-full shadow-neu-pressed flex items-center justify-center mb-8">
          <XCircle className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-4 uppercase">Invalid Link</h2>
        <p className="text-gray-500 mb-8">{message}</p>
        <Link to="/" className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-full bg-gray-50 text-gray-900 font-black uppercase tracking-widest shadow-neu-flat hover:shadow-neu-pressed transition-all active:scale-95">
          Back to Home
        </Link>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-neu-flat border border-white text-center">
          {renderContent()}
        </div>
      </div>
    </motion.div>
  );
};

export default ActivationPage;
