import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuLinks = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "Restaurants", href: "#restaurants" },
    { name: "Shop", href: "#shop" },
    { name: "Pick & Drop", href: "#pick-drop" },
    { name: "How It Works", href: "#how-it-works"},
    { name: "FAQ", href: "#faq"}
  ];

  return (
    <>
      {/* MAIN NAVBAR CONTAINER */}
      <nav className="w-full h-20 bg-brand-black/80 backdrop-blur-md border-b border-white/5 px-6 md:px-20 flex items-center justify-between fixed top-0 left-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-transparent flex items-center justify-center overflow-hidden">
            <img 
              src="/mappia-new-logo.png"
              alt="SmartMappia Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <a href="#">
          <span className="text-xl font-black tracking-tight text-white cursor-pointer">
            Smart <span className="text-brand-orange">Mappia</span>
          </span>
          </a>
        </div>

        {/* MENU LINKS (Hidden on Mobile, Visible on Desktop) */}
        <ul className="hidden md:flex items-center gap-10 text-sm font-medium">
          {menuLinks.map((link, index) => (
            <li key={index} className="text-brand-grey cursor-pointer hover:text-white transition-colors duration-200">
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
        </ul>

        {/* DOWNLOAD BUTTON (Hidden on Mobile, Visible on Desktop) */}
        <div className="hidden md:block">
          <button className="bg-brand-orange hover:bg-brand-orange/90 text-white text-xs font-black px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer">
            Download App
          </button>
        </div>

        {/* 4. MOBILE HAMBURGER BUTTON (Visible on Mobile, Hidden on Desktop) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="block md:hidden text-white focus:outline-none z-50 cursor-pointer p-2"
        >
          {/* Dynamic icon switch base sa open/close state */}
          {isOpen ? (
            <span className="text-2xl font-bold">✕</span>
          ) : (
            <div className="space-y-1.5 w-6">
              <span className="block h-0.5 w-full bg-white rounded-full"></span>
              <span className="block h-0.5 w-full bg-white rounded-full"></span>
              <span className="block h-0.5 w-full bg-white rounded-full"></span>
            </div>
          )}
        </button>
      </nav>

      {/* 5. FRAMER MOTION MOBILE SIDEBAR (AnimatePresence catches unmounting transitions) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Transparent Backdrop Blur overlay effect */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)} 
              className="fixed inset-0 bg-brand-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Actual Sliding Sidebar Panel */}
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }}       
              exit={{ x: "100%" }}     
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-70 bg-brand-dark border-l border-white/5 p-8 pt-28 z-45 md:hidden flex flex-col justify-between"
            >
              {/* Mobile Sidebar Links List Frame */}
              <ul className="flex flex-col gap-6 text-lg font-bold">
                {menuLinks.map((link, index) => (
                  <motion.li 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }} 
                    key={index} 
                    className="text-brand-grey hover:text-brand-orange transition-colors"
                  >
                    <a 
                      href={link.href}
                      onClick={() => setIsOpen(false)} 
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom Action Section template button copy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full"
              >
                <button className="w-full bg-brand-orange text-white font-black py-4 rounded-xl text-center text-sm shadow-lg shadow-brand-orange/20 cursor-pointer">
                  Download App
                </button>
              </motion.div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;