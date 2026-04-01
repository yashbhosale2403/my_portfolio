'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, ExternalLink, X } from 'lucide-react';
import TiltCard from '@/components/ui/TiltCard';

const projects = [
  {
    id: 1,
    title: 'XSS Reflected Scanner (Python Security Tool)',
    category: 'Security',
    description: 'Developed an automated scanner to detect reflected XSS vulnerabilities using crawling and parameter fuzzing.',
    tags: ['Context-Aware Payloads', 'Parameter Fuzzing', 'XSS', 'Severity Reporting'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800',
    github: '#',
    demo: '#',
  },
  {
    id: 2,
    title: 'Phishing URL Detection Tool (Machine Learning)',
    category: 'ML',
    description: 'Built a Random Forest-based classification model to detect phishing URLs using engineered URL and transport-layer features.',
    tags: ['URL Entropy', 'Keyword Analysis', 'Confidence Scoring', 'CLI Output'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    github: '#',
    demo: '#',
  },
  {
    id: 3,
    title: 'USB Wipe Tool (Django + Windows)',
    category: 'Web',
    description: 'Developed a secure USB management utility using Django and system-level access for controlled wipe and formatting operations.',
    tags: ['psutil', 'Dry Run', 'FAT32 Format', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    github: '#',
    demo: null,
  },
];

function getCategoryStyles(category: string) {
  if (category === 'Security') {
    return {
      badge: 'border-red-400/40 bg-red-500/10 text-red-300',
      chip: 'border-red-400/20 bg-red-500/8 text-red-200',
      glow: 'shadow-[0_0_30px_rgba(248,113,113,0.12)]',
    };
  }

  if (category === 'Web') {
    return {
      badge: 'border-cyan-400/40 bg-cyan-500/10 text-cyan-300',
      chip: 'border-cyan-400/20 bg-cyan-500/8 text-cyan-200',
      glow: 'shadow-[0_0_30px_rgba(34,211,238,0.12)]',
    };
  }

  return {
    badge: 'border-green-400/40 bg-green-500/10 text-green-300',
    chip: 'border-green-400/20 bg-green-500/8 text-green-200',
    glow: 'shadow-[0_0_30px_rgba(74,222,128,0.12)]',
  };
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const featuredProject = projects[0];

  const filteredProjects = (
    filter === 'All'
      ? projects
      : projects.filter((project) => project.category === filter)
  ).filter((project) => project.id !== featuredProject.id);

  return (
    <section id="projects" className="section-divider py-32 bg-bg-main relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-sans tracking-tight mb-4">
              <span className="text-white">/</span>
              <span className="text-neon-cyan">selected</span>
              <span className="text-white">_work</span>
            </h2>
            <div className="w-24 h-1 bg-neon-cyan/50 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-4 font-mono text-sm overflow-x-auto pb-2"
          >
            {['All', 'Security', 'ML', 'Web'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-5 py-2 rounded-full border transition-all whitespace-nowrap ${
                  filter === category
                    ? 'border-neon-cyan bg-neon-cyan/20 text-neon-cyan shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                    : 'border-white/10 text-white/50 hover:text-white hover:border-white/30'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className={`glass group mb-14 overflow-hidden rounded-3xl border border-neon-cyan/20 ${getCategoryStyles(featuredProject.category).glow}`}
        >
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-8 md:p-10">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-neon-cyan">
                  Featured Project
                </span>
                <span className={`rounded-full border px-3 py-1 text-xs font-mono ${getCategoryStyles(featuredProject.category).badge}`}>
                  {featuredProject.category}
                </span>
              </div>
              <h3 className="mb-4 text-3xl md:text-4xl font-bold text-white">{featuredProject.title}</h3>
              <p className="mb-6 max-w-2xl text-base md:text-lg leading-8 text-text-muted">{featuredProject.description}</p>
              <div className="mb-8 flex flex-wrap gap-3">
                {featuredProject.tags.map((tag) => (
                  <span key={tag} className={`rounded-full border px-3 py-1 text-xs font-mono ${getCategoryStyles(featuredProject.category).chip}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={featuredProject.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-neon-cyan/40 bg-neon-cyan/10 px-5 py-3 text-sm font-mono text-neon-cyan transition-all hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_22px_rgba(0,212,255,0.3)]"
              >
                <Code size={16} /> View GitHub
              </a>
            </div>
            <div className="relative min-h-[260px] overflow-hidden border-t border-white/10 lg:border-t-0 lg:border-l">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 via-transparent to-neon-purple/10" />
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/20 to-transparent" />
            </div>
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => {
              const styles = getCategoryStyles(project.category);

              return (
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
                      className={`glass rounded-xl overflow-hidden cursor-pointer group border border-white/10 transition-colors hover:border-white/20 ${styles.glow}`}
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <div className="absolute inset-0 bg-bg-main/40 mix-blend-multiply z-10 group-hover:bg-transparent transition-all duration-500" />
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <div className={`mb-3 inline-flex rounded-full border px-3 py-1 text-[11px] font-mono ${styles.badge}`}>
                          {project.category}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-text-muted text-sm line-clamp-2">{project.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className={`rounded-full border px-2.5 py-1 text-[10px] font-mono ${styles.chip}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (() => {
          const styles = getCategoryStyles(selectedProject.category);

          return (
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
                onClick={(event) => event.stopPropagation()}
              >
                <div className="relative h-64 overflow-hidden">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-neon-cyan/20 hover:text-neon-cyan text-white rounded-full transition-all backdrop-blur-md"
                  >
                    <X size={20} />
                  </button>
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-main to-transparent" />
                </div>

                <div className="p-8 relative -top-12 bg-bg-main/90 backdrop-blur-xl rounded-t-3xl border-t border-white/10">
                  <span className={`text-xs font-mono px-3 py-1 rounded-full border mb-4 inline-block ${styles.badge}`}>
                    {selectedProject.category}
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h3>
                  <p className="text-text-muted leading-relaxed mb-6">{selectedProject.description}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className={`text-xs font-mono px-2 py-1 rounded border ${styles.chip}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-neon-cyan/10 hover:text-neon-cyan border border-white/10 hover:border-neon-cyan transition-all rounded-lg font-mono text-sm"
                      >
                        <Code size={16} /> Source Code
                      </a>
                    )}
                    {selectedProject.demo && (
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-neon-cyan hover:bg-neon-cyan/80 text-black border border-neon-cyan transition-all rounded-lg font-mono text-sm font-bold shadow-[0_0_15px_rgba(0,212,255,0.4)]"
                      >
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
