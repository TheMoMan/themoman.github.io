"use client";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import React, { JSX, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CarouselDots } from "@/components/ui/carousel-dots";
import { AnimatePresence, motion } from "motion/react";
import { BsXLg } from "react-icons/bs";
import { Button } from "../ui/button";

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

interface PortfolioCarouselProps {
  content: PortfolioContent,
  modalIsActive?: boolean,
  setModalIsActive?: (active: boolean) => void;
  page?: number;
  onPageChange: (page: number) => void;
}

interface PortfolioModalProps {
  carouselLayoutId?: string,
  carouselContent?: PortfolioContent;
  carouselPage: number;
  setModalIsActive: (active: boolean) => void;
  active: boolean;
  onPageChange: (page: number) => void;
}

export function Portfolio({
  content,
}: PortfolioProps) {
  return (
    <section className="max-w-5xl mx-auto py-1 bg-card/10">
      {
        content.map(
          (contentItem, i) =>
            <PortfolioItem
              content={contentItem}
              index={i}
              key={i}
            />,
        )
      }
    </section>
  );
}

function PortfolioItem({
  content,
  index,
}: PortfolioItemProps) {
  const [carouselPage, setCarouselPage] = useState<number>(0);
  const [modalIsActive, setModalIsActive] = useState<boolean>(false);

  const reverse = index % 2 === 1;

  const mapsetUrl = content.links.find((link) => link.label === "Mapset");

  const getExtraLinks = (link: PortfolioLinks) => {
    return (
      <a href={link.url} className="underline" key={link.label}>
        {link.label}
      </a>
    );
  };

  const carouselLayoutId = `carousel-${index}`;

  return (
    <div key={index}>
      <div className="grid grid-cols-1 sm:grid-cols-2 my-6">
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
          <motion.div
            layoutId={carouselLayoutId}
          >
            <PortfolioCarousel
              setModalIsActive={setModalIsActive}
              content={content}
              page={carouselPage}
              modalIsActive={modalIsActive}
              onPageChange={setCarouselPage}
            />
          </motion.div>
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
      <PortfolioModal
        carouselLayoutId={carouselLayoutId}
        carouselPage={carouselPage}
        carouselContent={content}
        setModalIsActive={setModalIsActive}
        active={modalIsActive}
        onPageChange={setCarouselPage}
      />
      <hr />
    </div>
  );
}

function PortfolioCarousel({
  content,
  setModalIsActive,
  modalIsActive = false,
  page = 0,
  onPageChange,
}: PortfolioCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [carouselHidden, setCarouselHidden] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!api) return;

    const jump = isFirstRender.current;
    isFirstRender.current = false;

    api.scrollTo(page, jump);

    api.on("select", () => onPageChange(api.selectedScrollSnap()));
  }, [api, page]);

  useEffect(() => {
    // Delay invisible so it doesn't blink during animation
    if (modalIsActive) {
      const timer = setTimeout(() => setCarouselHidden(true), 150);
      return () => clearTimeout(timer);
    } else {
      setCarouselHidden(false);
    }
  }, [modalIsActive]);

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

    const handleClick = () => {
      setModalIsActive?.(true);
    };

    return content.images.map(
      (url, i) => {
        const alt = `${content.header} - screenshot ${i + 1}`;

        return getCarouselItem(
          <img
            src={url}
            alt={alt}
            onClick={handleClick}
            className="object-cover"
          />,
          i,
        );
      },
    );
  };

  return (
    <Carousel
      opts={{ loop: true }}
      setApi={setApi}
      className={cn(carouselHidden ? "invisible" : "")}
    >
      <CarouselContent>
        {getCarouselContent()}
      </CarouselContent>
      {content.images?.length && (
        <div className={cn(modalIsActive ? "invisible" : "invisible sm:visible")}>
          <CarouselPrevious className="left-3 translate-x-0" />
          <CarouselNext className="right-3 translate-x-0" />
        </div>
      )}
      <CarouselDots />
    </Carousel>
  );
}

function PortfolioModal({
  carouselLayoutId,
  carouselContent,
  carouselPage,
  setModalIsActive,
  active,
  onPageChange,
}: PortfolioModalProps) {
  const handleClose = () => {
    setModalIsActive(false);
  };

  return (
    <AnimatePresence>
      {active && carouselLayoutId && carouselContent && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/80 z-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            layoutId={carouselLayoutId}
            className="fixed inset-10 z-100 flex items-center justify-center aspect-video max-h-120 m-auto"
          >
            <PortfolioCarousel
              content={carouselContent}
              page={carouselPage}
              onPageChange={onPageChange}
            />
            <Button
              className={cn(
                "absolute touch-manipulation px-0 aspect-square rounded-full text-white",
                "right-2 top-2 my-auto",
              )}
              variant="outline"
              size="sm"
              onClick={handleClose}
            >
              <BsXLg />
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
