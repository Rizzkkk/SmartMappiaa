import React from "react";
import {motion, time} from "framer-motion";
import { section } from "framer-motion/client";

const Restaurants = () => {

    const restaurantData = [
        {
            id: 1,
            name: "Al Baik Express",
            cuisine: "Broasted Chicken",
            rating: "4.9",
            time: "12-15 min",
            image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=500&auto=format&fit=crop"
        },
        {
            id: 2,
            name: "Shawarma Cartel",
            cuisine: "Middle Eastern",
            rating: "4.7",
            time: "10-20 min",
            image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?q=80&w=500&auto=format&fit=crop"
        },
        {
            id: 3,
            name: "Burger Boutique",
            cuisine: "American Gourner",
            rating: "4.8",
            time: "20-30 min",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop"
        },
        {
            id: 4,
            name: "Matcha & Co.",
            cuisine: "Dessert & Cafe",
            rating: "4.6",
            time: "10-15 min",
            image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=500&auto=format&fit=crop"
        }
    ];

    const cardVariants = {
        hidden: {opacitty: 0, y: 40},
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: index * 0.15,
                ease: "easeOut"
            }
        })
    };
    
    return (
        <section id="restaurants" className="w-full bg-brand-dark/20 px-8 md:px-20 py-24 border-t border-white/5">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl"
                >
                    <span className="text-brand-orange text-sm font-bold tracking-widest uppercase">
                    Premium Culinary Partners
                    </span>
                    
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mt-2 leading-tight">
                    Riyadh's Most Loved Flavors. <br />
                    <span className="text-brand-orange">Handpicked For You.</span>
                    </h2>
                    
                    <p className="text-brand-grey text-sm md:text-base mt-4 font-medium leading-relaxed">
                    We partner exclusively with the city's highest-rated and most celebrated culinary landmarks. From authentic local delicacies to international gourmet treats, experience unmatched taste delivered fresh to your doorstep.
                    </p>
                </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {restaurantData.map((resto, index) => (
                        <motion.div
                            key={resto.id}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="bg-brand-black border border-white/10 rounded-3xl overflow-hidden group cursor-pointer hover:border-brand-orange/40 transition-colors duration-300"
                        >
                            {/* Image container with hover zoom */}
                            <div className="w-full h-48 overflow-hidden relative">
                                <img 
                                src={resto.image} 
                                alt={resto.name} 
                                className="w-full h-full ovbject-cover transform group-hover:scale-110 transition-transform duration-500"
                                />

                            {/* Floating time badge */}
                                <div className="absolute bottom-3 right-3 bg-brand-black/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10">
                                    ⏳ {resto.time}
                                </div>
                            </div>

                            {/* Restaurant Details */}
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-brand-orange transition-colors">
                                        {resto.name}
                                    </h3>
                                    <span className="flex items-center gap-1 text-sm font-bold text-white bg-white/10 px-2 py-0.5 rounded-md">
                                        ⭐ {resto.rating}
                                    </span>
                                    </div>
                                    <p className="text-brand-grey text-sm font-medium">{resto.cuisine}</p>
                                </div>
                        </motion.div>
                    ))}
                </div>
                
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-16 bg-brand-dark/40 border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
                        >
                        {/* Subtle Orange Light Background Element */}
                        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
                        
                        <div className="max-w-xl text-center md:text-left z-10">
                            <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight">
                            Hungry? Experience the full flavor on mobile.
                            </h3>
                            <p className="text-brand-grey text-sm md:text-base font-medium leading-relaxed">
                            Craving these local favorites? Get them delivered fresh and blazing fast. Download the SmartMappia app today to unlock exclusive restaurant deals, seamless ordering, and live order tracking.
                            </p>
                        </div>

                        <div className="w-full md:w-auto shrink-0 z-10">
                            <button className="w-full md:w-auto bg-brand-orange hover:bg-brand-orange/90 text-white font-black text-sm px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-brand-orange/20 cursor-pointer text-center">
                            Download App Now
                            </button>
                        </div>
                    </motion.div>

            </div>
        </section>
    );
};

export default Restaurants;