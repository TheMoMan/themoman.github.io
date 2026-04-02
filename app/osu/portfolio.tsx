"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import React, { JSX } from "react";
import { CONTENT_LIST } from "./content-list";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { CarouselDots } from "@/components/ui/carousel-dots";

export interface OsuPortfolioContent {
  name: string;
  alternateName?: string;
  links: OsuPortfolioExtraLinks[];
  date: string;
  text: React.ReactNode;
  images?: string[];
}

interface OsuPortfolioExtraLinks {
  url: string;
  label: string;
}

export function OsuPortfolio() {
  return (
    <section className="max-w-5xl mx-auto">
      {CONTENT_LIST.map((content, i) => OsuPortfolioComponent(content, i))}
    </section>
  );
}

function OsuPortfolioComponent(content: OsuPortfolioContent, index: number) {
  const { ref, isInView } = useInView({ threshold: 0.50 });

  const getCarouselItem = (children: React.ReactNode, key: React.Key) => {
    return (
      <CarouselItem key={key}>
        <div className="px-5">
          <div
            className={cn(
              "aspect-video relative overflow-hidden rounded-lg",
              "bg-gray-800 flex items-center justify-center", // Classes for placeholder
            )}
          >
            {children}
          </div>
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
        <img src={url} alt={`${content.name} - screenshot ${i + 1}`} className="object-cover" />,
        i,
      )
    );
  };

  const reverse = index % 2 === 1;

  const loadFromLeft = isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-15";
  const loadFromRight = isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-15";
  const leftClass = cn(loadFromLeft, "sm:order-1 sm:text-right");
  const rightClass = cn(loadFromRight, "sm:order-2 sm:text-left");

  const mapsetUrl = content.links.find((link) => link.label === "Mapset");

  const getExtraLinks = (link: OsuPortfolioExtraLinks) => {
    return (
      <a href={link.url} className="underline px-0.5" key={link.label}>
        {link.label}
      </a>
    );
  };

  return (
    <div key={index} ref={ref}>
      <div className="grid grid-cols-1 sm:grid-cols-2 my-6">
        <div
          className={cn(
            "px-2",
            "transition-all duration-1000",
            reverse ? rightClass : leftClass,
          )}
        >
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {getCarouselContent()}
            </CarouselContent>
            {content.images?.length && (
              <>
                <CarouselPrevious className="left-8 translate-x-0 invisible sm:visible" />
                <CarouselNext className="right-8 translate-x-0 invisible sm:visible" />
              </>
            )}
            <CarouselDots />
          </Carousel>
          <div className="text-xs text-center pt-2">
            {content.links.map((link) => getExtraLinks(link))}
          </div>
        </div>

        <div
          className={cn(
            "transition-all duration-1000",
            reverse ? leftClass : rightClass,
          )}
        >
          <a href={mapsetUrl?.url} className="font-serif text-xl underline">
            {content.name}
          </a>
          <div className="font-serif text-xs text-highlight leading-1.8 pb-1">
            {content.alternateName}
          </div>
          <div className="font-serif text-xs pb-1 text-highlight">
            {content.date}
          </div>
          <div className="text-tint space-y-1.5 leading-4.5">
            {content.text}
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
