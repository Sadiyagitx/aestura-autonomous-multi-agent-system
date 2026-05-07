import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, User, ShieldCheck, Github, Chrome, Command } from 'lucide-react';

interface AuthPageProps {
  onLogin: (userName: string) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (isSignup && !name.trim()) {
      setError('Full Name is required for account creation.');
      return;
    }

    setIsLoading(true);

    // Simulate Network Request
    setTimeout(() => {
      // Extract name from email if not provided in login mode
      const displayName = isSignup ? name : (email.split('@')[0]);
      // Capitalize first letter
      const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
      
      onLogin(formattedName);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-aestura-dark flex items-center justify-center relative overflow-hidden p-6 font-sans">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e293b_0%,#020617_100%)] z-0" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none animate-pulse-fast" />

      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-[400px]"
      >
        <div className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          
          {/* Logo / Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
               <Command size={24} className="text-cyan-400" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">AESTURA</h1>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              {isSignup ? "Create your professional workspace" : "Welcome back to the nexus"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {isSignup && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1"
                >
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                   <div className="relative group">
                     <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                     <input 
                       type="text" 
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       placeholder="e.g. Alex Chen"
                       className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all text-sm"
                     />
                   </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className={`w-full bg-black/40 border ${error && !email.includes('@') ? 'border-red-500/50' : 'border-white/10'} rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all text-sm`}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full bg-black/40 border ${error && password.length < 6 ? 'border-red-500/50' : 'border-white/10'} rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all text-sm`}
                />
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs font-medium bg-red-500/5 p-2 rounded border border-red-500/10 flex items-center gap-2">
                <ShieldCheck size={12} /> {error}
              </motion.div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-300 mt-2 
                ${isLoading ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/20'}
              `}
            >
              {isLoading ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <ShieldCheck size={16} />
                  </motion.div>
                  Processing...
                </>
              ) : (
                <>
                  {isSignup ? 'Create Account' : 'Sign In'} <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
             <div className="h-px bg-white/5 flex-1" />
             <span className="text-[10px] text-slate-500 uppercase tracking-widest">Or continue with</span>
             <div className="h-px bg-white/5 flex-1" />
          </div>

          {/* Socials */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-colors text-xs text-slate-300 font-medium group">
               <Chrome size={14} className="group-hover:text-white transition-colors" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-colors text-xs text-slate-300 font-medium group">
               <Github size={14} className="group-hover:text-white transition-colors" /> GitHub
            </button>
          </div>
          
          {/* Toggle Mode */}
          <div className="mt-8 text-center">
             <p className="text-xs text-slate-500">
               {isSignup ? "Already have an account?" : "Don't have an account yet?"}{" "}
               <button onClick={() => { setIsSignup(!isSignup); setError(null); }} className="text-cyan-400 hover:text-cyan-300 font-bold ml-1 transition-colors">
                  {isSignup ? "Log In" : "Sign Up"}
               </button>
             </p>
          </div>

        </div>
        
        {/* Footer info */}
        <div className="mt-6 text-center text-[10px] text-slate-600 font-mono">
           SECURE CONNECTION • 256-BIT ENCRYPTION
        </div>

      </motion.div>
    </div>
  );
};

export default AuthPage;