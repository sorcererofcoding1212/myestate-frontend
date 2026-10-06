import { ChevronDown } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { IconType } from "react-icons/lib";

export const MobileBottomCollapsible = ({
  children,
  visibleOnFirstLoad,
  Icon,
}: {
  children: ReactNode;
  visibleOnFirstLoad: boolean;
  Icon: IconType;
}) => {
  const [isOpen, setIsOpen] = useState(visibleOnFirstLoad);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isOpen) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-1/2 z-50 -translate-x-1/2 rounded-t-xl bg-background border border-border/80 will-change-auto backdrop-blur-lg transition-[width,opacity,transform] duration-300 ease-in-out lg:hidden",
        isOpen ? "w-full shadow-[0_-8px_30px_rgba(0,0,0,0.08)]" : "w-[20%]",
        !isVisible && !isOpen && "translate-y-full opacity-0",
      )}
    >
      <button
        type="button"
        onClick={() => {
          setIsOpen((prev) => !prev);
          setIsVisible(true);
        }}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Collapse footer" : "Expand footer"}
        className="flex h-8 w-full items-center justify-center"
      >
        <div className="relative size-6 w-full">
          <ChevronDown
            className={cn(
              "absolute inset-0 size-8 left-1/2 -translate-x-1/2 text-primary-muted transition-all duration-200",
              isOpen
                ? "rotate-0 scale-100 opacity-100"
                : "rotate-180 scale-75 opacity-0",
            )}
          />

          <Icon
            className={cn(
              "absolute inset-0 size-6 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-primary-muted transition-all duration-200",
              isOpen
                ? "rotate-180 scale-75 opacity-0"
                : "rotate-0 scale-100 opacity-100",
            )}
          />
        </div>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 max-h-[50dvh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
