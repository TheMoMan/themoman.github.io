import { useEffect } from 'react';

interface Drop {
  x: number;
  y: number;
  length: number;
  velocity: number;
  opacity: number;
  width: number;
}

interface UseRainOptions {
  dropCount: number;
  windAngle: number;
  enabled: boolean;
}

function createDrop(
  canvasWidth: number,
  canvasHeight: number,
  randomiseY = false, // Randomise when we init so first loop isn't a deluge
): Drop {
  return {
    x: Math.random() * canvasWidth,
    y: randomiseY ? Math.random() * canvasHeight : -20,
    length: 10 + Math.random() * 20,
    velocity: 16 + Math.random() * 16,
    opacity: 0.1 + Math.random() * 0.4,
    width: 0.5 + Math.random() * 0.5,
  };
}

export function useRain(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  options: UseRainOptions,
) {
  useEffect(() => {
    if (!options.enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let drops: Drop[] = [];
    let prevTimestamp: number;

    const syncCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initDrops = () => {
      let dropCount = options.dropCount;

      // Reduce drop count for small screens
      if (canvas.width <= 640) {
        dropCount = Math.round(dropCount / 2);
      }

      drops = Array.from(
        { length: dropCount },
        () => createDrop(canvas.width, canvas.height, true),
      );
    };

    const loop = (timestamp: number) => {
      const windAngle = options.windAngle;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Normalise time for different framerates
      const deltaTime = timestamp - prevTimestamp;
      prevTimestamp = timestamp;

      const posScale = deltaTime / 16.67;

      for (const [i, drop] of drops.entries()) {
        // Draw drop
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(
          drop.x + Math.sin(windAngle) * drop.length,
          drop.y + Math.cos(windAngle) * drop.length,
        );
        ctx.strokeStyle = `rgba(180,220,255,${drop.opacity})`;
        ctx.lineWidth = drop.width;
        ctx.stroke();

        // Translate drop
        drop.x += Math.sin(windAngle) * drop.velocity * 0.5 * posScale;
        drop.y += drop.velocity * posScale;

        // New drop once we reach bottom
        if (drop.y > canvas.height + 20) {
          drops[i] = createDrop(canvas.width, canvas.height);
        }
      };

      animationFrameId = requestAnimationFrame(loop);
    };

    // Init
    const resizeObserver = new ResizeObserver(() => {
      syncCanvasSize();
      initDrops();
    });

    syncCanvasSize();
    initDrops();

    animationFrameId = requestAnimationFrame((timestamp) => {
      prevTimestamp = timestamp; // Avoid NaN time on first loop
      loop(timestamp);
    });

    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [options.dropCount, options.windAngle, options.enabled]);
}
