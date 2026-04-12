"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
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
  text: React.ReactNode;
  links: PortfolioLinks[];
  images?: string[];
}

interface PortfolioLinks {
  url: string;
  label: string;
  type?: "primary";
}

interface PortfolioItemProps {
  content: PortfolioContent;
  index: number;
}

interface PortfolioCarouselProps {
  content: PortfolioContent;
  page?: number;
  isHidden?: boolean;
  onPageChange: (page: number) => void;
  onExpandClick?: () => void;
}

interface PortfolioModalProps {
  layoutId: string;
  content: PortfolioContent;
  page: number;
  isActive: boolean;
  onClose: () => void;
  onPageChange: (page: number) => void;
}

export function Portfolio({ content }: PortfolioProps) {
  return (
    <section className="mx-auto max-w-5xl bg-card/10 py-1">
      {content.map((contentItem, i) => (
        <PortfolioItem content={contentItem} index={i} key={i} />
      ))}
    </section>
  );
}

function PortfolioItem({ content, index }: PortfolioItemProps) {
  const [carouselPage, setCarouselPage] = useState<number>(0);
  const [modalIsActive, setModalIsActive] = useState<boolean>(false);

  const reverse = index % 2 === 1;

  const primaryUrl = content.links.find((link) => link.type === "primary");

  const renderLinks = (link: PortfolioLinks) => {
    return (
      <a href={link.url} className="underline" key={link.label}>
        {link.label}
      </a>
    );
  };

  const carouselLayoutId = `carousel-${index}`;

  return (
    <div key={index}>
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2">
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
          <motion.div layoutId={carouselLayoutId}>
            <PortfolioCarousel
              content={content}
              page={carouselPage}
              isHidden={modalIsActive}
              onPageChange={setCarouselPage}
              onExpandClick={() => setModalIsActive(true)}
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
          <a href={primaryUrl?.url} className="font-serif text-xl underline">
            {content.header}
          </a>
          {content.subHeader && (
            <div className="leading-1.8 pb-1 font-serif text-xs text-highlight">
              {content.subHeader}
            </div>
          )}
          <div className="pb-1 font-serif text-xs text-highlight">
            {content.date}
          </div>
          <div className="space-y-1.5 leading-4.5 text-tint">
            {content.text}
          </div>
          <div
            className={cn(
              "mt-auto flex gap-1 pt-2 text-xs text-tint",
              reverse ? "sm:justify-end" : "sm:justify-start",
            )}
          >
            {content.links.map((link) => renderLinks(link))}
          </div>
        </motion.div>
      </div>
      <PortfolioModal
        layoutId={carouselLayoutId}
        content={content}
        page={carouselPage}
        isActive={modalIsActive}
        onClose={() => setModalIsActive(false)}
        onPageChange={setCarouselPage}
      />
      <hr />
    </div>
  );
}

function PortfolioCarousel({
  content,
  page = 0,
  isHidden = false,
  onPageChange,
  onExpandClick,
}: PortfolioCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [carouselHidden, setCarouselHidden] = useState(false);

  // Page change listener
  useEffect(() => {
    if (!api) return;

    api.on("select", () => onPageChange(api.selectedScrollSnap()));
  }, [onPageChange, api]);

  // Sync page changes between carousels
  useEffect(() => {
    if (!api) return;

    // Jump if pages are de-synced (e.g. when opening the modal)
    const jump = api.selectedScrollSnap() !== page;

    api.scrollTo(page, jump);
  }, [api, page]);

  // Delay invisible so it doesn't blink during animation
  useEffect(() => {
    if (isHidden) {
      const timer = setTimeout(() => setCarouselHidden(true), 150);
      return () => clearTimeout(timer);
    }

    setCarouselHidden(false);
  }, [isHidden]);

  const renderCarouselContent = () => {
    if (!content.images) {
      // Use placeholders
      return [1, 2, 3].map((value, i) => (
        <CarouselItem
          key={i}
          className="flex items-center justify-center bg-gray-800"
        >
          {value}
        </CarouselItem>
      ));
    }

    return content.images.map((url, i) => {
      const alt = `${content.header} - screenshot ${i + 1}`;

      return (
        <CarouselItem key={i}>
          <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-800">
            <img
              src={url}
              alt={alt}
              onClick={onExpandClick}
              className="object-cover"
            />
          </div>
        </CarouselItem>
      );
    });
  };

  return (
    <Carousel
      opts={{ loop: true }}
      setApi={setApi}
      className={cn({ invisible: carouselHidden })}
    >
      <CarouselContent>{renderCarouselContent()}</CarouselContent>
      {!!content.images?.length && (
        <div className={cn(isHidden ? "invisible" : "invisible sm:visible")}>
          <CarouselPrevious className="left-3 translate-x-0" />
          <CarouselNext className="right-3 translate-x-0" />
        </div>
      )}
      <CarouselDots />
    </Carousel>
  );
}

function PortfolioModal({
  layoutId,
  content,
  page,
  isActive,
  onClose,
  onPageChange,
}: PortfolioModalProps) {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isActive, onClose]);

  return (
    <AnimatePresence>
      {isActive && (
        <>
          <motion.div
            className="fixed inset-0 z-90 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            layoutId={layoutId}
            className="fixed inset-0 z-100 m-auto flex aspect-video max-h-120 items-center justify-center"
          >
            <PortfolioCarousel
              content={content}
              page={page}
              onPageChange={onPageChange}
            />
            <Button
              className={cn(
                "absolute aspect-square touch-manipulation rounded-full px-0 text-white",
                "top-2 right-2 my-auto",
              )}
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              <BsXLg />
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
