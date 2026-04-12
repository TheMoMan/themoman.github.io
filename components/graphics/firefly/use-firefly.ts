import { useEffect } from "react";

interface Firefly {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  radius: number;
  opacity: number;
  maxOpacity: number;
  currentLifeMs: number;
  maxLifeFramesMs: number;
  mode: "fadeIn" | "hold" | "fadeOut";
}

interface UseRainOptions {
  fireflyCount: number;
  enabled: boolean;
}

function createFirefly(canvasWidth: number, canvasHeight: number): Firefly {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    velocityX: (Math.random() - 0.5) * 0.5,
    velocityY: (Math.random() - 0.5) * 0.5,
    radius: 2,
    opacity: 0,
    maxOpacity: 0.2,
    currentLifeMs: Math.random() * 2000,
    maxLifeFramesMs: 5000,
    mode: "fadeIn",
  };
}

export function useFirefly(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  options: UseRainOptions,
) {
  useEffect(() => {
    if (!options.enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let fireflies: Firefly[] = [];
    let prevTimestamp: number;

    const syncCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.scrollHeight;
    };

    const initFireflies = () => {
      let fireflyCount = options.fireflyCount;

      // Reduce drop count for small screens
      if (canvas.width <= 640) {
        fireflyCount = Math.round(fireflyCount / 2);
      }

      fireflies = Array.from({ length: fireflyCount }, () =>
        createFirefly(canvas.width, canvas.height),
      );
    };

    const loop = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Normalise time for different framerates
      const deltaTime = timestamp - prevTimestamp;
      prevTimestamp = timestamp;

      const timeScale = deltaTime / 16.67;

      for (const [i, firefly] of fireflies.entries()) {
        const {
          x,
          y,
          velocityX,
          velocityY,
          radius,
          opacity,
          maxOpacity,
          currentLifeMs: currentLifeFrames,
          maxLifeFramesMs: maxLifeFrames,
          mode,
        } = firefly;

        // Draw firefly
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 220, 220, ${opacity})`;
        ctx.fill();
        ctx.filter = "blur(1px)";

        // Translate firefly
        firefly.x += velocityX * timeScale;
        firefly.y += velocityY * timeScale;

        // Firefly lifecycle
        if (mode === "fadeIn" && opacity < maxOpacity) {
          firefly.opacity += 0.002;
        }

        if (mode === "fadeIn" && opacity >= maxOpacity) {
          firefly.mode = "hold";
        }

        if (currentLifeFrames > maxLifeFrames) {
          firefly.mode = "fadeOut";
        }

        if (mode === "fadeOut" && opacity > 0) {
          firefly.opacity -= 0.002;
        }

        if (mode === "fadeOut" && opacity <= 0) {
          fireflies[i] = createFirefly(canvas.width, canvas.height);
        }

        firefly.currentLifeMs += Math.round(deltaTime);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    // Init
    const resizeObserver = new ResizeObserver(() => {
      syncCanvasSize();
      initFireflies();
    });

    syncCanvasSize();
    initFireflies();

    animationFrameId = requestAnimationFrame((timestamp) => {
      prevTimestamp = timestamp; // Avoid NaN time on first loop
      loop(timestamp);
    });

    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [options.fireflyCount, options.enabled]);
}
