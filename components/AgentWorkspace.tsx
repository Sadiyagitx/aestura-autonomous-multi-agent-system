import React, { useState, useEffect, useRef } from 'react';
import { AgentData, HistoryEntry } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Play, Upload, Activity, ShieldAlert, CheckCircle, 
  Dna, Terminal, Zap, Wifi, Layers, FileText, Search, AlertTriangle,
  Brain, Coins, Building, Code, Microscope, Stamp, Globe, Crosshair
} from 'lucide-react';

interface AgentWorkspaceProps {
  agent: AgentData;
  onBack: () => void;
  onAnalysisComplete: (entry: HistoryEntry) => void;
}

interface AnalysisResult {
  title: string;
  message: string;
  type: 'purple' | 'red' | 'cyan' | 'green' | 'critical' | 'warning' | 'success' | 'info' | 'gray';
}

const SCENARIOS: Record<string, { label: string; text: string; icon: any }[]> = {
  cure: [
    { label: "Alzheimer's", text: "Patient_Scan_Alzheimers.nii", icon: Brain },
    { label: "Cancer", text: "Biopsy_Pancreatic_Cancer.tif", icon: Activity },
    { label: "Viral", text: "H5N1_Sequence_Data.fasta", icon: Dna }
  ],
  fraud: [
    { label: "Crypto Hack", text: "0x3f5ce5fb2f7d1... (Suspicious)", icon: Coins },
    { label: "Wire Fraud", text: "SWIFT_Transfer_NorthKorea_LLC.txt", icon: Wifi },
    { label: "Audit Clean", text: "Q3_Ledger_Verified.json", icon: CheckCircle }
  ],
  safety: [
    { label: "Bridge", text: "Suspension_Bridge_Specs_v9.pdf", icon: Activity },
    { label: "Skyscraper", text: "Seismic_Tower_Tokyo.cad", icon: Building },
    { label: "Drone", text: "Propeller_Stress_Test.dat", icon: Zap }
  ]
};

const AgentWorkspace: React.FC<AgentWorkspaceProps> = ({ agent, onBack, onAnalysisComplete }) => {
  const [status, setStatus] = useState<'idle' | 'parsing' | 'logging' | 'complete'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  
  // Input State
  const [userInput, setUserInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileMeta, setFileMeta] = useState<{name: string, size: string, type: string} | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    setStatus('idle');
    setLogs([]);
    setAnalysisResult(null);
    setUserInput('');
    setPreviewUrl(null);
    setFileMeta(null);
  }, [agent.id]);

  const addLog = (msg: string) => setLogs(prev => [...prev, `> ${msg}`]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const url = URL.createObjectURL(file);
          setPreviewUrl(url);
          setFileMeta({
              name: file.name,
              size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
              type: file.type || 'Unknown'
          });
          setUserInput(file.name); 
      }
  };

  const handleScenarioClick = (text: string) => {
      setUserInput(text);
      setFileMeta({
          name: text,
          size: "2.8 MB",
          type: text.endsWith('.json') || text.endsWith('.txt') ? 'TEXT/LOG' : 'IMG/SCAN'
      });
      // Set simulated visual
      if (agent.id === 'cure' || agent.id === 'safety') {
        setPreviewUrl("https://via.placeholder.com/600x400/000000/06b6d4?text=RAW+SCAN+DATA"); 
      } else {
        setPreviewUrl(null);
      }
  };

  const analyzeInput = (agentId: string, input: string) => {
    const lowerInput = input.toLowerCase();
    
    // --- CURE AGENT LOGIC ---
    if (agentId === 'cure') {
      if (lowerInput.includes('alzheimer') || lowerInput.includes('brain')) {
        return { 
          title: 'Neuro-Blocker Found', 
          message: 'Target: Beta-Amyloid Plaque. Inhibitor effectiveness: 94%.', 
          type: 'purple' as const, 
          logs: ['Mapping Neural Pathways...', 'Detecting Plaque buildup...', 'Simulating Inhibitor binding...'] 
        };
      }
      if (lowerInput.includes('cancer') || lowerInput.includes('tumor') || lowerInput.includes('biopsy')) {
        return { 
          title: 'Oncology Target Identified', 
          message: 'p53 Mutation Inhibitor synthesized. Protocol: Immediate Isolation.', 
          type: 'red' as const, 
          logs: ['Analyzing Cellular Division...', 'Identifying p53 Mutation...', 'Synthesizing Counter-Protein...'] 
        };
      }
      return { 
        title: 'Unknown Biological Sequence', 
        message: 'No direct pathogen match found. Deep folding initiated.', 
        type: 'gray' as const, 
        logs: ['Sequencing DNA...', 'Comparing with Global Database...', 'No exact match.'] 
      };
    }
    
    // --- FRAUD AGENT LOGIC ---
    if (agentId === 'fraud') {
      if (lowerInput.includes('0x') || lowerInput.includes('crypto')) {
        return { 
          title: 'Blockchain Anomaly Detected', 
          message: 'High Gas Fee Spikes detected in block #9921. Possible wash trading.', 
          type: 'critical' as const, 
          logs: ['Parsing Eth Ledger...', 'Tracking Wallet Hop 1...', 'Tracking Wallet Hop 2...', 'Wash Trade Pattern Confirmed.'] 
        };
      }
      if (lowerInput.includes('swift') || lowerInput.includes('wire') || lowerInput.includes('bank')) {
        return { 
          title: 'International Wire Mismatch', 
          message: 'Region: North Korea (Sanctioned). Transaction Frozen.', 
          type: 'critical' as const, 
          logs: ['Decoding SWIFT Header...', 'Checking OFAC Sanctions List...', 'Region Match: PRK (North Korea)...', 'FREEZING ASSETS...'] 
        };
      }
      if (lowerInput.includes('clean') || lowerInput.includes('verified')) {
        return { 
          title: 'Transaction Verified', 
          message: 'No Fraud Detected. Ledger synchronized.', 
          type: 'success' as const, 
          logs: ['Pattern Matching: Normal', 'Risk Score: 0.05%', 'Transaction Cleared.'] 
        };
      }
    }

    // --- SAFETY AGENT LOGIC ---
    if (agentId === 'safety') {
      if (lowerInput.includes('bridge') || lowerInput.includes('suspension')) {
        return { 
          title: 'Structural Integrity Warning', 
          message: 'Wind Shear Load High. Reinforcement recommended on Pylon A.', 
          type: 'warning' as const, 
          logs: ['Vectorizing Blueprint...', 'Simulating Wind Load (120mph)...', 'Shear Stress Exceeded Safety Factor...'] 
        };
      }
      if (lowerInput.includes('skyscraper') || lowerInput.includes('tower')) {
        return { 
          title: 'Seismic Compliance: Passed', 
          message: '9.0 Richter Scale resistance confirmed. Foundation stable.', 
          type: 'success' as const, 
          logs: ['Simulating Earthquake (Mag 9.0)...', 'Checking Dampener Response...', 'Structural Flex within Tolerance.'] 
        };
      }
    }
    
    return { title: 'Analysis Complete', message: 'Standard analysis finished.', type: 'info' as const, logs: ['Processing data...', 'Done.'] };
  };

  const handleRunAnalysis = () => {
    if (!userInput) return;
    
    const result = analyzeInput(agent.id, userInput);
    setAnalysisResult(result);
    
    setStatus('parsing');
    addLog(`INITIALIZING CORE... AGENT: ${agent.id.toUpperCase()}`);
    addLog(`INPUT: "${userInput}"`);

    // Phase 1: Parsing
    setTimeout(() => {
        setStatus('logging');
        let logIndex = 0;
        const logInterval = setInterval(() => {
            if (logIndex < result.logs.length) {
                addLog(result.logs[logIndex]);
                logIndex++;
            } else {
                clearInterval(logInterval);
            }
        }, 600);

        // Phase 3: Complete
        setTimeout(() => {
            setStatus('complete');
            addLog("ANALYSIS COMPLETE. SAVING TO MISSION LOG.");
            onAnalysisComplete({
                id: Date.now().toString(),
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                agentId: agent.id,
                inputName: userInput,
                resultSummary: result.title,
                status: result.type === 'critical' ? 'critical' : result.type === 'warning' ? 'warning' : 'success'
            });
        }, 1500 + (result.logs.length * 600));

    }, 1000);
  };

  // --- EXTRAORDINARY VISUALIZERS ---

  // 1. CURE: 3D Molecule Hologram
  const MoleculeStructure = () => (
    <div className="relative w-64 h-64 preserve-3d animate-[spin_10s_linear_infinite]" style={{ transformStyle: 'preserve-3d' }}>
      {/* Central Atom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-400 rounded-full blur-md opacity-80" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full" />
      
      {/* Orbiting Atoms */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <div key={i} className="absolute top-1/2 left-1/2 w-full h-full" style={{ transform: `translate(-50%, -50%) rotateY(${deg}deg) rotateZ(45deg)` }}>
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-400 rounded-full shadow-[0_0_10px_#a855f7]" />
           <div className="absolute inset-0 border border-white/20 rounded-full" />
        </div>
      ))}
    </div>
  );

  const renderCureVisualizer = () => {
    return (
      <div className="h-full flex flex-col md:flex-row gap-4 relative">
          <div className="flex-1 relative bg-black/80 rounded-xl border border-white/10 overflow-hidden group flex items-center justify-center perspective-[1000px]">
             {/* Background Scan Lines */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
             
             {/* DNA Animation (Loading) */}
             {(status === 'parsing' || status === 'logging') && (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="text-cyan-500 opacity-50"
                    >
                        <Dna size={120} />
                    </motion.div>
                </div>
             )}
             
             {/* 3D Hologram (Success) */}
             {status === 'complete' ? (
                <div className="relative z-20 flex flex-col items-center">
                   <MoleculeStructure />
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="mt-8 px-4 py-2 bg-black/60 backdrop-blur border border-cyan-500/50 rounded text-cyan-400 font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                   >
                      Synthesizing Protein Structure...
                   </motion.div>
                </div>
             ) : (
                previewUrl ? (
                    <img src={previewUrl} className="w-full h-full object-cover opacity-60 grayscale" />
                ) : (
                    <Microscope size={64} className="text-slate-700 opacity-50" />
                )
             )}
          </div>

          <AnimatePresence>
            {status === 'complete' && analysisResult && (
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full md:w-72 bg-slate-900/90 border-l-4 border-l-cyan-500 p-6 rounded-r-xl flex flex-col justify-center shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-2 opacity-20"><Dna size={80} /></div>
                    <div className="flex items-center gap-2 mb-3 relative z-10">
                        <Activity size={20} className={analysisResult.type === 'red' ? 'text-red-500' : 'text-purple-500'} />
                        <span className="text-xs text-slate-400 uppercase font-mono tracking-wider">Medical Report</span>
                    </div>
                    <h3 className={`text-xl font-bold leading-tight mb-3 relative z-10 ${analysisResult.type === 'red' ? 'text-red-400' : 'text-purple-400'}`}>
                        {analysisResult.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed relative z-10">{analysisResult.message}</p>
                </motion.div>
            )}
          </AnimatePresence>
      </div>
    );
  };

  // 2. FRAUD: Geo-Trace Map
  const GeoTraceMap = ({ type }: { type: string }) => (
    <div className="absolute inset-0 bg-[#050510] flex items-center justify-center overflow-hidden">
        {/* Abstract World Grid */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
        />
        
        {/* Nodes */}
        <div className="relative w-full h-full max-w-lg max-h-64">
             {/* Node 1: Origin (Left) */}
             <div className="absolute top-[40%] left-[20%] w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_15px_#3b82f6]">
                <div className="absolute -top-6 -left-4 text-[10px] text-blue-400 font-mono whitespace-nowrap">ORIGIN: NY_USA</div>
             </div>

             {/* Node 2: Hop (Middle) */}
             <div className="absolute top-[30%] left-[50%] w-2 h-2 bg-slate-500 rounded-full">
                <div className="absolute -top-6 -left-4 text-[10px] text-slate-500 font-mono whitespace-nowrap">HOP: ZURICH</div>
             </div>

             {/* Node 3: Target (Right) */}
             <div className="absolute top-[60%] left-[80%] w-4 h-4 bg-red-500 rounded-full animate-ping shadow-[0_0_20px_#ef4444]">
                <div className="absolute -top-6 -right-4 text-[10px] text-red-500 font-bold font-mono whitespace-nowrap bg-black/80 px-1 border border-red-500">
                    {type === 'critical' ? '⚠ JURISDICTION WARNING' : 'TARGET: OFFSHORE'}
                </div>
             </div>

             {/* Connection Lines (SVG) */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                   <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                      <stop offset="50%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                   </linearGradient>
                </defs>
                <path 
                   d="M 100 100 Q 250 50 400 150" 
                   fill="none" 
                   stroke="url(#traceGrad)" 
                   strokeWidth="2"
                   strokeDasharray="10 5"
                   className="animate-[dash_2s_linear_infinite]"
                />
             </svg>
        </div>
    </div>
  );

  const renderFraudVisualizer = () => {
      return (
          <div className="h-full flex flex-col relative bg-[#0a0a0f] rounded-xl overflow-hidden border border-white/10 group">
              {/* Header HUD */}
              <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-center z-30 bg-black/20 backdrop-blur-sm border-b border-white/5">
                 <div className="flex items-center gap-2 text-[10px] font-mono text-blue-500">
                    <Globe size={12} /> GLOBAL_WATCH_NET
                 </div>
                 <div className="text-[10px] font-mono text-red-500 animate-pulse">
                    {status === 'complete' ? 'LIVE TRACKING' : 'STANDBY'}
                 </div>
              </div>

              <div className="relative z-10 flex-1 flex items-center justify-center overflow-hidden">
                   {(status === 'parsing' || status === 'logging') ? (
                       <div className="text-center relative z-20">
                           <Code size={48} className="text-blue-500 mx-auto mb-4 animate-pulse" />
                           <div className="text-blue-400 font-mono text-xs uppercase tracking-widest">Deciphering Ledger...</div>
                       </div>
                   ) : status === 'complete' && analysisResult ? (
                       <>
                           {/* GEO TRACE MAP */}
                           <GeoTraceMap type={analysisResult.type} />
                           
                           {/* Overlay Result */}
                           <motion.div 
                               initial={{ y: 50, opacity: 0 }} 
                               animate={{ y: 0, opacity: 1 }}
                               transition={{ delay: 0.5 }}
                               className={`absolute bottom-4 left-4 right-4 p-4 rounded-lg border backdrop-blur-md z-40 ${analysisResult.type === 'critical' ? 'border-red-500/50 bg-black/80' : 'border-green-500/50 bg-black/80'}`}
                           >
                               <div className="flex items-start gap-3">
                                  {analysisResult.type === 'critical' ? <ShieldAlert size={24} className="text-red-500 mt-1" /> : <CheckCircle size={24} className="text-green-500 mt-1" />}
                                  <div>
                                     <h2 className="text-lg font-bold text-white leading-none mb-1">{analysisResult.title}</h2>
                                     <p className="text-xs text-slate-300 font-mono">{analysisResult.message}</p>
                                  </div>
                               </div>
                           </motion.div>
                       </>
                   ) : (
                       <div className="text-center opacity-30">
                           <FileText size={64} className="mx-auto mb-2" />
                           <p className="font-mono text-xs">Waiting for Log Stream...</p>
                       </div>
                   )}
              </div>
          </div>
      );
  };

  // 3. SAFETY: Thermal Heatmap Overlay
  const renderSafetyVisualizer = () => {
    return (
        <div className="h-full relative bg-slate-900 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center group">
            {/* Blueprint Background */}
            <div className="absolute inset-0 opacity-30" 
                style={{ 
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }} 
            />
             {previewUrl ? (
                <img src={previewUrl} className="relative z-0 max-h-full max-w-full opacity-60 invert mix-blend-screen" />
            ) : (
                <Layers size={64} className="text-slate-700 opacity-50 relative z-0" />
            )}
            
            {/* Thermal Stress Overlay */}
            {(status === 'complete' && analysisResult?.type === 'warning') && (
                 <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-10"
                 >
                     {/* Heatmap Spots */}
                     <div className="absolute top-1/3 left-1/3 w-32 h-32 rounded-full bg-red-500/40 blur-[40px] animate-pulse" />
                     <div className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-yellow-500/30 blur-[30px] animate-pulse" style={{ animationDelay: '1s' }} />
                     
                     {/* Warning Markers */}
                     <div className="absolute top-[35%] left-[35%] flex items-center gap-1">
                        <Crosshair size={16} className="text-red-500" />
                        <span className="text-[10px] bg-red-500 text-white px-1 font-bold">LOAD {'>'} 90%</span>
                     </div>
                 </motion.div>
            )}

            {status === 'complete' && analysisResult ? (
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute bottom-4 right-4 z-20 bg-[#fffbf0] text-slate-900 p-4 rounded shadow-2xl max-w-xs text-center border-2 border-slate-900"
                >
                    <Stamp size={32} className={`mx-auto mb-2 ${analysisResult.type === 'warning' ? 'text-red-800' : 'text-green-800'}`} />
                    <h2 className="text-lg font-serif font-bold mb-1 uppercase border-b border-slate-900 pb-1">
                        {analysisResult.type === 'warning' ? 'SAFETY VIOLATION' : 'APPROVED'}
                    </h2>
                    <p className="font-serif text-xs italic">{analysisResult.message}</p>
                </motion.div>
            ) : null}
            
            {/* HUD Corners */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/30" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white/30" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white/30" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/30" />
        </div>
    );
  };

  return (
    <div className="h-full flex flex-col p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
           <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
              <X size={24} />
           </button>
           <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                 <agent.icon className={`text-${agent.colorAccent}-400`} />
                 {agent.title}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                 <span className={`w-2 h-2 rounded-full ${status === 'parsing' || status === 'logging' ? 'bg-yellow-400 animate-pulse' : status === 'complete' ? 'bg-green-400' : 'bg-slate-500'}`} />
                 <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    STATUS: {status.toUpperCase()}
                 </span>
              </div>
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
         
         {/* LEFT: Main Visualizer & Controls */}
         <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Visualizer Area */}
            <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl relative overflow-hidden flex flex-col min-h-[400px]">
                <div className="absolute top-0 left-0 px-4 py-2 bg-white/5 rounded-br-xl text-[10px] font-mono text-slate-400 border-r border-b border-white/10 z-30 backdrop-blur-sm">
                VIEWPORT // {agent.id.toUpperCase()}
                </div>
                <div className="flex-1 p-6 relative z-0">
                    {agent.id === 'cure' && renderCureVisualizer()}
                    {agent.id === 'fraud' && renderFraudVisualizer()}
                    {agent.id === 'safety' && renderSafetyVisualizer()}
                </div>
            </div>

            {/* Input Console */}
            <div className="bg-[#0a0a12] border border-white/10 rounded-xl p-4 shadow-lg flex flex-col gap-4">
                
                {/* Header */}
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                   <label className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest pl-1">
                      Data Stream Input
                   </label>
                </div>

                {/* File Preview */}
                <AnimatePresence>
                    {(fileMeta || userInput) && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded p-2 flex items-center gap-3">
                             <div className="p-2 bg-black rounded border border-white/10"><FileText size={16} className="text-slate-400"/></div>
                             <div className="flex-1 text-xs font-mono text-slate-300 truncate">{fileMeta?.name || userInput}</div>
                             <div className="text-[10px] text-green-400 font-bold uppercase animate-pulse px-2">Ready</div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Controls */}
                <div className="flex gap-4 items-center">
                    <div className="relative">
                        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} />
                        <button onClick={() => fileInputRef.current?.click()} className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-cyan-500/50 transition-all text-slate-400 hover:text-cyan-400">
                            <Upload size={20} />
                        </button>
                    </div>

                    <div className="flex-1 relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Terminal size={16} className="text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                        </div>
                        <input 
                            type="text" 
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder={agent.id === 'fraud' ? "Paste Transaction Hash..." : "Type command or upload file..."}
                            className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-slate-600 sm:text-sm font-mono transition-all"
                            onKeyDown={(e) => e.key === 'Enter' && handleRunAnalysis()}
                        />
                    </div>

                    <button
                        onClick={handleRunAnalysis}
                        disabled={status === 'parsing' || status === 'logging' || !userInput}
                        className={`px-6 py-3 rounded-lg font-bold tracking-wide flex items-center gap-2 transition-all duration-300 ${status === 'parsing' || status === 'logging' ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'}`}
                    >
                        {status === 'parsing' || status === 'logging' ? <Activity size={18} className="animate-spin" /> : <Play size={18} />}
                        ANALYZE
                    </button>
                </div>

                {/* Scenarios */}
                <div className="flex flex-wrap gap-2 pt-2">
                    {SCENARIOS[agent.id]?.map((scenario, idx) => {
                        const Icon = scenario.icon;
                        return (
                            <button key={idx} onClick={() => handleScenarioClick(scenario.text)} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 rounded text-xs font-mono text-slate-300 hover:text-cyan-400 transition-all group">
                                <Icon size={12} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
                                {scenario.label}
                            </button>
                        );
                    })}
                </div>
            </div>

         </div>

         {/* RIGHT: Logs */}
         <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="flex-1 bg-[#05050A] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-inner min-h-[400px]">
               <div className="bg-white/5 p-3 border-b border-white/10 flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Live Kernel Output</span>
                  <div className="flex gap-1.5">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-500/20" />
                     <div className="w-1.5 h-1.5 rounded-full bg-green-500/20" />
                  </div>
               </div>
               <div className="flex-1 p-4 font-mono text-xs text-green-400/80 overflow-y-auto space-y-1">
                  <div className="opacity-50">> AESTURA Kernel v4.2 Connected</div>
                  {logs.map((log, i) => (
                     <div key={i} className="break-words border-l-2 border-green-500/30 pl-2 py-0.5">{log}</div>
                  ))}
                  <div ref={logsEndRef} />
               </div>
            </div>
         </div>
         
      </div>
    </div>
  );
};

export default AgentWorkspace;