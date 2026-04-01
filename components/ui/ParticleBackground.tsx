'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacityBase: number;
  twinkleOffset: number;
  twinkleSpeed: number;
};

const PARTICLE_COLOR = 'rgba(255, 255, 255, 0.5)';
const LINE_COLOR_BASE = 'rgba(0, 255, 200, 0.15)';
const HIGHLIGHT_COLOR = 'rgba(0, 255, 255, 0.3)';

function withAlpha(color: string, alpha: number) {
  const parts = color.match(/rgba\(([^)]+)\)/);
  if (!parts) return color;
  const [r, g, b] = parts[1].split(',').map((value) => value.trim());
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const coarsePointer = window.matchMedia('(pointer: coarse)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
      radius: coarsePointer.matches ? 0 : 130,
    };

    let particles: Particle[] = [];
    let animationFrame = 0;
    let isVisible = !document.hidden;
    let lastTime = performance.now();

    const getParticleCount = (width: number) => {
      if (width < 640) return 42;
      if (width < 1024) return 64;
      return 86;
    };

    const getConnectionDistance = (width: number) => (width < 768 ? 72 : 88);

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = Array.from({ length: getParticleCount(width) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.018,
        vy: (Math.random() - 0.5) * 0.018,
        size: 1 + Math.random(),
        opacityBase: 0.22 + Math.random() * 0.26,
        twinkleOffset: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.0007 + Math.random() * 0.0008,
      }));
    };

    const drawParticles = (time: number, delta: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const connectionDistance = getConnectionDistance(width);

      context.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];

        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;

        if (particle.x < -8) particle.x = width + 8;
        if (particle.x > width + 8) particle.x = -8;
        if (particle.y < -8) particle.y = height + 8;
        if (particle.y > height + 8) particle.y = -8;

        if (mouse.active) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouse.radius && distance > 0) {
            const force = (1 - distance / mouse.radius) * 0.05;
            particle.x += (dx / distance) * force * delta;
            particle.y += (dy / distance) * force * delta;
          }
        }

        let connections = 0;

        for (let j = i + 1; j < particles.length && connections < 3; j += 1) {
          const neighbor = particles[j];
          const dx = particle.x - neighbor.x;
          const dy = particle.y - neighbor.y;
          const distance = Math.hypot(dx, dy);

          if (distance > connectionDistance) continue;

          let opacity = (1 - distance / connectionDistance) * 0.12;
          let strokeColor = withAlpha(LINE_COLOR_BASE, Math.min(opacity, 0.15));

          if (mouse.active) {
            const midpointX = (particle.x + neighbor.x) * 0.5;
            const midpointY = (particle.y + neighbor.y) * 0.5;
            const mouseDistance = Math.hypot(midpointX - mouse.x, midpointY - mouse.y);

            if (mouseDistance < mouse.radius) {
              const boost = (1 - mouseDistance / mouse.radius) * 0.05;
              opacity += boost;
              strokeColor = withAlpha(HIGHLIGHT_COLOR, Math.min(0.18, opacity));
            }
          }

          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(neighbor.x, neighbor.y);
          context.strokeStyle = strokeColor;
          context.lineWidth = 0.7;
          context.stroke();

          connections += 1;
        }
      }

      for (const particle of particles) {
        const twinkle = Math.sin(time * particle.twinkleSpeed + particle.twinkleOffset) * 0.12;
        let opacity = Math.max(0.2, Math.min(0.6, particle.opacityBase + twinkle));
        let fillColor = withAlpha(PARTICLE_COLOR, opacity);

        if (mouse.active) {
          const distance = Math.hypot(particle.x - mouse.x, particle.y - mouse.y);
          if (distance < mouse.radius) {
            const boost = (1 - distance / mouse.radius) * 0.08;
            fillColor = withAlpha(HIGHLIGHT_COLOR, Math.min(0.3, opacity + boost));
          }
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = fillColor;
        context.fill();
      }
    };

    const animate = (time: number) => {
      if (!isVisible) return;

      const delta = Math.min((time - lastTime) / 16.67, 2);
      lastTime = time;
      drawParticles(time, delta);
      animationFrame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (coarsePointer.matches || reducedMotion.matches) return;
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    };

    const resetMouse = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        cancelAnimationFrame(animationFrame);
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animationFrame);
      }
    };

    resizeCanvas();
    animationFrame = window.requestAnimationFrame(animate);

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', resetMouse);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', resetMouse);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none opacity-70 blur-[0.2px]"
    />
  );
}
