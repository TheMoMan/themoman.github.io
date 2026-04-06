import { cn } from "@/lib/utils";
import { SiOsu } from "react-icons/si";

export function OsuHeader() {
  return (
    <section
      className={cn(
        "flex justify-center gap-6 sm:gap-12 px-1",
        "relative bg-fixed bg-cover bg-position-[center_bottom_17rem] h-[30vh]",
      )}
      style={{ backgroundImage: "url('/assets/home.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <SiOsu size={196} className="my-auto z-10" />
      <div className="text-[36px] sm:text-[56px] my-auto font-heading z-10">
        mapping
      </div>
    </section>
  );
}
