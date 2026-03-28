import { Fog } from "../graphics/fog"

export function Hero() {
  return (
    <div
      className="relative bg-fixed bg-cover bg-center h-[67vh]"
      style={{ backgroundImage: "url('/assets/home.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <Fog />
        <HeroContent />
      </div>
    </div>
  )
}

function HeroContent() {
  return (
    <div className="grid grid-cols-2 divide-x-2 divide-solid divide-white/30 z-10">
      <div className="size-80">
        <img src="/assets/avatar.png" />
      </div>
      <div className="grid justify-center">
        <div className="flex items-end text-[72px] text-shadow-lg">A Mo</div>
        <div className="flexd items-start">subtitle</div>
      </div>
    </div>
  )
}
