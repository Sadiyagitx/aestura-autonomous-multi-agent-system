import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-cyan-950/90 border border-cyan-500/30 text-cyan-50 px-6 py-4 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] backdrop-blur-md"
        >
          <CheckCircle size={20} className="text-cyan-400" />
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">System Notification</span>
            <span className="text-sm">{message}</span>
          </div>
          <button onClick={onClose} className="ml-4 hover:text-white text-cyan-500/50">
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;