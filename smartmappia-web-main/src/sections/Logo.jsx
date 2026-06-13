import React from 'react';

const logoFiles = [
  "logo1.jpg", "logo2.jpg", "logo3.png", "logo4.jpg", "logo5.png", "logo6.jpg", "logo7.png"
];

const LogoGrid = () => {
  return (
    <div className="py-16 px-8 border-t border-white/5 bg-brand-black">
      <p className="text-center text-brand-grey text-sm mb-12 uppercase tracking-widest font-bold">Featured Restaurant Partners</p>
      
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
        {logoFiles.map((logo, index) => (
          <div key={index} className="group w-full flex items-center justify-center p-2">
            <img 
              src={`/${logo}`} 
              alt={`Brand ${index + 1}`} 
              className="max-h-50 w-auto p-1 transition-all duration-300 
             /* MOBILE: Full opacity, no grayscale */
             opacity-100 grayscale-[0] 
             /* DESKTOP (md): Dimmed, grayscale, hover active */
             md:opacity-60 md:grayscale md:hover:opacity-100 md:hover:grayscale-[0] md:hover:scale-110 
             cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoGrid;