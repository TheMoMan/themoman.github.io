import { SiOsu } from "react-icons/si";

export function OsuHeader() {
  return (
    <section className="flex justify-center my-16 gap-6 sm:gap-12">
      <SiOsu size={196} />
      <div className="text-[36px] sm:text-[56px] my-auto font-heading">
        mapping
      </div>
    </section>
  );
}
