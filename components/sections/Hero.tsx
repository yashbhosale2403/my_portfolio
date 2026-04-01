'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { Terminal, Shield, ArrowRight } from 'lucide-react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.12),transparent_35%),linear-gradient(180deg,#06070b_0%,#0a0a0f_45%,#050508_100%)]">
        {!videoError && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 h-full w-full object-cover blur-[3px] transition-opacity duration-700 ${
              videoReady ? 'opacity-45' : 'opacity-0'
            }`}
          >
            <source src="/videos/bg.mp4" type="video/mp4" />
          </video>
        )}

        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-main/85 via-bg-main/55 to-bg-main/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,15,0.92)_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-4"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-2 relative glitch-wrapper">
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              Yash R. Bhosale
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-12 md:h-16 text-lg md:text-2xl font-mono text-neon-cyan mb-8"
        >
          <Typewriter
            options={{
              strings: [
                '> Cybersecurity Analyst | Red Teaming Enthusiast | Secure Web Developer',
                '> Identifying attack surfaces, exploiting vulnerabilities, and engineering resilient security controls.',
                '> Pune, India',
                '> Offensive Security | SOC Operations | Secure Web Engineering',
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
              cursorClassName: 'text-neon-green animate-pulse',
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 mt-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan font-mono rounded-lg overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:bg-neon-cyan/20"
          >
            <div className="absolute inset-0 w-0 bg-neon-cyan transition-all duration-300 ease-out group-hover:w-full opacity-10" />
            <span className="relative flex items-center gap-2">
              <Terminal size={18} />
              [Explore Work]
            </span>
          </a>

          <a
            href="#contact"
            className="group px-8 py-4 border border-white/20 text-white font-mono rounded-lg hover:border-neon-green hover:text-neon-green transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,159,0.2)]"
          >
            <span className="flex items-center gap-2">
              <Shield size={18} />
              [Contact]
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted font-mono text-sm"
      >
        <span>SCROLL DOWN</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neon-cyan to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
