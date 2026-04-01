'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BootLoader() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);

  const bootSequence = [
    "SOC Dashboard OS initializing...",
    "Mounting file systems [OK]",
    "Loading Security Modules... [OK]",
    "Verifying Identity: Yash Bhosale... [VERIFIED]",
    "Decrypting portfolio components...",
    "System Boot Successful. Accessing Terminal..."
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
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#050508] flex items-center justify-center p-6 font-mono text-neon-green select-none"
        >
          <div className="max-w-xl w-full">
            <div className="mb-8 font-bold text-2xl tracking-widest text-center animate-pulse shadow-[0_0_15px_rgba(0,255,159,0.3)] inline-block">
              SYSTEM BOOT
            </div>
            
            <div className="flex flex-col gap-2 relative">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-white/40">[{String(i + 1).padStart(2, '0')}]</span>
                  <span>{log}</span>
                </div>
              ))}
              {logs.length < bootSequence.length && (
                <div className="flex gap-4 animate-pulse">
                  <span className="text-white/40">[{String(logs.length + 1).padStart(2, '0')}]</span>
                  <span className="w-4 h-5 bg-neon-green inline-block" />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
