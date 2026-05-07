import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Eye, Shield, Database, Volume2, Monitor } from 'lucide-react';
import GlassCard from './ui/GlassCard';

const SettingsView: React.FC = () => {
  const [toggles, setToggles] = useState({
    notifications: true,
    reducedMotion: false,
    highContrast: false,
    soundEffects: true,
    dataSaver: false,
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 lg:p-12 pb-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-cyan-400">
          <Settings size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">System Configuration</h1>
          <p className="text-slate-400 text-sm font-mono mt-1">OPERATIVE PREFERENCES // TERMINAL V4.2.0</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Profile */}
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 p-[2px] mb-4">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <User size={32} className="text-white" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-white">Dr. S. Vance</h2>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest mt-1">Lead Architect</span>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <label className="text-[10px] text-slate-500 uppercase font-mono block mb-1">Clearance Level</label>
                <div className="text-white font-mono flex items-center gap-2">
                  <Shield size={14} className="text-purple-400" />
                  LEVEL 5 (ADMIN)
                </div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <label className="text-[10px] text-slate-500 uppercase font-mono block mb-1">Session ID</label>
                <div className="text-slate-300 font-mono text-xs break-all">
                  8f92-a1b2-c3d4-e5f6
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Column 2 & 3: Settings */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Interface Settings */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
              <Monitor size={18} className="text-cyan-400" /> Interface Parameters
            </h3>
            
            <div className="space-y-6">
              <SettingToggle 
                label="Reduced Motion" 
                description="Minimize animation intensity for faster rendering."
                active={toggles.reducedMotion}
                onClick={() => toggle('reducedMotion')}
                icon={Eye}
              />
              <SettingToggle 
                label="High Contrast Mode" 
                description="Increase border visibility and text sharpness."
                active={toggles.highContrast}
                onClick={() => toggle('highContrast')}
                icon={Eye}
              />
              <SettingToggle 
                label="System Audio Feedback" 
                description="Enable haptic audio cues for interactions."
                active={toggles.soundEffects}
                onClick={() => toggle('soundEffects')}
                icon={Volume2}
              />
            </div>
          </GlassCard>

          {/* Data Settings */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
              <Database size={18} className="text-cyan-400" /> Data Management
            </h3>
            
            <div className="space-y-6">
              <SettingToggle 
                label="Stream Data Saver" 
                description="Compress incoming agent log streams."
                active={toggles.dataSaver}
                onClick={() => toggle('dataSaver')}
                icon={Database}
              />
              <SettingToggle 
                label="Push Notifications" 
                description="Receive critical alerts when sidebar is collapsed."
                active={toggles.notifications}
                onClick={() => toggle('notifications')}
                icon={Bell}
              />
              
              <div className="pt-4 border-t border-white/10">
                <button className="w-full py-3 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors font-mono text-sm uppercase tracking-wider flex items-center justify-center gap-2">
                   <Shield size={14} /> Purge Local Cache
                </button>
              </div>
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
};

const SettingToggle: React.FC<{ 
  label: string, 
  description: string, 
  active: boolean, 
  onClick: () => void,
  icon: any
}> = ({ label, description, active, onClick, icon: Icon }) => (
  <div className="flex items-center justify-between group cursor-pointer" onClick={onClick}>
    <div className="flex items-start gap-3">
      <div className={`mt-1 p-2 rounded-lg transition-colors ${active ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-slate-500'}`}>
        <Icon size={16} />
      </div>
      <div>
        <h4 className={`text-sm font-medium transition-colors ${active ? 'text-white' : 'text-slate-300'}`}>{label}</h4>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
    </div>
    <div className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${active ? 'bg-cyan-500' : 'bg-slate-700'}`}>
      <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 shadow-sm ${active ? 'left-6' : 'left-1'}`} />
    </div>
  </div>
);

export default SettingsView;