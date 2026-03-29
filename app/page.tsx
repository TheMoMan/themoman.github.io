import { Hero } from "@/components/display/hero";
import { Presence } from "@/components/ui/presence";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <div className="">
      <Hero />
      <div className={cn(
        "flex flex-col relative z-10  min-h-screen",
        "bg-gradient-to-r from-secondary via-background to-secondary",
      )}>
        <Presence />
        <div className="text-center mt-auto mb-3 text-white/5">Content here soon?</div>
      </div>
    </div>
  );
}
