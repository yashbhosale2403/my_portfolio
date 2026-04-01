'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-bg-main/90 backdrop-blur-md border-b border-white/10 py-4 shadow-lg shadow-black/50' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="font-mono text-xl font-bold tracking-tighter">
          <span className="text-neon-cyan">yash</span>
          <span className="text-neon-green">@</span>
          <span className="text-text-main">root</span>
          <span className="text-text-muted select-none">:~#</span>
        </Link>
        <div className="hidden md:flex gap-8 font-mono text-sm">
          <Link href="#about" className="hover:text-neon-cyan transition-colors duration-200">/about</Link>
          <Link href="#skills" className="hover:text-neon-cyan transition-colors duration-200">/skills</Link>
          <Link href="#projects" className="hover:text-neon-cyan transition-colors duration-200">/projects</Link>
          <Link href="#contact" className="hover:text-neon-cyan transition-colors duration-200">/contact</Link>
        </div>
      </div>
    </nav>
  );
}
