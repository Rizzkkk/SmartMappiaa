import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section id="about" className="py-24 px-8 md:px-20 bg-brand-black text-white">
        <div className="max-w-6xl mx-auto">
            <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
            >
            <h3 className="text-brand-orange text-sm font-bold tracking-widest uppercase mb-3">About Us</h3>
            <h2 className="text-3xl md:text-5xl font-black">Who We Are</h2>
        </motion.div>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6">Empowering <span className="text-brand-orange">Riyadh's</span> Daily Rhythm.</h2>
          <p className="text-brand-grey text-lg leading-relaxed">
            SmartMappia was built on a simple vision: to bridge the gap between busy urban life and seamless service accessibility. We are more than just an app; we are your digital partner in food, delivery, and transport.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="border border-white/10 p-8 rounded-3xl bg-brand-dark/30"
        >
          <div className="text-brand-orange font-bold text-sm uppercase tracking-widest mb-4">Our Mission</div>
          <p className="italic text-xl">"To make every transaction in Riyadh effortless, secure, and instant for everyone."</p>
        </motion.div>
        
        </div>
      </div>
    </section>
  );
};

export default AboutUs;