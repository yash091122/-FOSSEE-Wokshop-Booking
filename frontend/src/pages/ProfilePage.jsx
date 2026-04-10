import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut, ChevronLeft, Save, Loader2, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';

const ProfilePage = ({ auth }) => {
  const navigate = useNavigate();
  const { userId } = useParams(); // If userId exists, we are in View-Only mode
  const isViewOnly = !!userId;

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' }); // Neumorphic Toast

  const departments = [
    { value: "computer engineering", label: "Computer Science" },
    { value: "information technology", label: "Information Technology" },
    { value: "civil engineering", label: "Civil Engineering" },
    { value: "electrical engineering", label: "Electrical Engineering" },
    { value: "mechanical engineering", label: "Mechanical Engineering" },
    { value: "chemical engineering", label: "Chemical Engineering" }
  ];

  const states = [
    { value: "IN-AP", label: "Andhra Pradesh" }, { value: "IN-MH", label: "Maharashtra" },
    { value: "IN-DL", label: "Delhi" }, { value: "IN-KA", label: "Karnataka" }
    // Truncated for Demo UI brevity
  ];

  const titles = [
    { value: "Professor", label: "Prof." }, { value: "Doctor", label: "Dr." },
    { value: "Mr", label: "Mr." }, { value: "Mrs", label: "Mrs." }, { value: "Miss", label: "Ms." }
  ];

  useEffect(() => {
    // If not authenticated, kick out
    if (!auth.loading && !auth.isAuthenticated) {
      navigate('/login');
    }
  }, [auth, navigate]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const endpoint = isViewOnly ? `profile/${userId}/` : 'profile/me/';
        const res = await api.get(endpoint);
        setProfileData(res.data);
        
        // Fetch workshops related to this profile
        // In realistic backend, passing ?coordinator_username= or similar
        const wsRes = await api.get('workshops/');
        // Filter locally for demo if backend filter not explicit
        const myWk = wsRes.data.filter(w => w.coordinator_name?.toLowerCase().includes(res.data.first_name?.toLowerCase() || ''));
        setWorkshops(myWk);
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [isViewOnly, userId]);

  const handleChange = (e) => {
    if (isViewOnly) return;
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.put('profile/me/', profileData);
      setToast({ show: true, message: 'Profile updated successfully!', type: 'success' });
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    } catch (err) {
      setToast({ show: true, message: 'Failed to update profile.', type: 'error' });
      setTimeout(() => setToast({ show: false, message: '', type: 'error' }), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || auth.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-40">
         <Loader2 className="w-12 h-12 text-[#ff6b00] animate-spin" />
      </div>
    );
  }

  if (!profileData) return <div className="min-h-screen text-center pt-40 bg-gray-50 font-black text-2xl text-gray-400">Profile Not Found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 pt-40 pb-20 p-4 relative"
    >
      {/* Neumorphic Custom Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-8 py-4 rounded-full font-bold shadow-lg border ${toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}
          >
            {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : null}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ff6b00] font-bold mb-8 transition-colors">
          <ChevronLeft className="w-5 h-5" /> Back
        </Link>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-[3rem] p-8 shadow-neu-flat border border-white text-center">
               <div className="w-24 h-24 bg-gray-50 rounded-full shadow-neu-pressed flex items-center justify-center mx-auto mb-6 border-4 border-white relative overflow-hidden">
                  <User className="w-12 h-12 text-gray-300" />
               </div>
               <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">
                 {profileData.first_name} {profileData.last_name}
               </h2>
               <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
                 {profileData.position || 'Coordinator'}
               </p>
               {isViewOnly && (
                 <span className="mt-4 inline-block px-4 py-1 bg-blue-50 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                   Read Only View
                 </span>
               )}
            </div>

            {!isViewOnly && (
              <div className="bg-white rounded-[2.5rem] p-6 shadow-neu-flat border border-white space-y-2">
                 <button className="w-full flex items-center gap-4 px-6 py-4 rounded-3xl bg-gray-50 text-[#ff6b00] shadow-neu-pressed font-black transition-all text-sm uppercase tracking-widest">
                    <Settings className="w-5 h-5" /> Edit Profile
                 </button>
                 <button 
                   onClick={() => window.location.href = '/login'} // Mock logout for demo
                   className="w-full flex items-center gap-4 px-6 py-4 rounded-3xl hover:bg-gray-50 text-red-500 font-bold transition-all text-sm uppercase tracking-widest mt-4"
                 >
                    <LogOut className="w-5 h-5" /> Logout
                 </button>
              </div>
            )}
          </div>

          {/* Main Area */}
          <div className="lg:col-span-2 space-y-8">
             <div className="bg-white rounded-[3.5rem] p-8 md:p-12 shadow-neu-flat border border-white">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Profile Details</h3>
                  {!isViewOnly && (
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center gap-2 bg-[#ff6b00] text-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#e66000] transition-colors shadow-md active:scale-95"
                    >
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
                    </button>
                  )}
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                   {/* Personal Info */}
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Title</label>
                     <select 
                       name="title" 
                       value={profileData.title || ''} 
                       onChange={handleChange} 
                       disabled={isViewOnly}
                       className="w-full bg-gray-50 text-gray-900 rounded-full px-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm appearance-none"
                     >
                       <option value="">Select</option>
                       {titles.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                     </select>
                   </div>
                   
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Phone Number</label>
                     <input 
                       type="text" 
                       name="phone_number" 
                       value={profileData.phone_number || ''} 
                       onChange={handleChange} 
                       disabled={isViewOnly}
                       className="w-full bg-gray-50 text-gray-900 rounded-full px-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                     />
                   </div>

                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">First Name</label>
                     <input 
                       type="text" 
                       name="first_name" 
                       value={profileData.first_name || ''} 
                       onChange={handleChange} 
                       disabled={isViewOnly}
                       className="w-full bg-gray-50 text-gray-900 rounded-full px-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                     />
                   </div>
                   
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Last Name</label>
                     <input 
                       type="text" 
                       name="last_name" 
                       value={profileData.last_name || ''} 
                       onChange={handleChange} 
                       disabled={isViewOnly}
                       className="w-full bg-gray-50 text-gray-900 rounded-full px-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                     />
                   </div>

                   {/* Professional Info */}
                   <div className="space-y-2 md:col-span-2 mt-4">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Institute / College</label>
                     <input 
                       type="text" 
                       name="institute" 
                       value={profileData.institute || ''} 
                       onChange={handleChange} 
                       disabled={isViewOnly}
                       className="w-full bg-gray-50 text-gray-900 rounded-full px-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                     />
                   </div>

                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Department</label>
                     <select 
                       name="department" 
                       value={profileData.department || ''} 
                       onChange={handleChange} 
                       disabled={isViewOnly}
                       className="w-full bg-gray-50 text-gray-900 rounded-full px-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm appearance-none"
                     >
                       {departments.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                     </select>
                   </div>
                   
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Location</label>
                     <input 
                       type="text" 
                       name="location" 
                       value={profileData.location || ''} 
                       onChange={handleChange} 
                       disabled={isViewOnly}
                       className="w-full bg-gray-50 text-gray-900 rounded-full px-6 py-4 shadow-neu-pressed border-none outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all font-bold text-sm"
                     />
                   </div>
                </div>
             </div>

             {/* Workshops Section */}
             <div className="bg-white rounded-[3.5rem] p-8 md:p-12 shadow-neu-flat border border-white">
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-8 pb-4 border-b border-gray-100">Associated Workshops</h3>
                
                {workshops.length === 0 ? (
                  <p className="text-gray-400 font-medium text-center py-8">No workshops scheduled yet.</p>
                ) : (
                  <div className="space-y-6">
                    {workshops.map(ws => (
                      <div key={ws.id} className="p-6 bg-gray-50 rounded-[2rem] shadow-neu-flat border border-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h4 className="font-black text-gray-900 uppercase">{ws.workshop_type_name}</h4>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Date: {ws.date}</p>
                        </div>
                        <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${ws.status === 0 ? 'bg-orange-100 text-orange-600' : ws.status === 1 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {ws.status === 0 ? 'Pending' : ws.status === 1 ? 'Accepted' : 'Cancelled'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
      
      {/* Required AnimatePresence if not rendered in App.js directly but needed for Toast wrapper */}
    </motion.div>
  );
};

export default ProfilePage;
