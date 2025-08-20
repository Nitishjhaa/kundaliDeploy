import React from 'react';
import { motion } from 'framer-motion';

const PopUp_Page = ({ setShowPopup }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative bg-[#19130b] text-white border border-[#FFD58A] rounded-3xl shadow-[0_0_40px_rgba(255,213,138,0.25)] w-full max-w-5xl max-h-[90vh] overflow-y-auto p-10"
            >
                <button
                    onClick={() => setShowPopup(false)}
                    className="absolute top-4 right-4 text-[#FFD58A] hover:text-white transition text-2xl font-light"
                >
                    &times;
                </button>

                <h2 className="text-center text-3xl md:text-4xl font-semibold text-[#FFD58A] tracking-wide mb-6">
                    Welcome to Divine Kundali Portal
                </h2>

                <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-5">
                    We are honored to assist you in understanding your life's blueprint through the sacred science of <span className="text-[#FFD58A] font-medium">Vedic Astrology</span>. This portal has been designed with precision, spiritual alignment, and ease of use in mind.
                </p>

                <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-5">
                    The predictions and insights provided are based on ancient astrological principles and modern calculations. While our models ensure a high level of accuracy, true outcomes are always shaped by <span className="text-[#FFD58A] font-medium">karma, free will, and divine grace</span>.
                </p>

                <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-5">
                    On average, interpretive accuracy ranges from <span className="text-[#FFD58A] font-medium">70% to 80%</span>. Please consider this platform as a spiritual guide, not a final authority on your destiny.
                </p>

                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                    May your journey within this portal illuminate your strengths, clarify your purpose, and deepen your understanding of life’s rhythm.
                </p>
            </motion.div>
        </div>
    );
};

export default PopUp_Page;
