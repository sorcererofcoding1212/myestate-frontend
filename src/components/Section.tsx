import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const Section = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("py-6 lg:py-10 w-[90%] mx-auto", className)}>
      {children}
    </div>
  );
};
