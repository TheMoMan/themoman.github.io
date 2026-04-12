import { cn } from "@/lib/utils";
import { JSX } from "react";

interface PageHeaderProps {
  backgroundImage?: string;
  children?: JSX.Element;
}

export function PageHeader({ backgroundImage, children }: PageHeaderProps) {
  return (
    <section
      className={cn(
        "flex justify-center gap-6 px-1 sm:gap-12",
        "relative h-[26vh] bg-cover bg-fixed bg-position-[center_bottom_17rem]",
      )}
      style={{ backgroundImage }}
    >
      <div className="absolute inset-0 bg-black/70" />
      {children}
    </section>
  );
}
