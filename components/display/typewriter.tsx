"use client";
import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  items: string[];
  holdDurationMs?: number;
  typeSpeedMs?: number;
  deleteSpeedMs?: number;
  startDelayMs?: number;
}

export function Typewriter({
  items,
  holdDurationMs = 3200,
  typeSpeedMs = 50,
  deleteSpeedMs = 15,
  startDelayMs = 0,
}: TypewriterProps) {
  const [currentText, setCurrentText] = useState("");
  const [mode, setMode] = useState<"waiting" | "typing" | "holding" | "deleting">("waiting");

  const characterIndex = useRef(0);
  const itemIndex = useRef(0);

  useEffect(() => {
    const fullText = items[itemIndex.current];

    const delayForMode: Record<typeof mode, number> = {
      waiting: startDelayMs,
      typing: typeSpeedMs,
      holding: holdDurationMs,
      deleting: deleteSpeedMs,
    };
    const timeoutDelay = delayForMode[mode];

    const timeoutId = setTimeout(() => {
      if (mode === "waiting") {
        setMode("typing");
        return;
      }

      if (mode === "typing") {
        characterIndex.current += 1;
        setCurrentText(fullText.slice(0, characterIndex.current));

        if (characterIndex.current >= fullText.length) {
          setMode("holding");
          return;
        }
      }

      if (mode === "holding") {
        setMode("deleting");
        return;
      }

      if (mode === "deleting") {
        characterIndex.current -= 1;
        setCurrentText(fullText.slice(0, characterIndex.current));

        if (characterIndex.current <= 0) {
          itemIndex.current = (itemIndex.current + 1) % items.length;

          setMode("typing");
          return;
        }
      }
    }, timeoutDelay);

    return () => clearTimeout(timeoutId);

  }, [items, startDelayMs, typeSpeedMs, deleteSpeedMs, holdDurationMs, currentText, mode]);

  return (
    <div
      className="min-w-[150px] min-h-[28px]"
      aria-hidden="true"
    >
      {currentText}
      {!(mode === "waiting") && <span className="animate-caret">|</span>}

      {/* Screen reader relief */}
      <span className="sr-only">{items.join(", ")}</span>
    </div>
  );
}
