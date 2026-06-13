import React from "react";
import {motion} from "framer-motion";

const Shop = () => {
    
    const categories = [
    "📱 Electronics", 
    "🛒 Groceries", 
    "👗 Fashion", 
    "💊 Pharmacy", 
    "💄 Beauty", 
    "🎁 Gifts"
    ];

    return (
        <section id="shop" className="w-full bg-brand-black px-8 md:px-20 py-24 border-t border-white/5 overflow-hidde">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="relative w-full h-50px rounded-3xl overflow-hidden group border border-white/10 shadow-2xl"
                >
                    <img 
                    src="/sony.png" 
                    alt="SmartMappia E-Commerce" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"/>

                    <div className="absolute inset-0 bg-linear-to-t from-brand-black via-brand-black/40 to-transparent"></div>

                    <div className="absolute bottom-8 left-8 right-8 bg-brand-dark/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-white font-bold text-lg">Sony Premium Headphones</h4>
                            <p className="text-brand-orange font-black mt-1">SAR 1,299</p> 
                        </div>
                        <button className="bg-brand-orange hover:bg-brand-orange/80 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-brand-orange/20 cursor-pointer">
                            Buy Now
                        </button>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                    <span className="text-brand-orange text-sm font-bold tracking-widest uppercase">SmartMappia E-commerce</span>
                    
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mt-4 leading-tight">
                        Shop anything. <br /> Delivered in <span className="text-brand-orange">minutes.</span>
                    </h2>
                    
                    <p className="text-brand-grey text-base md:text-lg mt-6 leading-relaxed">
                        Why wait days for your orders? With our integrated e-commerce platform, you can browse thousands of products from top local and international brands. From the latest tech gadgets to your daily essentials, get it straight to your door with real-time GPS tracking.
                    </p>

                    {/* Interactive Category Pills */}
                    <div className="mt-10">
                        <h4 className="text-white font-bold mb-4">Trending Categories:</h4>
                        <div className="flex flex-wrap gap-3">
                        {categories.map((cat, index) => (
                            <span 
                            key={index} 
                            className="px-4 py-2 bg-brand-dark border border-white/10 rounded-full text-sm font-medium text-brand-grey hover:text-white hover:border-brand-orange/50 hover:bg-brand-orange/10 cursor-pointer transition-all duration-300"
                            >
                            {cat}
                            </span>
                        ))}
                        </div>
                    </div>

                    {/* Call to Action Button */}
                    <button className="mt-10 bg-orange-500 text-brand-white font-black px-8 py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl flex items-center gap-2 cursor-pointer">
                        Explore the Shop Via App <span className="text-xl"></span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Shop;