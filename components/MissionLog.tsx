import React from 'react';
import { HistoryEntry } from '../types';
import { Clock, CheckCircle, AlertTriangle, ShieldAlert, Activity, FileText } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

interface MissionLogProps {
  history: HistoryEntry[];
}

const MissionLog: React.FC<MissionLogProps> = ({ history }) => {
  return (
    <GlassCard className="h-full flex flex-col min-h-[400px]">
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-2">
           <Activity size={18} className="text-cyan-400" />
           <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live Mission Log</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
           <span className="text-[10px] text-green-400 font-mono">REC</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
         <AnimatePresence>
            {history.length === 0 ? (
                <div className="text-center text-slate-500 py-10">
                    <Clock size={32} className="mx-auto mb-2 opacity-30" />
                    <p className="text-xs font-mono uppercase">No active missions recorded.</p>
                </div>
            ) : (
                history.map((entry) => (
                    <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="group relative p-3 rounded-lg border border-white/5 bg-black/20 hover:bg-white/5 transition-colors"
                    >
                        <div className="flex items-start justify-between mb-1">
                            <span className="text-[10px] font-mono text-slate-500">{entry.timestamp}</span>
                            {entry.status === 'critical' ? <ShieldAlert size={12} className="text-red-400" /> : 
                             entry.status === 'warning' ? <AlertTriangle size={12} className="text-yellow-400" /> :
                             <CheckCircle size={12} className="text-green-400" />}
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-bold uppercase tracking-wide
                                ${entry.agentId === 'cure' ? 'text-cyan-400' : 
                                  entry.agentId === 'fraud' ? 'text-blue-400' : 'text-pink-400'}
                            `}>
                                {entry.agentId.toUpperCase()}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
                            <FileText size={10} className="text-slate-500" />
                            <span className="truncate max-w-[180px]">{entry.inputName}</span>
                        </div>
                        <p className="text-[10px] font-mono text-slate-500 border-t border-white/5 pt-1 mt-1">
                            RESULT: {entry.resultSummary}
                        </p>
                    </motion.div>
                ))
            )}
         </AnimatePresence>
      </div>
    </GlassCard>
  );
};

export default MissionLog;