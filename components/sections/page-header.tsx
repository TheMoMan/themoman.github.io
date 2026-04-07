import { cn } from "@/lib/utils";
import { JSX } from "react";
import { SiOsu } from "react-icons/si";

interface PageHeaderProps {
  backgroundImage?: string;
  children?: JSX.Element;
}

export function PageHeader({
  backgroundImage,
  children,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "flex justify-center gap-6 sm:gap-12 px-1",
        "relative bg-fixed bg-cover bg-position-[center_bottom_17rem] h-[30vh]",
      )}
      style={{ backgroundImage }}
    >
      <div className="absolute inset-0 bg-black/70" />
      {children}
    </section>
  );
}
