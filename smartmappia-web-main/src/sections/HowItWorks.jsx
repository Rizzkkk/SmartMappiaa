import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('customer');

  const stepsData = {
    customer: [
      { step: "01", title: "Secure Login", desc: "Access the platform securely using your unique User ID and Password authentication." },
      { step: "02", title: "Select Service", desc: "Choose from Food Delivery, E-Commerce Shop, or book an Airport Pick & Drop ride." },
      { step: "03", title: "Track & Receive", desc: "Monitor your driver or delivery rider via real-time GPS straight to your Riyadh district." }
    ],
    rider: [
      { step: "01", title: "Driver Access", desc: "Log in securely to your Driver Profile using your verified ID credentials and password." },
      { step: "02", title: "Accept Requests", desc: "Receive immediate notifications for nearby package deliveries, food orders, or airport trips." },
      { step: "03", title: "Deliver & Earn", desc: "Navigate effortlessly using built-in maps and collect your earnings per single trip standard rates." }
    ],
    restaurant: [
      { step: "01", title: "Partner Portal", desc: "Access your restaurant dashboard securely to manage your daily active digital store branch." },
      { step: "02", title: "Prepare Orders", desc: "Receive instant notifications for food delivery orders and start preparing fresh meals." },
      { step: "03", title: "Handover to Rider", desc: "Assign orders seamlessly to incoming SmartMappia riders for lightning-fast delivery." }
    ]
  };

  const tabs = [
    { id: 'customer', label: '👤 For Customers', color: 'bg-brand-orange' },
    { id: 'rider', label: '🚗 For Riders', color: 'bg-white' },
    { id: 'restaurant', label: '🍔 For Restaurants', color: 'bg-brand-orange' }
  ];

  return (
    <section id="how-it-works" className="w-full bg-brand-black px-8 md:px-20 py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-orange text-sm font-bold tracking-widest uppercase">Platform Guide</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mt-2">
            How SmartMappia Works.
          </h2>
          <p className="text-brand-grey text-base mt-4 font-medium">
            One powerful ecosystem. Three custom tailored experiences. Select a role below to see how our secure platform operates seamlessly for everyone.
          </p>
        </div>

        {/* INTERACTIVE ROLE SWITCHER TABS */}
        <div className="flex justify-center items-center gap-3 bg-brand-dark/60 border border-white/5 p-2 rounded-2xl max-w-xl mx-auto mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-xl text-xs md:text-sm font-black tracking-tight transition-all relative cursor-pointer ${
                activeTab === tab.id ? 'text-brand-black' : 'text-brand-grey hover:text-white'
              }`}
            >
              {/* Dynamic sliding background panel element via Framer Motion */}
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className={`absolute inset-0 rounded-xl z-0 ${tab.id === 'rider' ? 'bg-white' : 'bg-brand-orange'}`}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ANIMATED STEP CARDS CONTAINER FRAME */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-70">
          <AnimatePresence mode="wait">
            {stepsData[activeTab].map((item, index) => (
              <motion.div
                key={`${activeTab}-${index}`} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-brand-dark/30 border border-white/5 p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between group hover:border-white/10 transition-colors cursor-pointer"
              >
                <div>
                  {/* Step Large Number Badge Display */}
                  <span className={`text-4xl font-black block tracking-tighter mb-6 ${activeTab === 'rider' ? 'text-white/20 group-hover:text-white/90' : 'text-brand-orange/20 group-hover:text-brand-orange/90'} transition-colors`}>
                    {item.step}
                  </span>
                  <h3 className="text-xl font-black text-white mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-brand-grey text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
                
                {/* Accent indicator strip element animation framework */}
                <div className={`w-12 h-1 rounded-full mt-8 ${activeTab === 'rider' ? 'bg-white/40' : 'bg-brand-orange/40'}`} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
            {/* VIDEO & DIAGRAM SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-2 gap-8"
        >
          {/* Instruction Text Container */}
          <div className="bg-brand-dark/30 border border-white/5 rounded-3xl p-8 flex flex-col justify-center">
            <h4 className="text-white font-black text-2xl mb-6">Quick Start Guide</h4>
            <div className="space-y-6">
              {[
                { title: "Verification", text: "Ensure your mobile number is verified to receive OTP codes instantly." },
                { title: "Permissions", text: "Grant location access for real-time tracking and delivery accuracy." },
                { title: "Profile Setup", text: "Complete your profile details to unlock all platform features seamlessly." }
              ].map((instr, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="text-white font-bold">{instr.title}</h5>
                    <p className="text-brand-grey text-sm">{instr.text}</p>
                  </div>
                </div>
              ))}
            </div>
  </div>

          {/* Diagram / Instruction Layout */}
          <div className="bg-brand-dark/30 border border-white/5 rounded-3xl p-8 flex flex-col justify-center">
            <h4 className="text-white font-black mb-4">Platform Workflow Diagram</h4>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
              {/* Dito mo ilagay ang image diagram mo */}
              <img src="/flow.png" alt="How to Log In Diagram" className="w-full h-auto max-h-125 object-contain rounded-lg" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;