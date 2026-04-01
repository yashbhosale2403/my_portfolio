'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldAlert, TerminalSquare, Target } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: <Target className="text-neon-cyan" />, count: "20+", label: "Endpoints Tested" },
    { icon: <ShieldAlert className="text-neon-purple" />, count: "15+", label: "Incidents Analyzed" },
    { icon: <TerminalSquare className="text-neon-green" />, count: "189+", label: "TryHackMe Rooms" }
  ];

  return (
    <section id="about" className="relative py-32 bg-bg-main overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-neon-purple/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-sans tracking-tight mb-4">
            <span className="text-white">/</span>
            <span className="text-neon-cyan">about</span>
            <span className="text-white">_me</span>
          </h2>
          <div className="w-24 h-1 bg-neon-cyan/50 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Bio Text */}
          <motion.div 
            className="text-text-muted space-y-6 text-lg leading-relaxed font-sans"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              I am a Cybersecurity Engineer and Pentester with a deep focus on <strong className="text-white">Offensive Security</strong> and <strong className="text-white">Vulnerability Research</strong>. I don't just find flaws; I build the defenses required to stop them.
            </p>
            <p>
              My expertise bridges the gap between software development and deep-level system security. Whether it's hunting zero-days, red teaming enterprise networks, or engineering secure-by-design applications, I thrive in the terminal.
            </p>
            <p className="font-mono text-neon-green text-sm p-4 bg-neon-green/5 border border-neon-green/20 rounded-lg inline-block">
              ~ cat philosophy.txt<br/>
              <span className="text-text-muted">"Security is not a product, but a process."</span>
            </p>
          </motion.div>

          {/* Floating Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                className={`glass p-6 rounded-xl flex flex-col items-start gap-4 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] transition-all ${idx === 2 ? 'sm:col-span-3 lg:col-span-2' : ''}`}
              >
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-white mb-1 font-mono">{stat.count}</h3>
                  <p className="text-sm text-text-muted font-sans uppercase tracking-wider">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
