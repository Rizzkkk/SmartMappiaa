import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-brand-orange transition-colors"
      >
        <span className="text-lg font-bold text-white">{question}</span>
        <motion.span 
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="text-2xl text-brand-orange"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-brand-grey pb-6 leading-relaxed text-sm md:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    { question: "Is the airport transfer rate fixed?", answer: "Yes, our rates are transparent. Whether you're coming from or going to the airport, the price ranges from 80 to 100 SR, depending on the terminal. No hidden charges." },
    { question: "How secure is my account access?", answer: "SmartMappia uses a secure ID and password authentication system for both our riders and customers to ensure your data and trips remain protected at all times." },
    { question: "Which districts in Riyadh do you cover?", answer: "We are currently active in major hubs including Malaz, Sulamania, Olaya, and Batha. We are constantly expanding to serve more areas soon!" },
    { question: "Can I track my order in real-time?", answer: "Absolutely! Once your order or ride is confirmed, you can track your driver's exact location via our live GPS integration inside the app." }
  ];

  return (
    <section id="faq" className="w-full bg-brand-black px-8 md:px-20 py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-orange text-sm font-bold tracking-widest uppercase">Support Center</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-2">Frequently Asked Questions</h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-brand-dark/20 p-6 md:p-10 rounded-3xl border border-white/5"
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;