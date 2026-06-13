import React from 'react';
import { motion } from 'framer-motion'; 
import LogoGrid from './Logo';

const Services = () => {
  const servicesData = [
    {
      id: 1,
      icon: "🍔",
      title: "Food Delivery",
      desc: "Order from the best local restaurants and fast food chains with lightning-fast delivery to your doorstep.",
      tag: "Popular",
      link: "#restaurants"
    },
    {
      id: 2,
      icon: "🛍️",
      title: "E-Commerce Shop",
      desc: "Browse trending products, daily essentials, and tech gadgets. Seamless shopping experience guaranteed.",
      tag: "New",
      link: "#shop"
    },
    {
      id: 3,
      icon: "✈️",
      title: "Pick & Drop",
      desc: "Hassle-free airport transfers. Book a reliable ride from your house straight to the airport, or from the airport back to your home.",
      tag: "Premium",
      link: "#pick-drop"
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, 
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2, 
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="features" className="w-full bg-brand-black px-8 md:px-20 py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Fade In Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left mb-16 max-w-2xl"
        >
          <span className="text-brand-orange text-sm font-bold tracking-widest uppercase">Our Core Services</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mt-2 leading-tight">
            Everything you need, <br className="hidden md:block" />
            all in <span className="text-brand-orange">one smart app.</span>
          </h2>
        </motion.div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div 
              key={service.id}
              custom={index} 
              variants={cardVariants}
              initial="hidden"
              whileInView="visible" 
              viewport={{ once: true, margin: "-50px" }} 
              className="bg-brand-dark/50 border border-white/5 rounded-3xl p-8 flex flex-col items-start justify-between relative group overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-brand-orange/30 hover:shadow-2xl hover:shadow-brand-orange/5 cursor-pointer"
            >
              {/* Corner Glow Effect */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/10 rounded-bl-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                {/* Header Icon & Tag */}
                <div className="w-full flex justify-between items-center mb-6">
                  <div className="w-14 h-14 bg-brand-black border border-white/10 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-brand-orange/10 group-hover:border-brand-orange/20 transition-all duration-300">
                    {service.icon}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-white/5 border border-white/10 rounded-full text-brand-grey group-hover:text-brand-orange group-hover:border-brand-orange/20 transition-colors">
                    {service.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-white mb-3 tracking-tight group-hover:text-brand-orange transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-brand-grey text-sm leading-relaxed mb-8 font-medium">
                  {service.desc}
                </p>
              </div>

              {/* Action Link */}
              <a href={service.link} className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-brand-orange transition-colors mt-auto">
                <span >Explore Service</span>
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">➔</span>
              </a>

            </motion.div>
          ))}
        </div>

      </div>
      <LogoGrid />
    </section>
  );
};

export default Services;