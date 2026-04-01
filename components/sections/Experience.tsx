'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const experienceData = [
  {
    role: "Cyber Security Intern",
    company: "Hack Secure",
    year: "Apr 2025 - May 2025",
    points: [
      "Conducted reconnaissance, vulnerability scanning, and exploitation across 20+ application endpoints.",
      "Performed attack-path analysis and identified critical security misconfigurations.",
      "Delivered structured vulnerability reports including reproduction steps and mitigation strategies.",
      "Optimized testing workflows using repeatable recon methodologies."
    ],
    color: "neon-purple"
  },
  {
    role: "Virtual Junior Security Analyst",
    company: "Google Cybersecurity Program",
    year: "Jan 2024 - Jun 2024",
    points: [
      "Investigated 15+ simulated incidents using SOC processes including triage, log analysis, threat detection, and mitigation.",
      "Analyzed logs and indicators of compromise using SIEM tools.",
      "Documented incident reports with root cause analysis and remediation steps."
    ],
    color: "neon-cyan"
  },
  {
    role: "Cybersecurity Trainee",
    company: "Mastercard (Forage Simulation)",
    year: "Jun 2024",
    points: [
      "Evaluated phishing attack scenarios and identified user-level vulnerabilities.",
      "Recommended process improvements to reduce human-risk attack vectors."
    ],
    color: "neon-green"
  }
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-divider py-32 bg-[#0a0a0f] relative border-t border-white/5 overflow-hidden">
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-neon-purple/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-sans tracking-tight mb-4 inline-flex items-center gap-2">
            <span className="text-white">/</span>
            <span className="text-neon-purple">operational</span>
            <span className="text-white">_experience</span>
          </h2>
          <div className="w-24 h-1 bg-neon-purple/50 rounded-full mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 md:-ml-[1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          <div className="space-y-12 md:space-y-24">
            {experienceData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`flex flex-col md:flex-row items-start md:items-center relative ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Glowing Node */}
                  <div className={`absolute left-[11px] md:left-1/2 md:-ml-3 top-0 md:top-1/2 md:-mt-3 w-6 h-6 rounded-full bg-[#0a0a0f] border-4 flex items-center justify-center z-10 transition-colors shadow-[0_0_15px_currentcolor]`}
                       style={{ borderColor: `var(--color-${item.color})`, color: `var(--color-${item.color})` }}
                  >
                    <div className="w-2 h-2 rounded-full bg-current" />
                  </div>

                  {/* Content Box */}
                  <div className={`pl-12 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16'}`}>
                    <div className="glass p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.02]">
                      <span className={`text-sm font-mono tracking-wider font-bold mb-2 block`} style={{ color: `var(--color-${item.color})` }}>
                        [{item.year}]
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-1">{item.role}</h3>
                      <p className="text-text-muted text-lg mb-6 font-mono">{item.company}</p>
                      
                      <ul className="space-y-3">
                        {item.points.map((point, pIdx) => (
                          <li key={pIdx} className={`text-base text-white/70 flex gap-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            <span className="text-white/30 font-mono select-none">{'>'}</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
