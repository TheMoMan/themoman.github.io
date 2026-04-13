"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useEffect, useRef, useState } from "react";
import { hover, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { BsChevronCompactDown } from "react-icons/bs";
import { SiOsu } from "react-icons/si";
import { HiOutlineCommandLine } from "react-icons/hi2";
import { MdOutlineOndemandVideo } from "react-icons/md";

interface ProjectCardProps {
  title: string;
  description: string;
  icon: IconType;
  href?: string;
}

const PROJECT_ITEMS: ProjectCardProps[] = [
  {
    title: "osu! mapping",
    description: "AKA: Interactive audiovisual media and level design",
    icon: SiOsu,
    href: "/osu",
  },
  {
    title: "Programming",
    description: "Side projects that happen to have code in them",
    icon: HiOutlineCommandLine,
    href: "/programming",
  },
  {
    title: "Videos",
    description: "Solo video projects thrown onto the internet",
    icon: MdOutlineOndemandVideo,
    href: "/videos",
  },
];

export function Projects() {
  return (
    <section className="mx-auto mt-[30vh] w-full max-w-5xl font-serif text-xl sm:mt-[20vh]">
      <div className="pb-2 text-center text-highlight">Things I've done</div>
      <div className="mt-4 flex flex-wrap justify-center gap-5">
        {PROJECT_ITEMS.map((project, index) => (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: "some", once: true }}
            transition={{ duration: 0.5, ease: "backOut", delay: index * 0.2 }}
            key={project.title}
            className="min-h-30 w-full max-w-60"
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              icon={project.icon}
              href={project.href}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function ProjectCard({
  title,
  description,
  icon: Icon,
  href,
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isTouch = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    return hover(ref.current, () => {
      if (isTouch.current) return;
      setIsExpanded(true);

      return () => setIsExpanded(false);
    });
  }, []);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    setIsExpanded(false);
  };

  const handleChevronClick = () => {
    setIsExpanded((prev) => !prev);
  };

  const card = (
    <Card
      ref={ref}
      className={cn(
        !href && "opacity-50",
        "gap-1.5 border-0 border-l-4 border-l-light-blue",
        "card-transparent-gradient",
        "hover:outline-1",
      )}
      tabIndex={href ? undefined : 0}
    >
      <CardHeader
        className={cn(
          "font-sans text-lg leading-8",
          href && "underline",
          isExpanded ? "text-white" : "text-white/50",
        )}
      >
        <Icon size={"0.8em"} />
        <div>{title}</div>
      </CardHeader>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isExpanded ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
        key={title}
      >
        <CardContent className="font-sans text-tint">{description}</CardContent>
      </motion.div>
    </Card>
  );

  const cardWithLink = href && <Link href={href}>{card}</Link>;

  return (
    <div onFocus={handleFocus} onBlur={handleBlur}>
      {cardWithLink ?? card}
      <BsChevronCompactDown
        className="mx-auto cursor-pointer opacity-50"
        onClick={handleChevronClick}
      />
    </div>
  );
}
