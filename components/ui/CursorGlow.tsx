'use client';

import { useEffect, useRef, useState } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let hoverCooldown = 0;
    let lastHovered: EventTarget | null = null;
    let animationFrame = 0;
    const mediaQuery = window.matchMedia('(pointer: coarse)');

    if (mediaQuery.matches) {
      return;
    }

    const getAudioContext = () => {
      if (typeof window === 'undefined') return null;
      if (!audioContext) {
        const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctx) return null;
        audioContext = new Ctx();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume().catch(() => {});
      }
      return audioContext;
    };

    const playTone = (frequency: number, duration: number, volume: number) => {
      const ctx = getAudioContext();
      if (!ctx) return;

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start();
      oscillator.stop(ctx.currentTime + duration);
    };

    const updateCursor = (event: MouseEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
      setTargetPosition(targetRef.current);
    };

    const updateHoverState = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest('button, a');
      setHovered(Boolean(interactive));

      if (!interactive || interactive === lastHovered || event.type === 'mouseout') return;

      const now = Date.now();
      if (now - hoverCooldown < 80) return;

      hoverCooldown = now;
      lastHovered = interactive;
      playTone(720, 0.03, 0.012);
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest('button, a');
      if (!interactive) return;
      playTone(420, 0.045, 0.018);
    };

    const animateCursor = () => {
      setPosition((current) => ({
        x: current.x + (targetRef.current.x - current.x) * 0.18,
        y: current.y + (targetRef.current.y - current.y) * 0.18,
      }));
      animationFrame = window.requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseover', updateHoverState);
    window.addEventListener('mouseout', updateHoverState);
    window.addEventListener('click', handleClick);
    animationFrame = window.requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseover', updateHoverState);
      window.removeEventListener('mouseout', updateHoverState);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrame);
      audioContext?.close().catch(() => {});
    };
  }, []);

  return (
    <>
      <div
        className="fixed pointer-events-none z-[70] rounded-full border border-neon-cyan/35 transition-[width,height,opacity,transform] duration-200 ease-out mix-blend-screen"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: hovered ? '34px' : '24px',
          height: hovered ? '34px' : '24px',
          transform: 'translate(-50%, -50%)',
          opacity: 0.9,
          boxShadow: hovered ? '0 0 20px rgba(0, 212, 255, 0.22)' : '0 0 14px rgba(0, 212, 255, 0.16)',
        }}
      />
      <div
        className="fixed pointer-events-none z-[71] rounded-full bg-neon-cyan transition-transform duration-150 ease-out"
        style={{
          left: `${targetPosition.x}px`,
          top: `${targetPosition.y}px`,
          width: hovered ? '8px' : '6px',
          height: hovered ? '8px' : '6px',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(0, 212, 255, 0.4)',
        }}
      />
    </>
  );
}
