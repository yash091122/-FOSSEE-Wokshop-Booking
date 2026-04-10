import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedNavLink = ({ to, children }) => {
  const defaultTextColor = 'text-gray-500';
  const hoverTextColor = 'text-black';
  const textSizeClass = 'text-xs font-bold tracking-widest';

  return (
    <Link to={to} className={`group relative inline-block overflow-hidden h-4 flex items-center ${textSizeClass}`}>
      <div className="flex flex-col transition-transform duration-500 ease-out transform group-hover:-translate-y-1/2">
        <span className={`${defaultTextColor} h-4 flex items-center`}>{children}</span>
        <span className={`${hoverTextColor} h-4 flex items-center`}>{children}</span>
      </div>
    </Link>
  );
};

const Navbar = ({ isAuthenticated, userFullName, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [headerShapeClass, setHeaderShapeClass] = useState('rounded-full');
  const shapeTimeoutRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current);
    }

    if (isOpen) {
      setHeaderShapeClass('rounded-2xl');
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass('rounded-full');
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const navLinksData = [
    { label: 'HOME', to: '/' },
    { label: 'WORKSHOPS', to: '/workshops' },
  ];

  const loginButtonElement = isAuthenticated ? (
    <button onClick={onLogout} className="px-5 py-2 text-xs border border-gray-200 bg-white text-gray-500 rounded-full hover:border-red-400 hover:text-red-500 transition-colors duration-200 w-full sm:w-auto text-center font-bold tracking-widest shadow-sm cursor-pointer">
      LOGOUT
    </button>
  ) : (
    <Link to="/login" state={{ isRegister: false }} className="px-5 py-2 text-xs border border-gray-200 bg-white text-gray-500 rounded-full hover:border-[#ff6b00]/50 hover:text-[#ff6b00] transition-colors duration-200 w-full sm:w-auto text-center font-bold tracking-widest shadow-sm">
      LOGIN
    </Link>
  );

  const primaryButtonElement = (
    <div className="relative group w-full sm:w-auto">
       <div className="absolute inset-0 -m-1 rounded-full bg-[#ff6b00] opacity-10 filter blur-lg pointer-events-none transition-all duration-300 ease-out group-hover:opacity-30 group-hover:blur-xl group-hover:-m-2"></div>
       <Link to={isAuthenticated ? "/profile" : "/login"} state={!isAuthenticated ? { isRegister: true } : undefined} className="relative z-10 px-6 py-2 text-xs font-black text-white bg-gradient-to-br from-[#ff6b00] to-orange-500 rounded-full hover:from-orange-500 hover:to-orange-600 transition-all duration-200 w-full sm:w-auto text-center block tracking-widest uppercase shadow-md shadow-orange-500/20">
         {isAuthenticated ? userFullName : "JOIN US"}
       </Link>
    </div>
  );

  return (
    <header className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50
                       flex flex-col items-center
                       pl-6 pr-6 py-3 backdrop-blur-md
                       ${headerShapeClass}
                       border border-white/50 bg-white/70
                       w-[calc(100%-2rem)] sm:w-auto
                       transition-[border-radius] duration-300 ease-in-out shadow-lg shadow-gray-200/50`}>

      <div className="flex items-center justify-between w-full gap-x-8 sm:gap-x-10 text-gray-900">
        <div className="flex items-center">
           <Link to="/" className="flex items-center gap-2">
              <img src="/favicon.png" alt="FOSSEE Logo" className="h-7 w-auto" />
              <span className="font-black text-lg tracking-tighter text-gray-900">
                FOSSEE<span className="text-[#ff6b00]">.</span>
              </span>
           </Link>
        </div>

        <nav className="hidden sm:flex items-center space-x-8 uppercase">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.to} to={link.to}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-4">
          {loginButtonElement}
          {primaryButtonElement}
        </div>

        <button className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-600 focus:outline-none" onClick={toggleMenu} aria-label={isOpen ? 'Close Menu' : 'Open Menu'}>
          {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden flex flex-col items-center w-full overflow-hidden"
          >
            <nav className="flex flex-col items-center space-y-5 text-sm w-full pt-8 font-bold tracking-widest uppercase">
              {navLinksData.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-[#ff6b00] transition-all w-full text-center">
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col items-center space-y-4 mt-8 w-full pb-4">
              {loginButtonElement}
              {primaryButtonElement}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
