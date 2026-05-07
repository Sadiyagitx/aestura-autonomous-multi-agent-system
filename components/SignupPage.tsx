import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, Fingerprint, ShieldCheck } from 'lucide-react';

interface SignupPageProps {
  onSignup: (userName: string) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    setIsLoading(true);
    // Simulate verification delay
    setTimeout(() => {
      onSignup(name);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-aestura-dark flex items-center justify-center relative overflow-hidden p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
               <Fingerprint size={32} className="text-cyan-400" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-widest mb-1">AESTURA</h1>
            <p className="text-xs font-mono text-cyan-500 uppercase tracking-[0.2em]">Secure Access Terminal</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
               <label className="text-xs font-mono text-slate-400 uppercase ml-1">Operative Identity</label>
               <div className="relative group">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ENTER FULL NAME"
                    className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
                    autoFocus
                  />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-mono text-slate-400 uppercase ml-1">Access Code (Optional)</label>
               <div className="relative group">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                  <input 
                    type="password" 
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
                  />
               </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading || !name}
              className={`
                w-full py-3 rounded-lg font-bold tracking-wide flex items-center justify-center gap-2 transition-all duration-300 mt-8
                ${isLoading 
                  ? 'bg-cyan-900/50 text-cyan-400/50 cursor-wait border border-cyan-500/10' 
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]'
                }
              `}
            >
              {isLoading ? (
                <>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <ShieldCheck size={18} />
                  </motion.div>
                  VERIFYING BIOMETRICS...
                </>
              ) : (
                <>
                  AUTHORIZE ENTRY <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer Decoration */}
          <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-600 font-mono">
             <span>ENCRYPTION: AES-256</span>
             <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> SERVER ONLINE</span>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;