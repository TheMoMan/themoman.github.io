"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import React, { JSX } from "react";
import { cn } from "@/lib/utils";
import { CarouselDots } from "@/components/ui/carousel-dots";
import { motion } from "motion/react";

export interface PortfolioProps {
  content: PortfolioContent[];
}

export interface PortfolioContent {
  header: string;
  subHeader?: string;
  date: string;
  links: PortfolioLinks[];
  text: React.ReactNode;
  images?: string[];
}

interface PortfolioLinks {
  url: string;
  label: string;
}

interface PortfolioItemProps {
  content: PortfolioContent,
  index: number,
}

export function Portfolio({
  content,
}: PortfolioProps) {
  return (
    <section className="max-w-5xl mx-auto py-1 bg-card/10">
      {
        content.map(
          (contentItem, i) => <PortfolioItem content={contentItem} index={i} key={i} />,
        )
      }
    </section>
  );
}

function PortfolioItem({
  content,
  index,
}: PortfolioItemProps) {
  const getCarouselItem = (children: React.ReactNode, key: React.Key) => {
    return (
      <CarouselItem key={key}>
        <div
          className={cn(
            "aspect-video relative overflow-hidden rounded-lg",
            "bg-gray-800 flex items-center justify-center", // Classes for placeholder
          )}
        >
          {children}
        </div>
      </CarouselItem>
    );
  };

  const getCarouselContent = (): JSX.Element[] => {
    if (!content.images) {
      // Use placeholders
      return [1, 2, 3].map((value, i) => (getCarouselItem(value, i)));
    }

    return content.images.map(
      (url, i) => getCarouselItem(
        <img src={url} alt={`${content.header} - screenshot ${i + 1}`} className="object-cover" />,
        i,
      )
    );
  };

  const reverse = index % 2 === 1;

  const mapsetUrl = content.links.find((link) => link.label === "Mapset");

  const getExtraLinks = (link: PortfolioLinks) => {
    return (
      <a href={link.url} className="underline" key={link.label}>
        {link.label}
      </a>
    );
  };

  return (
    <div key={index}>
      <div className="grid grid-cols-1 sm:grid-cols-2 my-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: reverse ? 60 : -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.33, once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={cn(
            "px-5 sm:px-2",
            reverse ? "sm:order-2 sm:text-left" : "sm:order-1 sm:text-right",
          )}
        >
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {getCarouselContent()}
            </CarouselContent>
            {content.images?.length && (
              <>
                <CarouselPrevious className="left-3 translate-x-0 invisible sm:visible" />
                <CarouselNext className="right-3 translate-x-0 invisible sm:visible" />
              </>
            )}
            <CarouselDots />
          </Carousel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reverse ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.33, once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={cn(
            "flex flex-col px-5 sm:px-2",
            reverse ? "sm:order-1 sm:text-right" : "sm:order-2 sm:text-left",
          )}
        >
          <a href={mapsetUrl?.url} className="font-serif text-xl underline">
            {content.header}
          </a>
          {
            content.subHeader && (
              <div className="font-serif text-xs text-highlight leading-1.8 pb-1">
                {content.subHeader}
              </div>
            )
          }
          <div className="font-serif text-xs pb-1 text-highlight">
            {content.date}
          </div>
          <div className="text-tint space-y-1.5 leading-4.5">
            {content.text}
          </div>
          <div className={cn(
            "flex gap-1 text-xs text-tint pt-2 mt-auto",
            reverse ? "sm:justify-end" : "sm:justify-start",
          )}>
            {content.links.map((link) => getExtraLinks(link))}
          </div>
        </motion.div>
      </div>
      <hr />
    </div>
  );
}
