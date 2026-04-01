'use client';

import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <div 
      className="fixed pointer-events-none z-[-1] transition-opacity duration-300 rounded-full mix-blend-screen"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '400px',
        height: '400px',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
      }}
    />
  );
}
