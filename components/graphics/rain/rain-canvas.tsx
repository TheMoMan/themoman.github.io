'use client';

import { useRef } from 'react';
import { useRain } from './use-rain';
import { cn } from '@/lib/utils';

interface RainCanvasProps {
  dropCount?: number;
  windAngle?: number;
  enabled?: boolean;
  className?: string;
}

export function RainCanvas({
  dropCount = 60,
  windAngle = 0,
  enabled = true,
  className,
}: RainCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useRain(canvasRef, {
    dropCount,
    windAngle,
    enabled,
  });

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className,
      )}
    />
  );
}
