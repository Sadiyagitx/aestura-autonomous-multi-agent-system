import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delay?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hoverEffect ? { scale: 1.02, boxShadow: "0 0 20px rgba(0, 240, 255, 0.1)" } : {}}
      className={`
        relative overflow-hidden rounded-2xl
        bg-aestura-card border border-aestura-border backdrop-blur-md
        shadow-lg
        ${className}
      `}
    >
      {/* Glossy highlight overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;