'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="relative overflow-hidden border-t border-white/5 bg-[#07070b]"
        >
          <div className="mx-auto max-w-5xl px-6 py-8 text-center">
            <div className="inline-block bg-gradient-to-r from-neon-cyan via-white to-neon-green bg-clip-text text-2xl font-bold text-transparent md:text-3xl drop-shadow-[0_0_14px_rgba(0,212,255,0.2)]">
              I break web applications to make them secure.
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
          <About />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
          <Skills />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
          <Projects />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
          <Experience />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
          <Contact />
        </motion.div>
      </div>
    </main>
  );
}
