'use client';

import { type CSSProperties, type PointerEvent, type PropsWithChildren, useState } from 'react';

type TiltCardProps = PropsWithChildren<{
  className?: string;
  maxTilt?: number;
  scale?: number;
}>;

const defaultStyle: CSSProperties = {
  transformStyle: 'preserve-3d',
  transition: 'transform 180ms ease-out',
};

export default function TiltCard({
  children,
  className,
  maxTilt = 15,
  scale = 1.05,
}: TiltCardProps) {
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');

  const updateTilt = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - y) * maxTilt * 2;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
    );
  };

  const resetTilt = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      className={className}
      onPointerMove={updateTilt}
      onPointerLeave={resetTilt}
      onPointerUp={resetTilt}
      style={{ ...defaultStyle, transform }}
    >
      {children}
    </div>
  );
}
