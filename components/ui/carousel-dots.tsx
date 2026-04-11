import { useState, useRef, useEffect } from "react";
import { useCarousel } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export function CarouselDots() {
  const { api } = useCarousel();

  const [current, setCurrent] = useState(0);

  const count = useRef(0);

  useEffect(() => {
    if (!api) return;

    count.current = api.scrollSnapList().length;
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
      {Array.from({ length: count.current }).map((_, index) => (
        <button
          key={index}
          onClick={() => api?.scrollTo(index)}
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-all duration-200",
            index === current ? "bg-white/60 scale-120" : "bg-white/30",
          )}
        />
      ))}
    </div>
  );
}
