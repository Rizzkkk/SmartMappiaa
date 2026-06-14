import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Info,
  Sparkles,
  Lightbulb,
  UtensilsCrossed,
  ShoppingBag,
  Package,
  HelpCircle,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const menuLinks = [
    { name: "Home",         href: "#home",         Icon: Home },
    { name: "About",        href: "#about",        Icon: Info },
    { name: "Features",     href: "#features",     Icon: Sparkles },
    { name: "How It Works", href: "#how-it-works", Icon: Lightbulb },
    { name: "Restaurants",  href: "#restaurants",  Icon: UtensilsCrossed },
    { name: "Shop",         href: "#shop",         Icon: ShoppingBag },
    { name: "Pick & Drop",  href: "#pick-drop",    Icon: Package },
    { name: "FAQ",          href: "#faq",          Icon: HelpCircle },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* ── Desktop / Tablet Navbar ────────────────────────────────────── */}
      <motion.nav
        animate={{
          backgroundColor: scrolled
            ? "rgba(255,255,255,0.97)"
            : "rgba(255,255,255,0.80)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(249,115,22,0.10), 0 2px 8px rgba(0,0,0,0.06)"
            : "0 2px 4px rgba(0,0,0,0.04)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full h-20 border-b border-brand-border
                   px-6 md:px-20 flex items-center justify-between
                   fixed top-0 left-0 z-50"
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ type: "spring", stiffness: 320, damping: 14 }}
            className="w-12 h-12 flex items-center justify-center overflow-hidden"
          >
            <img
              src="/mappia-new-logo.png"
              alt="SmartMappia Logo"
              className="w-full h-full object-contain"
            />
          </motion.div>
          <span className="text-xl font-black tracking-tight text-brand-black">
            Smart <span className="text-brand-orange">Mappia</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-0.5 text-sm font-semibold">
          {menuLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                onMouseEnter={() => setHoveredLink(index)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative flex items-center px-4 py-2 rounded-full
                           text-brand-grey hover:text-brand-orange
                           transition-colors duration-150"
              >
                {/* Floating pill highlight — slides between links */}
                {hoveredLink === index && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-orange-50 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="bg-brand-orange text-white text-xs font-black
                       px-6 py-3 rounded-full cursor-pointer
                       shadow-md shadow-brand-orange/25
                       hover:shadow-xl hover:shadow-brand-orange/30
                       transition-shadow duration-300"
          >
            Download App
          </motion.button>
        </div>

        {/* Mobile Hamburger → X */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="block md:hidden focus:outline-none z-50 cursor-pointer
                     p-2 rounded-xl hover:bg-orange-50 transition-colors"
        >
          <div className="w-6 h-[18px] flex flex-col justify-between">
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="block h-0.5 w-full bg-brand-dark rounded-full"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.18 }}
              className="block h-0.5 w-full bg-brand-dark rounded-full"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="block h-0.5 w-full bg-brand-dark rounded-full"
            />
          </div>
        </button>
      </motion.nav>

      {/* ── Mobile Slide-in Panel ──────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 z-40 md:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
              style={{ willChange: "transform" }}
              className="fixed top-0 right-0 h-full w-72 bg-white
                         rounded-l-3xl z-45 md:hidden
                         flex flex-col justify-between shadow-2xl overflow-hidden"
            >
              {/* Warm orange accent strip at top */}
              <div className="absolute top-0 left-0 right-0 h-1
                              bg-gradient-to-r from-brand-orange/50 to-brand-orange
                              rounded-tl-3xl" />

              {/* Nav Links */}
              <div className="pt-28 px-6">
                <ul className="flex flex-col gap-0.5">
                  {menuLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl
                                   text-brand-grey hover:text-brand-orange
                                   hover:bg-orange-50 transition-all duration-150
                                   font-semibold text-base group"
                      >
                        <link.Icon className="w-5 h-5 text-brand-orange shrink-0" strokeWidth={2} />
                        <span>{link.name}</span>
                        <span className="ml-auto text-brand-orange text-sm
                                         opacity-0 group-hover:opacity-100
                                         transition-opacity duration-150">
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
                className="p-6"
              >
                <button
                  className="w-full bg-brand-orange text-white font-black
                             py-4 rounded-2xl text-sm cursor-pointer
                             shadow-lg shadow-brand-orange/25
                             active:scale-[0.97] transition-transform duration-150"
                >
                  Download App
                </button>
                <p className="text-center text-xs text-brand-grey mt-3 font-medium">
                  Available on iOS &amp; Android
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
