import React from 'react';
import { Link } from 'react-router-dom';
import { GiLoveMystery, GiScrollUnfurled, GiBabyFace } from 'react-icons/gi';
import { motion } from 'framer-motion';

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: i => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: 'easeOut',
        },
    }),
};

const Main_Page = () => {
    return (
        <>
            <div className="w-full h-screen max-md:h-fit max-md:py-10 flex justify-center items-center overflow-hidden relative" style={{backgroundImage:"url('Images/earth.jpg')", backgroundPosition:"center"}}>

                <div className="relative w-[90%] max-w-6xl h-[90%] rounded-[2rem] border border-[#e6c27a] backdrop-blur-[10px] p-10 z-10">

                    {/* Header */}
                    <div className="text-center relative z-10">
                        <motion.h1
                            className="text-5xl md:text-6xl font-bold text-[#5c3a00] dark:text-[#ffdd99] tracking-wide drop-shadow-lg mb-4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            Divine Kundali Portal
                        </motion.h1>
                        <motion.p
                            className="text-xl md:text-2xl font-medium text-[#704214] dark:text-[#ffdca8]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Choose the sacred insight you seek
                        </motion.p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 px-4 sm:px-10 z-10 relative">
                        {[{
                            to: "/matchMatching",
                            label: "Match Making",
                            img: "Images/ring.svg",
                            desc: "Check marriage compatibility with Vedic precision."
                        }, {
                            to: "/kundali",
                            label: "Your Kundali",
                            img: "Images/star.svg",
                            desc: "Reveal your life's blueprint through birth chart."
                        }, {
                            to: "/child_Birth",
                            label: "Child Birth",
                            img: "Images/footprint.svg",
                            desc: "Discover auspicious timings and predictions for childbirth."
                        }].map((card, i) => (
                            <CardWithMotion key={card.to} index={i} {...card} />
                        ))}
                    </div>

                    {/* Footer */}
                    <div className=" max-md:hidden absolute bottom-6 left-0 right-0 text-center text-sm text-[#805b1d] dark:text-[#f3d9b1] z-10">
                        ✦ Powered by Ancient Wisdom, Delivered with Modern Grace ✦
                    </div>
                </div>
            </div>
        </>
    );
};

const CardWithMotion = ({ index, to, label, img, desc }) => {
    return (
        <motion.div
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className='group'
        >
            <Link to={to} className="group">
                <div className="relative w-full h-52 bg-white/90 dark:bg-[#2d2418]/90 border border-[#e9c46a] dark:border-[#f4d58d] rounded-xl shadow-md hover:shadow-xl hover:scale-[1.03] transform transition-all duration-300 flex flex-col justify-center items-center px-6 text-center backdrop-blur-md overflow-hidden">

                    {/* Shimmer line */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0  pointer-events-none" />

                    <div className="relative w-24 h-24 p-1 rounded-full border group-hover:border-dashed group-hover:border-yellow-500 flex justify-center items-center transition-all duration-1000">
                        <img src={img} alt="" className="p-5 rounded-full bg-[#fdc565]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#5b3a0f] dark:text-[#ffe4b5] mb-1">{label}</h3>
                    <p className="text-sm text-[#7c5b1a] dark:text-[#f5deb3]">{desc}</p>
                </div>
            </Link>
        </motion.div>
    );
};

export default Main_Page;
