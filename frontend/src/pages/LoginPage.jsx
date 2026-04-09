import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ChevronLeft, LogIn, AlertCircle } from 'lucide-react';
import api from '../utils/api';

const LoginPage = ({ setAuth }) => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirm_password: '',
    email: '',
    first_name: '',
    last_name: '',
    institute: '',
    department: 'computer engineering',
    phone_number: '',
    state: 'IN-MH',
    position: 'coordinator'
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Ensure CSRF cookie is set on mount
    api.get('auth/csrf/').catch(err => console.error("CSRF setup failed:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    if (isRegister && formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
      const endpoint = isRegister ? 'auth/register/' : 'auth/login/';
      const res = await api.post(endpoint, formData);
      if (res.data.user) {
        setAuth({ isAuthenticated: true, user: res.data.user, loading: false });
        navigate('/workshops');
      }
    } catch (err) {
      console.error("Auth Error:", err);
      setError(err.response?.data?.error || err.response?.data?.detail || "Authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const departments = [
    { value: "computer engineering", label: "Computer Science" },
    { value: "information technology", label: "Information Technology" },
    { value: "civil engineering", label: "Civil Engineering" },
    { value: "electrical engineering", label: "Electrical Engineering" },
    { value: "mechanical engineering", label: "Mechanical Engineering" }
  ];

  const states = [
    { value: "IN-MH", label: "Maharashtra" },
    { value: "IN-DL", label: "Delhi" },
    { value: "IN-KA", label: "Karnataka" },
    { value: "IN-TN", label: "Tamil Nadu" },
    { value: "IN-GJ", label: "Gujarat" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-40"
    >
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ff6b00] font-bold mb-8 transition-colors">
          <ChevronLeft className="w-5 h-5" /> Back to Home
        </Link>

        <div className="bg-white rounded-[3rem] p-10 md:p-12 shadow-neu-flat border border-white">
          <div className="text-center mb-8">
             <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-2 drop-shadow-md uppercase">
               {isRegister ? 'Create' : 'Sign'} <span className="text-[#ff6b00]">{isRegister ? 'Account' : 'In'}</span>
             </h1>
             <p className="text-gray-500 font-bold text-sm uppercase tracking-tight">
               {isRegister ? 'Join the FOSSEE workshop community' : 'Manage your workshop bookings'}
             </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Username</label>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ff6b00] transition-colors">
                    <LogIn className="w-4 h-4" />
                  </div>
                  <input 
                    type="text" 
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="w-full bg-gray-50 text-gray-900 rounded-full pl-14 pr-8 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                  />
                </div>
              </div>

              {isRegister && (
                 <div className="space-y-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Email Address</label>
                   <div className="relative group">
                     <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ff6b00] transition-colors">
                       <Mail className="w-4 h-4" />
                     </div>
                     <input 
                       type="email" 
                       name="email"
                       value={formData.email}
                       onChange={handleChange}
                       placeholder="Email"
                       required
                       className="w-full bg-gray-50 text-gray-900 rounded-full pl-14 pr-8 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                     />
                   </div>
                 </div>
              )}
            </div>

            {isRegister && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">First Name</label>
                   <input 
                     type="text" 
                     name="first_name"
                     value={formData.first_name}
                     onChange={handleChange}
                     placeholder="First Name"
                     required
                     className="w-full bg-gray-50 text-gray-900 rounded-full px-8 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                   />
                 </div>
                 <div className="space-y-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Last Name</label>
                   <input 
                     type="text" 
                     name="last_name"
                     value={formData.last_name}
                     onChange={handleChange}
                     placeholder="Last Name"
                     required
                     className="w-full bg-gray-50 text-gray-900 rounded-full px-8 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                   />
                 </div>
               </div>
            )}

            {isRegister && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Institute</label>
                   <input 
                     type="text" 
                     name="institute"
                     value={formData.institute}
                     onChange={handleChange}
                     placeholder="Institute Name"
                     required
                     className="w-full bg-gray-50 text-gray-900 rounded-full px-8 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                   />
                 </div>
                 <div className="space-y-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Phone Number</label>
                   <input 
                     type="text" 
                     name="phone_number"
                     value={formData.phone_number}
                     onChange={handleChange}
                     placeholder="10 digit number"
                     required
                     className="w-full bg-gray-50 text-gray-900 rounded-full px-8 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                   />
                 </div>
               </div>
            )}

            {isRegister && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Department</label>
                   <select 
                     name="department"
                     value={formData.department}
                     onChange={handleChange}
                     className="w-full bg-gray-50 text-gray-900 rounded-full px-8 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm appearance-none cursor-pointer"
                   >
                     {departments.map(dept => <option key={dept.value} value={dept.value}>{dept.label}</option>)}
                   </select>
                 </div>
                 <div className="space-y-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">State</label>
                   <select 
                     name="state"
                     value={formData.state}
                     onChange={handleChange}
                     className="w-full bg-gray-50 text-gray-900 rounded-full px-8 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm appearance-none cursor-pointer"
                   >
                     {states.map(state => <option key={state.value} value={state.value}>{state.label}</option>)}
                   </select>
                 </div>
               </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Password</label>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ff6b00] transition-colors">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="w-full bg-gray-50 text-gray-900 rounded-full pl-14 pr-8 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                  />
                </div>
              </div>

              {isRegister && (
                 <div className="space-y-1">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Confirm Password</label>
                   <div className="relative group">
                     <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ff6b00] transition-colors">
                       <Lock className="w-4 h-4" />
                     </div>
                     <input 
                       type="password" 
                       name="confirm_password"
                       value={formData.confirm_password}
                       onChange={handleChange}
                       placeholder="Confirm"
                       required
                       className="w-full bg-gray-50 text-gray-900 rounded-full pl-14 pr-8 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                     />
                   </div>
                 </div>
              )}
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 mt-4 flex items-center justify-center gap-3 rounded-full bg-[#ff6b00] text-white font-black uppercase text-xs tracking-widest shadow-md hover:shadow-lg transition-all active:scale-95 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Processing...' : (isRegister ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => { setIsRegister(!isRegister); setError(''); }}
              className="text-xs font-black text-gray-400 hover:text-[#ff6b00] transition-colors uppercase tracking-widest"
            >
              {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
