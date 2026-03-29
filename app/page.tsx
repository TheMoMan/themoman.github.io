import { Hero } from "@/components/display/hero";
import { Presence } from "@/components/ui/presence";

export default function Page() {
  return (
    <div className="">
      <Hero />

      <div className="flex flex-col relative z-10 bg-background min-h-screen">
        <Presence />
        <div className="text-center mt-auto mb-3 text-white/5">Content here soon?</div>
      </div>
    </div>
  )
}
