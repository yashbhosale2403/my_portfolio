'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BootLoader() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);

  const bootSequence = [
    'Initializing system...',
    'Loading modules...',
    'Preparing interface...',
    'Launching portfolio...'
  ];

  useEffect(() => {
    let delay = 0;
    bootSequence.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
        
        // When the last log appears, hide loader shortly after
        if (index === bootSequence.length - 1) {
          setTimeout(() => setLoading(false), 800);
        }
      }, delay);
      
      delay += 300 + Math.random() * 400; // random delay between logs
    });
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#050508] flex items-center justify-center p-6 font-mono text-neon-green select-none"
        >
          <div className="max-w-xl w-full text-center">
            <div className="mb-8 text-white/90 text-xl tracking-[0.35em] uppercase">
              System Boot
            </div>
            
            <div className="flex flex-col gap-3 relative items-center">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-3 text-sm md:text-base">
                  <span className="text-white/30">{'>'}</span>
                  <span>{log}</span>
                </div>
              ))}
              {logs.length < bootSequence.length && (
                <div className="flex gap-3 animate-pulse text-sm md:text-base">
                  <span className="text-white/30">{'>'}</span>
                  <span className="w-3 h-4 bg-neon-green inline-block" />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
