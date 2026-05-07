import React from 'react';
import { agents } from '../data';
import AgentCard from './AgentCard';

interface AgentGridProps {
  onNavigate: (id: string) => void;
}

const AgentGrid: React.FC<AgentGridProps> = ({ onNavigate }) => {
  return (
    <section className="w-full px-6 lg:px-12 pb-24">
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-2xl font-bold text-white mb-2">Deployed Agents</h2>
        <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent, index) => (
          <AgentCard 
            key={agent.id} 
            agent={agent} 
            index={index} 
            onClick={() => onNavigate(agent.id)}
          />
        ))}
      </div>
      
      {/* Call To Action */}
      <div className="mt-16 text-center">
        <button className="relative group px-8 py-4 bg-transparent overflow-hidden rounded-full">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-purple-600 opacity-20 group-hover:opacity-30 transition-opacity blur-lg" />
            <div className="absolute inset-0 w-full h-full border border-white/20 rounded-full group-hover:border-white/40 transition-colors" />
            <span className="relative flex items-center gap-2 text-white font-semibold tracking-wide">
                Explore the Breakthroughs
                <span className="bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
            </span>
        </button>
      </div>
    </section>
  );
};

export default AgentGrid;