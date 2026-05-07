import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Fingerprint, Shield, Cpu, Activity, UserCheck } from 'lucide-react';

interface WelcomePageProps {
  userName: string;
  onEnter: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ userName, onEnter }) => {
  return (
    <div className="min-h-screen w-full bg-aestura-dark flex flex-col items-center justify-center relative overflow-hidden p-6">
       {/* Deep Space Background */}
       <div className="absolute inset-0 bg-deep-space z-0" />
       <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />
       
       {/* Central Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none animate-pulse-fast" />

       <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
          
          {/* Holographic ID Card Container */}
          <motion.div
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="w-full max-w-lg perspective-[1000px] mb-12"
          >
             <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden">
                {/* Scanning Light Effect */}
                <motion.div 
                   className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_20px_#06b6d4] z-20"
                   initial={{ top: 0, opacity: 0 }}
                   animate={{ top: "100%", opacity: [0, 1, 0] }}
                   transition={{ duration: 2, ease: "linear" }}
                />

                {/* ID Card Content */}
                <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-4">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-cyan-500/20 rounded border border-cyan-500/40 text-cyan-400">
                         <Fingerprint size={24} />
                      </div>
                      <div>
                         <h3 className="text-xs font-mono text-slate-400 uppercase">Verification Complete</h3>
                         <div className="text-cyan-400 font-bold tracking-widest text-sm">ACCESS GRANTED</div>
                      </div>
                   </div>
                   <Shield size={24} className="text-slate-600" />
                </div>

                <div className="space-y-6">
                   <div>
                      <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Authorized Personnel</label>
                      <h2 className="text-3xl font-bold text-white tracking-tight">{userName}</h2>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-3 rounded border border-white/5">
                         <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Role</label>
                         <div className="text-purple-400 font-bold">SYSTEM ARCHITECT</div>
                      </div>
                      <div className="bg-white/5 p-3 rounded border border-white/5">
                         <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Neural Sync</label>
                         <div className="text-green-400 font-bold flex items-center gap-2">
                            <Activity size={14} /> OPTIMAL
                         </div>
                      </div>
                   </div>
                </div>

                {/* Footer Bar */}
                <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-slate-500">
                   <span>ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                   <span>AESTURA CORP</span>
                </div>
             </div>
          </motion.div>

          {/* Unique Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center"
          >
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 mb-6 text-xs text-slate-300 font-mono">
                <UserCheck size={12} className="text-green-400" /> Biometrics Confirmed
             </div>
             
             <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                The System Has Anticipated <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Your Arrival, {userName}.</span>
             </h1>
             <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed font-light">
                Your workspace has been pre-configured. All autonomous agents are online, synchronized, and awaiting your directive.
             </p>

             <button 
               onClick={onEnter}
               className="group relative px-10 py-4 bg-transparent overflow-hidden rounded-full border border-cyan-500/50 hover:border-cyan-400 transition-colors"
             >
                <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors" />
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                
                <span className="relative z-10 flex items-center gap-3 text-cyan-50 font-bold tracking-widest text-sm uppercase">
                   <Cpu size={18} /> Enter Command Center <ArrowRight size={18} />
                </span>
             </button>
          </motion.div>

       </div>
    </div>
  );
};

export default WelcomePage;