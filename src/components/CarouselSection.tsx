import { cn } from "@/lib/utils";
import {
  LucideArrowRight,
  LucideChevronLeft,
  LucideChevronRight,
} from "lucide-react";
import { type ReactNode } from "react";
import { Skeleton } from "./ui/skeleton";
import { useScroll } from "@/hooks/useScroll";
import { useNavigate } from "react-router-dom";

interface CarouselSectionProps<T> {
  heading: string;
  subheading?: string;
  loading?: boolean;
  children: ReactNode;
  path?: string;
  data: T;
}

export const CarouselSection = <T,>({
  heading,
  subheading,
  loading,
  children,
  data,
  path,
}: CarouselSectionProps<T[]>) => {
  const {
    scrollContainer,
    canScrollLeft,
    canScrollRight,
    thumbWidth,
    progress,
    snapEnabled,
    elementRef: propertyCarouselRef,
  } = useScroll<T>(data);

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between">
        {loading ? (
          <Skeleton className="w-52 lg:w-64 h-8" />
        ) : (
          <div className="text-primary text-xl lg:text-2xl montserrat-semibold">
            {heading}
          </div>
        )}
        <div className="hidden lg:flex gap-x-4 text-primary">
          <LucideChevronLeft
            size={32}
            onClick={() => canScrollLeft && scrollContainer("left")}
            className={cn(
              "border-2 rounded-full border-primary-muted transition-opacity",
              canScrollLeft
                ? "cursor-pointer opacity-100 hover:bg-primary-muted"
                : "cursor-default opacity-40",
            )}
          />

          <LucideChevronRight
            size={32}
            onClick={() => canScrollRight && scrollContainer("right")}
            className={cn(
              "border-2 rounded-full border-primary-muted transition-opacity",
              canScrollRight
                ? "cursor-pointer opacity-100 hover:bg-primary-muted"
                : "cursor-default opacity-40",
            )}
          />
        </div>
      </div>
      {loading ? (
        <Skeleton className="w-64 lg:w-96 h-4 lg:h-5 mt-1" />
      ) : (
        <div className="text-primary-light lg:mt-1 text-xs lg:text-sm">
          {subheading}
        </div>
      )}
      {loading ? (
        <div className="grid pb-2 grid-flow-col auto-cols-[100%] lg:auto-cols-84 scroll-smooth overflow-x-auto lg:overflow-x-hidden mt-4 lg:mt-5 items-center gap-x-6 hide-scrollbar">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="h-64 lg:h-66 w-full" />
          ))}
        </div>
      ) : (
        <div
          ref={propertyCarouselRef}
          className={cn(
            "grid pb-2 grid-flow-col auto-cols-[100%] lg:auto-cols-84 scroll-smooth overflow-x-auto lg:overflow-x-hidden mt-4 lg:mt-5 items-center gap-x-6 hide-scrollbar",
            snapEnabled && "snap-x snap-mandatory",
          )}
        >
          {children}
          {data.length > 0 && path && (
            <div className="snap-start flex items-center justify-center lg:justify-start">
              <button
                onClick={() => navigate(path)}
                className="px-4 py-3 cursor-pointer bg-primary-light text-background rounded-md flex items-center gap-x-2"
              >
                <div className="text-sm lg:text-base">View more results</div>
                <LucideArrowRight className="size-5" />
              </button>
            </div>
          )}
        </div>
      )}
      {!loading && data.length > 0 && (
        <div className="h-1 w-[80%] mt-1 mx-auto rounded-full bg-primary-muted overflow-hidden lg:hidden">
          <div
            className="h-full rounded-full bg-primary-light transition-all duration-200"
            style={{
              width: `${thumbWidth}%`,
              marginLeft: `${progress * (100 - thumbWidth)}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};
