'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TerminalSquare } from 'lucide-react';

const SYSTEM_RESPONSES: Record<string, string> = {
  'whoami': 'root - System Administrator. Access: GRANTED.',
  'skills': 'Loading modules... Web Pentesting, Malware Analysis, Cloud Sec, Next.js, C++',
  'projects': 'Executing... 3 projects found. View the UI below to explore.',
  'help': 'Available commands: whoami, skills, projects, clear',
};

export default function TerminalWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<{ type: 'input' | 'output'; text: string }[]>([
    { type: 'output', text: 'SOC Dashboard OS v1.0.0 init...' },
    { type: 'output', text: 'Type "help" for a list of commands.' }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const newHistory = [...history, { type: 'input' as const, text: input }];
    const response = SYSTEM_RESPONSES[cmd] || `command not found: ${cmd}`;
    
    setHistory([...newHistory, { type: 'output' as const, text: response }]);
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[60] bg-bg-card border border-neon-cyan text-neon-cyan p-4 rounded-full shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:scale-110 hover:bg-neon-cyan hover:text-black transition-all"
        title="Open Interactive Terminal"
      >
        <TerminalSquare size={24} />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-24 right-6 z-[60] w-80 sm:w-[400px] h-[300px] bg-[#0c0c10] border border-white/20 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col font-mono text-sm"
        >
          <div className="bg-white/5 border-b border-white/10 px-4 py-2 flex items-center justify-between">
            <span className="text-white/60 text-xs tracking-wider">root@soc-dashboard:~</span>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500"
              />
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-2">
            {history.map((log, i) => (
              <div key={i} className={`${log.type === 'input' ? 'text-neon-cyan' : 'text-text-muted'} break-words`}>
                {log.type === 'input' ? '> ' : ''}{log.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-white/10 p-2 flex bg-black/50">
            <span className="text-neon-green mx-2">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none border-none text-white focus:ring-0"
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        </motion.div>
      )}
    </>
  );
}
