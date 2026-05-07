import React from 'react';
import { AgentData } from '../types';
import GlassCard from './ui/GlassCard';
import { ArrowUpRight } from 'lucide-react';

interface AgentCardProps {
  agent: AgentData;
  index: number;
  onClick: () => void;
}

const colorMap = {
  cyan: {
    border: 'group-hover:border-cyan-500/50',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    shadow: 'group-hover:shadow-cyan-500/20',
  },
  blue: {
    border: 'group-hover:border-blue-500/50',
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    shadow: 'group-hover:shadow-blue-500/20',
  },
  pink: {
    border: 'group-hover:border-pink-500/50',
    text: 'text-pink-400',
    bg: 'bg-pink-500/10',
    shadow: 'group-hover:shadow-pink-500/20',
  }
};

const AgentCard: React.FC<AgentCardProps> = ({ agent, index, onClick }) => {
  const styles = colorMap[agent.colorAccent];

  return (
    <div onClick={onClick} className="cursor-pointer h-full">
      <GlassCard 
        className={`group p-6 flex flex-col h-full transition-all duration-300 ${styles.border} hover:shadow-2xl ${styles.shadow}`} 
        hoverEffect={true} 
        delay={index * 0.1}
      >
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-lg ${styles.bg} border border-white/5`}>
              <agent.icon className={`w-6 h-6 ${styles.text}`} />
          </div>
          <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-black/40 backdrop-blur-sm ${styles.text} border-white/10`}>
              {agent.tag}
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">{agent.title}</h3>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
          {agent.description}
        </p>

        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 group-hover:text-white transition-colors mt-auto">
          <span>Initialize Agent</span>
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>

        {/* Background Glow on Hover */}
        <div className={`absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-[80px] ${styles.bg.replace('/10', '')}`} />
      </GlassCard>
    </div>
  );
};

export default AgentCard;