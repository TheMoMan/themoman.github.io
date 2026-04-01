import { Fog } from "../graphics/fog";
import { Typewriter } from "./typewriter";

export function Hero() {
  return (
    <div
      className="relative bg-fixed bg-cover bg-center h-[60vh] sm:h-[67vh]"
      style={{ backgroundImage: "url('/assets/home.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <Fog />
        <HeroContent />
      </div>
    </div>
  );
}

function HeroContent() {
  return (
    <div className="grid grid-cols-2 divide-x-2 divide-solid divide-white/30 z-10">
      <div className="overflow-hidden flex items-center">
        <img className="animate-avatar w-80" src="/assets/avatar.png" />
      </div>
      <div className="overflow-hidden justify-center grid text-shadow-lg text-shadow-black/50">
        <div className="animate-hero-text font-heading flex items-end text-[48px] sm:text-[72px] min-w-45 px-2 sm:px-0">
          A Mo
        </div>
        <div className="flex items-start text-md sm:text-lg px-2 sm:px-0">
          <Typewriter
            items={["Software Engineer", "Full Stack Developer", "Circle Placer", "Physics Graduate", "Video Editor"]}
            startDelayMs={1000}
          />
        </div>
      </div>
    </div>
  );
}
