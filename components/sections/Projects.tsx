'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, ExternalLink, X } from 'lucide-react';
import TiltCard from '@/components/ui/TiltCard';

const projects = [
  {
    id: 1,
    title: "Zero-Day Exploit Analyzer",
    category: "Security",
    description: "An automated tool that hooks into modern memory allocators to detect use-after-free and buffer overflow vulnerabilities during runtime. Designed for CTFs and exploit dev.",
    tags: ["C++", "Python", "GDB", "Reverse Engineering"],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800",
    github: "#",
    demo: "#"
  },
  {
    id: 2,
    title: "SOC Dashboard 2.0",
    category: "Web",
    description: "A real-time telemetry dashboard for Security Operations Centers. Ingests Syslog and visualizes active threat vectors across global endpoints.",
    tags: ["Next.js", "Tailwind", "Elasticsearch", "Three.js"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    github: "#",
    demo: "#"
  },
  {
    id: 3,
    title: "ML Phishing Detector",
    category: "ML",
    description: "AI-powered email filtering utility that utilizes natural language processing (NLP) to detect sophisticated phishing attempts bypassing traditional filters.",
    tags: ["TensorFlow", "Python", "Pandas", "FastAPI"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    github: "#",
    demo: null
  }
];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-32 bg-bg-main relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-sans tracking-tight mb-4">
              <span className="text-white">/</span>
              <span className="text-neon-cyan">projects</span>
              <span className="text-white">_gallery</span>
            </h2>
            <div className="w-24 h-1 bg-neon-cyan/50 rounded-full" />
          </motion.div>

          {/* Filter Buttons */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-4 font-mono text-sm overflow-x-auto pb-2"
          >
            {['All', 'Security', 'Web', 'ML'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full border transition-all whitespace-nowrap ${
                  filter === f 
                  ? 'border-neon-cyan bg-neon-cyan/20 text-neon-cyan shadow-[0_0_15px_rgba(0,212,255,0.3)]' 
                  : 'border-white/10 text-white/50 hover:text-white hover:border-white/30'
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
              >
                <TiltCard>
                  <div 
                    onClick={() => setSelectedProject(project)}
                    className="glass rounded-xl overflow-hidden cursor-pointer group border border-white/10 hover:border-neon-cyan/50 transition-colors"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <div className="absolute inset-0 bg-bg-main/40 mix-blend-multiply z-10 group-hover:bg-transparent transition-all duration-500" />
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110" />
                    </div>
                    <div className="p-6">
                      <div className="text-xs font-mono text-neon-cyan mb-3">{project.category}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-text-muted text-sm line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal / Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.9 }}
              className="glass max-w-2xl w-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/20"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-64 overflow-hidden">
                <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-neon-cyan/20 hover:text-neon-cyan text-white rounded-full transition-all backdrop-blur-md">
                  <X size={20} />
                </button>
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-main to-transparent" />
              </div>
              
              <div className="p-8 relative -top-12 bg-bg-main/90 backdrop-blur-xl rounded-t-3xl border-t border-white/10">
                <span className="text-xs font-mono text-neon-cyan px-3 py-1 bg-neon-cyan/10 rounded-full border border-neon-cyan/30 mb-4 inline-block">{selectedProject.category}</span>
                <h3 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h3>
                <p className="text-text-muted leading-relaxed mb-6">{selectedProject.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-white/70 px-2 py-1 bg-white/5 rounded border border-white/10">{tag}</span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {selectedProject.github && (
                    <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-neon-cyan/10 hover:text-neon-cyan border border-white/10 hover:border-neon-cyan transition-all rounded-lg font-mono text-sm">
                      <Code size={16} /> Source Code
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-neon-cyan hover:bg-neon-cyan/80 text-black border border-neon-cyan transition-all rounded-lg font-mono text-sm font-bold shadow-[0_0_15px_rgba(0,212,255,0.4)]">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
