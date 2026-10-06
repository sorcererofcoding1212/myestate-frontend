import { useEffect, useRef, useState } from "react";

export const useScroll = <T>(data: T[]) => {
  const [snapEnabled, setSnapEnabled] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [progress, setProgress] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(100);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setSnapEnabled(true);
    });

    return () => {
      cancelAnimationFrame(id);
    };
  }, []);

  const scrollContainer = (side: "left" | "right") => {
    if (!elementRef.current) return;

    const container = elementRef.current;
    const firstCard = container.firstElementChild as HTMLElement;

    if (!firstCard) return;

    const itemWidth = firstCard.offsetWidth;
    const gap = parseFloat(window.getComputedStyle(container).columnGap);

    const slotWidth = itemWidth + gap;
    const visibleCards = Math.floor(container.clientWidth / slotWidth);
    const scrollAmount = visibleCards * slotWidth;

    container.scrollBy({
      left: side === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = elementRef.current;

    if (!container) return;

    const updateProgress = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;

      setCanScrollLeft(container.scrollLeft > 1);
      setCanScrollRight(container.scrollLeft < maxScroll - 1);

      const progress = maxScroll > 0 ? container.scrollLeft / maxScroll : 0;

      const thumbWidth = (container.clientWidth / container.scrollWidth) * 100;

      setProgress(progress);
      setThumbWidth(thumbWidth);
    };

    updateProgress();

    container.addEventListener("scroll", updateProgress);
    window.addEventListener("resize", updateProgress);

    return () => {
      container.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [data]);

  return {
    snapEnabled,
    scrollContainer,
    canScrollLeft,
    canScrollRight,
    progress,
    thumbWidth,
    elementRef,
  };
};
