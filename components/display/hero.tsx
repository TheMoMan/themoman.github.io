import { Fog } from "../graphics/fog";
import { Typewriter } from "./typewriter";

export function Hero() {
  return (
    <div
      className="relative h-[60vh] bg-cover bg-fixed bg-center sm:h-[67vh]"
      style={{ backgroundImage: "url('/assets/home.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center">
        <Fog />
        <HeroContent />
      </div>
    </div>
  );
}

function HeroContent() {
  return (
    <div className="z-10 grid grid-cols-2 divide-x-2 divide-solid divide-white/30">
      <div className="flex items-center overflow-hidden">
        <img className="w-80 animate-avatar" src="/assets/avatar.png" />
      </div>
      <div className="grid justify-center overflow-hidden text-shadow-black/50 text-shadow-lg">
        <div className="flex min-w-45 animate-hero-text items-end px-2 font-heading text-[48px] sm:px-0 sm:text-[72px]">
          A Mo
        </div>
        <div className="text-md flex items-start px-2 sm:px-0 sm:text-lg">
          <Typewriter
            items={[
              "Software Engineer",
              "Full Stack Developer",
              "Circle Placer",
              "Physics Graduate",
              "Video Editor",
            ]}
            startDelayMs={1000}
          />
        </div>
      </div>
    </div>
  );
}
