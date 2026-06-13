import React from "react";

const Hero = () => {
    return  (
        <section id="#" className="w-full min-h-screen bg-brand-black flex items-center justify-between px-8 md:px-20 pt-28 pb-12 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-2-7xl mx-auto items-center">
                <div className="flex flex-col items-start gap-6 max-w-xl">
                    <div className="flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/20 px-4 py-1.5 rounded-full text-brand-orange text-sm font-semibold tracking-wide animate-pulse">
                    ⚡Delivery in a Flash
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
                        Fast Delivery. <br />
                        <span className="text-brand-orange">Easy Booking.</span> <br />
                        Smart Rewards.
                    </h1>

                    <p className="text-brand-gray text-base md:text-lg font-medium leading-relaxed">
                        Order food, send packages, and book airport transfers - all in one app with real-time tracking and exclusive rewards.
                    </p>
                    
                    <div className="w-full flex flex-col sm:flex-row gap-3 bg-brand-dark p-2 rounded-2xl border border-white/5 shadow-2xl mt-4">
                        <div className="flex items-center gap-3 px-3 flex-1">
                            <span className="text-brand-gray text-lg">🔍</span>
                            <input 
                            type="text" 
                            placeholder="Search restaurants, food, or services..." 
                            className="w-full bg-transparent text-white placeholder-brand-grey text-sm focus:outline-none"
                             />
                        </div>
                        <button className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 cursor-pointer shadow-lg shadow-brand-orange/20">
                            Search
                        </button>
                    </div>

                </div>

                <div className="w-full h-100 md:h-137.5 bg-brand-dark/40 border border-white/5 rounded-3xl relative group overflow-hidden shadow-2xl">
  
                    <video 
                        src="/vid.mp4" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-brand-black/40 to-transparent pointer-events-none" />
                </div>

            </div>
        </section>
    );
};

export default Hero;