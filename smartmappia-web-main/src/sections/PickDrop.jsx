import React, { useState } from "react";
import {motion, useTime} from "framer-motion";

const PickDrop = () => {
    
    const [serviceType, setServiceType] = useState('to-airport');
    const [airport, setAirport] = useState('Domestic Airport');
    const [district, setDistrict] = useState('Olaya');

    const currentPrice = airport.includes('International') ? 100 : 80;

    const districts = ["Malaz", "Sulamania", "Olaya", "Batha"];
    const airports = ["Riyadh - International Airport", "Domestic Airport"];

    return (
        <section id="pick-drop" className="w-full bg-brand-dark/10 px-8 md:px-20 py-24 border-t border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    >
                    <span className="text-brand-orange text-sm font-bold tracking-widest uppercase">Premium Airport Transfer</span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mt-4 leading-tight">
                        Reliable Airport <br />Pick & Drop Service.
                    </h2>
                    <p className="text-brand-grey text-base md:text-lg mt-6 leading-relaxed">
                        Eliminate airport travel stress. SmartMappia delivers secure, punctual airport transfer services within Riyadh. Experience a seamless ride from your doorstep directly to the terminal, or get picked up right as you land.
                    </p>

                    {/* List of Documents */}
                    <div className="mt-8 space-y-4">
                        <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-xs">✓</span>
                        <span className="text-white font-medium">Covering top Riyadh districts (Olaya, Sulamania, Malaz, Batha)</span>
                        </div>
                        <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-xs">✓</span>
                        <span className="text-white font-medium">Fixed and transparent rates per trip (No hidden charges)</span>
                        </div>
                        <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-xs">✓</span>
                        <span className="text-white font-medium">24/7 Driver & User Secure App Access Authentication</span>
                        </div>
                    </div>
                </motion.div>

                {/* The Interactive Booking Box Widget */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-brand-black border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                    >
                    <h3 className="text-xl font-black text-white mb-6 tracking-tight">Fare Estimator Simulator</h3>
                    
                    {/* Toggle Button for Service Type */}
                    <div className="grid grid-cols-2 gap-2 bg-brand-dark p-1.5 rounded-xl border border-white/5 mb-6">
                        <button 
                        onClick={() => setServiceType('to-airport')}
                        className={`py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer ${serviceType === 'to-airport' ? 'bg-brand-orange text-white' : 'text-brand-grey hover:text-white'}`}
                        >
                        🏠 House ➔ ✈️ Airport
                        </button>
                        <button 
                        onClick={() => setServiceType('from-airport')}
                        className={`py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer ${serviceType === 'from-airport' ? 'bg-brand-orange text-white' : 'text-brand-grey hover:text-white'}`}
                        >
                        ✈️ Airport ➔ 🏠 House
                        </button>
                    </div>

                    <div className="space-y-5">
                        {/* Select Airport */}
                        <div>
                        <label className="text-xs font-bold text-brand-grey uppercase tracking-wider block mb-2">Select Airport Terminal</label>
                        <select 
                            value={airport}
                            onChange={(e) => setAirport(e.target.value)}
                            className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-orange transition-colors cursor-pointer"
                        >
                            {airports.map((ap, i) => (
                            <option key={i} value={ap}>{ap}</option>
                            ))}
                        </select>
                        </div>

                        {/* Select District */}
                        <div>
                        <label className="text-xs font-bold text-brand-grey uppercase tracking-wider block mb-2">Select Your Riyadh District</label>
                        <select 
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-orange transition-colors cursor-pointer"
                        >
                            {districts.map((dist, i) => (
                            <option key={i} value={dist}>{dist} District</option>
                            ))}
                        </select>
                        </div>
                    </div>

                    {/* Pricing Display Area based on doc rules */}
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                        <div>
                        <span className="text-xs font-bold text-brand-grey uppercase tracking-wider block">Estimated Rate</span>
                        <span className="text-sm text-brand-grey">Per Single Trip</span>
                        </div>
                        <div className="text-right">
                        <motion.span 
                            key={currentPrice} 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl font-black text-brand-orange block"
                        >
                            SAR {currentPrice}
                        </motion.span>
                        </div>
                    </div>

                    <button className="w-full bg-white hover:bg-gray-200 text-brand-black font-black py-4 rounded-xl mt-6 transition-all duration-300 shadow-xl text-center text-sm cursor-pointer">
                        Book Ride via App
                    </button>
                </motion.div>

            </div>
        </section>
    );
};

export default PickDrop;