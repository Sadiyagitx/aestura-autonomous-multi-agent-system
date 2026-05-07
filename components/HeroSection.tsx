import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC<{ userName?: string }> = ({ userName = "Officer" }) => {
  return (
    <div className="relative w-full pt-10 pb-16 px-6 lg:px-12 flex flex-col items-center text-center overflow-hidden">
        
        {/* Animated Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse-fast" style={{ animationDuration: '4s' }} />
        
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 max-w-5xl"
        >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 mb-8 rounded-full bg-cyan-950/30 border border-cyan-500/30 text-xs font-mono font-medium text-cyan-300 tracking-wider uppercase shadow-[0_0_15px_rgba(6,182,212,0.2)] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                AESTURA v4.2.0 • Neural Core Active
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight text-white">
                Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{userName}</span>. <br/>
                <span className="text-3xl md:text-4xl lg:text-5xl opacity-80 mt-2 block font-light text-slate-300">
                    Ready to conquer the unsolvable?
                </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                Your autonomous agents are on standby. Check your <span className="text-cyan-400 font-medium">Mission Log</span> for recent activity or deploy an agent below.
            </p>
        </motion.div>
    </div>
  );
};

export default HeroSection;