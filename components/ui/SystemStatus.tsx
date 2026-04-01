'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Target, Activity } from 'lucide-react';

export default function SystemStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 1 }}
      className="fixed left-6 bottom-6 z-50 flex flex-col gap-2 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl font-mono text-xs hidden lg:flex"
    >
      <div className="flex items-center gap-2 text-neon-green mb-1 border-b border-white/10 pb-2">
        <ShieldCheck size={14} />
        <span className="font-bold tracking-widest uppercase">System Status</span>
      </div>
      
      <div className="flex items-center gap-3">
        <Target size={14} className="text-white/50" />
        <span className="text-white/70 w-24">Threat Level:</span>
        <span className="text-neon-cyan font-bold">LOW</span>
      </div>
      
      <div className="flex items-center gap-3">
        <Activity size={14} className="text-white/50" />
        <span className="text-white/70 w-24">Alerts:</span>
        <span className="text-neon-purple font-bold animate-pulse">ACTIVE</span>
      </div>
      
      <div className="flex items-center gap-3 mt-1 pt-2 border-t border-white/10">
        <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
        <span className="text-white/70">System Secure:</span>
        <span className="text-neon-green font-bold">TRUE</span>
      </div>
    </motion.div>
  );
}
