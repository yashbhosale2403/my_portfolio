'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { Terminal, Shield, ArrowRight } from 'lucide-react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center pt-20">
      {/* Background Video with Fallback */}
      <div className="absolute inset-0 z-0 bg-bg-main">
        <video 
          ref={videoRef}
          src="/videos/bg.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="object-cover w-full h-full opacity-40 blur-[2px]"
        />
        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-main/90 via-bg-main/50 to-bg-main/95 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0f_100%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        
        {/* Glitch Name */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-2 relative glitch-wrapper">
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              Yash Bhosale
            </span>
          </h1>
        </motion.div>

        {/* Typing Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-12 md:h-16 text-lg md:text-2xl font-mono text-neon-cyan mb-8"
        >
          <Typewriter
            options={{
              strings: [
                '> Red Teaming',
                '> Breaking Security',
                '> Building Defenses',
                '> Pentesting'
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
              cursorClassName: 'text-neon-green animate-pulse',
            }}
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 mt-4"
        >
          <a href="#projects" className="group relative px-8 py-4 bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan font-mono rounded-lg overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:bg-neon-cyan/20">
            <div className="absolute inset-0 w-0 bg-neon-cyan transition-all duration-300 ease-out group-hover:w-full opacity-10" />
            <span className="relative flex items-center gap-2">
              <Terminal size={18} />
              [Explore Work]
            </span>
          </a>
          
          <a href="#contact" className="group px-8 py-4 border border-white/20 text-white font-mono rounded-lg hover:border-neon-green hover:text-neon-green transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,159,0.2)]">
            <span className="flex items-center gap-2">
              <Shield size={18} />
              [Contact]
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </motion.div>

      </div>
      
      {/* Scroll indicator */}
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
