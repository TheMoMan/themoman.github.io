import { Hero } from "@/components/display/hero";
import { RainCanvas } from "@/components/graphics/rain/rain-canvas";
import { Presence } from "@/components/ui/presence";
import { Projects } from "@/components/ui/projects";
import ScrollDownIndicator from "@/components/ui/scroll-indicator";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <div className="">
      <Hero />
      <div className={cn(
        "flex flex-col relative z-10 min-h-screen",
        "bg-[linear-gradient(to_right,var(--color-secondary),var(--color-background)_15%,var(--color-background)_85%,var(--color-secondary))]",
      )}>
        <RainCanvas dropCount={20} />
        <Presence />
        <div className="mx-auto w-1/3">
          <hr/>
        </div>
        <Projects />
        <div className="text-center mt-auto mb-3 text-white/5">Content here soon?</div>
      </div>
      <ScrollDownIndicator />
    </div>
  );
}
