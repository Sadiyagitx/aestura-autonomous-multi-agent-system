import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollText, AlertTriangle, CheckCircle, Info, Filter, Download } from 'lucide-react';
import GlassCard from './ui/GlassCard';

type LogType = 'info' | 'warning' | 'critical' | 'success';

interface LogEntry {
  id: string;
  timestamp: string;
  type: LogType;
  source: string;
  message: string;
}

const mockLogs: LogEntry[] = [
  { id: '1', timestamp: '10:42:05', type: 'critical', source: 'FRAUD_AUDITOR', message: 'Anomaly detected in SWIFT stream #992-A.' },
  { id: '2', timestamp: '10:41:58', type: 'info', source: 'SYSTEM_KERNEL', message: 'Automated garbage collection started.' },
  { id: '3', timestamp: '10:38:12', type: 'success', source: 'CURE_ACCELERATOR', message: 'Protein sequence folding completed (12s).' },
  { id: '4', timestamp: '10:35:45', type: 'warning', source: 'NETWORK_GATEWAY', message: 'Latency spike observed in eu-west-2.' },
  { id: '5', timestamp: '10:30:00', type: 'info', source: 'SAFETY_DESIGNER', message: 'Blueprint V1.2 vectorization initiated.' },
  { id: '6', timestamp: '09:55:22', type: 'info', source: 'AUTH_MODULE', message: 'User session verified: Dr. S. Vance.' },
  { id: '7', timestamp: '09:55:20', type: 'success', source: 'SYSTEM_BOOT', message: 'AESTURA v4.2.0 initialized successfully.' },
];

const SystemLogsView: React.FC = () => {
  const [filter, setFilter] = useState<'all' | LogType>('all');

  const filteredLogs = filter === 'all' ? mockLogs : mockLogs.filter(l => l.type === filter);

  return (
    <div className="w-full max-w-5xl mx-auto p-6 lg:p-12 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 text-purple-400">
            <ScrollText size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">System Logs</h1>
            <p className="text-slate-400 text-sm font-mono mt-1">REAL-TIME EVENT STREAM</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-mono text-slate-300 transition-colors">
          <Download size={14} /> EXPORT CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'info', 'warning', 'critical', 'success'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`
              px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all
              ${filter === f 
                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' 
                : 'bg-black/20 border-white/10 text-slate-500 hover:border-white/30'
              }
            `}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Logs Table */}
      <GlassCard className="flex-1 overflow-hidden flex flex-col">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-white/5 text-[10px] text-slate-400 font-mono uppercase tracking-widest">
          <div className="col-span-2">Timestamp</div>
          <div className="col-span-2">Level</div>
          <div className="col-span-3">Source</div>
          <div className="col-span-5">Event Detail</div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredLogs.map((log) => (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-12 gap-4 p-3 rounded hover:bg-white/5 items-center text-xs font-mono border-b border-white/5 last:border-0 transition-colors"
            >
              <div className="col-span-2 text-slate-500">{log.timestamp}</div>
              <div className="col-span-2">
                <StatusBadge type={log.type} />
              </div>
              <div className="col-span-3 text-slate-300">{log.source}</div>
              <div className="col-span-5 text-slate-400 truncate">{log.message}</div>
            </motion.div>
          ))}
          {filteredLogs.length === 0 && (
            <div className="p-8 text-center text-slate-500 font-mono text-sm">
              NO EVENTS FOUND FOR FILTER
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
};

const StatusBadge: React.FC<{ type: LogType }> = ({ type }) => {
  const configs = {
    info: { color: 'text-blue-400', bg: 'bg-blue-500/10', icon: Info, label: 'INFO' },
    warning: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: AlertTriangle, label: 'WARN' },
    critical: { color: 'text-red-400', bg: 'bg-red-500/10', icon: AlertTriangle, label: 'CRIT' },
    success: { color: 'text-green-400', bg: 'bg-green-500/10', icon: CheckCircle, label: 'OK' },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded ${config.bg} ${config.color} w-fit`}>
      <Icon size={12} />
      <span className="font-bold text-[10px]">{config.label}</span>
    </div>
  );
};

export default SystemLogsView;