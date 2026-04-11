import { Hero } from "@/components/display/hero";
import { RainCanvas } from "@/components/graphics/rain/rain-canvas";
import { Presence } from "@/components/sections/presence";
import { Projects } from "@/components/sections/projects";
import ScrollDownIndicator from "@/components/ui/scroll-indicator";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <div>
      <title>A Mo</title>
      <Hero />
      <div
        className={cn(
          "relative z-10 flex min-h-screen flex-col",
          "bg-[linear-gradient(to_right,var(--color-secondary),var(--color-background)_15%,var(--color-background)_85%,var(--color-secondary))]",
        )}
      >
        <RainCanvas dropCount={20} />
        <Presence />
        <div className="mx-auto w-1/3">
          <hr />
        </div>
        <Projects />
        <div className="mt-auto mb-3 text-center text-white/5">
          More content soon?
        </div>
      </div>
      <ScrollDownIndicator />
    </div>
  );
}
