"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function ScrollDownIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide when the user scrolls
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollOneScreenDown = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollOneScreenDown}
      aria-label="Scroll down"
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2",
        "z-50 text-muted-foreground hover:text-foreground transition-colors",
      )}
    >
      <FaChevronDown />
    </button>
  );
}
