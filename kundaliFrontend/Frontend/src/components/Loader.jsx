// AscendantLoader_Enhanced.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AscendantLoaderEnhanced = () => {
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChart(true);
    }, 2000); // Duration of loader before morph
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Starfield Canvas */}
      <StarfieldBackground />

      {/* Aura Glow */}
      <div className="absolute w-[700px] h-[700px] bg-yellow-200 blur-[200px] opacity-20 rounded-full animate-pulse"></div>

      {/* Center Animation */}
      <AnimatePresence mode="wait">
        {!showChart ? (
          <motion.div
            key="om"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 1.5 }}
            className="z-10"
          >
            <div className="text-7xl text-yellow-400 font-bold animate-pulse-slow">ॐ</div>
          </motion.div>
        ) : (
          <motion.div
            key="chart"
            initial={{ opacity: 0, scale: 0.4, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="z-10"
          >
            <CircularChart />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text Message */}
      {!showChart && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-24 text-center z-20"
        >
          <h2 className="text-yellow-300 text-2xl md:text-3xl font-medium">
            Mapping the stars... Awakening your Kundli
          </h2>
        </motion.div>
      )}
    </div>
  );
};

// Background star canvas with constellation-style animation
const StarfieldBackground = () => {
  const stars = new Array(160).fill(0);

  return (
    <div className="absolute inset-0 z-0">
      {stars.map((_, i) => {
        const size = Math.random() * 2 + 1;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-70 animate-twinkle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}%`,
              left: `${left}%`,
              animationDelay: `${delay}s`
            }}
          />
        );
      })}
    </div>
  );
};

// Placeholder Circular Chart Component
const CircularChart = () => {
  return (
    <div className="w-64 h-64 rounded-full border-4 border-yellow-400 flex items-center justify-center relative shadow-xl">
      <div className="absolute w-2/3 h-2/3 border-t-2 border-dashed border-yellow-300 rounded-full animate-spin-slow"></div>
      <div className="text-white text-xl font-semibold text-center">Your Birth Chart</div>
    </div>
  );
};

export default AscendantLoaderEnhanced;
