import React from 'react';
import { UploadCloud, Cpu, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { WorkflowStepData } from '../types';

const steps: WorkflowStepData[] = [
  {
    id: 'upload',
    title: 'Upload Data',
    description: 'Input images, complex logs, or raw audio streams.',
    icon: UploadCloud,
  },
  {
    id: 'analysis',
    title: 'Autonomous Analysis',
    description: 'Agents autonomously reason, cross-verify, and execute tools.',
    icon: Cpu,
  },
  {
    id: 'output',
    title: 'Verified Output',
    description: 'Get actionable, multi-step results you can trust.',
    icon: ShieldCheck,
  },
];

const WorkflowVisualization: React.FC = () => {
  return (
    <section className="w-full px-6 lg:px-12 mb-16">
      <div className="relative">
        
        {/* Connection Line (Desktop) */}
        <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="group flex flex-col items-center text-center"
            >
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl flex items-center justify-center group-hover:border-cyan-500/50 transition-colors duration-300 shadow-lg">
                  <div className="absolute inset-0 bg-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <step.icon size={40} className="text-cyan-400 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                {/* Arrow for steps 1 and 2 */}
                {index < 2 && (
                    <div className="hidden md:flex absolute top-1/2 -right-[calc(50%+1rem)] translate-y-[-50%] text-white/10">
                        <ArrowRight size={24} />
                    </div>
                )}
              </div>

              {/* Text */}
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">{step.title}</h3>
              <p className="text-sm text-slate-400 max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowVisualization;