import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Code, BookOpen, Users, ChevronRight, Star } from 'lucide-react';

const HomePage = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="min-h-screen bg-transparent text-white overflow-hidden relative">
      
      {/* Background Soft Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#ff6b00]/20 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, -45, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-white/5 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"
      />

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="flex flex-col text-left"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#121212] border border-white/10 backdrop-blur-md w-max mb-6 shadow-neu-flat">
              <span className="flex h-2 w-2 rounded-full bg-[#ff6b00] animate-pulse shadow-[0_0_10px_#ff6b00]"></span>
              <span className="text-sm font-bold tracking-widest text-[#ff6b00]">NEW WORKSHOPS AWAIT</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] mb-6 text-white drop-shadow-md">
              MASTER <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b00] to-orange-400 drop-shadow-sm">
                TECHNOLOGY
              </span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg sm:text-xl text-gray-400 mb-10 max-w-xl font-medium leading-relaxed">
              Elevate your skills with FOSSEE's premium workshops. Learn directly from industry experts through immersive, hands-on, and interactive sessions.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6">
              <Link to="/workshops" className="group relative px-8 py-4 rounded-full bg-[#ff6b00] text-black font-black text-lg text-center overflow-hidden shadow-[0_8px_20px_rgba(255,107,0,0.3)] hover:shadow-[0_12px_25px_rgba(255,107,0,0.5)] active:scale-95 transition-all duration-300">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  START LEARNING <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-12 group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
              </Link>
              <button className="px-8 py-4 rounded-full bg-[#121212] border border-white/5 text-white font-bold text-lg hover:text-[#ff6b00] shadow-neu-flat active:shadow-neu-pressed transition-all flex items-center justify-center gap-3">
                <Play className="w-5 h-5 text-[#ff6b00]" /> Watch Demo
              </button>
            </motion.div>
            
            <motion.div variants={fadeUp} className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`w-12 h-12 rounded-full border-4 border-[#0f0f0f] bg-[#121212] flex items-center justify-center shadow-neu-flat relative z-[${10-i}]`}>
                     <span className="text-lg">👤</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-[#ff6b00]">
                  <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-sm text-gray-400 font-bold mt-1">Trusted by 10,000+ Students</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Floating Neumorphic/Glass Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
            className="hidden lg:block relative perspective-1000"
          >
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="bg-[#121212]/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 shadow-neu-hover relative overflow-hidden transform-gpu"
            >
              
              <div className="w-full h-48 rounded-3xl bg-[#0f0f0f] shadow-neu-pressed mb-8 relative overflow-hidden flex items-center justify-center border border-white/5">
                <h3 className="text-3xl font-black text-gray-800 drop-shadow-sm uppercase tracking-widest absolute">Preview</h3>
                <div className="p-6 h-full w-full flex flex-col justify-end relative z-10 bg-gradient-to-t from-[#ff6b00]/80 to-transparent">
                  <span className="px-4 py-1.5 bg-black/50 backdrop-blur-md shadow-xl rounded-full text-white border border-white/20 text-[10px] font-black w-max mb-3 uppercase tracking-widest">Featured Course</span>
                  <h3 className="text-2xl font-black text-white leading-tight drop-shadow-md">Advanced React & Django</h3>
                </div>
              </div>
              
              <div className="space-y-5">
                <div className="flex justify-between items-center bg-[#121212] p-5 rounded-[1.5rem] shadow-neu-flat border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#0f0f0f] shadow-neu-pressed flex items-center justify-center border border-white/5">
                      <Code className="w-5 h-5 text-[#ff6b00]" />
                    </div>
                    <div>
                      <p className="font-black text-white text-sm">Interactive Syllabus</p>
                      <p className="text-xs text-gray-500 font-semibold mt-1">14 In-depth Modules</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-[#121212] p-5 rounded-[1.5rem] shadow-neu-flat border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#0f0f0f] shadow-neu-pressed flex items-center justify-center border border-white/5">
                      <Users className="w-5 h-5 text-[#ff6b00]" />
                    </div>
                    <div>
                      <p className="font-black text-white text-sm">Expert Instructors</p>
                      <p className="text-xs text-gray-500 font-semibold mt-1">FOSSEE Core Team</p>
                    </div>
                  </div>
                  <button className="px-5 py-2.5 bg-[#ff6b00] text-black shadow-[0_4px_10px_rgba(255,107,0,0.3)] text-xs font-black rounded-full active:scale-95 transition-transform uppercase tracking-wider">Enroll</button>
                </div>
              </div>
            </motion.div>
            
            {/* Floating Badges */}
            <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-12 top-20 bg-[#121212] p-5 rounded-2xl shadow-neu-flat border border-white/10 flex items-center gap-4 hidden sm:flex">
              <div className="w-10 h-10 shadow-neu-pressed rounded-full flex items-center justify-center font-bold text-gray-400 border border-white/5">P</div>
              <p className="font-black text-sm text-white">Python Labs</p>
            </motion.div>
            <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-6 bottom-20 bg-[#121212] p-5 rounded-2xl shadow-neu-flat border border-white/10 flex items-center gap-4 hidden sm:flex">
              <div className="w-10 h-10 bg-[#ff6b00] rounded-full flex items-center justify-center font-bold text-black text-lg shadow-lg">✦</div>
              <p className="font-black text-sm text-white">Certificate</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section with Neumorphic Blocks */}
      <div className="relative z-10 py-16 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Workshops Conducted" },
              { value: "2M+", label: "Lines of Code" },
              { value: "50+", label: "Expert Instructors" },
              { value: "99%", label: "Success Rate" }
            ].map((stat, i) => (
              <div key={i} className="p-8 rounded-[2rem] shadow-neu-flat text-center bg-[#121212] border border-white/5">
                <h4 className="text-4xl md:text-5xl font-black text-[#ff6b00] mb-3 drop-shadow-sm">{stat.value}</h4>
                <p className="text-xs font-black text-gray-500 tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-5 uppercase tracking-tighter text-white drop-shadow-sm">Explore By <span className="text-[#ff6b00]">Domain</span></h2>
          <p className="text-gray-400 font-medium text-lg max-w-2xl mx-auto">Dive into specialized technologies shaping the future of engineering.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: "ENGINEERING", icon: <Code className="w-8 h-8" />, desc: "Master software architecture, hardware systems, and scalable application deployment." },
            { title: "SCIENCES", icon: <BookOpen className="w-8 h-8" />, desc: "Deep dive into computational physics, chemistry modeling, and empirical data analysis." },
            { title: "MATHEMATICS", icon: <Play className="w-8 h-8" />, desc: "Advanced mathematical computing, algorithm design, and statistical foundations." }
          ].map((cat, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="bg-[#121212] rounded-[2.5rem] p-10 shadow-neu-flat hover:shadow-neu-hover transition-all duration-300 group cursor-pointer border border-white/5"
            >
              <div className="w-20 h-20 rounded-[1.5rem] bg-[#0f0f0f] shadow-neu-pressed text-[#ff6b00] border border-white/5 flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform duration-500">
                {cat.icon}
              </div>
              <h3 className="text-2xl font-black tracking-tighter mb-4 text-center text-white">{cat.title}</h3>
              <p className="text-gray-400 text-sm font-medium leading-relaxed text-center">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
