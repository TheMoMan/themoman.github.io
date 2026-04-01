import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import React, { JSX } from "react";
import { CONTENT_LIST } from "./content-list";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface OsuPortfolioContent {
  name: string;
  alternateName?: string;
  link?: string;
  date: string;
  text: React.ReactNode;
  images?: string[];
}

export function OsuPortfolio() {
  return (
    <section>
      {CONTENT_LIST.map((content, i) => OsuPortfolioComponent(content, i))}
    </section>
  );
}

function OsuPortfolioComponent(content: OsuPortfolioContent, index: number) {
  const getCarouselItem = (children: React.ReactNode, key: React.Key) => {
    return (
      <CarouselItem key={key}>
        <div className="px-5">
          <Card className="bg-gray-800">
            <CardContent className="flex aspect-video items-center justify-center">
              {children}
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    );
  };

  const getCarouselContent = (): JSX.Element[] => {
    if (!content.images) {
      // Use placeholders
      return [1, 2, 3].map((value, i) => (getCarouselItem(value, i)));
    }

    return content.images.map((url, i) => getCarouselItem(<img src={url} />, i));
  };

  const reverse = index % 2 === 1;

  return (
    <div key={index}>
      <div className="grid grid-cols-2 my-6">
        <Carousel
          opts={{ loop: true }}
          className={cn(
            "px-2",
            reverse && "order-2",
          )}
        >
          <CarouselContent>
            {getCarouselContent()}
          </CarouselContent>
          <CarouselPrevious className="left-8 translate-x-0 invisible sm:visible" />
          <CarouselNext className="right-8 translate-x-0 invisible sm:visible" />
        </Carousel>
        <div className={cn(reverse && "order-1 text-right")}>
          <a href={content.link} className="font-serif text-xl underline">
            {content.name}
          </a>
          <div className="font-serif text-sm text-highlight leading-1.75 pb-1">
            {content.alternateName}
          </div>
          <div className="font-serif text-xs py-1 text-highlight">
            {content.date}
          </div>
          <div className="text-tint">
            {content.text}
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
