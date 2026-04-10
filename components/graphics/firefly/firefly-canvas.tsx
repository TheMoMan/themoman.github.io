'use client';

import { useRef } from 'react';
import { useFirefly } from './use-firefly';
import { cn } from '@/lib/utils';

interface FireflyCanvasProps {
  fireflyCount?: number;
  windAngle?: number;
  enabled?: boolean;
  className?: string;
}

export function FireflyCanvas({
  fireflyCount = 10,
  enabled = true,
  className,
}: FireflyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useFirefly(canvasRef, {
    fireflyCount,
    enabled,
  });

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 h-full w-full -z-100",
        className,
      )}
    />
  );
}
