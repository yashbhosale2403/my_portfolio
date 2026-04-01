'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillCategories = [
  {
    title: 'Programming',
    color: 'neon-purple',
    skills: ['Python', 'Java', 'Bash scripting', 'JavaScript', 'SQL'],
  },
  {
    title: 'Web',
    color: 'neon-cyan',
    skills: ['Django', 'Flask', 'React.js', 'REST API design', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    title: 'Security',
    color: 'neon-green',
    skills: ['Web Application Pentesting', 'OWASP Top 10', 'Reconnaissance', 'Attack Surface Analysis', 'Vulnerability Assessment', 'Security Reporting'],
  },
  {
    title: 'Tools',
    color: 'neon-purple',
    skills: ['Nmap', 'Burp Suite', 'OWASP ZAP', 'Wireshark', 'Metasploit', 'Hydra', 'Nikto', 'Nessus', 'Splunk', 'ELK Stack', 'Zeek', 'Suricata', 'tcpdump', 'Sysmon', 'OSQuery'],
  },
  {
    title: 'Cloud',
    color: 'neon-cyan',
    skills: ['Docker', 'AWS', 'Google Cloud Platform', 'Git', 'GitHub'],
  },
  {
    title: 'OS',
    color: 'neon-green',
    skills: ['Kali Linux', 'Windows'],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-divider py-32 bg-[#050508] relative border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-sans tracking-tight mb-4">
            <span className="text-white">/</span>
            <span className="text-neon-green">capabilities</span>
            <span className="text-white">_summary</span>
          </h2>
          <div className="w-24 h-1 bg-neon-green/50 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl border border-white/10 p-8 md:p-10"
        >
          <div className="font-mono text-sm md:text-base text-neon-green mb-8">
            {'> skills --summary'}
          </div>

          <div className="space-y-7">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.35, delay: 0.15 + idx * 0.05 }}
                className="group border-b border-white/5 pb-5 last:border-b-0 last:pb-0"
              >
                <div
                  className="mb-2 font-mono text-sm uppercase tracking-[0.18em] transition-colors group-hover:text-white"
                  style={{ color: `var(--color-${category.color})` }}
                >
                  $ {category.title}
                </div>
                <div className="text-sm md:text-base text-text-muted leading-7 transition-colors group-hover:text-text-main">
                  {category.skills.join(' / ')}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
