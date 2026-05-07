import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import WorkflowVisualization from './components/WorkflowVisualization';
import AgentGrid from './components/AgentGrid';
import AgentWorkspace from './components/AgentWorkspace';
import AuthPage from './components/AuthPage';
import WelcomePage from './components/WelcomePage';
import SettingsView from './components/SettingsView';
import SystemLogsView from './components/SystemLogsView';
import MissionLog from './components/MissionLog';
import Toast from './components/ui/Toast';
import { Menu, Server, Cpu } from 'lucide-react';
import { agents } from './data';
import { HistoryEntry } from './types';
import { AnimatePresence, motion } from 'framer-motion';

type FlowState = 'auth' | 'welcome' | 'dashboard';

const App: React.FC = () => {
  const [flowState, setFlowState] = useState<FlowState>('auth');
  const [userName, setUserName] = useState('');
  
  // Dashboard State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('overview');
  const [systemLoad, setSystemLoad] = useState(34);
  const [activeNodes, setActiveNodes] = useState(892);
  
  // History & Notifications (Global State)
  const [sessionHistory, setSessionHistory] = useState<HistoryEntry[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live Stats Simulation
  useEffect(() => {
    if (flowState === 'dashboard') {
      const interval = setInterval(() => {
        setSystemLoad(prev => Math.min(99, Math.max(10, prev + (Math.random() * 10 - 5))));
        setActiveNodes(prev => Math.max(800, prev + Math.floor(Math.random() * 5 - 2)));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [flowState]);

  const handleLogin = (name: string) => {
    setUserName(name);
    setFlowState('welcome');
  };

  const handleEnterSystem = () => {
    setFlowState('dashboard');
  };

  const handleLogout = () => {
    setFlowState('auth');
    setUserName('');
    setActiveView('overview');
    setIsSidebarOpen(false);
    setSessionHistory([]);
  };

  const handleNavigate = (viewId: string) => {
    setActiveView(viewId);
    setIsSidebarOpen(false);
  };

  const handleAnalysisComplete = (entry: HistoryEntry) => {
    setSessionHistory(prev => [entry, ...prev]);
    setToastMessage(`Analysis Complete - ${entry.resultSummary}`);
  };

  const activeAgent = agents.find(a => a.id === activeView);

  // --- Render Logic based on Flow State ---

  if (flowState === 'auth') {
    return <AuthPage onLogin={handleLogin} />;
  }

  if (flowState === 'welcome') {
    return <WelcomePage userName={userName} onEnter={handleEnterSystem} />;
  }

  // --- Main Dashboard View ---
  return (
    <div className="flex h-screen bg-aestura-dark text-white overflow-hidden font-sans relative selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Global Background Grid */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-cyan-900/10 pointer-events-none" />

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeView={activeView}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10 h-full lg:ml-64 transition-all duration-300">
        
        {/* Header / Stats Bar */}
        <header className="h-16 border-b border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4 lg:hidden">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <span className="text-lg font-bold tracking-wider text-white">AESTURA</span>
          </div>

          <div className="hidden lg:flex items-center gap-2">
             <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
             <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">System Online</span>
          </div>

          {/* Live Stats */}
          <div className="flex items-center gap-6 text-xs font-mono">
             <div className="flex items-center gap-2 text-slate-400 border-r border-white/10 pr-4 mr-2">
               <span className="uppercase text-cyan-500">USR:</span> {userName}
             </div>
            <div className="hidden md:flex items-center gap-2 text-slate-400">
               <Server size={14} className="text-purple-400" />
               <span>NODES: <span className="text-white">{activeNodes}</span></span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
               <Cpu size={14} className="text-cyan-400" />
               <span>LOAD: <span className="text-white">{Math.round(systemLoad)}%</span></span>
            </div>
            <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                    animate={{ width: `${systemLoad}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth p-0">
            <AnimatePresence mode="wait">
              {activeView === 'overview' ? (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 lg:p-12 pb-0">
                      <div className="lg:col-span-3">
                          <HeroSection userName={userName} />
                          <WorkflowVisualization />
                          <AgentGrid onNavigate={handleNavigate} />
                      </div>
                      <div className="lg:col-span-1 h-full min-h-[500px] lg:mt-20">
                          <MissionLog history={sessionHistory} />
                      </div>
                  </div>
                </motion.div>
              ) : activeView === 'settings' ? (
                 <motion.div
                   key="settings"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.3 }}
                 >
                   <SettingsView />
                 </motion.div>
              ) : activeView === 'logs' ? (
                 <motion.div
                   key="logs"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.3 }}
                 >
                   <SystemLogsView />
                 </motion.div>
              ) : activeAgent ? (
                <AgentWorkspace 
                  key="workspace" 
                  agent={activeAgent} 
                  onBack={() => handleNavigate('overview')}
                  onAnalysisComplete={handleAnalysisComplete}
                />
              ) : null}
            </AnimatePresence>
        </main>

      </div>
    </div>
  );
};

export default App;