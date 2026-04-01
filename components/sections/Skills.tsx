'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillCategories = [
  {
    title: "Offensive Security",
    color: "neon-purple",
    skills: [
      { name: "Penetration Testing", level: 90 },
      { name: "Red Teaming", level: 85 },
      { name: "Vulnerability Assessment", level: 95 },
      { name: "Exploit Development", level: 75 }
    ]
  },
  {
    title: "Defensive & Blue Team",
    color: "neon-cyan",
    skills: [
      { name: "Incident Response", level: 80 },
      { name: "SIEM (Splunk, Sentinel)", level: 85 },
      { name: "Threat Hunting", level: 80 },
      { name: "Malware Analysis", level: 65 }
    ]
  },
  {
    title: "Development & Cloud",
    color: "neon-green",
    skills: [
      { name: "Python / Bash", level: 95 },
      { name: "Next.js / React", level: 80 },
      { name: "AWS / Azure Security", level: 75 },
      { name: "Docker / Kubernetes", level: 85 }
    ]
  }
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="py-32 bg-[#050508] relative border-t border-white/5">
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
            <span className="text-neon-green">skills</span>
            <span className="text-white">_matrix</span>
          </h2>
          <div className="w-24 h-1 bg-neon-green/50 rounded-full" />
        </motion.div>

        {/* Dashboard Panels */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="glass p-8 rounded-xl border-t-4 hover:-translate-y-2 transition-transform duration-300"
              style={{ borderTopColor: `var(--color-${category.color})` }}
            >
              <h3 className="text-xl font-bold text-white mb-6 font-mono flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full shadow-[0_0_10px_var(--color-${category.color})]`} style={{ backgroundColor: `var(--color-${category.color})` }} />
                {category.title}
              </h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-sans text-text-main">{skill.name}</span>
                      <span className="text-sm font-mono text-text-muted">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.5 + (sIdx * 0.1), ease: "easeOut" }}
                        className="h-full rounded-full shadow-[0_0_10px_currentcolor]"
                        style={{ backgroundColor: `var(--color-${category.color})` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
