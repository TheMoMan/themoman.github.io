"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { useEffect, useRef, useState } from "react";
import { hover, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { BsChevronCompactDown } from "react-icons/bs";

interface ProjectCardProps {
  title: string;
  description: string;
  href?: string;
}

const PROJECT_ITEMS: ProjectCardProps[] = [
  {
    title: "osu! mapping",
    description: "AKA: Interactive audiovisual media and level design",
    href: "/osu",
  },
  {
    title: "Programming",
    description: "WIP",
  },
  {
    title: "YouTube",
    description: "WIP",
  },
];

export function Projects() {
  return (
    <section className="font-serif text-xl mt-[30vh] sm:mt-[20vh] max-w-5xl w-full mx-auto">
      <div className="pb-2 text-highlight text-center">
        Things I've done
      </div>
      <div className="flex flex-wrap justify-center mt-4 gap-5">
        {
          PROJECT_ITEMS.map((project, index) =>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: "some", once: true }}
              transition={{ duration: 0.5, ease: "backOut", delay: index * 0.2 }}
              key={project.title}
              className="max-w-60 min-h-30 w-full"
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                href={project.href}
              />
            </motion.div>
          )
        }
      </div>
    </section>
  );
}

export function ProjectCard({
  title,
  description,
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
      className={cn(href ? "opacity-80" : "opacity-50")}
      tabIndex={href ? undefined : 0}
    >
      <CardHeader
        className={cn(
          "font-serif text-xl text-gray-500",
          href && "underline",
        )}
      >
        {title}
      </CardHeader>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isExpanded ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
        key={title}
      >
        <CardContent className="font-sans">
          {description}
        </CardContent>
      </motion.div>
    </Card>
  );

  const cardWithLink = href && (
    <Link
      href={href}
    >
      {card}
    </Link>
  );

  return (
    <div
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {cardWithLink ?? card}
      <BsChevronCompactDown
        className="mx-auto cursor-pointer opacity-50"
        onClick={handleChevronClick}
      />
    </div>
  );
}
