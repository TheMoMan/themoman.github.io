"use client";
import { useRef, useState } from "react";

interface TextFlyThroughProps {
  items: string[];
  durationMs?: number;
  delayMs?: number;
}

export function TextFlyThrough({
  items,
  durationMs = 4200,
  delayMs = 0,
}: TextFlyThroughProps) {
  const [index, setIndex] = useState(0);
  const started = useRef(false);

  return (
    <div
      key={index}
      onAnimationEnd={() => {
        setIndex((prevIndex) => (prevIndex + 1) % items.length);
        started.current = true;
      }}
      style={{
        animationDuration: `${durationMs}ms`,
        animationDelay: `${started.current ? 0 : delayMs}ms`,
        animationFillMode: "both",
      }}
      className="animate-fly-through-left-right min-w-35"
    >
      {items[index]}
    </div>
  );
}
