'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal, Key } from 'lucide-react';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 bg-[#050508] relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-sans tracking-tight mb-4 inline-flex items-center gap-3">
            <Key className="text-neon-green" size={32} />
            <span className="text-white">establish_</span>
            <span className="text-neon-green">connection</span>
          </h2>
          <p className="text-text-muted mt-4 font-mono">Open available sockets for communication.</p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle grid background inside form */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-mono text-neon-green">var name =</label>
              <input 
                type="text" 
                required
                placeholder='"John Doe"'
                className="bg-black/50 border-b border-white/20 px-4 py-3 text-white outline-none focus:border-neon-green focus:bg-white/5 transition-all font-mono"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-mono text-neon-green">var email =</label>
              <input 
                type="email" 
                required
                placeholder='"john@example.com"'
                className="bg-black/50 border-b border-white/20 px-4 py-3 text-white outline-none focus:border-neon-green focus:bg-white/5 transition-all font-mono"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-10 relative z-10">
            <label className="text-sm font-mono text-neon-green">const payload =</label>
            <textarea 
              required
              rows={5}
              placeholder='"Hello Yash, I have a project..."'
              className="bg-black/50 border-b border-white/20 px-4 py-3 text-white outline-none focus:border-neon-green focus:bg-white/5 transition-all font-mono resize-none"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading || success}
            className={`relative z-10 w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold tracking-widest uppercase transition-all overflow-hidden border ${
              success 
              ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_20px_rgba(0,212,255,0.3)]' 
              : 'bg-neon-green/10 border-neon-green text-neon-green hover:bg-neon-green hover:text-black hover:shadow-[0_0_20px_rgba(0,255,159,0.4)]'
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2 animate-pulse">
                <Terminal size={20} className="animate-spin" /> EXECUTING...
              </span>
            ) : success ? (
              <span className="flex items-center gap-2">
                [OK] TRANSMISSION SUCCESSFUL
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send size={20} /> INJECT PAYLOAD
              </span>
            )}
          </button>
        </motion.form>

      </div>
    </section>
  );
}
