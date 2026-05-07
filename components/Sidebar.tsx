import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  ShieldCheck, 
  X,
  HardHat,
  Settings,
  ScrollText,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: string;
  onNavigate: (viewId: string) => void;
  onLogout: () => void;
}

const AesturaLogo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
    {/* Outer Glow Circle */}
    <circle cx="50" cy="50" r="45" stroke="url(#logo_gradient)" strokeWidth="3" className="opacity-80" />
    <circle cx="50" cy="50" r="35" stroke="url(#logo_gradient)" strokeWidth="1" strokeDasharray="4 4" className="opacity-40 animate-spin-slow" style={{ animationDuration: '20s' }} />
    
    {/* Stylized A */}
    <path d="M50 20L25 80H35L50 45L65 80H75L50 20Z" fill="white" className="opacity-90"/>
    
    {/* Circuit Lines */}
    <path d="M50 20L65 35" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="65" cy="35" r="3" fill="#00f0ff" />
    
    <path d="M38 65H62" stroke="#00f0ff" strokeWidth="3" strokeLinecap="round" className="drop-shadow-[0_0_5px_#00f0ff]"/>
    <path d="M38 65L30 80" stroke="#00f0ff" strokeWidth="1" className="opacity-50"/>
    <path d="M62 65L70 80" stroke="#00f0ff" strokeWidth="1" className="opacity-50"/>

    <defs>
      <linearGradient id="logo_gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00f0ff" />
        <stop offset="100%" stopColor="#7000ff" />
      </linearGradient>
    </defs>
  </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeView, onNavigate, onLogout }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64
          bg-[#05050A]/95 border-r border-white/10 backdrop-blur-xl
          transform lg:translate-x-0 transition-transform duration-300 ease-in-out
          flex flex-col
        `}
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        style={{ x: undefined }} 
      >
        {/* Logo Area */}
        <div className="h-24 flex items-center px-6 border-b border-white/5 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('overview')}>
            <div className="relative flex items-center justify-center transition-transform duration-500 group-hover:scale-105" style={{ transitionProperty: 'transform' }}>
                <div className="group-hover:scale-110 transition-transform duration-300">
                    <AesturaLogo />
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-bold tracking-widest text-white group-hover:text-cyan-400 transition-colors duration-300">
                AESTURA
                </span>
                <span className="text-[10px] tracking-[0.2em] text-cyan-500/60 uppercase">
                    Intelligence
                </span>
            </div>
          </div>
          <button onClick={onClose} className="ml-auto lg:hidden text-white/50 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
          
          {/* Section: System Dashboard */}
          <div>
            <div className="mb-2 px-2 text-xs font-semibold text-white/40 uppercase tracking-widest">
              System Dashboard
            </div>
            <div className="space-y-1">
              <NavItem 
                icon={LayoutDashboard} 
                label="Overview" 
                isActive={activeView === 'overview'}
                onClick={() => onNavigate('overview')}
              />
            </div>
          </div>

          {/* Section: Multi-Agent Intelligence */}
          <div>
            <div className="mb-2 px-2 text-xs font-semibold text-white/40 uppercase tracking-widest">
              Multi-Agent Intelligence
            </div>
            <div className="space-y-1">
              <NavItem 
                icon={Activity} 
                label="Cure Accelerator" 
                isActive={activeView === 'cure'}
                onClick={() => onNavigate('cure')}
              />
              <NavItem 
                icon={ShieldCheck} 
                label="Fraud Auditor" 
                isActive={activeView === 'fraud'}
                onClick={() => onNavigate('fraud')}
              />
              <NavItem 
                icon={HardHat} 
                label="Safety Designer" 
                isActive={activeView === 'safety'}
                onClick={() => onNavigate('safety')}
              />
            </div>
          </div>

          {/* Section: Operations Support */}
          <div>
            <div className="mb-2 px-2 text-xs font-semibold text-white/40 uppercase tracking-widest">
              Operations Support
            </div>
            <div className="space-y-1">
              <NavItem 
                icon={ScrollText} 
                label="System Logs" 
                isActive={activeView === 'logs'}
                onClick={() => onNavigate('logs')}
              />
              <NavItem 
                icon={Settings} 
                label="Configuration" 
                isActive={activeView === 'settings'}
                onClick={() => onNavigate('settings')}
              />
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/5">
           <button 
             onClick={onLogout}
             className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all text-xs font-bold uppercase tracking-widest border border-red-500/20"
           >
             <LogOut size={16} /> Disconnect
           </button>
        </div>
      </motion.aside>
    </>
  );
};

const NavItem: React.FC<{ icon: any, label: string, isActive?: boolean, onClick: () => void }> = ({ icon: Icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
        ${isActive 
          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_10px_rgba(0,240,255,0.1)] hover:bg-cyan-500/20' 
          : 'text-gray-400 hover:text-cyan-50 hover:bg-cyan-500/5'
        }
      `}
    >
      <Icon 
        size={18} 
        className={`transition-colors ${isActive ? 'text-cyan-400' : 'text-gray-500 group-hover:text-cyan-400'}`} 
      />
      {label}
      {isActive && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(0,240,255,1)]" />
      )}
    </button>
  );
};

export default Sidebar;