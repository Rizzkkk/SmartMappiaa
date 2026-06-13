import React from 'react';
import Navbar from './components/Navbar'; 
import Hero from './sections/Hero';
import Services from './sections/Services';
import Restaurants from './sections/Restaurants';
import Shop from './sections/Shop';
import PickDrop from './sections/PickDrop';
import HowItWorks from './sections/HowItWorks';
import FAQ from './sections/FAQ';
import Footer from "./sections/Footer";
import AboutUs from './sections/AboutUs';

function App() {
  return (
    <div className="min-h-screen bg-brand-black text-white pt-20">
      <Navbar />

      <main>
        <Hero />
        <Services />
        <Restaurants />
        <Shop />
        <PickDrop />
        <AboutUs />
        <HowItWorks />
        <FAQ />
        <Footer />
      </main>
      
    </div>
  );
}

export default App;