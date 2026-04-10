import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ChevronLeft, User, Building, Phone, MapPin, Briefcase, Info } from 'lucide-react';
import api from '../utils/api';

const LoginPage = ({ setAuth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(location.state?.isRegister || false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirm_password: '',
    email: '',
    title: 'Mr',
    first_name: '',
    last_name: '',
    institute: '',
    department: 'computer engineering',
    phone_number: '',
    state: 'IN-MH',
    location: '',
    how_did_you_hear_about_us: 'FOSSEE website',
    position: 'coordinator'
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Ensure CSRF cookie is set on mount
    api.get('auth/csrf/').catch(err => console.error("CSRF setup failed:", err));
  }, []);

  useEffect(() => {
    if (location.state && location.state.isRegister !== undefined) {
      setIsRegister(location.state.isRegister);
    }
  }, [location.state]);

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'phone_number') {
      value = value.replace(/\D/g, '');
    }
    if (e.target.name === 'username') {
      value = value.replace(/[^a-zA-Z0-9_.]/g, '');
    }
    setFormData({ ...formData, [e.target.name]: value });
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
      
      if (isRegister) {
        // Redirection on successful registration
        if (res.data.status === 'activation_pending') {
          navigate('/activation-pending');
        }
      } else {
        // Login success
        if (res.data.user) {
          setAuth({ isAuthenticated: true, user: res.data.user, loading: false });
          navigate('/workshops');
        }
      }
    } catch (err) {
      console.error("Auth Error:", err);
      const errData = err.response?.data;
      if (errData?.error === 'activation_pending') {
        navigate('/activation-pending');
      } else {
        setError(errData?.error || errData?.detail || "Authentication failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const titles = [
    { value: "Professor", label: "Prof." },
    { value: "Doctor", label: "Dr." },
    { value: "Shriman", label: "Shri" },
    { value: "Shrimati", label: "Smt." },
    { value: "Kumari", label: "Ku." },
    { value: "Mr", label: "Mr." },
    { value: "Mrs", label: "Mrs." },
    { value: "Miss", label: "Ms." }
  ];

  const departments = [
    { value: "computer engineering", label: "Computer Science" },
    { value: "information technology", label: "Information Technology" },
    { value: "civil engineering", label: "Civil Engineering" },
    { value: "electrical engineering", label: "Electrical Engineering" },
    { value: "mechanical engineering", label: "Mechanical Engineering" },
    { value: "chemical engineering", label: "Chemical Engineering" },
    { value: "aerospace engineering", label: "Aerospace Engineering" },
    { value: "biosciences and bioengineering", label: "BioEngineering" },
    { value: "electronics", label: "Electronics" },
    { value: "energy science and engineering", label: "Energy" }
  ];

  const states = [
    { value: "IN-AP", label: "Andhra Pradesh" }, { value: "IN-AR", label: "Arunachal Pradesh" },
    { value: "IN-AS", label: "Assam" }, { value: "IN-BR", label: "Bihar" },
    { value: "IN-CT", label: "Chhattisgarh" }, { value: "IN-GA", label: "Goa" },
    { value: "IN-GJ", label: "Gujarat" }, { value: "IN-HR", label: "Haryana" },
    { value: "IN-HP", label: "Himachal Pradesh" }, { value: "IN-JK", label: "Jammu and Kashmir" },
    { value: "IN-JH", label: "Jharkhand" }, { value: "IN-KA", label: "Karnataka" },
    { value: "IN-KL", label: "Kerala" }, { value: "IN-MP", label: "Madhya Pradesh" },
    { value: "IN-MH", label: "Maharashtra" }, { value: "IN-MN", label: "Manipur" },
    { value: "IN-ML", label: "Meghalaya" }, { value: "IN-MZ", label: "Mizoram" },
    { value: "IN-NL", label: "Nagaland" }, { value: "IN-OR", label: "Odisha" },
    { value: "IN-PB", label: "Punjab" }, { value: "IN-RJ", label: "Rajasthan" },
    { value: "IN-SK", label: "Sikkim" }, { value: "IN-TN", label: "Tamil Nadu" },
    { value: "IN-TG", label: "Telangana" }, { value: "IN-TR", label: "Tripura" },
    { value: "IN-UT", label: "Uttarakhand" }, { value: "IN-UP", label: "Uttar Pradesh" },
    { value: "IN-WB", label: "West Bengal" }, { value: "IN-DL", label: "Delhi" },
    { value: "IN-CH", label: "Chandigarh" }, { value: "IN-AN", label: "Andaman and Nicobar" }
  ];

  const sources = [
    { value: "FOSSEE website", label: "FOSSEE website" },
    { value: "Google", label: "Google" },
    { value: "Social Media", label: "Social Media" },
    { value: "From other College", label: "From other College" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-40 pb-20"
    >
      <div className="w-full max-w-lg transition-all duration-500 ease-out">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ff6b00] font-bold mb-8 transition-colors">
          <ChevronLeft className="w-5 h-5" /> Back to Home
        </Link>

        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-neu-flat border border-white">
          <div className="text-center mb-10">
             <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-3 drop-shadow-sm uppercase whitespace-nowrap">
               {isRegister ? 'Create' : 'Sign'} <span className="text-[#ff6b00]">{isRegister ? 'Account' : 'In'}</span>
             </h1>
             <p className="text-gray-400 font-bold text-xs md:text-sm uppercase tracking-[0.1em]">
               {isRegister ? 'Join the FOSSEE workshop community' : 'Manage your workshop bookings'}
             </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Username</label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ff6b00] transition-colors pointer-events-none">
                    <User className="w-4 h-4" />
                  </div>
                  <input 
                    type="text" 
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="w-full bg-gray-50 text-gray-900 rounded-full pl-12 pr-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                  />
                </div>
              </div>

              {isRegister && (
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Email Address</label>
                   <div className="relative group">
                     <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ff6b00] transition-colors pointer-events-none">
                       <Mail className="w-4 h-4" />
                     </div>
                     <input 
                       type="email" 
                       name="email"
                       value={formData.email}
                       onChange={handleChange}
                       placeholder="Email Address"
                       required
                       className="w-full bg-gray-50 text-gray-900 rounded-full pl-12 pr-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                     />
                   </div>
                 </div>
              )}
            </div>

            {isRegister && (
               <div className="space-y-6">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Title</label>
                   <div className="relative group">
                     <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ff6b00] transition-colors pointer-events-none">
                       <User className="w-4 h-4" />
                     </div>
                     <select 
                       name="title"
                       value={formData.title}
                       onChange={handleChange}
                       className="w-full bg-gray-50 text-gray-900 rounded-full pl-12 pr-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm appearance-none cursor-pointer"
                     >
                       {titles.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                     </select>
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">First Name</label>
                       <div className="relative group">
                         <input 
                           type="text" 
                           name="first_name"
                           value={formData.first_name}
                           onChange={handleChange}
                           placeholder="First Name"
                           required
                           className="w-full bg-gray-50 text-gray-900 rounded-full px-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                         />
                       </div>
                     </div>
                     <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Last Name</label>
                       <div className="relative group">
                         <input 
                           type="text" 
                           name="last_name"
                           value={formData.last_name}
                           onChange={handleChange}
                           placeholder="Last Name"
                           required
                           className="w-full bg-gray-50 text-gray-900 rounded-full px-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                         />
                       </div>
                     </div>
                 </div>
               </div>
            )}

            {isRegister && (
               <div className="space-y-6">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Institute</label>
                   <div className="relative group">
                     <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ff6b00] transition-colors pointer-events-none">
                       <Building className="w-4 h-4" />
                     </div>
                     <input 
                       type="text" 
                       name="institute"
                       value={formData.institute}
                       onChange={handleChange}
                       placeholder="Institute Name"
                       required
                       className="w-full bg-gray-50 text-gray-900 rounded-full pl-12 pr-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                     />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Phone Number</label>
                   <div className="relative group">
                     <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ff6b00] transition-colors pointer-events-none">
                       <Phone className="w-4 h-4" />
                     </div>
                     <input 
                       type="tel" 
                       inputMode="numeric"
                       maxLength="10"
                       name="phone_number"
                       value={formData.phone_number}
                       onChange={handleChange}
                       placeholder="10 digit number"
                       required
                       className="w-full bg-gray-50 text-gray-900 rounded-full pl-12 pr-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                     />
                   </div>
                 </div>
               </div>
            )}

            {isRegister && (
               <div className="space-y-6">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Department</label>
                   <div className="relative group">
                     <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ff6b00] transition-colors pointer-events-none">
                       <Briefcase className="w-4 h-4" />
                     </div>
                     <select 
                       name="department"
                       value={formData.department}
                       onChange={handleChange}
                       className="w-full bg-gray-50 text-gray-900 rounded-full pl-12 pr-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm appearance-none cursor-pointer"
                     >
                       {departments.map(dept => <option key={dept.value} value={dept.value}>{dept.label}</option>)}
                     </select>
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">State</label>
                       <div className="relative group">
                         <select 
                           name="state"
                           value={formData.state}
                           onChange={handleChange}
                           className="w-full bg-gray-50 text-gray-900 rounded-full px-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm appearance-none cursor-pointer"
                         >
                           {states.map(state => <option key={state.value} value={state.value}>{state.label}</option>)}
                         </select>
                       </div>
                     </div>
                     
                     <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Location/City</label>
                       <div className="relative group">
                         <input 
                           type="text" 
                           name="location"
                           value={formData.location}
                           onChange={handleChange}
                           placeholder="City"
                           required
                           className="w-full bg-gray-50 text-gray-900 rounded-full px-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                         />
                       </div>
                     </div>
                 </div>
                 
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">How did you hear about us?</label>
                   <div className="relative group">
                     <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ff6b00] transition-colors pointer-events-none">
                       <Info className="w-4 h-4" />
                     </div>
                     <select 
                       name="how_did_you_hear_about_us"
                       value={formData.how_did_you_hear_about_us}
                       onChange={handleChange}
                       className="w-full bg-gray-50 text-gray-900 rounded-full pl-12 pr-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm appearance-none cursor-pointer"
                     >
                       {sources.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                     </select>
                   </div>
                 </div>
               </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Password</label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ff6b00] transition-colors pointer-events-none">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="w-full bg-gray-50 text-gray-900 rounded-full pl-12 pr-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                  />
                </div>
              </div>

              {isRegister && (
                 <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Confirm Password</label>
                   <div className="relative group">
                     <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ff6b00] transition-colors pointer-events-none">
                       <Lock className="w-4 h-4" />
                     </div>
                     <input 
                       type="password" 
                       name="confirm_password"
                       value={formData.confirm_password}
                       onChange={handleChange}
                       placeholder="Confirm Password"
                       required
                       className="w-full bg-gray-50 text-gray-900 rounded-full pl-12 pr-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                     />
                   </div>
                 </div>
              )}
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold animate-shake">
                <Info className="w-5 h-5 flex-shrink-0" /> {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 mt-8 flex items-center justify-center gap-3 rounded-full bg-[#ff6b00] text-white font-black uppercase tracking-widest shadow-md hover:shadow-lg transition-all active:scale-95 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Processing...' : (isRegister ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <button 
              onClick={() => { setIsRegister(!isRegister); setError(''); }}
              className="text-xs font-black text-gray-400 hover:text-[#ff6b00] transition-colors uppercase tracking-[0.1em]"
              type="button"
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
